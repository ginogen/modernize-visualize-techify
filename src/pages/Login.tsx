
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, LogIn, CircuitBoard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error checking session:", error);
          return;
        }
        
        if (data.session) {
          console.log("Existing session found:", data.session.user.id);
          checkUserProfile(data.session.user.id);
        }
      } catch (err) {
        console.error("Exception checking session:", err);
      }
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        if (session) {
          await checkUserProfile(session.user.id);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
  
  const checkUserProfile = async (userId: string) => {
    try {
      console.log("Checking profile for user:", userId);
      
      // First try to get the profile using RPC to bypass RLS if there's any issue
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId);
      
      if (profileError) {
        console.error("Error fetching profile:", profileError);
        throw new Error("Error al obtener el perfil de usuario");
      }
      
      console.log("Profile query result:", profileData);
      
      if (!profileData || profileData.length === 0) {
        console.error("No profile found for user ID:", userId);
        
        // Debug: Check the ID in the profiles table directly with a count
        const { count, error: countError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('id', userId);
          
        console.log("Direct profile count:", count, "Error:", countError);
        
        // Debug: Check the users table structure
        const { data: sampleUser, error: sampleUserError } = await supabase.auth.getUser(userId);
        console.log("Sample user data:", sampleUser, "Error:", sampleUserError);
        
        // Notify the user about the missing profile
        toast({
          title: "Perfil no encontrado",
          description: "No se encontró un perfil asociado a este usuario. Por favor contacte al administrador.",
          variant: "destructive",
        });
        
        // Sign out the user since they don't have a profile
        await supabase.auth.signOut();
        return;
      }
      
      // Get the first profile (there should only be one)
      const profile = profileData[0];
      console.log("Using profile:", profile);
      
      // Store profile data and navigate
      sessionStorage.setItem("clientData", JSON.stringify(profile));
      
      toast({
        title: t("login.success"),
        description: t("login.welcome"),
      });
      
      navigate("/client-portal");
    } catch (error: any) {
      console.error("Error checking user profile:", error);
      toast({
        title: "Error de perfil",
        description: error.message || "Error al verificar el perfil de usuario",
        variant: "destructive",
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: t("form.incomplete"),
        description: t("form.incomplete.message"),
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log("Attempting login with email:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Login error:", error);
        throw error;
      }
      
      if (data.user) {
        console.log("User authenticated successfully. User ID:", data.user.id);
        // Don't do anything here - the auth state change event will handle checking the profile
      }
    } catch (error: any) {
      console.error("Error de inicio de sesión:", error);
      
      let errorMessage = t("login.problem");
      
      if (error.message === "Invalid login credentials") {
        errorMessage = t("invalid.credentials");
      } else if (error.message?.includes("Email not confirmed")) {
        errorMessage = "Por favor, confirme su correo electrónico para continuar";
      }
      
      toast({
        title: t("login.error"),
        description: errorMessage,
        variant: "destructive",
      });
      
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="py-4 px-6 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl md:text-2xl font-mono font-semibold"
          >
            <CircuitBoard className="text-neonGreen h-7 w-7 animate-pulse-soft" />
            <span className="text-gradient">Builders AI</span>
          </Link>
        </div>
      </header>
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">{t("client.portal")}</CardTitle>
            <CardDescription>
              {t("client.portal.description")}
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("email.placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("logging.in")}
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    {t("login")}
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default Login;
