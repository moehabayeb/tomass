import { supabase } from '@/integrations/supabase/client';

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

// Constants
const BATCH_SIZE = 20;
const BATCH_INTERVAL = 2000; // 2 seconds
const RETRY_DELAY = 1000; // 1 second

// Global state
let metricsQueue: Metric[] = [];
let sessionId: string = '';
let deviceInfo: string;
let batchTimer: number | undefined;
let isOnline = true;

// Initialize session ID and device info
function initializeSession() {
  // Get or create session ID
  sessionId = localStorage.getItem('speaking_session_id') || crypto.randomUUID();
  localStorage.setItem('speaking_session_id', sessionId);
  
  // Create short device identifier (no PII)
  const ua = navigator.userAgent;
  const platform = navigator.platform || 'Unknown';
  const isMobile = /Mobile|Android|iPhone|iPad/.test(ua);
  const isIOS = /iPhone|iPad|iPod/.test(ua);
  const isCapacitor = ua.includes('Capacitor');
  
  deviceInfo = [
    platform.slice(0, 10),
    isMobile ? 'mobile' : 'desktop',
    isIOS ? 'ios' : 'other',
    isCapacitor ? 'capacitor' : 'web'
  ].join('|');
}

// Send batch to server
async function sendBatch(events: Metric[], retryCount = 0): Promise<boolean> {
  if (!isOnline || events.length === 0) return false;
  
  try {
    console.log(`[Metrics] Sending batch of ${events.length} events`);
    
    const { data, error } = await supabase.functions.invoke('ingest-speaking-metrics', {
      body: {
        events,
        session_id: sessionId,
        device: deviceInfo
      }
    });
    
    if (error) {
      throw new Error(error.message || 'Unknown error');
    }
    
    console.log(`[Metrics] Batch sent successfully:`, data);
    return true;
    
  } catch (error: any) {
    console.warn(`[Metrics] Send failed (attempt ${retryCount + 1}):`, error.message);
    
    // Retry once after delay
    if (retryCount < 1) {
      setTimeout(() => {
        sendBatch(events, retryCount + 1);
      }, RETRY_DELAY);
    }
    
    return false;
  }
}

// Flush current queue
function flushQueue() {
  if (batchTimer) {
    clearTimeout(batchTimer);
    batchTimer = undefined;
  }
  
  if (metricsQueue.length === 0) return;
  
  const batch = metricsQueue.splice(0, BATCH_SIZE);
  sendBatch(batch);
  
  // Schedule next flush if there are more events
  if (metricsQueue.length > 0) {
    scheduleBatch();
  }
}

// Schedule batch sending
function scheduleBatch() {
  if (batchTimer) return; // Already scheduled
  
  batchTimer = window.setTimeout(() => {
    batchTimer = undefined;
    flushQueue();
  }, BATCH_INTERVAL);
}

// Send immediately using sendBeacon for page unload
function sendBeacon() {
  if (metricsQueue.length === 0 || !navigator.sendBeacon) return;
  
  try {
    const payload = JSON.stringify({
      events: metricsQueue,
      session_id: sessionId,
      device: deviceInfo
    });
    
    const url = `https://sgzhbiknaiqsuknwgvjr.supabase.co/functions/v1/ingest-speaking-metrics`;
    const sent = navigator.sendBeacon(url, payload);
    
    if (sent) {
      console.log(`[Metrics] Beacon sent ${metricsQueue.length} events`);
      metricsQueue = [];
    }
  } catch (error) {
    console.warn('[Metrics] Beacon send failed:', error);
  }
}

// Public API
export function enqueueMetric(metric: Metric) {
  try {
    // Validate basic structure
    if (!metric.runId || !metric.phase) {
      console.warn('[Metrics] Invalid metric:', metric);
      return;
    }
    
    // Sanitize transcript length (no actual content)
    if (metric.transcript_len && typeof metric.transcript_len !== 'number') {
      metric.transcript_len = String(metric.transcript_len).length;
    }
    
    metricsQueue.push({
      ...metric,
      // Add timestamp for ordering
      meta: { ...metric.meta, client_ts: Date.now() }
    });
    
    // Flush immediately if batch is full
    if (metricsQueue.length >= BATCH_SIZE) {
      flushQueue();
    } else {
      scheduleBatch();
    }
    
  } catch (error) {
    console.warn('[Metrics] Enqueue failed:', error);
  }
}

// Initialize when module loads
if (typeof window !== 'undefined') {
  initializeSession();
  
  // Track online status
  window.addEventListener('online', () => {
    isOnline = true;
    if (metricsQueue.length > 0) scheduleBatch();
  });
  
  window.addEventListener('offline', () => {
    isOnline = false;
  });
  
  // Flush on page unload
  window.addEventListener('beforeunload', sendBeacon);
  window.addEventListener('pagehide', sendBeacon);
  
  // Flush on visibility change (mobile apps)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      sendBeacon();
    }
  });
  
  console.log('[Metrics] Initialized session:', sessionId);
}