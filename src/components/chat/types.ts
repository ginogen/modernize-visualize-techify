
export enum MessageRole {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system"
}

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: string;
}
