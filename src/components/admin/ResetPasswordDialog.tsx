import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, Check, Copy, RefreshCw, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { createClient } from "@supabase/supabase-js";

interface ResetPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientEmail: string;
  clientName: string;
}

const ResetPasswordDialog = ({
  open,
  onOpenChange,
  clientEmail,
  clientName
}: ResetPasswordDialogProps) => {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Generar una contraseña aleatoria cuando se abre el diálogo
  useEffect(() => {
    if (open) {
      generateRandomPassword();
    }
  }, [open]);

  const generateRandomPassword = () => {
    // Generar una contraseña aleatoria de 10 caracteres
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    const length = 10;
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    setNewPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newPassword).then(() => {
      toast({
        title: "Copiado",
        description: "Contraseña copiada al portapapeles",
      });
    }).catch(err => {
      console.error('Error al copiar: ', err);
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = async () => {
    try {
      setError(null);

      // Validar que la contraseña no esté vacía
      if (!newPassword || newPassword.trim() === '') {
        setError("La contraseña no puede estar vacía");
        return;
      }

      // Validar que la contraseña tenga al menos 6 caracteres
      if (newPassword.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        return;
      }

      setIsSubmitting(true);

      // Obtener el token de autenticación actual
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("No hay sesión de usuario activa");
      }

      // Crear un cliente de Supabase con la URL pública y la clave anónima
      const supabaseUrl = "https://vlkcjmhppcwfcgnwjbvc.supabase.co";
      const supabaseKey = session.access_token;
      const adminClient = createClient(supabaseUrl, supabaseKey);

      // Obtener todos los usuarios para encontrar el ID del cliente
      const { data: adminData, error: adminError } = await adminClient.functions.invoke('admin-get-user-by-email', {
        body: { email: clientEmail }
      });

      if (adminError || !adminData || !adminData.userId) {
        throw new Error(adminError?.message || "No se pudo encontrar al usuario");
      }

      const userId = adminData.userId;

      // Actualizar la contraseña del usuario
      const { error: resetError } = await adminClient.functions.invoke('admin-update-user-password', {
        body: { 
          userId: userId,
          newPassword: newPassword
        }
      });

      if (resetError) {
        throw new Error(resetError.message || "Error al cambiar la contraseña");
      }

      toast({
        title: "Contraseña actualizada",
        description: `La contraseña de ${clientName} ha sido actualizada correctamente.`,
      });

      // No limpiamos la contraseña para que el admin pueda copiarla si lo necesita
      // setNewPassword("");
      
      // No cerramos el diálogo para que el admin pueda copiar la contraseña
      // onOpenChange(false);
    } catch (error: any) {
      console.error("Error al cambiar la contraseña:", error);
      setError(error.message || "Ocurrió un error al cambiar la contraseña");
      toast({
        title: "Error",
        description: "No se pudo cambiar la contraseña del cliente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cambiar contraseña</DialogTitle>
          <DialogDescription>
            Generar nueva contraseña para {clientName} ({clientEmail})
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="new-password">Nueva contraseña</Label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pr-10"
                  disabled={isSubmitting}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={generateRandomPassword}
                disabled={isSubmitting}
                title="Generar nueva contraseña"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={copyToClipboard}
                disabled={isSubmitting}
                title="Copiar contraseña"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              La contraseña debe tener al menos 6 caracteres. Copia esta contraseña antes de cerrar para compartirla con el cliente.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cerrar
          </Button>
          <Button onClick={handleResetPassword} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Aplicando...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Cambiar contraseña
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordDialog; 