import { test, expect, Page } from '@playwright/test';

// Mock speech recognition for consistent testing
async function setupMockSpeechRecognition(page: Page) {
  await page.addInitScript(() => {
    // Mock webkitSpeechRecognition
    class MockSpeechRecognition extends EventTarget {
      continuous = false;
      interimResults = false;
      lang = '';
      maxAlternatives = 1;
      
      onstart: ((event: any) => void) | null = null;
      onend: ((event: any) => void) | null = null;
      onerror: ((event: any) => void) | null = null;
      onresult: ((event: any) => void) | null = null;
      onspeechstart: ((event: any) => void) | null = null;
      
      private _started = false;
      
      start() {
        if (this._started) throw new Error('Already started');
        this._started = true;
        
        setTimeout(() => {
          this.onstart?.(new Event('start'));
          
          // Simulate speech detection based on test scenario
          const scenario = (window as any).__testScenario || 'normal';
          
          if (scenario === 'silent') {
            // No speech detected - timeout after 4.5s
            setTimeout(() => {
              this.onerror?.({ error: 'no-speech' });
            }, 4500);
          } else if (scenario === 'permission-denied') {
            setTimeout(() => {
              this.onerror?.({ error: 'not-allowed' });
            }, 100);
          } else {
            // Normal speech
            setTimeout(() => {
              this.onspeechstart?.(new Event('speechstart'));
              
              setTimeout(() => {
                this.onresult?.({
                  resultIndex: 0,
                  results: [{
                    isFinal: true,
                    0: { transcript: scenario === 'custom' ? (window as any).__testTranscript : 'Hello, I am speaking normally' }
                  }]
                });
                
                setTimeout(() => {
                  this.onend?.(new Event('end'));
                }, 100);
              }, 500);
            }, 200);
          }
        }, 100);
      }
      
      stop() {
        this._started = false;
        setTimeout(() => {
          this.onend?.(new Event('end'));
        }, 50);
      }
      
      abort() {
        this.stop();
      }
    }
    
    Object.defineProperty(window, 'webkitSpeechRecognition', {
      value: MockSpeechRecognition,
      writable: true,
    });
    
    // Mock getUserMedia
    if (navigator.mediaDevices) {
      const originalGetUserMedia = navigator.mediaDevices.getUserMedia;
      navigator.mediaDevices.getUserMedia = async (constraints) => {
        const scenario = (window as any).__testScenario;
        if (scenario === 'permission-denied') {
          throw new Error('NotAllowedError');
        }
        
        // Return a mock stream
        return {
          getTracks: () => [{ stop: () => {}, kind: 'audio' }],
          getAudioTracks: () => [{ stop: () => {} }],
        } as any;
      };
    }
  });
}

