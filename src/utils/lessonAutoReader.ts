/**
 * 📚 LESSON AUTO-READER SYSTEM
 * Seamless automatic reading of lesson content with language detection
 */

import { VoiceConsistencyManager } from '@/config/voice';
import { detectLanguage, segmentMixedContent, type LanguageSegment } from './languageDetection';

export interface LessonContent {
  title: string;
  description: string;
  intro?: string;
  tip?: string;
  table?: Array<any>;
  listeningExamples?: string[];
  speakingPractice?: Array<{ question: string; answer: string }>;
}

export interface ReadingProgress {
  currentSection: string;
  progress: number;
  totalSections: number;
  isReading: boolean;
  currentText: string;
}

export type ReadingProgressCallback = (progress: ReadingProgress) => void;

/**
 * Auto-reader class for seamless lesson content narration
 */
export class LessonAutoReader {
  private isReading = false;
  private isPaused = false;
  private currentSection = '';
  private progressCallback?: ReadingProgressCallback;
  private voiceManager = VoiceConsistencyManager;

  constructor(onProgress?: ReadingProgressCallback) {
    this.progressCallback = onProgress;
  }

  /**
   * 🎯 MAIN FUNCTION: Read entire lesson content automatically
   */
  async readLessonContent(content: LessonContent): Promise<void> {
    if (this.isReading) {
      console.log('⚠️ Already reading content, stopping previous session');
      this.stop();
    }

    this.isReading = true;
    this.isPaused = false;

    try {
      console.log('📚 Starting automatic lesson reading...');
      await this.voiceManager.initialize();

      const sections = this.prepareLessonSections(content);
      
      for (let i = 0; i < sections.length; i++) {
        if (!this.isReading || this.isPaused) break;

        const section = sections[i];
        this.currentSection = section.name;

        this.updateProgress({
          currentSection: section.name,
          progress: (i / sections.length) * 100,
          totalSections: sections.length,
          isReading: true,
          currentText: section.text
        });

        console.log(`🎤 Reading section: ${section.name}`);
        await this.readSection(section);

        // Brief pause between sections
        if (i < sections.length - 1 && this.isReading) {
          await this.pause(800);
        }
      }

      if (this.isReading) {
        console.log('✅ Lesson reading completed successfully');
        this.updateProgress({
          currentSection: 'Completed',
          progress: 100,
          totalSections: sections.length,
          isReading: false,
          currentText: ''
        });
      }

    } catch (error) {
      console.error('❌ Error during lesson reading:', error);
    } finally {
      this.isReading = false;
    }
  }

  /**
   * Read a specific section with language detection
   */
  private async readSection(section: { name: string; text: string; segments: LanguageSegment[] }): Promise<void> {
    for (const segment of section.segments) {
      if (!this.isReading || this.isPaused) break;

      try {
        console.log(`🌐 Reading ${segment.language} text: "${segment.text.substring(0, 50)}..."`);
        
        if (segment.language === 'tr') {
          // Turkish content - use Turkish voice
          await this.speakWithLanguage(segment.text, 'tr');
        } else {
          // English content - use consistent English voice
          await this.speakWithLanguage(segment.text, 'en');
        }

        // Brief pause between segments
        if (this.isReading) {
          await this.pause(300);
        }

      } catch (error) {
        console.error(`❌ Error reading segment in ${segment.language}:`, error);
        // Continue with next segment instead of failing completely
      }
    }
  }

  /**
   * Speak text with specific language
   */
  private async speakWithLanguage(text: string, language: 'en' | 'tr'): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Configure with forced language
        const success = this.voiceManager.configureUtterance(utterance, text, language);
        if (!success) {
          console.warn(`⚠️ Failed to configure ${language} voice, using fallback`);
        }

        utterance.onend = () => resolve();
        utterance.onerror = (event) => reject(new Error(event.error));

