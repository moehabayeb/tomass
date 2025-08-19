declare global {
  interface Window {
    heygenSpeak?: (text: string) => void;
  }
}

export {};