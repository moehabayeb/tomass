// Telemetry System for Voice Commands
// Comprehensive event tracking and debugging support for voice command functionality

import {
  TelemetryEvent,
  TelemetryEventType,
  TelemetryConfig,
  ITelemetryService,
  DEFAULT_TELEMETRY_CONFIG
} from '../types/voiceCommands';

class TelemetryService implements ITelemetryService {
  private config: TelemetryConfig;
  private sessions: Map<string, TelemetryEvent[]>;
  private currentSessionId: string | null = null;
  private sendQueue: TelemetryEvent[] = [];
  private sendInterval: number | null = null;

  constructor(config: TelemetryConfig = DEFAULT_TELEMETRY_CONFIG) {
    this.config = { ...DEFAULT_TELEMETRY_CONFIG, ...config };
    this.sessions = new Map();
    
    // Initialize send interval if endpoint is configured
    if (this.config.endpoint && this.config.sendInterval) {
      this.startSendInterval();
    }
    
    // Load existing sessions from localStorage
    this.loadFromStorage();
  }

  public configure(options: Partial<TelemetryConfig>): void {
    this.config = { ...this.config, ...options };
    
    // Update send interval
    if (this.sendInterval) {
      clearInterval(this.sendInterval);
      this.sendInterval = null;
    }
    
    if (this.config.endpoint && this.config.sendInterval) {
      this.startSendInterval();
    }
  }

  public trackEvent(event: TelemetryEvent): void {
    if (!this.config.enabled) return;

    try {
      // Add to current session
      if (this.currentSessionId) {
        const session = this.sessions.get(this.currentSessionId) || [];
        session.push(event);
        this.sessions.set(this.currentSessionId, session);
      }

      // Debug logging
      // Apple Store Compliance: Silent monitoring

      // Add to send queue
      if (this.config.endpoint) {
        this.sendQueue.push(event);
      }

      // Store in localStorage
      if (this.config.localStorage) {
        this.saveToStorage();
      }

      // Cleanup old events
      this.cleanupEvents();
    } catch (error) {
      // Apple Store Compliance: Silent monitoring
    }
  }

