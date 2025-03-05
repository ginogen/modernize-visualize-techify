
import React, { useState, useRef, useEffect } from "react";
import { Send, Download, Edit2, Check, X, EyeOff, Eye, Mic, Phone, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ChatMessage from "./ChatMessage";
import { Message, MessageRole, MessageType, availableVoices } from "./types";
import { initialMessages, generateResponse } from "./chatUtils";

const ChatInterface: React.FC = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState<string | null>(null);
  const [editingDoc, setEditingDoc] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(availableVoices[0].id);
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState("");
  const [openAIApiKey, setOpenAIApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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

  // Save API keys to localStorage
  useEffect(() => {
    const savedElevenLabsKey = localStorage.getItem('elevenLabsApiKey');
    const savedOpenAIKey = localStorage.getItem('openAIApiKey');
    
    if (savedElevenLabsKey) {
      setElevenLabsApiKey(savedElevenLabsKey);
    }
    
    if (savedOpenAIKey) {
      setOpenAIApiKey(savedOpenAIKey);
    }
    
    // Show API key dialog if keys are not set
    if (!savedElevenLabsKey || !savedOpenAIKey) {
      setApiKeyDialogOpen(true);
    }
  }, []);

  const saveApiKeys = () => {
    if (elevenLabsApiKey) {
      localStorage.setItem('elevenLabsApiKey', elevenLabsApiKey);
    }
    
    if (openAIApiKey) {
      localStorage.setItem('openAIApiKey', openAIApiKey);
    }
    
    setApiKeyDialogOpen(false);
    
    toast({
      title: "Claves API guardadas",
      description: "Las claves API se han guardado correctamente.",
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: MessageRole.USER,
      timestamp: new Date().toISOString(),
      type: MessageType.TEXT
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Generate AI response
      const responseContent = await generateResponse(
        [...messages, userMessage], 
        userMessage.content,
        openAIApiKey
      );
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: MessageRole.ASSISTANT,
        timestamp: new Date().toISOString(),
        type: MessageType.TEXT
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Check if we have enough information to generate a document
      const hasEnoughInfo = messages.length > 10; // Simple heuristic, can be improved
      
      if (hasEnoughInfo && !generatedDoc) {
        generateDocument([...messages, userMessage, assistantMessage]);
      }

      // Convert response to speech if audio is enabled
      if (audioEnabled && elevenLabsApiKey) {
        await convertTextToSpeech(responseContent);
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

  const convertTextToSpeech = async (text: string) => {
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": elevenLabsApiKey,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Error converting text to speech");
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Play the audio
      const audio = new Audio(audioUrl);
      audio.play();
      
      // Update the last message to include audio URL
      setMessages(prev => {
        const updated = [...prev];
        const lastMessage = updated[updated.length - 1];
        lastMessage.audioUrl = audioUrl;
        return updated;
      });
      
    } catch (error) {
      console.error("Error converting text to speech:", error);
      toast({
        title: "Error de Audio",
        description: "Hubo un problema al convertir texto a voz. Verifique su clave API.",
        variant: "destructive",
      });
    }
  };
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Create temporary audio message
        const audioMessage: Message = {
          id: Date.now().toString(),
          content: "Procesando mensaje de audio...",
          role: MessageRole.USER,
          timestamp: new Date().toISOString(),
          type: MessageType.AUDIO,
          audioUrl
        };
        
        setMessages(prev => [...prev, audioMessage]);
        
        // Process audio with OpenAI Whisper or similar service
        try {
          // Here we would send the audio to OpenAI for transcription
          // For now, we'll simulate this with a timeout
          setLoading(true);
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Simulated transcription
          const transcription = "Este es un mensaje transcrito de audio simulado para demostración.";
          
          // Update the audio message with transcription
          setMessages(prev => {
            const updated = [...prev];
            const lastMessage = updated[updated.length - 1];
            lastMessage.content = transcription;
            return updated;
          });
          
          // Now generate AI response to the transcribed message
          await handleAudioResponse(transcription);
        } catch (error) {
          console.error("Error processing audio:", error);
          toast({
            title: "Error de Audio",
            description: "Hubo un problema al procesar el audio. Intente nuevamente.",
            variant: "destructive",
          });
          setLoading(false);
        }
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Grabando Audio",
        description: "Hable claramente y presione el botón nuevamente para detener.",
      });
    } catch (error) {
      console.error("Error starting recording:", error);
      toast({
        title: "Error de Micrófono",
        description: "No se pudo acceder al micrófono. Verifique los permisos.",
        variant: "destructive",
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Close audio track to release microphone
      const stream = mediaRecorderRef.current.stream;
      const tracks = stream.getAudioTracks();
      tracks.forEach(track => track.stop());
    }
  };
  
  const handleAudioResponse = async (transcription: string) => {
    try {
      // Generate AI response to the transcribed audio
      const responseContent = await generateResponse(
        [...messages], 
        transcription,
        openAIApiKey
      );
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: MessageRole.ASSISTANT,
        timestamp: new Date().toISOString(),
        type: MessageType.TEXT
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Check if we have enough information to generate a document
      const hasEnoughInfo = messages.length > 10;
      
      if (hasEnoughInfo && !generatedDoc) {
        generateDocument([...messages, assistantMessage]);
      }

      // Convert response to speech if audio is enabled
      if (audioEnabled && elevenLabsApiKey) {
        await convertTextToSpeech(responseContent);
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
  
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
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
      <Dialog open={apiKeyDialogOpen} onOpenChange={setApiKeyDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Configurar Claves API</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="elevenLabsKey" className="col-span-4">
                ElevenLabs API Key
              </Label>
              <div className="relative col-span-4">
                <input
                  id="elevenLabsKey"
                  type={showApiKeyInput ? "text" : "password"}
                  className="w-full border rounded-md p-2 pr-10"
                  value={elevenLabsApiKey}
                  onChange={(e) => setElevenLabsApiKey(e.target.value)}
                  placeholder="Ingrese su clave API de ElevenLabs"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                >
                  {showApiKeyInput ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="openaiKey" className="col-span-4">
                OpenAI API Key
              </Label>
              <div className="relative col-span-4">
                <input
                  id="openaiKey"
                  type={showApiKeyInput ? "text" : "password"}
                  className="w-full border rounded-md p-2 pr-10"
                  value={openAIApiKey}
                  onChange={(e) => setOpenAIApiKey(e.target.value)}
                  placeholder="Ingrese su clave API de OpenAI"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                >
                  {showApiKeyInput ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={saveApiKeys}>Guardar</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Card className="flex flex-col h-full shadow-md border-0">
        <CardHeader className="border-b bg-muted/20">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Asistente de Definición de Chatbot
            </CardTitle>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="audio-toggle" className="text-sm">Audio</Label>
                <Switch 
                  id="audio-toggle" 
                  checked={audioEnabled} 
                  onCheckedChange={setAudioEnabled} 
                />
              </div>
              {audioEnabled && (
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Seleccionar voz" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVoices.map(voice => (
                      <SelectItem key={voice.id} value={voice.id}>{voice.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setApiKeyDialogOpen(true)}
              >
                Configurar API
              </Button>
            </div>
          </div>
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
                  disabled={loading || isRecording}
                  rows={2}
                />
                <div className="flex flex-col gap-2">
                  <Button 
                    type="button" 
                    onClick={toggleRecording} 
                    disabled={loading}
                    className={`h-10 ${isRecording ? 'bg-red-500 hover:bg-red-600' : ''}`}
                    variant={isRecording ? "default" : "outline"}
                  >
                    {isRecording ? <X className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading || isRecording || !input.trim()}
                    className="h-10"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardFooter>
          )}
        </CardContent>
      </Card>
      
      <style>
        {`
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
        `}
      </style>
    </div>
  );
};

export default ChatInterface;
