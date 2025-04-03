import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Cloud, CheckCircle } from "lucide-react";

export const GoogleDriveAuth = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Verificar estado de autenticación al cargar
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/google-drive/status', {
        credentials: 'include'
      });
      const data = await response.json();
      setIsAuthenticated(data.isAuthenticated);
    } catch (error) {
      console.error('Error verificando estado de autenticación:', error);
    }
  };

  const handleAuth = async () => {
    try {
      setIsAuthenticating(true);
      
      // Obtener la URL de autenticación
      const response = await fetch('http://localhost:3001/auth/google');
      const data = await response.json();
      
      if (!data.authUrl) {
        throw new Error('No se pudo obtener la URL de autenticación');
      }
      
      // Configurar el manejador de mensajes antes de abrir la ventana
      const messageHandler = (event: MessageEvent) => {
        if (event.origin !== 'http://localhost:3001') return;
        
        if (event.data === 'auth_success') {
          setIsAuthenticated(true);
          toast({
            title: "Conexión exitosa",
            description: "Google Drive ha sido conectado correctamente",
          });
        } else if (event.data === 'auth_error') {
          toast({
            title: "Error",
            description: "No se pudo conectar con Google Drive",
            variant: "destructive",
          });
        }
        
        // Limpiar el manejador de mensajes
        window.removeEventListener('message', messageHandler);
        setIsAuthenticating(false);
      };
      
      window.addEventListener('message', messageHandler);
      
      // Abrir la autenticación en una nueva ventana
      const authWindow = window.open(data.authUrl, 'googleAuth', 'width=600,height=600,menubar=no,toolbar=no,location=no,status=no');
      
      if (!authWindow) {
        window.removeEventListener('message', messageHandler);
        setIsAuthenticating(false);
        toast({
          title: "Error",
          description: "El navegador bloqueó la ventana emergente. Por favor, permite las ventanas emergentes para este sitio.",
          variant: "destructive",
        });
        return;
      }
      
    } catch (error: any) {
      console.error('Error en autenticación:', error);
      toast({
        title: "Error",
        description: "No se pudo iniciar la autenticación con Google Drive",
        variant: "destructive",
      });
      setIsAuthenticating(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/google/revoke', {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        setIsAuthenticated(false);
        toast({
          title: "Desconexión exitosa",
          description: "Google Drive ha sido desconectado correctamente",
        });
      } else {
        throw new Error('Error al desconectar Google Drive');
      }
    } catch (error) {
      console.error('Error al desconectar:', error);
      toast({
        title: "Error",
        description: "No se pudo desconectar Google Drive",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant={isAuthenticated ? "outline" : "default"}
      onClick={isAuthenticated ? handleDisconnect : handleAuth}
      disabled={isAuthenticating}
      className="gap-2"
    >
      {isAuthenticated ? (
        <>
          <CheckCircle className="h-4 w-4" />
          Desconectar Google Drive
        </>
      ) : (
        <>
          <Cloud className="h-4 w-4" />
          {isAuthenticating ? "Conectando..." : "Conectar Google Drive"}
        </>
      )}
    </Button>
  );
}; 