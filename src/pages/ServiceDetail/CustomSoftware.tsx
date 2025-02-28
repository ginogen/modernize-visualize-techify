
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Code, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CustomSoftware = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const caseStudies = [
    {
      id: 1,
      title: "Enterprise Resource Management System",
      client: "Manufacturing Corporation",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Customer Relationship Platform",
      client: "Financial Services Company",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-darkBlue text-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container mx-auto">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-6 text-neonGreen hover:bg-neonGreen/10"
              asChild
            >
              <Link to="/services">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Link>
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-sm md:text-base font-mono font-medium px-4 py-2 rounded-full bg-neonGreen/10 text-neonGreen inline-block mb-4">
                  Custom Software Development
                </p>
                <h1 className="text-4xl md:text-5xl font-mono font-bold mb-6">
                  Tailored Solutions for Your Business Challenges
                </h1>
                <p className="text-xl text-white/70 font-mono mb-8">
                  We create bespoke software that addresses your unique requirements, optimizes operations, and drives growth.
                </p>
                <Button 
                  className="button-glow bg-neonGreen text-darkBlue hover:bg-neonGreen/80 font-mono" 
                  asChild
                >
                  <Link to="/contact">
                    Discuss Your Project <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -right-4 -bottom-4 bg-neonGreen/10 w-full h-full rounded-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2000&auto=format&fit=crop" 
                  alt="Custom Software Development" 
                  className="rounded-xl relative z-10 w-full h-auto"
                />
                <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm z-20">
                  <Code className="inline mr-2 h-4 w-4" /> Enterprise Solutions
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-padding bg-black/20">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-mono font-bold mb-6"
              >
                Benefits of Custom Software
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-white/70 font-mono"
              >
                Why choose a tailored solution over off-the-shelf software
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Perfect Fit for Your Business",
                  desc: "Built to address your specific needs rather than generic requirements."
                },
                {
                  title: "Scalability & Flexibility",
                  desc: "Easily adaptable as your business grows and requirements change."
                },
                {
                  title: "Integration Capabilities",
                  desc: "Seamlessly connects with your existing systems and workflows."
                },
                {
                  title: "Competitive Advantage",
                  desc: "Unique solutions that set you apart from competitors using standard software."
                },
                {
                  title: "Enhanced Security",
                  desc: "Custom security measures designed specifically for your business needs."
                },
                {
                  title: "Long-term Cost Efficiency",
                  desc: "Eliminate recurring license fees and pay only for features you actually use."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass p-6 rounded-xl"
                >
                  <div className="p-3 rounded-lg bg-neonGreen/10 inline-block mb-4">
                    <Check className="w-6 h-6 text-neonGreen" />
                  </div>
                  <h3 className="text-xl font-mono font-semibold mb-3">{item.title}</h3>
                  <p className="text-white/70 font-mono">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-sm md:text-base font-mono font-medium px-4 py-2 rounded-full bg-neonGreen/10 text-neonGreen inline-block mb-4"
              >
                Success Stories
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl font-mono font-bold mb-6"
              >
                Recent Case Studies
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="glass rounded-xl overflow-hidden group relative"
                >
                  <div className="relative h-64">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    <img 
                      src={study.image} 
                      alt={study.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 p-6 z-20">
                      <p className="text-sm font-mono text-neonGreen mb-2">{study.client}</p>
                      <h3 className="text-xl font-mono font-semibold">{study.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-white/70 font-mono mb-4">
                      We developed a custom solution that increased operational efficiency by 35% and reduced costs by 20%.
                    </p>
                    <Button 
                      variant="ghost" 
                      className="text-neonGreen hover:bg-neonGreen/10" 
                      asChild
                    >
                      <Link to={`/portfolio/${study.id}`}>
                        View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-black/20">
          <div className="container mx-auto">
            <div className="glass rounded-xl overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="text-center max-w-3xl mx-auto">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-mono font-bold mb-6"
                  >
                    Ready to Transform Your Business?
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-xl text-white/70 font-mono mb-8"
                  >
                    Let's discuss how our custom software solutions can address your unique challenges.
                  </motion.p>
                  <Button 
                    className="button-glow bg-neonGreen text-darkBlue hover:bg-neonGreen/80 font-mono" 
                    asChild
                  >
                    <Link to="/contact">
                      Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CustomSoftware;
