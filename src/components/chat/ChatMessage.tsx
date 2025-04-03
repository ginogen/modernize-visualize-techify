
import React from "react";
import { User, Bot, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Message, MessageRole, MessageType } from "./types";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === MessageRole.USER;
  const hasAudio = message.audioUrl && message.type === MessageType.AUDIO;
  
  const playAudio = () => {
    if (message.audioUrl) {
      const audio = new Audio(message.audioUrl);
      audio.play();
    }
  };
  
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
        
        {message.audioUrl && (
          <div className="mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={playAudio}
              className="h-6 p-1 text-xs flex items-center gap-1"
            >
              <Volume2 className="h-3 w-3" />
              {hasAudio ? "Reproducir audio" : "Escuchar respuesta"}
            </Button>
          </div>
        )}
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
