import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function to normalize text for duplicate detection
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,!?;:'"()-]/g, '') // Remove punctuation
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

// Check if texts are duplicates (case-insensitive, ignoring punctuation)
function isDuplicate(text1: string, text2: string): boolean {
  if (!text1 || !text2) return false;
  return normalizeText(text1) === normalizeText(text2);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transcript, previousTranscript, level = 'beginner' } = await req.json();
    
    if (!transcript) {
      return new Response(JSON.stringify({ xp: 0, reason: 'No transcript provided' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`[XP] Calculating XP for: "${transcript}"`);
    console.log(`[XP] Previous: "${previousTranscript || 'none'}"`);

    // Check for duplicates first
    if (previousTranscript && isDuplicate(transcript, previousTranscript)) {
      console.log('[XP] Duplicate detected, awarding 0 XP');
      return new Response(JSON.stringify({ 
        xp: 0, 
        reason: 'Duplicate response (same as previous turn)' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Use OpenAI to analyze grammar, complexity, and award XP
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an English XP calculator. Analyze the transcript and award XP (0-20) based on these exact rules:

RULES:
1. IGNORE punctuation/casing completely - these never reduce XP
2. Award 0 XP ONLY if there are major grammar errors (wrong tense/agreement/word order that makes meaning unclear)
3. Simple but correct sentences: 3-4 XP
4. Award bonus XP for complexity factors (max 20 total):
   - Uses clauses/connectors (because, that, although, however, when, if, etc.): +2-4 XP
   - Correct tense changes/aspects (past, future, conditional, continuous): +2-4 XP  
   - Advanced vocabulary (beyond basic A1 words): +2-4 XP
   - Longer, well-structured utterances (not rambling): +2-4 XP
5. Minor issues (like missing articles) may reduce XP slightly but never to 0
6. Award based on the user's level: ${level}

EXAMPLES:
- "OK I'm ready" → 3-4 XP (simple but correct)
- "I think that learning English is important because it helps me communicate" → 12-16 XP (connectors, complex structure, good length)
- "I have went there yesterday" → 0 XP (major grammar error - wrong tense)
- "yesterday i go shopping and buy many thing" → 1-2 XP (multiple errors but meaning clear)

Return JSON with:
- xp: number (0-20)
- reason: string (brief explanation)
- hasErrors: boolean
- complexity: string (simple/medium/complex)`
          },
          {
            role: 'user',
            content: `Analyze transcript: "${transcript}"`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${errorText}`);
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    console.log(`[XP] Awarded ${result.xp} XP - ${result.reason}`);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in calculate-xp function:', error);
    return new Response(JSON.stringify({ 
      xp: 0, 
      reason: `Error calculating XP: ${error.message}`,
      hasErrors: true,
      complexity: 'unknown'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});