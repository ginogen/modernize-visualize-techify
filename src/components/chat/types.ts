
export enum MessageRole {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system"
}

export enum MessageType {
  TEXT = "text",
  AUDIO = "audio"
}

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: string;
  type?: MessageType;
  audioUrl?: string;
}

export interface ElevenLabsVoice {
  id: string;
  name: string;
}

export const availableVoices: ElevenLabsVoice[] = [
  { id: "9BWtsMINqrJLrRacOk9x", name: "Aria" },
  { id: "CwhRBWXzGAHq8TQ4Fs17", name: "Roger" },
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah" },
  { id: "IKne3meq5aSn9XLyUdCD", name: "Charlie" }
];
