import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProcessedLead } from "@/types/leads";
import { 
  Bot, 
  Zap, 
  TrendingUp, 
  Shield, 
  Search, 
  ArrowRight,
  AlertTriangle,
  DollarSign,
  Target,
  Wrench
} from "lucide-react";

interface OpportunityGridProps {
  lead: ProcessedLead;
}

export default function OpportunityGrid({ lead }: OpportunityGridProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Oportunidades de Crecimiento Identificadas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Basado en nuestro análisis, hemos identificado áreas específicas donde podemos generar impacto inmediato en su negocio.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Pain Points */}
          {lead.pain_points_array.length > 0 && (
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h3 className="text-xl font-semibold text-gray-900">Puntos de Dolor Actuales</h3>
              </div>
              
              <div className="space-y-3">
                {lead.pain_points_array.map((pain, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{pain}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Services Recommended */}
          {lead.services_array.length > 0 && (
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Wrench className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Servicios Recomendados</h3>
              </div>
              
              <div className="space-y-3">
                {lead.services_array.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Automation Opportunities */}
          {lead.automation_opportunities_array.length > 0 && (
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Bot className="h-6 w-6 text-purple-600" />
                <h3 className="text-xl font-semibold text-gray-900">Oportunidades de Automatización</h3>
              </div>
              
              <div className="space-y-3 mb-6">
                {lead.automation_opportunities_array.slice(0, 5).map((opportunity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <Zap className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{opportunity}</span>
                  </div>
                ))}
              </div>

              {lead.automation_opportunities_array.length > 5 && (
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  +{lead.automation_opportunities_array.length - 5} oportunidades adicionales identificadas
                </div>
              )}
            </Card>
          )}

          {/* Sales Opportunities */}
          {lead.sales_opportunities_array.length > 0 && (
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">Oportunidades de Ventas</h3>
              </div>
              
              <div className="space-y-3 mb-6">
                {lead.sales_opportunities_array.slice(0, 5).map((opportunity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <DollarSign className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{opportunity}</span>
                  </div>
                ))}
              </div>

              {lead.sales_opportunities_array.length > 5 && (
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  +{lead.sales_opportunities_array.length - 5} oportunidades adicionales identificadas
                </div>
              )}
            </Card>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Security Recommendations */}
          {lead.security_recommendations_array.length > 0 && (
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-6 w-6 text-orange-600" />
                <h3 className="text-xl font-semibold text-gray-900">Recomendaciones de Seguridad</h3>
              </div>
              
              <div className="space-y-3">
                {lead.security_recommendations_array.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                    <Shield className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{recommendation}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* SEO Opportunities */}
          {lead.seo_opportunities_array.length > 0 && (
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Search className="h-6 w-6 text-indigo-600" />
                <h3 className="text-xl font-semibold text-gray-900">Mejoras SEO</h3>
              </div>
              
              <div className="space-y-3">
                {lead.seo_opportunities_array.slice(0, 5).map((opportunity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg">
                    <Search className="h-4 w-4 text-indigo-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{opportunity}</span>
                  </div>
                ))}
              </div>

              {lead.seo_opportunities_array.length > 5 && (
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mt-3">
                  +{lead.seo_opportunities_array.length - 5} optimizaciones adicionales identificadas
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Value Proposition */}
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center gap-3 mb-6">
            <Target className="h-6 w-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">Nuestra Propuesta de Valor para {lead.company_name}</h3>
          </div>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {lead.value_proposition}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Audiencia Objetivo:</h4>
              <p className="text-gray-700">{lead.target_audience}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Ventajas Competitivas:</h4>
              <p className="text-gray-700">{lead.competitive_advantages}</p>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Listo para transformar {lead.company_name}?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Agenda una llamada de 30 minutos para discutir cómo podemos implementar estas mejoras y acelerar el crecimiento de tu negocio.
            </p>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              onClick={() =>
                window.open(
                  "https://calendar.app.google/XXwTHc1qvikRrd2f6",
                  "_blank"
                )
              }
            >
              Agenda tu Consulta Gratuita <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-gray-400 text-sm mt-4">
              Sin compromiso • 30 minutos • Completamente gratis
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}