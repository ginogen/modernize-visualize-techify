
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircuitBoard, Key, Mail, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);
  const [adminCreated, setAdminCreated] = useState<{ email: string, password: string } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateAdmin = async () => {
    try {
      setIsCreatingAdmin(true);
      
      const response = await fetch(
        "https://vlkcjmhppcwfcgnwjbvc.supabase.co/functions/v1/create-admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Error al crear usuario administrador");
      }
      
      setAdminCreated({
        email: data.email,
        password: data.password
      });
      
      toast({
        title: "Administrador creado",
        description: "El usuario administrador ha sido creado exitosamente.",
      });
    } catch (error: any) {
      console.error("Error creating admin:", error);
      toast({
        title: "Error",
        description: error.message || "No se pudo crear el usuario administrador.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingAdmin(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      navigate("/");
      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente.",
      });
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-flex justify-center items-center mb-5">
              <CircuitBoard className="h-8 w-8 text-neonGreen mr-2" />
              <span className="text-2xl font-mono font-semibold text-gradient">Builders AI</span>
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold">
              Iniciar sesión
            </h2>
          </div>

          {adminCreated && (
            <div className="mb-8 p-4 border border-green-500 bg-green-50 dark:bg-green-900/20 rounded-md">
              <h3 className="text-lg font-semibold mb-2">¡Usuario administrador creado!</h3>
              <p><strong>Email:</strong> {adminCreated.email}</p>
              <p><strong>Contraseña:</strong> {adminCreated.password}</p>
              <p className="text-sm mt-2 text-yellow-600 dark:text-yellow-400">
                ¡Guarde estos datos! No se mostrarán nuevamente.
              </p>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only">
                  Correo electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-neonGreen focus:border-neonGreen"
                    placeholder="Correo electrónico"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-neonGreen focus:border-neonGreen"
                    placeholder="Contraseña"
                  />
                </div>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                disabled={loading}
              >
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿No tienes credenciales? Contacta con el administrador
            </p>
          </div>
          
          <div className="mt-6 text-center">
            <Button 
              onClick={handleCreateAdmin}
              disabled={isCreatingAdmin}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              {isCreatingAdmin ? "Creando..." : "Crear Admin"}
            </Button>
            <p className="mt-2 text-xs text-gray-500">
              Este botón crea un usuario administrador con correo hola@builders-ai.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
