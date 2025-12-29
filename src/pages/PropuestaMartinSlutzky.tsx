import { ArrowRight, CheckCircle, Bot, Palette, QrCode, FileText, Globe, Smartphone, Target, Building2, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO/SEO";
import "../styles/minimal.css";

const PropuestaMartinSlutzky = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Propuesta Martin Slutzky MVP | Builders AI"
        description="Plataforma mobile-first para artistas y galerías. Carga de obras en menos de 2 minutos con generación automática de páginas, tags, certificados y catálogos."
        keywords="martin slutzky, mvp, arte, galerías, certificado autenticidad, tag físico, catálogo pdf, builders ai"
        url="https://www.builders-ai.com/propuesta-martin-slutzky"
      />

      {/* Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />

      <Header />

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <h1 className="text-display font-semibold text-gray-900 mb-6">
              Propuesta Martin Slutzky — MVP Plataforma de Arte 🎨
            </h1>
            <p className="text-subtitle mb-8">
              Una plataforma mobile-first que permite a artistas y galerías cargar una obra en menos de 2 minutos y generar automáticamente:
              <strong> página online, tag físico, certificado de autenticidad, historia y catálogo PDF</strong> con mínima fricción y máxima automatización.
            </p>
            <Button
              className="btn-primary px-8 py-3"
              onClick={() => window.open("https://calendar.app.google/XXwTHc1qvikRrd2f6", "_blank")}
            >
              Agenda una reunión <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* SECCIÓN 1: OBJETIVO DEL MVP */}
      <section className="py-20 border-t border-gray-100">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-semibold text-gray-900">
                  🎯 Objetivo del MVP
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Crear una plataforma mobile-first que permita a artistas y galerías tener un único registro maestro 
                que genere automáticamente todos los elementos necesarios para presentar y vender sus obras.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Cargar una obra en menos de 2 minutos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Tener un único registro maestro</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Página online de la obra automática</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Tag físico/informativo para ferias</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Certificado de Autenticidad (COA)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Historia / provenance automática</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Catálogo PDF generado automáticamente</span>
                </li>
              </ul>
            </div>

            <Card className="card-minimal p-8 bg-blue-50 border-blue-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Filosofía</h3>
              <div className="space-y-4 text-gray-700">
                <p><strong>Mínima fricción</strong> - Proceso ultrarrápido</p>
                <p><strong>Máxima automatización</strong> - La IA trabaja por el artista</p>
                <p><strong>Storytelling, no administración</strong> - Enfoque en vender, no en gestionar</p>
                <p><strong>Single source of truth</strong> - Un registro maestro para todo</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: ESTRUCTURA BASE ARTWORK */}
      <section className="py-20 bg-gray-50/50 border-t border-gray-100">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="md:order-2">
              <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
                <Building2 className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                🧱 Estructura Base de Artwork
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Este será el <strong>single source of truth</strong> del MVP. Todo lo demás (tags, certificados, PDFs, catálogo) 
                se deriva automáticamente de este objeto central.
              </p>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 mb-3">Campos obligatorios:</h4>
                <div className="text-gray-700">
                  <p>• <strong>Artist</strong></p>
                  <p>• <strong>Title + Year</strong> (Formato: Title, Year)</p>
                  <p>• <strong>Medium / Technique</strong></p>
                  <p>• <strong>Size</strong> (H × W × D)</p>
                  <p className="ml-4 text-sm">- cm primero, inches entre paréntesis</p>
                  <p className="ml-4 text-sm">- Depth solo si aplica</p>
                  <p>• <strong>Weight</strong> (opcional)</p>
                  <p>• <strong>Short description</strong> (opcional, 1 frase)</p>
                  <p>• <strong>Price</strong> (opcional, sin tax ni shipping)</p>
                  <p>• <strong>Location</strong> (opcional)</p>
                </div>
              </div>
            </div>

            <Card className="card-minimal p-8 bg-purple-50 border-purple-200 md:order-1">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Core del Sistema</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Regla Clave</h4>
                  <p className="text-gray-700">
                    Todo lo demás (tags, certificados, PDFs, catálogo) se deriva automáticamente de este objeto.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-purple-600" />
                    <span>Página web</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <QrCode className="h-4 w-4 text-purple-600" />
                    <span>Tag físico</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-600" />
                    <span>Certificado COA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-600" />
                    <span>Catálogo PDF</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: IA EN EL MVP */}
      <section className="py-20 border-t border-gray-100">
        <div className="container-narrow">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-green-100 p-3 rounded-lg">
              <Bot className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-900">
              🤖 Uso de IA en el MVP (dónde aporta valor real)
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-minimal p-8 bg-green-50 border-green-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Asistente de carga inteligente</h3>
              <div className="mb-4">
                <p className="text-gray-700 mb-3">El usuario puede:</p>
                <ul className="space-y-1 text-gray-700 text-sm ml-4">
                  <li>• Escribir</li>
                  <li>• Dictar por voz</li>
                  <li>• Subir fotos</li>
                </ul>
              </div>
              <div>
                <p className="text-gray-700 mb-3">La IA:</p>
                <ul className="space-y-1 text-gray-700 text-sm ml-4">
                  <li>• Normaliza textos</li>
                  <li>• Corrige formato (ej: tamaños, pulgadas)</li>
                  <li>• Sugiere descripción corta (1 frase)</li>
                  <li>• Detecta inconsistencias</li>
                </ul>
              </div>
            </Card>

            <Card className="card-minimal p-8 bg-green-50 border-green-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Generación automática de TAG</h3>
              <div className="mb-4">
                <p className="text-gray-700 mb-2"><strong>Input:</strong> artwork master data</p>
                <p className="text-gray-700 mb-3"><strong>Output:</strong> tag listo para imprimir o mostrar en móvil/tablet</p>
              </div>
              <div>
                <p className="text-gray-700 mb-2">Contenido generado:</p>
                <ul className="space-y-1 text-gray-700 text-sm ml-4">
                  <li>• Artist</li>
                  <li>• Title, Year</li>
                  <li>• Medium</li>
                  <li>• Size</li>
                  <li>• Short description</li>
                  <li>• QR a la obra online</li>
                </ul>
              </div>
            </Card>

            <Card className="card-minimal p-8 bg-green-50 border-green-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Certificado de Autenticidad (COA)</h3>
              <div className="mb-4">
                <p className="text-gray-700 mb-3">Automatización del MVP:</p>
                <ul className="space-y-1 text-gray-700 text-sm ml-4">
                  <li>• Generación PDF</li>
                  <li>• ID único de obra</li>
                  <li>• Fecha de emisión</li>
                  <li>• Declaración legal estándar</li>
                  <li>• Firma digital (fase 1)</li>
                  <li>• QR verificable (fase 2)</li>
                </ul>
              </div>
              <p className="text-sm text-blue-700 bg-blue-100 p-2 rounded">
                👉 En el MVP: No blockchain complejo, sí estructura preparada para integración futura
              </p>
            </Card>

            <Card className="card-minimal p-8 bg-green-50 border-green-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Artwork Provenance & Catálogo</h3>
              <div className="mb-4">
                <p className="text-gray-700 mb-3">La IA construye y mantiene:</p>
                <ul className="space-y-1 text-gray-700 text-sm ml-4">
                  <li>• Historia de la obra</li>
                  <li>• Exposiciones</li>
                  <li>• Cambios de ubicación</li>
                  <li>• Notas privadas (no públicas)</li>
                  <li>• Contexto artístico</li>
                </ul>
              </div>
              <div>
                <p className="text-gray-700 mb-3">Catálogo automático incluye:</p>
                <ul className="space-y-1 text-gray-700 text-sm ml-4">
                  <li>• Portada</li>
                  <li>• Ficha de cada obra</li>
                  <li>• Story corta</li>
                  <li>• Datos técnicos</li>
                  <li>• QR individual</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: PUBLICACIÓN ONLINE */}
      <section className="py-20 bg-gray-50/50 border-t border-gray-100">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                <Smartphone className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                📲 Publicación Online
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Simple, privada, efectiva. Cada obra tiene página pública y privada con tracking básico de interacción.
              </p>
              
              <ul className="space-y-3 text-gray-700 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Página pública</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Página privada (solo link)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Tracking básico: Vistas, Interés, Envíos</span>
                </li>
              </ul>

              <Card className="card-minimal p-6 bg-yellow-50 border-yellow-200">
                <h4 className="font-semibold text-gray-900 mb-2">⚠️ No es un marketplace</h4>
                <p className="text-gray-700 text-sm">
                  Es herramienta de venta directa. Complementa Saatchi / Artsy / etc., no compite.
                  Ideal para envío por WhatsApp, Email a coleccionistas, uso en ferias.
                </p>
              </Card>
            </div>

            <Card className="card-minimal p-8 bg-blue-50 border-blue-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">🧑‍🎨 Usuario Objetivo</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Artistas independientes</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Galerías pequeñas y medianas</span>
                </div>
                <div className="flex items-center gap-3">
                  <Palette className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Ferias</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Coleccionistas privados</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: ALCANCE DEL MVP */}
      <section className="py-20 border-t border-gray-100">
        <div className="container-narrow">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            🧩 Alcance del MVP (qué entra y qué no)
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-minimal p-8 bg-green-50 border-green-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">✅ Incluido en MVP</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Mobile-first web app</li>
                <li>• Gestión de artworks</li>
                <li>• IA para texto y formatos</li>
                <li>• Tags</li>
                <li>• Certificados PDF</li>
                <li>• Catálogo PDF</li>
                <li>• Links privados</li>
              </ul>
            </Card>

            <Card className="card-minimal p-8 bg-red-50 border-red-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">❌ Fuera del MVP (fase 2)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Pagos</li>
                <li>• Marketplace abierto</li>
                <li>• Blockchain avanzado</li>
                <li>• Logística / shipping</li>
                <li>• Multi-idioma complejo</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* SECCIÓN 6: PROPUESTA DE DESARROLLO */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold mb-6">
              💡 Propuesta de Desarrollo del MVP
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Una plataforma radicalmente simple, pensada para crear, presentar, vender y documentar con IA que trabaja por el artista.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-minimal p-8 bg-white text-gray-900">
              <h3 className="text-2xl font-semibold mb-6">🧠 Problema</h3>
              <p className="text-gray-700 mb-4">Las plataformas actuales:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• Son administrativas</li>
                <li>• Fragmentan la información</li>
                <li>• No están pensadas para vender</li>
                <li>• No cuentan historias</li>
                <li>• Requieren demasiado tiempo</li>
              </ul>
            </Card>

            <Card className="card-minimal p-8 bg-white text-gray-900">
              <h3 className="text-2xl font-semibold mb-6">🚀 Solución</h3>
              <p className="text-gray-700 mb-4">Funcionalidades clave:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• Carga de obra en 1 flujo guiado</li>
                <li>• Generación automática de documentos</li>
                <li>• Gestión desde el móvil</li>
                <li>• Links privados para venta</li>
                <li>• Todo en un solo lugar</li>
              </ul>
            </Card>
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <Card className="card-minimal p-8 bg-white text-gray-900">
              <h3 className="text-2xl font-semibold mb-6">⏱️ Roadmap Estimado</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-600 mb-3">Fase 1 – MVP (4–6 semanas)</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Core artworks</li>
                    <li>• IA básica</li>
                    <li>• PDFs</li>
                    <li>• Publicación online</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600 mb-3">Fase 2</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• CRM ligero</li>
                    <li>• Seguimiento de interés</li>
                    <li>• Automatización comercial</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600 mb-3">Fase 3</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Certificación avanzada</li>
                    <li>• Integraciones externas</li>
                    <li>• Multi-galería</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SECCIÓN 7: PRECIO DE DESARROLLO */}
      <section className="py-20 bg-gray-50/50 border-t border-gray-100">
        <div className="container-narrow">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-semibold text-gray-900 mb-8">
              💰 Propuesta MVP
            </h2>
            <Card className="card-minimal p-12 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">Desarrollo Completo del MVP</h3>
              <div className="text-6xl font-bold text-blue-600 mb-4">U$D 1,500</div>
              <p className="text-lg text-gray-700 mb-8">
                Incluye todas las funcionalidades descritas: IA integrada, generación automática de documentos, 
                plataforma mobile-first y arquitectura escalable.
              </p>
              
              <div className="bg-white p-6 rounded-lg border border-blue-200 mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">🏆 Diferencial Competitivo</h4>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>• Menos campos, más sentido</div>
                  <div>• Menos administración, más venta</div>
                  <div>• Menos fricción, más velocidad</div>
                  <div>• Más historia, menos planilla</div>
                </div>
              </div>

              <div className="space-y-3 text-left">
                <h4 className="font-semibold text-gray-900 mb-3">🧱 Arquitectura (alto nivel)</h4>
                <p className="text-gray-700">• <strong>Frontend:</strong> Web App mobile-first</p>
                <p className="text-gray-700">• <strong>Backend:</strong> API + DB estructurada</p>
                <p className="text-gray-700">• <strong>IA:</strong> generación de texto, normalización, documentos</p>
                <p className="text-gray-700">• <strong>PDFs:</strong> render server-side</p>
                <p className="text-gray-700">• <strong>QR dinámicos</strong></p>
              </div>

              <Button
                className="btn-primary w-full mt-8 py-4 text-lg"
                onClick={() => window.open("https://calendar.app.google/XXwTHc1qvikRrd2f6", "_blank")}
              >
                Iniciar desarrollo del MVP <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <div className="container-narrow">
          <h2 className="text-4xl font-semibold mb-6">
            Revoluciona la gestión de arte con IA
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            En 4-6 semanas tendrás tu MVP funcionando: carga rápida, generación automática y venta directa. 
            Todo pensado para artistas y galerías que quieren vender, no administrar.
          </p>
          <Button
            variant="secondary"
            className="px-8 py-3 bg-white text-purple-700 font-semibold"
            onClick={() => window.open("https://calendar.app.google/XXwTHc1qvikRrd2f6", "_blank")}
          >
            Agendar reunión <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropuestaMartinSlutzky;