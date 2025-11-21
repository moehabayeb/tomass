// Progress Service - Stub implementation
// This service handles saving/loading lesson progress

export interface LessonProgress {
  level: string;
  moduleId: number;
  correctAnswers: number;
  attempts: number;
  lastPlayed?: number;
}

class ProgressService {
  async saveLessonProgress(progress: LessonProgress): Promise<void> {
    // Save to localStorage
    const key = `lesson_progress_${progress.level}_${progress.moduleId}`;
    localStorage.setItem(key, JSON.stringify(progress));
  }

  async loadLessonProgress(level: string, moduleId: number): Promise<LessonProgress | null> {
    try {
      // Load from localStorage
      const key = `lesson_progress_${level}_${moduleId}`;
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  async migrateExistingData(): Promise<void> {
    // No-op for now - placeholder for future migration logic
    return Promise.resolve();
  }
}

const progressService = new ProgressService();
export default progressService;