test.describe('Speaking Engine E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupMockSpeechRecognition(page);
    await page.goto('/');
    
    // Navigate to speaking page
    await page.getByRole('button', { name: /speaking/i }).click();
    await page.waitForSelector('[data-testid="speaking-page"]', { timeout: 5000 }).catch(() => {
      // Fallback: look for speaking button or interface
      return page.waitForSelector('button:has-text("Start Speaking")', { timeout: 5000 });
    });
  });
  
  test('Normal speech flow: tap → speak → process → feedback', async ({ page }) => {
    // Set normal scenario
    await page.evaluate(() => {
      (window as any).__testScenario = 'normal';
    });
    
    // Start recording
    const speakButton = page.locator('button:has-text("Start Speaking")');
    await expect(speakButton).toBeVisible();
    await speakButton.click();
    
    // Should show "Recording..." state
    await expect(page.locator('button:has-text("Recording")')).toBeVisible({ timeout: 2000 });
    
    // Wait for processing
    await expect(page.locator('button:has-text("Processing")')).toBeVisible({ timeout: 6000 });
    
    // Check that transcript appears
    await expect(page.locator('text=You said: "Hello, I am speaking normally"')).toBeVisible({ timeout: 5000 });
    
    // Should return to "Start Speaking" state
    await expect(speakButton).toBeVisible({ timeout: 10000 });
    
    // Should show AI feedback
    await expect(page.locator('.conversation-bubble').last()).toContainText(/correct|good|great/i, { timeout: 5000 });
  });
  
  test('Silent recording: shows "No speech detected" message', async ({ page }) => {
    // Set silent scenario
    await page.evaluate(() => {
      (window as any).__testScenario = 'silent';
    });
    
    const speakButton = page.locator('button:has-text("Start Speaking")');
    await speakButton.click();
    
    // Should show recording state
    await expect(page.locator('button:has-text("Recording")')).toBeVisible();
    
    // Wait for silent timeout and error message
    await expect(page.locator('text=No speech detected')).toBeVisible({ timeout: 8000 });
    
    // Should return to idle state
    await expect(speakButton).toBeVisible({ timeout: 2000 });
  });
  
  test('Mid-recording stop: tap to stop before completion', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).__testScenario = 'normal';
    });
    
    const speakButton = page.locator('button:has-text("Start Speaking")');
    await speakButton.click();
    
    // Wait for recording to start
    const recordingButton = page.locator('button:has-text("Recording")');
    await expect(recordingButton).toBeVisible();
    
    // Stop recording by clicking again
    await recordingButton.click();
    
    // Should process whatever was captured
    await expect(page.locator('button:has-text("Processing")')).toBeVisible({ timeout: 2000 });
    
    // Should eventually return to start state
    await expect(speakButton).toBeVisible({ timeout: 5000 });
  });
  
  test('Permission denied: shows appropriate error message', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).__testScenario = 'permission-denied';
    });
    
    const speakButton = page.locator('button:has-text("Start Speaking")');
    await speakButton.click();
    
    // Should show error message
    await expect(page.locator('text=Microphone access denied')).toBeVisible({ timeout: 3000 });
    
    // Should return to idle state
    await expect(speakButton).toBeVisible({ timeout: 2000 });
  });
  
  test('Background/visibility change: cleans up and returns to idle', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).__testScenario = 'normal';
    });
    
    const speakButton = page.locator('button:has-text("Start Speaking")');
    await speakButton.click();
    
    // Wait for recording to start
    await expect(page.locator('button:has-text("Recording")')).toBeVisible();
    
    // Simulate tab becoming hidden
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { value: true, writable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    
    // Should cleanup and return to idle
    await expect(speakButton).toBeVisible({ timeout: 2000 });
  });
  
  test('Feature flag fallback: uses MediaRecorder when enabled', async ({ page }) => {
    // Enable fallback mode
    await page.evaluate(() => {
      localStorage.setItem('speaking_use_fallback', '1');
      (window as any).__testScenario = 'normal';
    });
    
    await page.reload();
    await page.getByRole('button', { name: /speaking/i }).click();
    
    // Check diagnostics show media-recorder engine
    await page.goto('/?debug=1');
    await page.getByRole('button', { name: /speaking/i }).click();
    
    const debugOverlay = page.locator('#speaking-debug');
    await expect(debugOverlay).toContainText('media-recorder');
  });
  
  test('Debug overlay: shows diagnostic information', async ({ page }) => {
    await page.goto('/?debug=1');
    await page.getByRole('button', { name: /speaking/i }).click();
    
    const debugOverlay = page.locator('#speaking-debug');
    await expect(debugOverlay).toBeVisible();
    
    // Should show current state
    await expect(debugOverlay).toContainText('idle');
    
    // Should show engine type
    await expect(debugOverlay).toContainText(/speech-recognition|media-recorder/);
  });
  
  test('Metrics emission: tracks recording events', async ({ page }) => {
    let metricsEvents: any[] = [];
    
    // Listen for metrics events
    await page.exposeFunction('captureMetrics', (event: any) => {
      metricsEvents.push(event);
    });
    
    await page.addInitScript(() => {
      window.addEventListener('speaking:metrics', (e: any) => {
        (window as any).captureMetrics(e.detail);
      });
    });
    
    await page.evaluate(() => {
      (window as any).__testScenario = 'normal';
    });
    
    const speakButton = page.locator('button:has-text("Start Speaking")');
    await speakButton.click();
    
    // Wait for completion
    await expect(page.locator('text=You said:')).toBeVisible({ timeout: 8000 });
    
    // Check metrics were emitted
    const metrics = await page.evaluate(() => metricsEvents);
    expect(metrics.length).toBeGreaterThan(0);
    
    const phases = metrics.map(m => m.phase);
    expect(phases).toContain('engine_start');
    expect(phases).toContain('state_change');
  });
});

// Capacitor-specific tests
test.describe('Capacitor WebView Compatibility', () => {
  test.use({ 
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Capacitor/5.0.0' 
  });
  
  test('Works in Capacitor WebView without additional user gestures', async ({ page }) => {
    await setupMockSpeechRecognition(page);
    await page.goto('/');
    
    await page.getByRole('button', { name: /speaking/i }).click();
    
    await page.evaluate(() => {
      (window as any).__testScenario = 'normal';
    });
    
    const speakButton = page.locator('button:has-text("Start Speaking")');
    await speakButton.click();
    
    // Should work without additional permission prompts
    await expect(page.locator('button:has-text("Recording")')).toBeVisible({ timeout: 3000 });
    await expect(page.locator('text=You said:')).toBeVisible({ timeout: 8000 });
  });
});