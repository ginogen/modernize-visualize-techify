
import React, { useState, useRef, useEffect } from "react";
import { Send, Download, Edit2, Check, X, EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ChatMessage from "./ChatMessage";
import { Message, MessageRole } from "./types";
import { initialMessages, generateResponse } from "./chatUtils";

const ChatInterface: React.FC = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState<string | null>(null);
  const [editingDoc, setEditingDoc] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus textarea when it's rendered
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: MessageRole.USER,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Generate AI response
      const responseContent = await generateResponse(
        [...messages, userMessage], 
        userMessage.content
      );
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: MessageRole.ASSISTANT,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Check if we have enough information to generate a document
      const hasEnoughInfo = messages.length > 10; // Simple heuristic, can be improved
      
      if (hasEnoughInfo && !generatedDoc) {
        generateDocument([...messages, userMessage, assistantMessage]);
      }
      
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al generar la respuesta. Intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const generateDocument = (chatMessages: Message[]) => {
    // This would be replaced with a more sophisticated document generation
    const customerInfo = chatMessages
      .filter(msg => msg.role === MessageRole.USER)
      .map(msg => msg.content)
      .join("\n\n");
      
    const assistantInsights = chatMessages
      .filter(msg => msg.role === MessageRole.ASSISTANT)
      .map(msg => msg.content)
      .join("\n\n");
    
    const doc = `
# Especificaciones del Chatbot

## Información del Cliente
${customerInfo}

## Recomendaciones y Aclaraciones del Asistente
${assistantInsights}

## Requisitos Identificados
- Sistema principal: [Identificar de las conversaciones]
- Tono de comunicación: [Identificar de las conversaciones]
- Procesos principales: [Identificar de las conversaciones]
- Integraciones necesarias: [Identificar de las conversaciones]

## Siguiente Pasos
1. Revisión de especificaciones
2. Desarrollo de prototipos
3. Implementación y pruebas
4. Lanzamiento
`;

    setGeneratedDoc(doc);
    setEditingDoc(doc);
    
    toast({
      title: "Documento Generado",
      description: "Se ha creado un documento con la información recopilada.",
    });
  };

  const handleDownloadDocument = () => {
    if (!generatedDoc) return;

    const blob = new Blob([isEditing ? editingDoc : generatedDoc], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "especificaciones-chatbot.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Documento Descargado",
      description: "El documento se ha descargado exitosamente.",
    });
  };

  const handleSaveEdit = () => {
    setGeneratedDoc(editingDoc);
    setIsEditing(false);
    toast({
      title: "Documento Actualizado",
      description: "Los cambios han sido guardados.",
    });
  };

  const handleCancelEdit = () => {
    setEditingDoc(generatedDoc || "");
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <Card className="flex flex-col h-full shadow-md border-0">
        <CardHeader className="border-b bg-muted/20">
          <CardTitle className="text-xl flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Asistente de Definición de Chatbot
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-grow overflow-hidden p-0 flex flex-col">
          {/* Chat Messages */}
          {!generatedDoc ? (
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {loading && (
                <div className="flex justify-center my-2">
                  <div className="loader"></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto p-4">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Documento Generado</h3>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button
                        size="sm" 
                        onClick={handleSaveEdit}
                        className="flex items-center gap-1"
                      >
                        <Check className="h-4 w-4" />
                        Guardar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleCancelEdit}
                        className="flex items-center gap-1"
                      >
                        <X className="h-4 w-4" />
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-1"
                      >
                        <Edit2 className="h-4 w-4" />
                        Editar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleDownloadDocument}
                        className="flex items-center gap-1"
                      >
                        <Download className="h-4 w-4" />
                        Descargar
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              {isEditing ? (
                <Textarea
                  className="min-h-[500px] font-mono text-sm"
                  value={editingDoc}
                  onChange={(e) => setEditingDoc(e.target.value)}
                />
              ) : (
                <div className="whitespace-pre-wrap bg-muted/10 p-4 rounded-md font-mono text-sm">
                  {generatedDoc}
                </div>
              )}
            </div>
          )}
          
          {/* Message Input */}
          {!generatedDoc && (
            <CardFooter className="border-t p-4">
              <form onSubmit={handleSendMessage} className="w-full flex gap-2">
                <Textarea
                  ref={textareaRef}
                  className="flex-grow resize-none"
                  placeholder="Explique los detalles de su negocio y cómo desea que funcione su chatbot..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  disabled={loading}
                  rows={2}
                />
                <Button 
                  type="submit" 
                  disabled={loading || !input.trim()}
                  className="h-full"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          )}
        </CardContent>
      </Card>
      
      {/* CSS for loading animation */}
      <style jsx>{`
        .loader {
          width: 24px;
          height: 24px;
          border: 3px solid #e2e8f0;
          border-radius: 50%;
          border-top-color: #3b82f6;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ChatInterface;
