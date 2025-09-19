import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ProcessedLead } from "@/types/leads";

interface LeadHeroProps {
  lead: ProcessedLead;
}

export default function LeadHero({ lead }: LeadHeroProps) {
  return (
    <section className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="relative container mx-auto max-w-6xl">
        {/* Privacy Notice */}
        <div className="mb-8 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
          <p className="text-sm text-yellow-700">
            📋 <strong>Análisis Confidencial</strong> - Esta página es privada y contiene información específica de su empresa.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Análisis Digital Personalizado
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {lead.company_name}
            </h1>
            
            <div className="mb-6">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <ExternalLink className="h-4 w-4" />
                <a 
                  href={lead.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 underline"
                >
                  {lead.website}
                </a>
              </div>
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                {lead.industry_category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} • {lead.company_size_estimate}
              </span>
            </div>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {lead.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                onClick={() =>
                  window.open(
                    "https://calendar.app.google/XXwTHc1qvikRrd2f6",
                    "_blank"
                  )
                }
              >
                Agenda una Llamada <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
                onClick={() => {
                  const element = document.getElementById('analysis-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Ver Análisis Completo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                ✓ Análisis exhaustivo basado en {lead.tokens_used.toLocaleString()} puntos de datos de su sitio web
              </p>
            </div>
          </div>

          {/* Personalized Message Card */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">AI</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Mensaje Personalizado</h3>
                    <p className="text-sm text-gray-600">Basado en análisis de su sitio web</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {lead.personalized_message}
                </p>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {lead.overall_tech_score}/100
                  </div>
                  <div className="text-sm text-gray-600">
                    Puntuación tecnológica general
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}