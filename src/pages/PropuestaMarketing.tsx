import { ArrowRight, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO/SEO";
import "../styles/minimal.css";

const PropuestaMarketing = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Digital Marketing Proposal | Builders AI"
        description="Complete digital marketing services proposal: Social Ads (Meta & TikTok), Google Ads and SEO. Packages starting from USD 450 monthly."
        keywords="digital marketing, social ads, google ads, seo, meta ads, tiktok ads, builders ai"
        url="https://www.builders-ai.com/propuesta-marketing"
      />

      {/* Grid Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />

      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <h1 className="text-display font-semibold text-gray-900 mb-6">
              Digital Marketing Proposal
            </h1>
            <p className="text-subtitle mb-8">
              Comprehensive digital marketing strategies to boost your business with Social Ads, Google Ads and SEO.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                className="btn-primary"
                onClick={() =>
                  window.open(
                    "https://calendar.app.google/XXwTHc1qvikRrd2f6",
                    "_blank"
                  )
                }
              >
                Request Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20">
        <div className="container-narrow">
          <div className="space-y-16">
            
            {/* Package 1 - Social Ads */}
            <div className="service-section">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                  1
                </div>
                <h2 className="text-3xl font-semibold text-gray-900">
                  Social Ads
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                This package includes everything related to paid advertising strategies across Social Ads (Meta & TikTok) and Google Ads.
              </p>

              <div className="bg-gray-50/50 rounded-12 p-8 mb-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Includes:</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Verification of tracking systems in the eCommerce (Analytics and conversion events)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Business Manager setup in Meta for advertising</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Preparation and implementation of Meta campaigns (creatives or videos not included)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Ongoing monitoring and campaign optimization</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">For Google Ads, if applicable:</h4>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Keyword research</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Planning and implementation of Search and Display campaigns (images/videos)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Ongoing monitoring and optimization</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600 text-white rounded-lg p-6 text-center">
                  <div className="text-2xl font-bold mb-2">USD 450</div>
                  <div className="text-blue-100">Monthly Fee</div>
                </div>
              </div>
            </div>

            {/* Package 2 - Extra SEO */}
            <div className="service-section">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
                  2
                </div>
                <h2 className="text-3xl font-semibold text-gray-900">
                  Extra SEO
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                This package includes everything from Option 1 plus SEO services.
              </p>

              <div className="bg-gray-50/50 rounded-12 p-8 mb-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Includes:</h3>
                
                <div className="space-y-6 mb-8">
                  {/* Todo lo de la Opción 1 */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Everything included in Option 1:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-gray-400" />
                        <span>eCommerce tracking systems</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-gray-400" />
                        <span>Meta Business Manager</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-gray-400" />
                        <span>Meta campaigns</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-gray-400" />
                        <span>Complete Google Ads</span>
                      </div>
                    </div>
                  </div>

                  {/* Servicios adicionales de SEO */}
                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Additionally, SEO services:</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Technical SEO (eCommerce analysis, tag improvements, site speed, error fixes)</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Verification of Google Search Console installation</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Keyword research (current rankings, keyword opportunities, positioning strategy)</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Blog article creation and optimization of eCommerce copy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-600 text-white rounded-lg p-6 text-center">
                  <div className="text-2xl font-bold mb-2">USD 570</div>
                  <div className="text-green-100">Monthly Fee</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16 text-center mx-auto">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Package Comparison
            </h2>
            <p className="text-lg text-gray-600">
              Choose the package that best fits your business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Social Ads Package */}
            <Card className="card-minimal relative">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Social Ads</h3>
                <div className="text-3xl font-bold text-blue-600 mb-1">$450</div>
                <div className="text-gray-500">por mes</div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span>Meta & TikTok Ads</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span>Google Ads</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span>Tracking & Analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span>Optimización continua</span>
                </li>
              </ul>

              <Button className="w-full btn-secondary">
                Choose Social Ads
              </Button>
            </Card>

            {/* Extra SEO Package */}
            <Card className="card-minimal relative border-green-200 bg-green-50/30">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Más Popular
                </span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Extra SEO</h3>
                <div className="text-3xl font-bold text-green-600 mb-1">$570</div>
                <div className="text-gray-500">por mes</div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Everything from Social Ads</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Technical SEO</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Keyword Research</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Content creation</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Google Search Console</span>
                </li>
              </ul>

              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Choose Extra SEO
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container-narrow">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-lg text-gray-600">
              A structured approach to maximize ROI on your digital marketing investment.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Initial Audit",
                description: "We analyze your current digital presence and identify opportunities.",
              },
              {
                step: "02",
                title: "Strategy",
                description: "We design a personalized strategy according to your business objectives.",
              },
              {
                step: "03",
                title: "Implementation",
                description: "We set up and launch campaigns with complete tracking.",
              },
              {
                step: "04",
                title: "Optimization",
                description: "We continuously monitor and optimize to improve results.",
              },
            ].map((process, index) => (
              <div key={index} className="process-step">
                <div className="process-number">PASO {process.step}</div>
                <h3 className="text-lg font-semibold mb-2">{process.title}</h3>
                <p className="text-sm text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container-narrow text-center">
          <h2 className="text-4xl font-semibold mb-4">
            Ready to grow your business?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation to discuss which package best fits your needs.
          </p>
          <Button
            className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3"
            onClick={() =>
              window.open(
                "https://calendar.app.google/XXwTHc1qvikRrd2f6",
                "_blank"
              )
            }
          >
            Schedule free consultation <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropuestaMarketing;