import { useEffect } from "react";
import { ArrowRight, CheckCircle, Brain, Clock, TrendingUp, Zap, Shield, FileText, Bot, DollarSign, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO/SEO";
import "../styles/minimal.css";

const AutomatizarFacturasIA = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Automatizar Facturas con IA: La Revolución de la Gestión Empresarial | Builders AI"
        description="Descubre cómo automatizar facturas con inteligencia artificial. Procesamiento OCR, extracción automática de datos y análisis en tiempo real. Ahorra hasta 95% del tiempo con IA."
        keywords="automatizar facturas con IA, inteligencia artificial facturas, OCR facturas, automatización empresarial IA, gestión facturas automática, AI facturación, procesamiento facturas inteligente"
        url="https://www.builders-ai.com/automatizar-facturas-ia"
      />
      
      {/* Grid Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container-narrow">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="h-10 w-10 text-blue-600" />
              <Bot className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-display font-semibold text-gray-900 mb-6">
              Automatizar Facturas con IA: La Revolución que tu Negocio Necesita
            </h1>
            <p className="text-subtitle mb-8">
              La inteligencia artificial está transformando la forma en que las empresas gestionan sus facturas. 
              Descubre cómo automatizar facturas con IA puede reducir tu carga administrativa en un 95% 
              y eliminar errores humanos por completo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="btn-primary px-8 py-3 text-lg text-black"
                onClick={() => window.open("https://billence.me", "_blank", "noopener,noreferrer")}
              >
                Probar IA gratis <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="px-8 py-3 text-lg border-gray-300 hover:bg-gray-50"
                onClick={() => window.open("https://calendar.app.google/XXwTHc1qvikRrd2f6", "_blank")}
              >
                Ver demo en vivo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">¿Qué significa automatizar facturas con IA?</h2>
            <p className="text-lg text-gray-600 mb-6">
              Automatizar facturas con inteligencia artificial va mucho más allá de la digitalización tradicional. 
              Es utilizar algoritmos avanzados de machine learning y tecnología OCR (Reconocimiento Óptico de Caracteres) 
              para que las máquinas no solo lean las facturas, sino que las comprendan, validen y procesen como lo haría 
              un contador experimentado, pero en segundos y sin errores.
            </p>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl mb-12 border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                <Brain className="h-6 w-6 text-blue-600" />
                ¿Cómo funciona la IA en el procesamiento de facturas?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Fase 1: Reconocimiento</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">OCR inteligente identifica texto en cualquier formato</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Detección automática de campos (CUIT, fecha, importe)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Extracción de datos estructurados</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Fase 2: Validación inteligente</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Verificación de CUIT contra bases de AFIP</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Detección de duplicados automática</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Análisis de consistencia de datos</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-semibold text-gray-900 mb-6">La diferencia entre automatización tradicional vs IA</h2>
            <p className="text-lg text-gray-600 mb-8">
              Mientras que la automatización tradicional sigue reglas fijas, automatizar facturas con IA significa 
              que el sistema aprende y mejora continuamente, adaptándose a nuevos formatos de facturas y 
              detectando patrones complejos que escapan al ojo humano.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="service-card border-gray-200">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Automatización Tradicional</h3>
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="h-8 w-8 text-gray-500" />
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Procesa solo formatos predefinidos</li>
                  <li>• Requiere plantillas para cada proveedor</li>
                  <li>• No aprende de errores</li>
                  <li>• 70-80% de precisión</li>
                  <li>• Necesita supervisión constante</li>
                </ul>
              </Card>
              
              <Card className="service-card border-blue-200 bg-blue-50">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Automatización con IA</h3>
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Procesa cualquier formato automáticamente</li>
                  <li>• Se adapta a nuevos proveedores al instante</li>
                  <li>• Mejora continuamente con cada factura</li>
                  <li>• 99.9% de precisión</li>
                  <li>• Opera completamente autónoma</li>
                </ul>
              </Card>
            </div>

            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Beneficios cuantificables de automatizar facturas con IA</h2>
            <p className="text-lg text-gray-600 mb-8">
              Los números hablan por sí solos. Las empresas que implementan IA para automatizar facturas 
              experimentan transformaciones medibles en eficiencia, costos y precisión.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="service-card text-center">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-blue-600 mb-1">95%</div>
                <p className="text-sm text-gray-600">Reducción en tiempo de procesamiento</p>
              </Card>
              
              <Card className="service-card text-center">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-green-600 mb-1">99.9%</div>
                <p className="text-sm text-gray-600">Precisión en extracción de datos</p>
              </Card>
              
              <Card className="service-card text-center">
                <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-purple-600 mb-1">$600K</div>
                <p className="text-sm text-gray-600">Ahorro anual promedio por empresa</p>
              </Card>
              
              <Card className="service-card text-center">
                <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-orange-600 mb-1">24/7</div>
                <p className="text-sm text-gray-600">Disponibilidad sin interrupciones</p>
              </Card>
            </div>

            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Tecnologías clave detrás de la automatización con IA</h2>
            <p className="text-lg text-gray-600 mb-8">
              Para automatizar facturas con IA de manera efectiva, se combinan múltiples tecnologías 
              de vanguardia que trabajan en conjunto para lograr resultados superiores.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="service-card">
                <div className="flex items-start gap-3 mb-3">
                  <Brain className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Machine Learning</h3>
                    <p className="text-sm text-gray-600">Algoritmos que aprenden patrones y mejoran la precisión con cada factura procesada.</p>
                  </div>
                </div>
              </Card>
              
              <Card className="service-card">
                <div className="flex items-start gap-3 mb-3">
                  <FileText className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">OCR Avanzado</h3>
                    <p className="text-sm text-gray-600">Reconocimiento óptico que maneja texto manuscrito, impreso y formatos complejos.</p>
                  </div>
                </div>
              </Card>
              
              <Card className="service-card">
                <div className="flex items-start gap-3 mb-3">
                  <BarChart className="h-6 w-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">NLP (Procesamiento de Lenguaje Natural)</h3>
                    <p className="text-sm text-gray-600">Comprende el contexto y la semántica de la información en las facturas.</p>
                  </div>
                </div>
              </Card>
            </div>

            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Casos de uso reales: empresas que ya automatizan facturas con IA</h2>
            
            <div className="space-y-8 mb-12">
              <Card className="service-card">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Estudios Contables</h3>
                <p className="text-gray-600 mb-4">
                  Un estudio contable en Buenos Aires procesaba manualmente 500 facturas por día. 
                  Después de implementar IA, el tiempo se redujo de 8 horas diarias a 30 minutos de supervisión.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">8h/día</div>
                    <div className="text-sm text-gray-600">Antes (manual)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">30min/día</div>
                    <div className="text-sm text-gray-600">Después (con IA)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">93%</div>
                    <div className="text-sm text-gray-600">Tiempo ahorrado</div>
                  </div>
                </div>
              </Card>

              <Card className="service-card">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Empresa de Servicios</h3>
                <p className="text-gray-600 mb-4">
                  Una consultora con 15 empleados automatizó la gestión de facturas de gastos y proveedores. 
                  Eliminó errores de duplicación y redujo el tiempo de cierre contable de una semana a un día.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Reducción de 7 días a 1 día en cierre mensual</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Eliminación total de facturas duplicadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Reportes automáticos por proyecto en tiempo real</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Billence Case Study */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl mb-12 border border-blue-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    🚀 Billence: La solución definitiva para automatizar facturas con IA
                  </h3>
                  <p className="text-lg text-gray-600">
                    El ejemplo perfecto de cómo la IA puede transformar tu gestión empresarial
                  </p>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 mb-6">
                <strong>Billence</strong> representa la evolución más avanzada en automatización de facturas con IA. 
                Esta plataforma procesa facturas automáticamente a través de Email, WhatsApp o carga manual, 
                utilizando algoritmos de machine learning entrenados en millones de documentos para lograr 
                una precisión del 99.9% en la extracción de datos.
              </p>

              {/* Pricing Options */}
              <div className="bg-white p-6 rounded-lg mb-6 border border-gray-100">
                <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">Planes de Facturación Billence</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-2 border-blue-200 rounded-lg p-4 hover:border-blue-400 transition-colors bg-blue-50">
                    <h5 className="text-lg font-bold text-blue-600 mb-2">Opción 1</h5>
                    <div className="text-center mb-3">
                      <div className="text-2xl font-bold text-gray-900">U$D 150</div>
                      <div className="text-sm text-gray-600">por mes</div>
                    </div>
                    <div className="text-center mb-4">
                      <div className="text-lg text-gray-700">Hasta 200 Facturas/Comprobantes</div>
                      <div className="text-sm text-blue-600 font-medium">Costo unitario: U$D 0.75 por factura</div>
                    </div>
                    <div className="text-xs text-gray-500 text-center">Ideal para pequeñas empresas</div>
                  </div>
                  
                  <div className="border-2 border-green-200 rounded-lg p-4 hover:border-green-400 transition-colors bg-green-50">
                    <h5 className="text-lg font-bold text-green-600 mb-2">Opción 2</h5>
                    <div className="text-center mb-3">
                      <div className="text-2xl font-bold text-gray-900">U$D 250</div>
                      <div className="text-sm text-gray-600">por mes</div>
                    </div>
                    <div className="text-center mb-4">
                      <div className="text-lg text-gray-700">De 201 a 350 Facturas/Comprobantes</div>
                      <div className="text-sm text-green-600 font-medium">Costo unitario: U$D 0.71 por factura</div>
                    </div>
                    <div className="text-xs text-gray-500 text-center">Mejor valor para medianas empresas</div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    Tecnología IA de vanguardia:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">OCR inteligente con 99.9% de precisión</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Procesamiento automático por múltiples canales</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Clasificación automática inteligente</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Análisis y reportes en tiempo real</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Resultados comprobados:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <DollarSign className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Ahorro de más del 94% en costos operativos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Reducción del 95% en tiempo de procesamiento</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Eliminación total de errores humanos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <BarChart className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Disponibilidad 24/7 sin interrupciones</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">💰 Comparación de costos real:</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-red-600 mb-2">
                      <div className="text-2xl font-bold">~$10.800.000/año</div>
                      <div className="text-sm">Método tradicional (empleado manual)</div>
                    </div>
                    <div className="text-xs text-gray-600">
                      Incluye salario, cargas sociales, errores y tiempo
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-600 mb-2">
                      <div className="text-2xl font-bold">~$600.000/año</div>
                      <div className="text-sm">Con Billence (automatización IA)</div>
                    </div>
                    <div className="text-xs text-gray-600">
                      Sin costos ocultos, errores cero, disponibilidad total
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">Ahorro: $10.200.000/año (94%)</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                  onClick={() => window.open("https://billence.me", "_blank", "noopener,noreferrer")}
                >
                  Probar Billence gratis <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3"
                  onClick={() => window.open("https://billence.me", "_blank", "noopener,noreferrer")}
                >
                  Ver demo en vivo
                </Button>
              </div>
            </div>

            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Implementación paso a paso: cómo empezar a automatizar facturas con IA</h2>
            <p className="text-lg text-gray-600 mb-8">
              La implementación de IA para automatizar facturas no tiene que ser compleja. 
              Con las herramientas adecuadas, puedes empezar en minutos y ver resultados inmediatos.
            </p>
            
            <div className="space-y-6 mb-12">
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Evaluación inicial</h4>
                  <p className="text-gray-700">Analiza tu volumen actual de facturas, formatos más comunes y tiempo invertido mensualmente. Esto te dará el baseline para medir mejoras.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Selección de plataforma IA</h4>
                  <p className="text-gray-700">Elige una solución que ofrezca OCR avanzado, múltiples canales de entrada (email, WhatsApp, web) y integración con tus sistemas actuales.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Configuración y entrenamiento</h4>
                  <p className="text-gray-700">Conecta tus canales (email, WhatsApp), carga facturas históricas para entrenar el modelo y configura las reglas de validación específicas de tu negocio.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Fase de prueba</h4>
                  <p className="text-gray-700">Ejecuta en paralelo con tu proceso manual por 2-4 semanas, comparando resultados y ajustando configuraciones según sea necesario.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0">5</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Implementación completa</h4>
                  <p className="text-gray-700">Migra completamente al sistema automatizado, configura reportes automáticos y establece métricas de seguimiento para optimización continua.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Tendencias futuras: el futuro de automatizar facturas con IA</h2>
            <p className="text-lg text-gray-600 mb-8">
              La IA para automatización de facturas está evolucionando rápidamente. Las próximas innovaciones 
              prometen hacer el proceso aún más inteligente y predictivo.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="service-card">
                <h4 className="font-semibold text-gray-900 mb-3">IA Predictiva</h4>
                <p className="text-gray-600">Los sistemas podrán predecir patrones de gastos, detectar anomalías antes de que sucedan y sugerir optimizaciones presupuestarias automáticamente.</p>
              </Card>
              
              <Card className="service-card">
                <h4 className="font-semibold text-gray-900 mb-3">Integración Blockchain</h4>
                <p className="text-gray-600">Verificación automática de autenticidad de facturas y creación de registros inmutables para auditorías completamente digitales.</p>
              </Card>
              
              <Card className="service-card">
                <h4 className="font-semibold text-gray-900 mb-3">Procesamiento Multimodal</h4>
                <p className="text-gray-600">Capacidad de procesar no solo texto, sino también imágenes, códigos QR, firmas digitales y otros elementos visuales de forma simultánea.</p>
              </Card>
              
              <Card className="service-card">
                <h4 className="font-semibold text-gray-900 mb-3">Automatización End-to-End</h4>
                <p className="text-gray-600">Desde la recepción hasta la aprobación, pago y registro contable, todo el ciclo de vida de la factura completamente automatizado.</p>
              </Card>
            </div>

            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Conclusión: el momento de automatizar es ahora</h2>
            <p className="text-lg text-gray-600 mb-6">
              Automatizar facturas con IA no es una tendencia futura: es una realidad presente que está 
              transformando la competitividad de las empresas hoy. Con tecnologías accesibles, precisas 
              y probadas, cualquier negocio puede implementar esta revolución y empezar a ver resultados 
              desde el primer día.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Las empresas que adopten ahora esta tecnología tendrán una ventaja competitiva significativa: 
              menor carga administrativa, mayor precisión en los datos, mejor control de gastos y equipos 
              enfocados en actividades estratégicas en lugar de tareas repetitivas.
            </p>
            
            <div className="bg-blue-50 p-8 rounded-xl text-center mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                ¿Listo para revolucionar tu gestión empresarial?
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Comienza a automatizar facturas con IA hoy mismo y experimenta la transformación que miles de empresas ya están viviendo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="btn-primary px-8 py-3 text-lg text-black"
                  onClick={() => window.open("https://billence.me", "_blank", "noopener,noreferrer")}
                >
                  Empezar gratis ahora <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-3 text-lg border-gray-300 hover:bg-gray-50"
                  onClick={() => window.open("https://calendar.app.google/XXwTHc1qvikRrd2f6", "_blank")}
                >
                  Agendar consulta estratégica
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AutomatizarFacturasIA;