import { Card } from "@/components/ui/card";
import { ProcessedLead } from "@/types/leads";
import { Clock, TrendingUp, DollarSign, Zap } from "lucide-react";

interface TimeSavingsCardProps {
  lead: ProcessedLead;
}

export default function TimeSavingsCard({ lead }: TimeSavingsCardProps) {
  // Calculate estimated time savings based on automation opportunities and current issues
  const calculateTimeSavings = (lead: ProcessedLead): number => {
    let baseHours = 15; // Base minimum hours per month
    
    // Add hours based on automation opportunities
    const automationCount = lead.automation_opportunities_array.length;
    baseHours += automationCount * 6; // 6 hours per automation opportunity
    
    // Add hours based on pain points (repetitive tasks)
    const painPointsCount = lead.pain_points_array.length;
    baseHours += painPointsCount * 12; // 12 hours per pain point
    
    // Add hours based on manual email management
    if (lead.pain_points_array.some(point => point.toLowerCase().includes('gestión manual de emails'))) {
      baseHours += 25;
    }
    
    // Add hours for systems without capture leads
    if (lead.pain_points_array.some(point => point.toLowerCase().includes('sin sistemas de captura de leads'))) {
      baseHours += 30;
    }
    
    // Add hours for phone dependency
    if (lead.pain_points_array.some(point => point.toLowerCase().includes('dependencia de llamadas'))) {
      baseHours += 35;
    }
    
    // Cap at reasonable maximum
    return Math.min(baseHours, 120);
  };

  const monthlySavings = calculateTimeSavings(lead);
  const yearlySavings = monthlySavings * 12;
  const costPerHour = 8; // Average cost per hour for repetitive tasks
  const monthlyCostSavings = monthlySavings * costPerHour;

  const getTimeCategory = (hours: number) => {
    if (hours >= 80) return { level: 'Alto', color: 'text-red-600 bg-red-50', icon: '🔥' };
    if (hours >= 50) return { level: 'Medio-Alto', color: 'text-orange-600 bg-orange-50', icon: '⚡' };
    if (hours >= 30) return { level: 'Medio', color: 'text-yellow-600 bg-yellow-50', icon: '⏰' };
    return { level: 'Básico', color: 'text-green-600 bg-green-50', icon: '✅' };
  };

  const category = getTimeCategory(monthlySavings);

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Potencial de Ahorro de Tiempo
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Basado en nuestro análisis, estimamos el tiempo que {lead.company_name} podría ahorrar mensualmente automatizando tareas repetitivas.
          </p>
          <p className="text-sm text-gray-500 mt-2 max-w-xl mx-auto">
            *Cifras estimativas basadas en nuestra experiencia de campo con clientes similares
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Main Savings Card */}
          <Card className="p-8 bg-white shadow-xl">
            <div className="text-center mb-6">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${category.color} mb-4`}>
                <span>{category.icon}</span>
                Potencial de ahorro: {category.level}
              </div>
              
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {monthlySavings}
              </div>
              <div className="text-xl text-gray-700 mb-4">
                horas por mes
              </div>
              
              <div className="text-3xl font-semibold text-gray-900">
                {yearlySavings} horas anuales
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900">
                    ${monthlyCostSavings.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    Ahorro mensual estimado
                  </div>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900">
                    {Math.round(monthlySavings / 22)} horas
                  </div>
                  <div className="text-sm text-gray-600">
                    Por día laboral
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Breakdown Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                ¿Dónde se pierden estas horas?
              </h3>
              
              <div className="space-y-4">
                {/* Based on automation opportunities */}
                {lead.automation_opportunities_array.length > 0 && (
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <Zap className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Procesos manuales</div>
                      <div className="text-sm text-gray-600">
                        {lead.automation_opportunities_array.length} procesos identificados que se pueden automatizar
                      </div>
                      <div className="text-xs text-yellow-600 font-medium">
                        ~{lead.automation_opportunities_array.length * 6} horas/mes
                      </div>
                    </div>
                  </div>
                )}


                {/* Based on email management */}
                {lead.pain_points_array.some(point => point.toLowerCase().includes('gestión manual de emails')) && (
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <Clock className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Gestión manual de emails</div>
                      <div className="text-sm text-gray-600">
                        Respuestas y seguimiento sin automatizar
                      </div>
                      <div className="text-xs text-orange-600 font-medium">
                        ~25 horas/mes
                      </div>
                    </div>
                  </div>
                )}

                {/* Based on lead capture */}
                {lead.pain_points_array.some(point => point.toLowerCase().includes('sin sistemas de captura de leads')) && (
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <Clock className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Captura manual de leads</div>
                      <div className="text-sm text-gray-600">
                        Sin formularios automatizados ni seguimiento
                      </div>
                      <div className="text-xs text-blue-600 font-medium">
                        ~30 horas/mes
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">Impacto Proyectado</span>
              </div>
              <p className="text-sm text-green-700">
                Con las automatizaciones adecuadas, su equipo podría dedicar estas {monthlySavings} horas mensuales 
                a actividades de mayor valor como atención personalizada a clientes y desarrollo de nuevos servicios.
              </p>
            </div>

            <div className="mt-6 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-600 text-center">
                <strong>Nota importante:</strong> Estas estimaciones se basan en nuestra experiencia implementando 
                soluciones similares en bufetes de abogados y despachos legales. Los resultados reales pueden variar 
                según las condiciones específicas de cada empresa y la adopción de las herramientas implementadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}