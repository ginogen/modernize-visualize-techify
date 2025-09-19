import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ProcessedLead } from "@/types/leads";
import { loadLeadsData } from "@/data/leadsData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Loader2, 
  ExternalLink, 
  Search, 
  Filter,
  TrendingUp,
  AlertTriangle,
  Copy,
  CheckCircle
} from "lucide-react";

export default function LeadsIndex() {
  const [leads, setLeads] = useState<ProcessedLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    async function loadLeads() {
      try {
        const leadsData = await loadLeadsData();
        setLeads(leadsData);
      } catch (error) {
        console.error("Error loading leads:", error);
      } finally {
        setLoading(false);
      }
    }

    loadLeads();
  }, []);

  // Filter and search leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.website.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === "all") return matchesSearch;
    if (filterBy === "critical") {
      return matchesSearch && (!lead.google_analytics || !lead.title_optimized || !lead.has_meta_description);
    }
    if (filterBy === "high-score") {
      return matchesSearch && lead.overall_tech_score >= 60;
    }
    if (filterBy === "low-score") {
      return matchesSearch && lead.overall_tech_score < 40;
    }
    
    return matchesSearch;
  });

  const copyToClipboard = async (url: string, slug: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(slug);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 60) return 'text-green-600 bg-green-50';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const hasCriticalIssues = (lead: ProcessedLead) => {
    return !lead.google_analytics || !lead.title_optimized || !lead.has_meta_description;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando lista de leads...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Anti-Indexation Headers */}
      <Helmet>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        <title>Índice de Leads - Builders AI</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Índice de Landing Pages de Leads
              </h1>
              <p className="text-gray-600 mb-6">
                Total de {leads.length} landing pages personalizadas disponibles.
              </p>

              {/* Privacy Notice */}
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-700">
                  🔒 <strong>Acceso Privado:</strong> Estas páginas son confidenciales y no están indexadas en motores de búsqueda.
                </p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="mb-8 grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre de empresa o website..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                >
                  <option value="all">Todos los leads ({leads.length})</option>
                  <option value="critical">Con problemas críticos ({leads.filter(hasCriticalIssues).length})</option>
                  <option value="high-score">Puntuación alta (60+) ({leads.filter(l => l.overall_tech_score >= 60).length})</option>
                  <option value="low-score">Puntuación baja (&lt;40) ({leads.filter(l => l.overall_tech_score < 40).length})</option>
                </select>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{leads.length}</div>
                <div className="text-sm text-gray-600">Total Leads</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-red-600">{leads.filter(hasCriticalIssues).length}</div>
                <div className="text-sm text-gray-600">Problemas Críticos</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600">{leads.filter(l => l.overall_tech_score >= 60).length}</div>
                <div className="text-sm text-gray-600">Puntuación Alta</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-gray-600">
                  {Math.round(leads.reduce((sum, lead) => sum + lead.overall_tech_score, 0) / leads.length)}
                </div>
                <div className="text-sm text-gray-600">Promedio General</div>
              </div>
            </div>

            {/* Results count */}
            <div className="mb-4">
              <p className="text-gray-600">
                Mostrando {filteredLeads.length} de {leads.length} leads
              </p>
            </div>

            {/* Leads Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLeads.map((lead) => {
                const leadUrl = `${window.location.origin}/leads/${lead.slug}`;
                
                return (
                  <Card key={lead.slug} className="p-6 hover:shadow-lg transition-shadow">
                    {/* Critical Issues Badge */}
                    {hasCriticalIssues(lead) && (
                      <div className="mb-4 flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="text-xs font-medium text-red-700">PROBLEMAS CRÍTICOS</span>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {lead.company_name}
                      </h3>
                      <a 
                        href={lead.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        {lead.website.replace('https://', '').replace('http://', '')}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(lead.overall_tech_score)}`}>
                        {lead.overall_tech_score}/100
                      </span>
                      <span className="text-xs text-gray-500">
                        {lead.company_size_estimate}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <Link to={`/leads/${lead.slug}`}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          Ver Landing Page
                        </Button>
                      </Link>
                      
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => copyToClipboard(leadUrl, lead.slug)}
                      >
                        {copiedUrl === lead.slug ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            ¡Copiado!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copiar URL
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Quick indicators */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Analytics: {lead.google_analytics ? '✅' : '❌'}</span>
                        <span>H1: {lead.title_optimized ? '✅' : '❌'}</span>
                        <span>Meta: {lead.has_meta_description ? '✅' : '❌'}</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* No results */}
            {filteredLeads.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No se encontraron leads con los filtros aplicados.</p>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}