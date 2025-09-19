import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ProcessedLead } from "@/types/leads";
import { getLeadBySlug } from "@/data/leadsData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadHero from "@/components/LeadHero";
import DiagnosticCards from "@/components/DiagnosticCards";
import OpportunityGrid from "@/components/OpportunityGrid";
import TimeSavingsCard from "@/components/TimeSavingsCard";
import { Loader2, AlertTriangle } from "lucide-react";

export default function LeadLanding() {
  const { slug } = useParams<{ slug: string }>();
  const [lead, setLead] = useState<ProcessedLead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLead() {
      if (!slug) {
        setError("No se especificó un identificador válido");
        setLoading(false);
        return;
      }

      try {
        const leadData = await getLeadBySlug(slug);
        if (leadData) {
          setLead(leadData);
        } else {
          setError("No se encontró información para este lead");
        }
      } catch (err) {
        console.error("Error loading lead:", err);
        setError("Error al cargar la información del lead");
      } finally {
        setLoading(false);
      }
    }

    loadLead();
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando análisis personalizado...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !lead) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center max-w-md">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Página no encontrada
            </h1>
            <p className="text-gray-600 mb-6">
              {error || "La página que buscas no existe o el enlace es incorrecto."}
            </p>
            <a 
              href="/" 
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Volver al inicio
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      {/* SEO Anti-Indexation Headers */}
      <Helmet>
        {/* Critical: Prevent all search engine indexing */}
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
        <meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet" />
        
        {/* Prevent caching */}
        <meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="pragma" content="no-cache" />
        <meta http-equiv="expires" content="0" />
        
        {/* No social sharing */}
        <meta property="og:title" content="Análisis Privado" />
        <meta property="og:description" content="Contenido privado no disponible públicamente" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Análisis Privado" />
        <meta name="twitter:description" content="Contenido privado no disponible públicamente" />
        
        {/* Page title - private */}
        <title>Análisis Privado - {lead.company_name} | Builders AI</title>
        
        {/* NO canonical URL to prevent indexing */}
        {/* NO structured data */}
        
        {/* Privacy headers */}
        <meta name="referrer" content="no-referrer" />
        
        {/* Additional privacy meta tags */}
        <meta name="author" content="Builders AI - Análisis Privado" />
        <meta name="description" content="Análisis tecnológico privado y confidencial" />
        
        {/* Prevent search engines from following any links on this page */}
        <meta name="follow" content="none" />
        
        {/* Prevent archiving */}
        <meta name="archive" content="never" />
        
        {/* Additional robots directives */}
        <meta name="robots" content="none" />
        <meta name="robots" content="noai, noimageai" />
        
        {/* HTTP Headers via meta (some servers respect these) */}
        <meta http-equiv="X-Robots-Tag" content="noindex, nofollow, noarchive, nosnippet" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero Section */}
        <LeadHero lead={lead} />
        
        {/* Time Savings Section */}
        <TimeSavingsCard lead={lead} />
        
        {/* Diagnostic Cards Section */}
        <DiagnosticCards lead={lead} />
        
        {/* Opportunities Grid Section */}
        <OpportunityGrid lead={lead} />
        
        {/* Privacy Footer Notice */}
        <div className="bg-yellow-50 border-t border-yellow-200 py-4">
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <p className="text-sm text-yellow-700">
              🔒 <strong>Información Confidencial:</strong> Esta página contiene análisis privado específico para {lead.company_name}. 
              No compartir públicamente este enlace.
            </p>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}