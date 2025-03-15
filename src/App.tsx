
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import CustomSoftware from "./pages/ServiceDetail/CustomSoftware";
import AIChatbots from "./pages/ServiceDetail/AIChatbots";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail";
import About from "./pages/About";
import Onboarding from "./pages/Onboarding";
import ClientPortal from "./pages/ClientPortal";
import ChatbotDefinition from "./pages/ChatbotDefinition";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import CreateProposal from "./pages/admin/CreateProposal";
import EditProposal from "./pages/admin/EditProposal";
import Proposal from "./pages/Proposal";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/ai-chatbots" element={<AIChatbots />} />
              <Route path="/services/custom-software" element={<CustomSoftware />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:id" element={<PortfolioDetail />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/client-portal" element={<ClientPortal />} />
              <Route path="/chatbot-definition" element={<ChatbotDefinition />} />
              <Route path="/login" element={<Login />} />
              <Route path="/propuesta/:slug" element={<Proposal />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/proposals/create" element={<CreateProposal />} />
              <Route path="/admin/proposals/edit/:id" element={<EditProposal />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
