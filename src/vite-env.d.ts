
/// <reference types="vite/client" />

declare global {
  interface Window {
    vapi: {
      start: (assistantId: string) => void;
      stop: () => void;
    };
  }
}

export {};
