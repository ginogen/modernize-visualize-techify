declare interface Window {
  fbq: {
    (command: 'init', pixelId: string): void;
    (command: 'track', eventName: string, parameters?: Record<string, any>): void;
  };
} 