// Post-Speaking-Test routing logic
import { resumeLastPointer, getModuleState } from './progress';

export interface PlacementResult {
  level: 'A1' | 'A2' | 'B1';
  score: number;
}

export function getFirstModuleForLevel(level: 'A1' | 'A2' | 'B1'): number {
  const levelModules = {
    'A1': 1,
    'A2': 51, 
    'B1': 101
  };
  return levelModules[level];
}

export function routeAfterSpeakingTest(
  userId: string, 
  placementResult: PlacementResult,
  onComplete: (level: string, score: number) => void
): void {
  try {
    const { level, score } = placementResult;
    
    console.log(`🎯 Post-test routing for level: ${level}, score: ${score}`);
    
    // Check if user has existing progress in the placed level
    const resumePointer = resumeLastPointer(userId);
    
    if (resumePointer && resumePointer.levelId === level) {
      // Resume from existing progress in the same level
      console.log(`🔄 Resuming existing progress in ${level} at Module ${resumePointer.moduleId}, Question ${resumePointer.questionIndex + 1}`);
      
      // Set routing state to resume at exact spot
      localStorage.setItem('currentLevel', level);
      localStorage.setItem('currentModule', resumePointer.moduleId);
      localStorage.setItem('resumeQuestionIndex', String(resumePointer.questionIndex));
      
    } else {
      // Check if user has completed progress beyond the placed level (regression handling)
      const allProgress = JSON.parse(localStorage.getItem(`speakflow:v2:${userId}`) || '{}');
      let hasHigherProgress = false;
      
      const levelOrder = ['A1', 'A2', 'B1'];
      const placedLevelIndex = levelOrder.indexOf(level);
      
      // Check for progress in higher levels
      for (let i = placedLevelIndex + 1; i < levelOrder.length; i++) {
        const higherLevel = levelOrder[i];
        const higherLevelModules = Object.keys(allProgress).filter(key => key.startsWith(higherLevel + ':'));
        if (higherLevelModules.length > 0) {
          hasHigherProgress = true;
          console.log(`⚠️ User has progress in higher level ${higherLevel}, maintaining current standing`);
          break;
        }
      }
      
      if (hasHigherProgress) {
        // Don't regress - offer choice or keep current level
        console.log(`🛡️ No regression - keeping user at current level or higher`);
        // Keep existing routing or offer choice (fallback to results screen)
        onComplete(level, score);
        return;
      }
      
      // Start at the first module of the placed level
      const firstModule = getFirstModuleForLevel(level);
      console.log(`🏁 Starting fresh at ${level} Module ${firstModule}`);
      
      localStorage.setItem('currentLevel', level);
      localStorage.setItem('currentModule', String(firstModule));
      localStorage.removeItem('resumeQuestionIndex'); // Fresh start
    }
    
    // Set placement data
    localStorage.setItem('userPlacement', JSON.stringify({ 
      level, 
      score, 
      placedAt: Date.now() 
    }));
    localStorage.setItem('unlockedLevel', level);
    
    // Unlock the level
    const unlocks = JSON.parse(localStorage.getItem('unlocks') || '{}');
    unlocks[level] = true;
    localStorage.setItem('unlocks', JSON.stringify(unlocks));
    
    console.log(`✅ Successfully routed to ${level} - calling onComplete`);
    onComplete(level, score);
    
  } catch (error) {
    console.error('❌ Error in post-test routing, falling back to results screen:', error);
    // Fallback: just show results without navigating
    onComplete(placementResult.level, placementResult.score);
  }
}

export function enhanceQuestionMetadata(questionData: any): any {
  // Add metadata to questions for better evaluation
  if (!questionData) return questionData;
  
  // Examples of enhanced metadata based on question content
  const enhanced = { ...questionData };
  
  // Add accepted alternatives for common variations
  if (questionData.answer) {
    const answer = questionData.answer.toLowerCase();
    
    // Common patterns for accepted alternatives
    if (answer.includes('yes, they are students')) {
      enhanced.acceptedAlternatives = [
        'Yes, they are students.',
        'Yes, they\'re students.',
        'Yes, they are my students.',
        'Yeah, they are students.'
      ];
      enhanced.keyLemmas = ['student'];
      enhanced.requiresYesNo = true;
    }
    
    if (answer.includes('yes') || answer.includes('no')) {
      enhanced.requiresYesNo = true;
    }
    
    // Extract key nouns as lemmas for validation
    const keyWords = answer.match(/\b(student|teacher|book|house|car|friend|family|work|school|time|day|year|money|food|water|people|children|man|woman|boy|girl)\w*\b/gi);
    if (keyWords && keyWords.length > 0) {
      enhanced.keyLemmas = [...new Set(keyWords.map(w => w.toLowerCase().replace(/s$/, '')))];
    }
  }
  
  return enhanced;
}
