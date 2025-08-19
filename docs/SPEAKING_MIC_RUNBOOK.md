# Speaking Mic Engine v1.0 - Debug Runbook

## Overview
The Speaking mic engine provides reliable speech recognition across all platforms with comprehensive fallbacks, monitoring, and debugging capabilities.

## Feature Flags

### Environment Variables
- `SPEAKING_USE_FALLBACK=1` - Force MediaRecorder fallback mode
- `SPEAKING_ROLLBACK=1` - Use legacy mic implementation
- `SPEAKING_DEBUG=1` - Enable debug overlay

### URL Parameters
- `?use_fallback=1` - Enable fallback mode for session
- `?debug=1` - Show diagnostics overlay
- `?rollback=1` - Use rollback mode

## Debugging Steps

### 1. Check Engine Mode
```javascript
// In browser console
import { getDiagnostics } from '@/lib/audio/micEngine';
console.log(getDiagnostics());
```

### 2. Enable Debug Overlay
Add `?debug=1` to URL to see real-time diagnostics:
- Current state
- Active timers
- Engine mode (speech-recognition vs media-recorder)
- RunID and retry count

### 3. Monitor State Transitions
```javascript
// Listen for state changes
window.addEventListener('speaking:metrics', (e) => {
  console.log('Metrics:', e.detail);
});
```

### 4. Common Issues

#### "No speech detected"
- Check microphone permissions
- Verify HTTPS connection
- Try fallback mode with `?use_fallback=1`

#### "Microphone access denied"
- Browser settings → Allow microphone
- Check site permissions
- Clear browser cache

#### Stuck in "Processing..."
- Check network connectivity
- Verify Supabase functions are deployed
- Check browser developer tools for errors

#### iOS Safari Issues
- Ensure user gesture before recording
- Check if running in WKWebView (Capacitor)
- Verify AudioContext is resumed

## Platform-Specific Debugging

### iOS Safari/WKWebView
```javascript
// Check iOS-specific setup
console.log('User agent:', navigator.userAgent);
console.log('AudioContext state:', audioContext.state);
```

### Android Chrome
```javascript
// Check MediaRecorder support
console.log('MediaRecorder supported:', 'MediaRecorder' in window);
console.log('webkitSpeechRecognition:', 'webkitSpeechRecognition' in window);
```

## Performance Monitoring

### Metrics Collection
The engine automatically emits metrics events:
- `engine_start` - Recording session begins
- `state_change` - State transitions
- `recording_complete` - Successful transcription
- `recording_error` - Errors with details
- `invariant_violation` - Internal consistency checks

### Database Monitoring
Check `speaking_metrics` table for:
```sql
SELECT phase, COUNT(*), AVG(duration_ms) 
FROM speaking_metrics 
WHERE timestamp > NOW() - INTERVAL '1 hour'
GROUP BY phase;
```

## Testing Commands

### Run Unit Tests
```bash
npm run test src/lib/audio/__tests__/
```

### Run E2E Tests
```bash
npx playwright test tests/e2e/speaking-engine.spec.ts
```

### Test on Mobile
```bash
npx playwright test --project="Mobile Safari"
npx playwright test --project="iOS Capacitor"
```

## Recovery Procedures

### Reset Engine State
```javascript
// In browser console
import { cleanup } from '@/lib/audio/micEngine';
cleanup();
```

### Clear Feature Flags
```javascript
localStorage.removeItem('speaking_use_fallback');
localStorage.removeItem('speaking_debug');
localStorage.removeItem('speaking_rollback');
```

### Force Fallback Mode
```javascript
localStorage.setItem('speaking_use_fallback', '1');
location.reload();
```

## Log Analysis

### Key Log Patterns
- `[Speaking] state-change:` - State transitions
- `[Speaking] asr:` - Speech recognition events
- `[Speaking] recorder:` - MediaRecorder events
- `[Speaking][invariant]` - Consistency violations

### Error Categories
- `no-speech` - Silent recording
- `network` - Connectivity issues
- `not-allowed` - Permission denied
- `aborted` - User cancelled

## Contact & Escalation
For persistent issues:
1. Collect debug logs with `?debug=1`
2. Note browser/device details
3. Check speaking_metrics table for patterns
4. Test fallback mode success rate