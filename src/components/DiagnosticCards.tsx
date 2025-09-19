import { Card } from "@/components/ui/card";
import { ProcessedLead } from "@/types/leads";
import { 
  Shield, 
  Search, 
  Smartphone, 
  Globe, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  TrendingUp,
  Server,
  Code
} from "lucide-react";

interface DiagnosticCardsProps {
  lead: ProcessedLead;
}

export default function DiagnosticCards({ lead }: DiagnosticCardsProps) {
  // Function to get score color and status
  const getScoreStatus = (score: number) => {
    if (score >= 70) return { color: 'text-green-600', bg: 'bg-green-50', status: 'Excelente' };
    if (score >= 50) return { color: 'text-yellow-600', bg: 'bg-yellow-50', status: 'Bueno' };
    return { color: 'text-red-600', bg: 'bg-red-50', status: 'Necesita mejora' };
  };

  const SecurityIcon = ({ enabled }: { enabled: boolean }) => 
    enabled ? <CheckCircle className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5 text-red-600" />;

  return (
    <section id="analysis-section" className="py-20 bg-gray-50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Diagnóstico Técnico Completo
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Análisis detallado del estado actual de su infraestructura digital y oportunidades de mejora.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Digital Maturity Score */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreStatus(lead.digital_maturity_score).bg} ${getScoreStatus(lead.digital_maturity_score).color}`}>
                {getScoreStatus(lead.digital_maturity_score).status}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {lead.digital_maturity_score}/100
            </div>
            <div className="text-sm text-gray-600 mb-3">
              Madurez Digital
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${lead.digital_maturity_score}%` }}
              ></div>
            </div>
          </Card>

          {/* SEO Score */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Search className="h-8 w-8 text-green-600" />
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreStatus(lead.seo_score).bg} ${getScoreStatus(lead.seo_score).color}`}>
                {getScoreStatus(lead.seo_score).status}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {lead.seo_score}/100
            </div>
            <div className="text-sm text-gray-600 mb-3">
              Optimización SEO
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${lead.seo_score}%` }}
              ></div>
            </div>
          </Card>

          {/* Security Score */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Shield className="h-8 w-8 text-red-600" />
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreStatus(lead.security_score).bg} ${getScoreStatus(lead.security_score).color}`}>
                {getScoreStatus(lead.security_score).status}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {lead.security_score}/100
            </div>
            <div className="text-sm text-gray-600 mb-3">
              Seguridad Web
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full" 
                style={{ width: `${lead.security_score}%` }}
              ></div>
            </div>
          </Card>

          {/* Overall Tech Score */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Code className="h-8 w-8 text-purple-600" />
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreStatus(lead.overall_tech_score).bg} ${getScoreStatus(lead.overall_tech_score).color}`}>
                {getScoreStatus(lead.overall_tech_score).status}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {lead.overall_tech_score}/100
            </div>
            <div className="text-sm text-gray-600 mb-3">
              Puntuación General
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full" 
                style={{ width: `${lead.overall_tech_score}%` }}
              ></div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tech Stack Analysis */}
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Server className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Stack Tecnológico</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">CMS/Plataforma:</span>
                <span className="font-medium text-gray-900">{lead.cms_platform || 'No detectado'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Frontend:</span>
                <span className="font-medium text-gray-900">{lead.frontend_frameworks || 'No detectado'}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Backend:</span>
                <span className="font-medium text-gray-900">{lead.backend_technology || 'No detectado'}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-700 mb-2">Nivel Tecnológico:</div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  lead.tech_readiness === 'advanced' ? 'bg-green-100 text-green-800' :
                  lead.tech_readiness === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {lead.tech_readiness === 'advanced' ? 'Avanzado' :
                   lead.tech_readiness === 'intermediate' ? 'Intermedio' : 'Básico'}
                </span>
                <span className="text-sm text-gray-600">
                  ({lead.tech_sophistication_score}/100)
                </span>
              </div>
            </div>
          </Card>

          {/* Analytics & SEO Basics */}
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">Analytics y SEO Básico</h3>
            </div>

            <div className="space-y-4">
              {/* Google Analytics with emphasis if missing */}
              <div className={`flex justify-between items-center py-3 px-4 rounded-lg ${
                !lead.google_analytics ? 'bg-red-50 border-2 border-red-200' : ''
              }`}>
                <span className={`${!lead.google_analytics ? 'text-red-700 font-semibold' : 'text-gray-600'}`}>
                  Google Analytics:
                  {!lead.google_analytics && <span className="text-red-600 font-bold ml-2">❌ CRÍTICO</span>}
                </span>
                <SecurityIcon enabled={lead.google_analytics} />
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Meta Pixel:</span>
                <SecurityIcon enabled={lead.meta_pixel} />
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Google Tag Manager:</span>
                <SecurityIcon enabled={lead.google_tag_manager} />
              </div>

              {/* H1 with emphasis if missing */}
              <div className={`flex justify-between items-center py-3 px-4 rounded-lg ${
                !lead.title_optimized ? 'bg-red-50 border-2 border-red-200' : ''
              }`}>
                <span className={`${!lead.title_optimized ? 'text-red-700 font-semibold' : 'text-gray-600'}`}>
                  Título Optimizado (H1):
                  {!lead.title_optimized && <span className="text-red-600 font-bold ml-2">❌ CRÍTICO</span>}
                </span>
                <SecurityIcon enabled={lead.title_optimized} />
              </div>

              {/* Meta Description with emphasis if missing */}
              <div className={`flex justify-between items-center py-3 px-4 rounded-lg ${
                !lead.has_meta_description ? 'bg-red-50 border-2 border-red-200' : ''
              }`}>
                <span className={`${!lead.has_meta_description ? 'text-red-700 font-semibold' : 'text-gray-600'}`}>
                  Meta Descripción:
                  {!lead.has_meta_description && <span className="text-red-600 font-bold ml-2">❌ CRÍTICO</span>}
                </span>
                <SecurityIcon enabled={lead.has_meta_description} />
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Mobile Friendly:</span>
                <SecurityIcon enabled={lead.mobile_friendly} />
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Datos Estructurados:</span>
                <SecurityIcon enabled={lead.has_structured_data} />
              </div>
            </div>

            {/* Critical Issues Alert */}
            {(!lead.google_analytics || !lead.title_optimized || !lead.has_meta_description) && (
              <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="text-sm font-bold text-red-700">
                    ⚠️ PROBLEMAS CRÍTICOS DETECTADOS
                  </span>
                </div>
                <div className="text-sm text-red-600">
                  {!lead.google_analytics && '• Sin Google Analytics instalado\n'}
                  {!lead.title_optimized && '• Sin título H1 optimizado\n'}
                  {!lead.has_meta_description && '• Sin meta descripción configurada\n'}
                </div>
                <div className="text-xs text-red-500 mt-2 font-medium">
                  Estos elementos son fundamentales para el SEO y análisis web
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">
                Confianza del dominio: {lead.domain_trust_score}/100
              </div>
              <div className="text-sm text-gray-600">
                Edad del dominio: {lead.domain_age_years ? `${lead.domain_age_years} años` : 'No disponible'}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}