  public startSession(sessionId: string): void {
    this.currentSessionId = sessionId;
    
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, []);
    }

    this.trackEvent({
      type: 'HF_SESSION_START',
      timestamp: Date.now(),
      sessionId,
      data: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        onLine: navigator.onLine
      },
      context: {
        page: window.location.pathname,
        phase: 'session_start',
        userAgent: navigator.userAgent,
        audioSupported: this.isAudioSupported(),
        micPermission: 'unknown'
      }
    });
  }

  public endSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    const sessionStats = this.calculateSessionStats(session);
    
    this.trackEvent({
      type: 'HF_SESSION_END',
      timestamp: Date.now(),
      sessionId,
      data: {
        ...sessionStats,
        duration: Date.now() - (session[0]?.timestamp || Date.now())
      },
      context: {
        page: window.location.pathname,
        phase: 'session_end',
        userAgent: navigator.userAgent,
        audioSupported: this.isAudioSupported(),
        micPermission: 'unknown'
      }
    });

    // Mark session as completed
    if (this.currentSessionId === sessionId) {
      this.currentSessionId = null;
    }
  }

  public getSession(sessionId: string): TelemetryEvent[] {
    return this.sessions.get(sessionId) || [];
  }

  public exportSession(sessionId: string): string {
    const session = this.getSession(sessionId);
    const sessionStats = this.calculateSessionStats(session);
    
    const exportData = {
      sessionId,
      stats: sessionStats,
      events: session,
      exportedAt: new Date().toISOString(),
      config: this.config
    };

    return JSON.stringify(exportData, null, 2);
  }

  public clearSessions(): void {
    this.sessions.clear();
    this.sendQueue = [];
    
    if (this.config.localStorage) {
      try {
        localStorage.removeItem('voice_telemetry_sessions');
        localStorage.removeItem('voice_telemetry_queue');
      } catch (error) {
        // Apple Store Compliance: Silent monitoring
      }
    }
  }

  private calculateSessionStats(events: TelemetryEvent[]) {
    const stats = {
      totalEvents: events.length,
      commandsDetected: 0,
      commandsExecuted: 0,
      commandsFailed: 0,
      bargeInEvents: 0,
      recognitionErrors: 0,
      averageLatency: 0,
      commandTypes: {} as Record<string, number>,
      totalLatency: 0,
      latencyMeasurements: 0
    };

    events.forEach(event => {
      switch (event.type) {
        case 'HF_COMMAND_DETECTED':
          stats.commandsDetected++;
          if (event.data.commandType) {
            stats.commandTypes[event.data.commandType] = 
              (stats.commandTypes[event.data.commandType] || 0) + 1;
          }
          break;
        case 'HF_COMMAND_EXECUTED':
          stats.commandsExecuted++;
          break;
        case 'HF_COMMAND_FAILED':
          stats.commandsFailed++;
          break;
        case 'HF_BARGE_IN':
          stats.bargeInEvents++;
          break;
        case 'HF_RECOGNITION_ERROR':
          stats.recognitionErrors++;
          break;
        case 'HF_COMMAND_LATENCY':
          if (event.performance?.latency) {
            stats.totalLatency += event.performance.latency;
            stats.latencyMeasurements++;
          }
          break;
      }
    });

    if (stats.latencyMeasurements > 0) {
      stats.averageLatency = stats.totalLatency / stats.latencyMeasurements;
    }

    return stats;
  }

  private startSendInterval(): void {
    if (!this.config.sendInterval || !this.config.endpoint) return;

    this.sendInterval = window.setInterval(() => {
      this.sendQueuedEvents();
    }, this.config.sendInterval);
  }

  private async sendQueuedEvents(): void {
    if (this.sendQueue.length === 0 || !this.config.endpoint) return;

    try {
      const events = [...this.sendQueue];
      this.sendQueue = [];

      const response = await fetch(this.config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ events })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Apple Store Compliance: Silent monitoring
    } catch (error) {
      // Apple Store Compliance: Silent monitoring
      // Put events back in queue for retry
      this.sendQueue.unshift(...this.sendQueue);
    }
  }

  private saveToStorage(): void {
    if (!this.config.localStorage) return;

    try {
      const sessionsData = Array.from(this.sessions.entries()).reduce((acc, [id, events]) => {
        acc[id] = events;
        return acc;
      }, {} as Record<string, TelemetryEvent[]>);

      localStorage.setItem('voice_telemetry_sessions', JSON.stringify(sessionsData));
      localStorage.setItem('voice_telemetry_queue', JSON.stringify(this.sendQueue));
    } catch (error) {
      // Apple Store Compliance: Silent monitoring
    }
  }

  private loadFromStorage(): void {
    if (!this.config.localStorage) return;

    try {
      // Load sessions
      const sessionsData = localStorage.getItem('voice_telemetry_sessions');
      if (sessionsData) {
        const parsed = JSON.parse(sessionsData) as Record<string, TelemetryEvent[]>;
        Object.entries(parsed).forEach(([id, events]) => {
          this.sessions.set(id, events);
        });
      }

      // Load send queue
      const queueData = localStorage.getItem('voice_telemetry_queue');
      if (queueData) {
        this.sendQueue = JSON.parse(queueData);
      }
    } catch (error) {
      // Apple Store Compliance: Silent monitoring
    }
  }

  private cleanupEvents(): void {
    // Remove old events if we exceed maxEvents
    const totalEvents = Array.from(this.sessions.values())
      .reduce((sum, events) => sum + events.length, 0);

    if (totalEvents > this.config.maxEvents) {
      // Remove oldest sessions first
      const sortedSessions = Array.from(this.sessions.entries())
        .sort(([,a], [,b]) => {
          const aTime = a[0]?.timestamp || 0;
          const bTime = b[0]?.timestamp || 0;
          return aTime - bTime;
        });

      let eventsToRemove = totalEvents - this.config.maxEvents;
      for (const [sessionId, events] of sortedSessions) {
        if (eventsToRemove <= 0) break;
        
        if (sessionId === this.currentSessionId) continue; // Don't remove current session
        
        this.sessions.delete(sessionId);
        eventsToRemove -= events.length;
      }
    }
  }

  private isAudioSupported(): boolean {
    return !!(
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition ||
      (window as any).mozSpeechRecognition ||
      (window as any).msSpeechRecognition
    );
  }
}

