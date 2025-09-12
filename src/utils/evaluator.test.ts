import { describe, it, expect } from 'vitest';
import { normalize, evaluateAnswer, type EvalOptions } from './evaluator';

describe('evaluator', () => {
  describe('normalize function', () => {
    it('converts text to lowercase', () => {
      expect(normalize('HELLO WORLD')).toBe('hello world');
      expect(normalize('Hello World')).toBe('hello world');
    });

    it('normalizes apostrophes', () => {
      expect(normalize("I'm")).toBe("i'm");
      expect(normalize("I'm")).toBe("i'm");
      expect(normalize("I`m")).toBe("i'm");
      expect(normalize("Iˈm")).toBe("i'm");
    });

    it('normalizes quotation marks', () => {
      expect(normalize('"Hello"')).toBe('"hello"');
      expect(normalize('"Hello"')).toBe('"hello"');
    });

    it('removes punctuation and replaces with spaces', () => {
      expect(normalize('Hello, world!')).toBe('hello world');
      expect(normalize('Yes? No.')).toBe('yes no');
      expect(normalize('(Hello); world:')).toBe('hello world');
    });

    it('normalizes whitespace', () => {
      expect(normalize('hello    world')).toBe('hello world');
      expect(normalize('  hello  world  ')).toBe('hello world');
      expect(normalize('\n\thello\tworld\n')).toBe('hello world');
    });

    it('handles complex combinations', () => {
      expect(normalize('  Hello,   "world"!  ')).toBe('hello world');
      expect(normalize("I'm   here;   aren't you?")).toBe("i'm here aren't you");
    });
  });

  describe('evaluateAnswer function', () => {
    describe('exact matching', () => {
      it('matches exact answers (case insensitive)', () => {
        const options: EvalOptions = { expected: 'Hello world' };
        
        expect(evaluateAnswer('Hello world', options)).toBe(true);
        expect(evaluateAnswer('hello world', options)).toBe(true);
        expect(evaluateAnswer('HELLO WORLD', options)).toBe(true);
      });

      it('matches accepted variants', () => {
        const options: EvalOptions = {
          expected: 'Hello',
          accepted: ['Hi', 'Hey there', 'Good morning']
        };
        
        expect(evaluateAnswer('Hello', options)).toBe(true);
        expect(evaluateAnswer('Hi', options)).toBe(true);
        expect(evaluateAnswer('hey there', options)).toBe(true);
        expect(evaluateAnswer('GOOD MORNING', options)).toBe(true);
        expect(evaluateAnswer('Goodbye', options)).toBe(false);
      });

      it('handles punctuation differences', () => {
        const options: EvalOptions = { expected: 'Hello, world!' };
        
        expect(evaluateAnswer('Hello world', options)).toBe(true);
        expect(evaluateAnswer('Hello, world!', options)).toBe(true);
        expect(evaluateAnswer('Hello; world.', options)).toBe(true);
      });
    });

    describe('contraction handling', () => {
      it('matches contractions with expanded forms', () => {
        const options: EvalOptions = { expected: "I'm happy" };
        
        expect(evaluateAnswer("I am happy", options)).toBe(true);
        expect(evaluateAnswer("I'm happy", options)).toBe(true);
      });

      it('matches various contractions', () => {
        const contractions = [
          { expanded: "You are nice", contracted: "You're nice" },
          { expanded: "He is tall", contracted: "He's tall" },
          { expanded: "She is smart", contracted: "She's smart" },
          { expanded: "We are ready", contracted: "We're ready" },
          { expanded: "They are here", contracted: "They're here" },
          { expanded: "I have not seen", contracted: "I haven't seen" },
          { expanded: "He does not know", contracted: "He doesn't know" },
          { expanded: "I will not go", contracted: "I won't go" },
        ];

        contractions.forEach(({ expanded, contracted }) => {
          const options: EvalOptions = { expected: expanded };
          expect(evaluateAnswer(contracted, options)).toBe(true);
          
          const options2: EvalOptions = { expected: contracted };
          expect(evaluateAnswer(expanded, options2)).toBe(true);
        });
      });
    });

    describe('polarity checking', () => {
      it('matches positive polarity correctly', () => {
        const options: EvalOptions = {
          expected: 'Yes, I am',
          requireAffirmationPolarity: true
        };
        
        expect(evaluateAnswer('Yes, I am', options)).toBe(true);
        expect(evaluateAnswer('Yeah, definitely', options)).toBe(true);
        expect(evaluateAnswer('Sure, of course', options)).toBe(true);
        expect(evaluateAnswer('Correct, that is right', options)).toBe(true);
      });

      it('rejects negative polarity when positive expected', () => {
        const options: EvalOptions = {
          expected: 'Yes, I am',
          requireAffirmationPolarity: true
        };
        
        expect(evaluateAnswer('No, I am not', options)).toBe(false);
        expect(evaluateAnswer('Nope, never', options)).toBe(false);
      });

      it('matches negative polarity correctly', () => {
        const options: EvalOptions = {
          expected: 'No, I am not',
          requireAffirmationPolarity: true
        };
        
        expect(evaluateAnswer('No, I am not', options)).toBe(true);
        expect(evaluateAnswer('Nope, not really', options)).toBe(true);
        expect(evaluateAnswer('No, negative', options)).toBe(true);
      });

      it('ignores polarity when not required', () => {
        const options: EvalOptions = {
          expected: 'I am a student',
          requireAffirmationPolarity: false
        };
        
        expect(evaluateAnswer('Yes, I am a student', options)).toBe(true);
        expect(evaluateAnswer('No, I am a student', options)).toBe(true);
      });
    });

    describe('key lemmas checking', () => {
      it('requires key lemmas to be present', () => {
        const options: EvalOptions = {
          expected: 'I am a student',
          keyLemmas: ['student']
        };
        
        expect(evaluateAnswer('I am a student', options)).toBe(true);
        expect(evaluateAnswer('Yes, I am a student here', options)).toBe(true);
        expect(evaluateAnswer('I am a teacher', options)).toBe(false);
      });

      it('handles plural/singular variations of key lemmas', () => {
        const options: EvalOptions = {
          expected: 'There are students',
          keyLemmas: ['student']
        };
        
        expect(evaluateAnswer('There are students', options)).toBe(true);
        expect(evaluateAnswer('There is a student', options)).toBe(true);
        expect(evaluateAnswer('The students are here', options)).toBe(true);
      });

      it('allows minor typos in key lemmas', () => {
        const options: EvalOptions = {
          expected: 'I am a student',
          keyLemmas: ['student']
        };
        
        expect(evaluateAnswer('I am a studnet', options)).toBe(true); // 1-char typo
        expect(evaluateAnswer('I am a studet', options)).toBe(true);  // 1-char deletion
        expect(evaluateAnswer('I am a studen', options)).toBe(true);  // 1-char deletion
      });

      it('rejects answers missing required key lemmas', () => {
        const options: EvalOptions = {
          expected: 'I work in a hospital',
          keyLemmas: ['hospital']
        };
        
        expect(evaluateAnswer('I work in an office', options)).toBe(false);
        expect(evaluateAnswer('I am at home', options)).toBe(false);
      });

      it('handles multiple key lemmas', () => {
        const options: EvalOptions = {
          expected: 'The student studies in the library',
          keyLemmas: ['student', 'library']
        };
        
        expect(evaluateAnswer('The student studies in the library', options)).toBe(true);
        expect(evaluateAnswer('A student is studying at the library', options)).toBe(true);
        expect(evaluateAnswer('The student studies at home', options)).toBe(false);
        expect(evaluateAnswer('Someone studies in the library', options)).toBe(false);
      });
    });

    describe('fuzzy token matching', () => {
      it('matches with high token overlap', () => {
        const options: EvalOptions = { expected: 'I am a good student' };
        
        expect(evaluateAnswer('I am a good student', options)).toBe(true);
        expect(evaluateAnswer('I am good student', options)).toBe(true); // Missing 'a'
        expect(evaluateAnswer('I am a great student', options)).toBe(true); // 'good' -> 'great'
      });

      it('allows minor typos in tokens', () => {
        const options: EvalOptions = { expected: 'The quick brown fox' };
        
        expect(evaluateAnswer('The quik brown fox', options)).toBe(true); // 1-char typo
        expect(evaluateAnswer('The quick brwn fox', options)).toBe(true); // 1-char deletion
        expect(evaluateAnswer('The quick brownn fox', options)).toBe(true); // 1-char insertion
      });

      it('requires sufficient token overlap (90%)', () => {
        const options: EvalOptions = { expected: 'I am a very good student today' }; // 7 tokens
        
        // Should pass with 6/7 tokens (≥90%)
        expect(evaluateAnswer('I am a very good student yesterday', options)).toBe(true);
        
        // Should fail with only 4/7 tokens (<90%)
        expect(evaluateAnswer('I am a teacher today', options)).toBe(false);
      });

      it('filters out filler words', () => {
        const options: EvalOptions = { expected: 'I am a student' };
        
        expect(evaluateAnswer('Uh, well, I am, um, a student, sir', options)).toBe(true);
        expect(evaluateAnswer('Please teacher, I am a student', options)).toBe(true);
      });
    });

    describe('article and determiner handling', () => {
      it('ignores optional articles and determiners', () => {
        const options: EvalOptions = { expected: 'The student has a book' };
        
        expect(evaluateAnswer('Student has book', options)).toBe(true);
        expect(evaluateAnswer('A student has the book', options)).toBe(true);
        expect(evaluateAnswer('My student has our book', options)).toBe(true);
      });

      it('handles possessive pronouns', () => {
        const options: EvalOptions = { expected: 'This is my book' };
        
        expect(evaluateAnswer('This is book', options)).toBe(true);
        expect(evaluateAnswer('This is your book', options)).toBe(true);
        expect(evaluateAnswer('This is the book', options)).toBe(true);
      });
    });

    describe('edge cases', () => {
      it('returns false for empty user input', () => {
        const options: EvalOptions = { expected: 'Hello' };
        
        expect(evaluateAnswer('', options)).toBe(false);
        expect(evaluateAnswer('   ', options)).toBe(false);
      });

      it('handles empty expected answer', () => {
        const options: EvalOptions = { expected: '' };
        
        expect(evaluateAnswer('Hello', options)).toBe(false);
      });

      it('handles single-word answers', () => {
        const options: EvalOptions = { expected: 'Yes' };
        
        expect(evaluateAnswer('Yes', options)).toBe(true);
        expect(evaluateAnswer('Yeah', options)).toBe(true);
        expect(evaluateAnswer('No', options)).toBe(false);
      });

      it('handles very long answers', () => {
        const longExpected = 'I am a student who studies very hard every single day at the university';
        const longUserInput = 'I am a student who studies very hard every day at the university';
        const options: EvalOptions = { expected: longExpected };
        
        expect(evaluateAnswer(longUserInput, options)).toBe(true);
      });
    });

    describe('complex integration tests', () => {
      it('combines polarity, key lemmas, and fuzzy matching', () => {
        const options: EvalOptions = {
          expected: 'Yes, I am a student',
          requireAffirmationPolarity: true,
          keyLemmas: ['student'],
          accepted: ['Yes, I study here']
        };
        
        expect(evaluateAnswer('Yes, I am a student', options)).toBe(true);
        expect(evaluateAnswer('Yeah, I am student', options)).toBe(true); // Missing 'a'
        expect(evaluateAnswer('Yes, I study here', options)).toBe(true); // Accepted variant
        expect(evaluateAnswer('No, I am a student', options)).toBe(false); // Wrong polarity
        expect(evaluateAnswer('Yes, I am a teacher', options)).toBe(false); // Missing key lemma
      });

      it('handles real-world student responses', () => {
        const options: EvalOptions = {
          expected: 'I go to school by bus',
          accepted: ['I take the bus to school', 'I use public transport']
        };
        
        expect(evaluateAnswer('I go to school by bus', options)).toBe(true);
        expect(evaluateAnswer('I take the bus to school', options)).toBe(true);
        expect(evaluateAnswer('I use public transport', options)).toBe(true);
        expect(evaluateAnswer('I go school by bus', options)).toBe(true); // Missing 'to'
        expect(evaluateAnswer('I go to school with bus', options)).toBe(true); // 'by' -> 'with'
        expect(evaluateAnswer('I walk to school', options)).toBe(false); // Different transport
      });

      it('handles question-answer scenarios', () => {
        const options: EvalOptions = {
          expected: 'She is a doctor',
          keyLemmas: ['doctor']
        };
        
        expect(evaluateAnswer('She is a doctor', options)).toBe(true);
        expect(evaluateAnswer('She works as a doctor', options)).toBe(true);
        expect(evaluateAnswer('She is doctor', options)).toBe(true);
        expect(evaluateAnswer('A doctor she is', options)).toBe(true); // Different order
        expect(evaluateAnswer('She is a nurse', options)).toBe(false); // Wrong profession
      });
    });
  });
});