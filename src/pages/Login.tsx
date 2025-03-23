
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
    // Clear any existing session first to ensure a clean state
    const checkSession = async () => {
      try {
        console.log("Checking current session...");
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Error checking session:", sessionError);
          return;
        }
        
        if (sessionData?.session) {
          console.log("Existing session found:", sessionData.session.user.id);
          await checkUserProfile(sessionData.session.user.id);
        } else {
          console.log("No existing session found");
        }
      } catch (err) {
        console.error("Exception checking session:", err);
      }
    };
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        
        if (event === 'SIGNED_IN' && session) {
          await checkUserProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          // Clear any stored profile data
          sessionStorage.removeItem("clientData");
        }
      }
    );
    
    checkSession();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
  
  const checkUserProfile = async (userId: string) => {
    try {
      console.log("Checking profile for user:", userId);
      
      // Direct query with no filters to check if profiles table has data
      const { data: allProfiles, error: allProfilesError } = await supabase
        .from('profiles')
        .select('*')
        .limit(5);
        
      if (allProfilesError) {
        console.error("Error fetching sample profiles:", allProfilesError);
      } else {
        console.log("Sample profiles in database:", allProfiles);
      }
      
      // Try to get the specific profile for this user
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId);
      
      console.log("Profile query result:", profileData);
      
      if (profileError) {
        console.error("Error fetching profile:", profileError);
        throw new Error("Error al obtener el perfil de usuario");
      }
      
      if (!profileData || profileData.length === 0) {
        console.error("No profile found for user ID:", userId);
        
        // Sign out the user since they don't have a profile
        await supabase.auth.signOut();
        
        toast({
          title: "Perfil no encontrado",
          description: "No se encontró un perfil asociado a este usuario. Por favor contacte al administrador.",
          variant: "destructive",
        });
        
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
      setIsLoading(false);
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
        // The auth state change event will handle profile checking
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