// Singleton instance
let telemetryInstance: TelemetryService | null = null;

export function getTelemetryService(config?: TelemetryConfig): TelemetryService {
  if (!telemetryInstance) {
    telemetryInstance = new TelemetryService(config);
  }
  return telemetryInstance;
}

// Convenience functions for common telemetry events
export function trackCommandDetected(
  sessionId: string,
  commandType: string,
  confidence: number,
  rawText: string,
  context: any = {}
): void {
  getTelemetryService().trackEvent({
    type: 'HF_COMMAND_DETECTED',
    timestamp: Date.now(),
    sessionId,
    data: {
      commandType,
      confidence,
      rawText,
      ...context
    },
    context: {
      page: window.location.pathname,
      phase: context.phase || 'unknown',
      userAgent: navigator.userAgent,
      audioSupported: true,
      micPermission: 'granted'
    }
  });
}

export function trackCommandExecuted(
  sessionId: string,
  commandType: string,
  success: boolean,
  executionTime: number,
  context: any = {}
): void {
  getTelemetryService().trackEvent({
    type: success ? 'HF_COMMAND_EXECUTED' : 'HF_COMMAND_FAILED',
    timestamp: Date.now(),
    sessionId,
    data: {
      commandType,
      success,
      executionTime,
      ...context
    },
    performance: {
      latency: executionTime
    },
    context: {
      page: window.location.pathname,
      phase: context.phase || 'unknown',
      userAgent: navigator.userAgent,
      audioSupported: true,
      micPermission: 'granted'
    }
  });
}

export function trackBargeIn(
  sessionId: string,
  interruptedContent: string,
  interruptionTime: number,
  commandType: string,
  context: any = {}
): void {
  getTelemetryService().trackEvent({
    type: 'HF_BARGE_IN',
    timestamp: Date.now(),
    sessionId,
    data: {
      interruptedContent,
      interruptionTime,
      commandType,
      ...context
    },
    context: {
      page: window.location.pathname,
      phase: context.phase || 'unknown',
      userAgent: navigator.userAgent,
      audioSupported: true,
      micPermission: 'granted'
    }
  });
}

export function trackRecognitionError(
  sessionId: string,
  errorMessage: string,
  errorCode?: string,
  context: any = {}
): void {
  getTelemetryService().trackEvent({
    type: 'HF_RECOGNITION_ERROR',
    timestamp: Date.now(),
    sessionId,
    data: {
      errorMessage,
      errorCode,
      ...context
    },
    context: {
      page: window.location.pathname,
      phase: context.phase || 'unknown',
      userAgent: navigator.userAgent,
      audioSupported: true,
      micPermission: 'unknown'
    }
  });
}

export function trackLatency(
  sessionId: string,
  operationType: string,
  latency: number,
  context: any = {}
): void {
  getTelemetryService().trackEvent({
    type: 'HF_COMMAND_LATENCY',
    timestamp: Date.now(),
    sessionId,
    data: {
      operationType,
      ...context
    },
    performance: {
      latency
    },
    context: {
      page: window.location.pathname,
      phase: context.phase || 'unknown',
      userAgent: navigator.userAgent,
      audioSupported: true,
      micPermission: 'granted'
    }
  });
}

// Debug utilities
export function exportAllSessions(): string {
  const service = getTelemetryService();
  const allSessions = {};
  
  // Export all sessions
  service['sessions'].forEach((events, sessionId) => {
    allSessions[sessionId] = events;
  });

  return JSON.stringify({
    sessions: allSessions,
    config: service['config'],
    exportedAt: new Date().toISOString()
  }, null, 2);
}

export function getSessionStats(sessionId: string) {
  const service = getTelemetryService();
  const events = service.getSession(sessionId);
  return service['calculateSessionStats'](events);
}

// Initialize telemetry service with default config
export const telemetry = getTelemetryService();