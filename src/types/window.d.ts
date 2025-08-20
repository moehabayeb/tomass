declare global {
  interface Window {
    heygenSpeak?: (text: string) => void;
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
    SpeechGrammarList?: any;
    webkitSpeechGrammarList?: any;
  }

  interface SpeechRecognitionResult {
    transcript: string;
    confidence: number;
  }

  interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
  }

  interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
    resultIndex: number;
  }

  interface SpeechRecognition {
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;
    continuous: boolean;
    grammars?: any;
    start(): void;
    stop(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: any) => void;
    onend: () => void;
  }
}

export {};