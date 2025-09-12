import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Type definitions
type Metric = {
  runId: number;
  phase: string;
  state_from?: string;
  state_to?: string;
  engine?: string;
  duration_ms?: number;
  transcript_len?: number;
  error_kind?: string;
  meta?: Record<string, unknown>;
};

type IngestRequest = {
  events: Metric[];
  session_id: string;
  device: string;
};

// Rate limiting in memory (simple implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 120; // 120 requests per minute per session

function checkRateLimit(sessionId: string): boolean {
  const now = Date.now();
  const key = sessionId;
  
  let bucket = rateLimitMap.get(key);
  if (!bucket || now > bucket.resetTime) {
    bucket = { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
    rateLimitMap.set(key, bucket);
  }
  
  if (bucket.count >= RATE_LIMIT_MAX) {
    return false; // Rate limited
  }
  
  bucket.count++;
  return true;
}

// Cleanup old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of rateLimitMap.entries()) {
    if (now > bucket.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000); // Cleanup every 5 minutes

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const { events, session_id, device }: IngestRequest = await req.json();
    
    // Validate request
    if (!Array.isArray(events) || !session_id || !device) {
      throw new Error('Invalid request format');
    }
    
    if (events.length === 0 || events.length > 50) {
      throw new Error('Invalid events count (max 50)');
    }
    
    // Rate limiting
    if (!checkRateLimit(session_id)) {
      console.log(`Rate limited session: ${session_id}`);
      return new Response(JSON.stringify({ error: 'Rate limited' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get user ID if authenticated
    let userId: string | null = null;
    try {
      const authHeader = req.headers.get('authorization');
      if (authHeader) {
        const supabaseClient = createClient(
          supabaseUrl, 
          Deno.env.get('SUPABASE_ANON_KEY')!,
          {
            global: {
              headers: { authorization: authHeader }
            }
          }
        );
        const { data: { user } } = await supabaseClient.auth.getUser();
        userId = user?.id || null;
      }
    } catch (error) {
      console.log('Auth check failed:', error.message);
      // Continue without user ID
    }

    // Process each metric
    const results = [];
    for (const event of events) {
      try {
        // Validate and sanitize event
        const {
          runId,
          phase,
          state_from,
          state_to,
          engine,
          duration_ms,
          transcript_len,
          error_kind,
          meta
        } = event;
        
        // Validate required fields
        if (typeof runId !== 'number' || !phase || typeof phase !== 'string') {
          console.warn('Invalid metric event:', event);
          continue;
        }
        
        // Sanitize transcript_len (numbers only)
        const sanitizedTranscriptLen = transcript_len && typeof transcript_len === 'number' 
          ? Math.max(0, Math.floor(transcript_len)) 
          : null;
        
        // Truncate text fields for safety
        const sanitizedPhase = phase.slice(0, 50);
        const sanitizedEngine = engine?.slice(0, 20) || null;
        const sanitizedErrorKind = error_kind?.slice(0, 100) || null;
        const sanitizedDevice = device.slice(0, 100);
        
        // Call the secure function
        const { error } = await supabase.rpc('log_speaking_metric', {
          p_user_id: userId,
          p_session_id: session_id,
          p_run_id: runId,
          p_phase: sanitizedPhase,
          p_state_from: state_from?.slice(0, 20) || null,
          p_state_to: state_to?.slice(0, 20) || null,
          p_engine: sanitizedEngine,
          p_duration_ms: duration_ms || null,
          p_transcript_len: sanitizedTranscriptLen,
          p_error_kind: sanitizedErrorKind,
          p_device: sanitizedDevice,
          p_meta: meta || null
        });
        
        if (error) {
          console.error('Database error:', error);
          results.push({ success: false, error: error.message });
        } else {
          results.push({ success: true });
        }
        
      } catch (eventError) {
        console.error('Event processing error:', eventError);
        results.push({ success: false, error: eventError.message });
      }
    }
    
    const successCount = results.filter(r => r.success).length;
    console.log(`Processed ${successCount}/${events.length} metrics for session ${session_id}`);

    return new Response(JSON.stringify({ 
      ok: true, 
      processed: successCount,
      total: events.length 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ingest-speaking-metrics function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Internal server error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});