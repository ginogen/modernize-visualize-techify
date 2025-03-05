
import React from "react";
import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Message, MessageRole } from "./types";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === MessageRole.USER;
  
  return (
    <div
      className={cn(
        "flex gap-3 max-w-full", 
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
          <Bot className="h-5 w-5 text-primary" />
        </div>
      )}
      
      <div
        className={cn(
          "rounded-lg py-2 px-3 max-w-[80%]",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted/30 text-foreground"
        )}
      >
        <div className="whitespace-pre-wrap break-words">{message.content}</div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-primary-foreground" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
