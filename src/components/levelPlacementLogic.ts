// Placement processing logic for Speaking Test
import { 
  normalizeScores, 
  determinePlacement, 
  hasInsufficientData, 
  getLastKnownLevel, 
  savePlacementResult,
  Level
} from '../utils/levelPlacement';
import { getPostTestRoute } from '../utils/levelResume';

export interface TestAnswer {
  transcript: string;
  durationSec: number;
  wordsRecognized: number;
}

export interface ScoredResult {
  grammar: number;  // 0-10 scale
  vocab: number;    // 0-10 scale  
  pron: number;     // 0-10 scale
  level: Level;
}

export function processPlacementResults(
  scored: ScoredResult, 
  answers: TestAnswer[],
  onComplete: (level: string, score: number) => void
) {
  try {
    const userId = 'guest'; // TODO: get from auth when available
    const totalDuration = answers.reduce((sum, a) => sum + a.durationSec, 0);
    
    // Check for insufficient data
    if (hasInsufficientData(answers.length, totalDuration)) {
      const lastLevel = getLastKnownLevel() || 'A1';
      
      // Save as insufficient data case
      localStorage.setItem('userPlacement', JSON.stringify({
        level: lastLevel,
        insufficient: true,
        reason: 'Less than 8 valid answers or 30 seconds total',
        at: Date.now()
      }));
      
      // Route to last known level or A1
      const route = getPostTestRoute(lastLevel, userId);
      routeToLessons(route.level, route.moduleId, route.questionIndex);
      onComplete(route.level, 50); // Lower confidence score
      return;
    }
    
    // Normalize scores to 0-1 range
    const normalizedScores = normalizeScores(scored.grammar, scored.vocab, scored.pron);
    
    // Determine placement using enhanced logic
    const placement = determinePlacement(normalizedScores);
    
    // Non-regression: Check if user already has progress in a higher level
    const currentLevel = localStorage.getItem('currentLevel');
    const levelOrder = ['A1', 'A2', 'B1'];
    const placedLevelIndex = levelOrder.indexOf(placement.level);
    const currentLevelIndex = currentLevel ? levelOrder.indexOf(currentLevel) : -1;
    
    let finalLevel = placement.level;
    let routingReason = 'placed';
    
    if (currentLevelIndex > placedLevelIndex) {
      finalLevel = currentLevel as Level;
      routingReason = 'kept-higher';
    }
    
    // Telemetry logging  
    const vocabStr = normalizedScores.vocabulary ? ` V:${normalizedScores.vocabulary.toFixed(2)}` : '';
    
    // Save placement result (use original placement for scoring records)
    savePlacementResult(placement);
    
    // Get post-test routing with resume logic for final level
    const route = getPostTestRoute(finalLevel, userId);
    
    // Clear test progress
    localStorage.removeItem('speakingTestProgress');
    
    // Trigger celebration
    // @ts-ignore
    window.triggerConfetti?.();
    
    // Route to lessons after delay
    setTimeout(() => {
      routeToLessons(route.level, route.moduleId, route.questionIndex);
      onComplete(route.level, Math.round((normalizedScores.pronunciation + normalizedScores.grammar + normalizedScores.fluency) * 100 / 3));
    }, 1200);
    
  } catch (error) {
    // Fallback to original behavior
    throw error;
  }
}

function routeToLessons(level: Level, moduleId: number, questionIndex: number) {
  try {
    // Phase 2.1: Use state-based navigation instead of hard redirects
    // Set current level and module (Single Source of Truth)
    localStorage.setItem('currentLevel', level);
    localStorage.setItem('currentModule', String(moduleId));
    localStorage.setItem('recommendedStartLevel', level);
    localStorage.setItem('recommendedStartModule', String(moduleId));

    // Mark level as unlocked
    const unlocks = JSON.parse(localStorage.getItem('unlocks') || '{}');
    unlocks[level] = true;
    localStorage.setItem('unlocks', JSON.stringify(unlocks));
    localStorage.setItem('unlockedLevel', level);

    // Store navigation intent for AppNavigation to handle
    localStorage.setItem('pendingNavigation', JSON.stringify({
      mode: 'lessons',
      level,
      moduleId,
      questionIndex,
      timestamp: Date.now()
    }));

    // Navigation will be handled by the parent component via onComplete callback
    // No hard redirects - AppNavigation will call setCurrentMode('lessons')

  } catch (error) {
    // Silent fail - localStorage errors shouldn't break the app
  }
}