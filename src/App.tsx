import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import CustomSoftware from "./pages/ServiceDetail/CustomSoftware";
import AIChatbots from "./pages/ServiceDetail/AIChatbots";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail";
import About from "./pages/About";
import Capacitacion from "./pages/Capacitacion";
import Onboarding from "./pages/Onboarding";
import ClientPortal from "./pages/ClientPortal";
import ChatbotDefinition from "./pages/ChatbotDefinition";
import Login from "./pages/Login";
import RegisterAdmin from "./pages/RegisterAdmin";
import AdminDashboard from "./pages/admin/Dashboard";
import CreateProposal from "./pages/admin/CreateProposal";
import EditProposal from "./pages/admin/EditProposal";
import Proposal from "./pages/Proposal";
import BotIABonificado from "./pages/BotIABonificado";
import PropuestaBot from "./pages/PropuestaBot";
import WebinarAgenteIA from "./routes/webinar-agente-ia";
import { TrackerLayout } from "./components/TrackerLayout";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TrackerProvider } from './contexts/TrackerContext';
import LoginPage from './pages/LoginPage';

const queryClient = new QueryClient();

// Componente para proteger rutas y manejar redirecciones según rol
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      
      setIsAuthenticated(true);
      
      // Obtener datos del usuario desde sessionStorage o desde Supabase
      const savedData = sessionStorage.getItem("clientData");
      
      if (savedData) {
        const userData = JSON.parse(savedData);
        setUserRole(userData.role);
      } else {
        try {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
            
          if (profileData) {
            setUserRole(profileData.role);
            // No guardamos en sessionStorage aquí para evitar datos parciales
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, [navigate, location.pathname]);
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>;
  }
  
  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Si la ruta requiere un rol específico y el usuario no tiene ese rol
  if (requiredRole && userRole !== requiredRole) {
    // Si es admin, redirigir a dashboard de admin
    if (userRole === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    // Si es cliente u otro rol, redirigir a portal de cliente
    return <Navigate to="/client-portal" replace />;
  }
  
  return children;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/ai-chatbots" element={<AIChatbots />} />
                <Route path="/services/custom-software" element={<CustomSoftware />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:id" element={<PortfolioDetail />} />
                <Route path="/capacitacion" element={<Capacitacion />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register-admin" element={<RegisterAdmin />} />
                <Route path="/propuesta/:slug" element={<Proposal />} />
                <Route path="/propuesta-bot" element={<PropuestaBot />} />
                <Route path="/bot-ia-bonificado" element={<BotIABonificado />} />
                <Route path="/webinar-agente-ia" element={<WebinarAgenteIA />} />
                
                {/* Rutas protegidas que requieren autenticación */}
                <Route path="/client-portal" element={
                  <ProtectedRoute>
                    <ClientPortal />
                  </ProtectedRoute>
                } />
                <Route path="/chatbot-definition" element={
                  <ProtectedRoute>
                    <ChatbotDefinition />
                  </ProtectedRoute>
                } />
                
                {/* Rutas de Tracker */}
                <Route path="/tracker/*" element={
                  <ProtectedRoute>
                    <TrackerProvider>
                      <TrackerLayout />
                    </TrackerProvider>
                  </ProtectedRoute>
                } />
                
                {/* Rutas de Admin */}
                <Route path="/admin" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/proposals/create" element={
                  <ProtectedRoute requiredRole="admin">
                    <CreateProposal />
                  </ProtectedRoute>
                } />
                <Route path="/admin/proposals/edit/:id" element={
                  <ProtectedRoute requiredRole="admin">
                    <EditProposal />
                  </ProtectedRoute>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </AuthProvider>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
