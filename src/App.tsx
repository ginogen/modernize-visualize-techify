import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import Index from "./pages/Index";
import Login from "./pages/Login";
import ClientPortal from "./pages/ClientPortal";
import Onboarding from "./pages/Onboarding";
import AdminDashboard from "./pages/admin/Dashboard";
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast";
import { supabase } from './integrations/supabase/client';
import RegisterAdmin from "./pages/RegisterAdmin";

function App() {
  const { toast } = useToast();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/client-portal" element={
            session ? (
              <ClientPortal />
            ) : (
              <>
                {toast({
                  title: "Acceso denegado",
                  description: "Por favor, inicia sesión para acceder al portal.",
                })}
                <Navigate to="/login" replace />
              </>
            )
          } />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Add the RegisterAdmin route */}
          <Route path="/register-admin" element={<RegisterAdmin />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
