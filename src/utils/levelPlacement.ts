// Level placement logic for Speaking Test
export type Level = 'A1' | 'A2' | 'B1';

export interface PlacementScores {
  pronunciation: number; // 0-1 normalized
  grammar: number;       // 0-1 normalized  
  fluency: number;       // 0-1 normalized
  vocabulary?: number;   // 0-1 normalized (optional)
}

export interface PlacementResult {
  level: Level;
  scores: PlacementScores;
  reasoning: string;
  timestamp: number;
}

// Convert existing 0-10 scores to 0-1 normalized scores
export function normalizeScores(grammar: number, vocab: number, pron: number): PlacementScores {
  return {
    pronunciation: Math.max(0, Math.min(1, pron / 10)),
    grammar: Math.max(0, Math.min(1, grammar / 10)),
    fluency: Math.max(0, Math.min(1, vocab / 10)), // Using vocab as fluency proxy
    vocabulary: Math.max(0, Math.min(1, vocab / 10))
  };
}

// Placement logic with specified thresholds
export function determinePlacement(scores: PlacementScores): PlacementResult {
  const { pronunciation, grammar, fluency } = scores;
  const mainScores = [pronunciation, grammar, fluency];
  
  // B1: at least 2 of {P,G,F} ≥ 0.75 and none < 0.55
  const b1Count = mainScores.filter(s => s >= 0.75).length;
  const hasB1Minimum = mainScores.every(s => s >= 0.55);
  
  if (b1Count >= 2 && hasB1Minimum) {
    return {
      level: 'B1',
      scores,
      reasoning: `B1 placement: ${b1Count} scores ≥0.75, all ≥0.55`,
      timestamp: Date.now()
    };
  }
  
  // A2: at least 2 of {P,G,F} ≥ 0.55 (or one ≥ 0.65) and none < 0.45
  const a2Count = mainScores.filter(s => s >= 0.55).length;
  const hasHighScore = mainScores.some(s => s >= 0.65);
  const hasA2Minimum = mainScores.every(s => s >= 0.45);
  
  if ((a2Count >= 2 || hasHighScore) && hasA2Minimum) {
    return {
      level: 'A2',
      scores,
      reasoning: `A2 placement: ${a2Count} scores ≥0.55, high score: ${hasHighScore}, all ≥0.45`,
      timestamp: Date.now()
    };
  }
  
  // Otherwise A1
  return {
    level: 'A1',
    scores,
    reasoning: 'A1 placement: scores below A2 thresholds',
    timestamp: Date.now()
  };
}

// Check for insufficient data
export function hasInsufficientData(answersCount: number, totalDuration: number): boolean {
  return answersCount < 8 || totalDuration < 30; // Less than 8 answers or 30 seconds total
}

// Get user's last known level
export function getLastKnownLevel(): Level | null {
  try {
    const placement = localStorage.getItem('userPlacement');
    if (placement) {
      const data = JSON.parse(placement);
      if (data.level && ['A1', 'A2', 'B1'].includes(data.level)) {
        return data.level as Level;
      }
    }
    return null;
  } catch {
    return null;
  }
}

// Save placement result
export function savePlacementResult(result: PlacementResult) {
  try {
    localStorage.setItem('userPlacement', JSON.stringify({
      level: result.level,
      scores: result.scores,
      reasoning: result.reasoning,
      at: result.timestamp
    }));
    
    // Unlock the placed level
    const unlocks = JSON.parse(localStorage.getItem('unlocks') || '{}');
    unlocks[result.level] = true;
    localStorage.setItem('unlocks', JSON.stringify(unlocks));
    localStorage.setItem('unlockedLevel', result.level);
    
    console.log(`🎯 Level placement: ${result.level} | P:${result.scores.pronunciation.toFixed(2)} G:${result.scores.grammar.toFixed(2)} F:${result.scores.fluency.toFixed(2)} | ${result.reasoning}`);
  } catch (error) {
    console.error('Failed to save placement result:', error);
  }
}

// Get level-specific module mapping
export function getLevelModuleMapping(): Record<Level, number> {
  return {
    A1: 1,  // Start at Module 1
    A2: 51, // Start at Module 51  
    B1: 101 // Start at Module 101
  };
}