        // Ensure any previous speech is cancelled
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);

      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Prepare lesson content into readable sections
   */
  private prepareLessonSections(content: LessonContent): Array<{ name: string; text: string; segments: LanguageSegment[] }> {
    const sections = [];

    // 1. Title
    if (content.title) {
      sections.push({
        name: 'Title',
        text: content.title,
        segments: segmentMixedContent(content.title)
      });
    }

    // 2. Description
    if (content.description) {
      sections.push({
        name: 'Description',
        text: content.description,
        segments: segmentMixedContent(content.description)
      });
    }

    // 3. Introduction/Main Content
    if (content.intro) {
      sections.push({
        name: 'Introduction',
        text: content.intro,
        segments: segmentMixedContent(content.intro)
      });
    }

    // 4. Grammar Tip
    if (content.tip) {
      sections.push({
        name: 'Grammar Tip',
        text: `Grammar tip: ${content.tip}`,
        segments: segmentMixedContent(`Grammar tip: ${content.tip}`)
      });
    }

    // 5. Table/Examples (if any)
    if (content.table && content.table.length > 0) {
      const tableText = this.formatTableForSpeech(content.table);
      if (tableText) {
        sections.push({
          name: 'Examples Table',
          text: tableText,
          segments: segmentMixedContent(tableText)
        });
      }
    }

    // 6. Listening Examples
    if (content.listeningExamples && content.listeningExamples.length > 0) {
      const examplesText = `Here are some listening examples: ${content.listeningExamples.slice(0, 3).join('. ')}.`;
      sections.push({
        name: 'Listening Examples',
        text: examplesText,
        segments: segmentMixedContent(examplesText)
      });
    }

    return sections;
  }

  /**
   * Format table data for speech
   */
  private formatTableForSpeech(table: Array<any>): string {
    if (!table || table.length === 0) return '';

    try {
      // Handle different table formats
      if (table[0].structure && table[0].example) {
        // Grammar structure table
        return table.slice(0, 3).map(row => 
          `${row.structure}: ${row.example}`
        ).join('. ') + '.';
      } else if (table[0].adverb && table[0].meaning && table[0].example) {
        // Adverb table with Turkish meanings
        return table.slice(0, 4).map(row => 
          `${row.adverb} means ${row.meaning}. For example: ${row.example}`
        ).join('. ') + '.';
      } else if (table[0].type && table[0].form && table[0].example) {
        // Grammar form table (Turkish labels)
        return table.slice(0, 3).map(row => 
          `${row.type}: ${row.form}. Example: ${row.example}`
        ).join('. ') + '.';
      }

      // Generic fallback
      return '';
    } catch (error) {
      console.warn('⚠️ Error formatting table for speech:', error);
      return '';
    }
  }

  /**
   * Update reading progress
   */
  private updateProgress(progress: ReadingProgress): void {
    if (this.progressCallback) {
      this.progressCallback(progress);
    }
  }

  /**
   * Pause for specified milliseconds
   */
  private pause(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Stop reading
   */
  stop(): void {
    console.log('🛑 Stopping lesson reading');
    this.isReading = false;
    this.isPaused = false;
    speechSynthesis.cancel();
    
    this.updateProgress({
      currentSection: 'Stopped',
      progress: 0,
      totalSections: 0,
      isReading: false,
      currentText: ''
    });
  }

  /**
   * Pause reading
   */
  pauseReading(): void {
    console.log('⏸️ Pausing lesson reading');
    this.isPaused = true;
    speechSynthesis.pause();
  }

  /**
   * Resume reading
   */
  resumeReading(): void {
    console.log('▶️ Resuming lesson reading');
    this.isPaused = false;
    speechSynthesis.resume();
  }

  /**
   * Check if currently reading
   */
  isCurrentlyReading(): boolean {
    return this.isReading;
  }

  /**
   * Get current section
   */
  getCurrentSection(): string {
    return this.currentSection;
  }
}

/**
 * Convenience function for quick lesson reading
 */
export async function readLessonContentAuto(
  content: LessonContent, 
  onProgress?: ReadingProgressCallback
): Promise<void> {
  const reader = new LessonAutoReader(onProgress);
  await reader.readLessonContent(content);
}

/**
 * Test the auto-reader with sample content
 */
export function testAutoReader() {
  const sampleContent: LessonContent = {
    title: "Module 1: Verb To Be (am, is, are) - Positive Sentences",
    description: "Learn to form and use affirmative sentences with the verb 'to be'",
    intro: `Bu modülde İngilizcede 'am, is, are' kullanarak olumlu cümleler kurmayı öğreneceğiz.

    Use:
    - 'am' with I
    - 'is' with he/she/it  
    - 'are' with we/you/they

    Example Sentences:
    - I am a teacher.
    - She is happy.
    - They are students.`,
    tip: "Use 'am' with I, 'is' with he/she/it, and 'are' with we/you/they",
    listeningExamples: [
      "I am a teacher.",
      "She is happy.",
      "They are students."
    ]
  };

  console.log('🧪 Testing auto-reader with sample content...');
  readLessonContentAuto(sampleContent, (progress) => {
    console.log(`📊 Progress: ${progress.progress.toFixed(1)}% - ${progress.currentSection}`);
  });
}

// Export test function for browser console
if (typeof window !== 'undefined') {
  (window as any).testAutoReader = testAutoReader;
}