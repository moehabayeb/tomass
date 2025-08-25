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
      console.log('⚠️ Insufficient test data, using last known level or A1');
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
    
    // Telemetry logging
    const vocabStr = normalizedScores.vocabulary ? ` V:${normalizedScores.vocabulary.toFixed(2)}` : '';
    console.log(`🎯 Placement ${userId} -> ${placement.level} | P:${normalizedScores.pronunciation.toFixed(2)} G:${normalizedScores.grammar.toFixed(2)} F:${normalizedScores.fluency.toFixed(2)}${vocabStr} | answers:${answers.length}`);
    
    // Save placement result
    savePlacementResult(placement);
    
    // Get post-test routing with resume logic
    const route = getPostTestRoute(placement.level, userId);
    console.log(`🧭 Routing: ${route.reasoning}`);
    
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
    console.error('Placement processing failed:', error);
    // Fallback to original behavior
    throw error;
  }
}

function routeToLessons(level: Level, moduleId: number, questionIndex: number) {
  try {
    // Set current level and module
    localStorage.setItem('currentLevel', level);
    localStorage.setItem('currentModule', String(moduleId));
    
    // Mark level as unlocked
    const unlocks = JSON.parse(localStorage.getItem('unlocks') || '{}');
    unlocks[level] = true;
    localStorage.setItem('unlocks', JSON.stringify(unlocks));
    localStorage.setItem('unlockedLevel', level);
    
    console.log(`🚀 Routed to ${level} Module ${moduleId}, Question ${questionIndex + 1}`);
  } catch (error) {
    console.error('Failed to route to lessons:', error);
  }
}