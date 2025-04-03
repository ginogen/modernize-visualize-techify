
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Project {
  id: number;
  title: string;
  category: string;
  client: string;
  description: string;
  image: string;
  featured?: boolean;
}

const Portfolio = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [filter, setFilter] = useState<string>("all");
  
  const projects: Project[] = [
    {
      id: 1,
      title: "AI Customer Service Chatbot",
      category: "AI Chatbot",
      client: "E-commerce Giant",
      description: "An intelligent chatbot that handles customer inquiries, processes returns, and provides product recommendations 24/7.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Financial Market Analysis Platform",
      category: "Software",
      client: "Investment Firm",
      description: "Real-time market data analysis platform with predictive modeling and custom alert systems for financial institutions.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
      featured: true
    },
    {
      id: 3,
      title: "Healthcare Patient Management System",
      category: "Web Application",
      client: "Medical Network",
      description: "A comprehensive solution for healthcare providers to manage patient records, scheduling, and telehealth services securely.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Logistics Optimization Software",
      category: "Software",
      client: "Shipping Company",
      description: "Advanced logistics platform that optimizes delivery routes, reduces transportation costs, and improves sustainability metrics.",
      image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Retail Inventory Management Bot",
      category: "AI Chatbot",
      client: "Retail Chain",
      description: "AI-powered inventory management system that forecasts demand, automates reordering, and prevents stockouts.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Smart Building Management System",
      category: "IoT",
      client: "Property Management Co.",
      description: "IoT-based solution for monitoring and controlling building systems to optimize energy usage and maintenance.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  const categories = ["all", ...new Set(projects.map(project => project.category))];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-darkBlue text-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm md:text-base font-mono font-medium px-4 py-2 rounded-full bg-neonGreen/10 text-neonGreen inline-block mb-4"
              >
                Our Work
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-6"
              >
                Showcasing Our Best Projects
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-white/70 font-mono"
              >
                Explore our successful projects and see how we've helped businesses transform their operations
              </motion.p>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="section-padding py-12 bg-black/20">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-mono font-bold mb-12 text-center"
            >
              Featured Projects
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.filter(project => project.featured).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative group overflow-hidden rounded-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                    <p className="text-sm font-mono text-neonGreen mb-2">{project.client} • {project.category}</p>
                    <h3 className="text-2xl font-mono font-semibold mb-3">{project.title}</h3>
                    <p className="text-white/70 font-mono mb-6 max-w-lg">{project.description}</p>
                    <Button 
                      className="button-glow bg-neonGreen text-darkBlue hover:bg-neonGreen/80 font-mono" 
                      asChild
                    >
                      <Link to={`/portfolio/${project.id}`}>
                        View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Filter & Grid */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-mono font-bold mb-6 md:mb-0"
              >
                All Projects
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap gap-3 items-center"
              >
                <Filter className="h-5 w-5 text-neonGreen mr-2" />
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    variant={filter === category ? "default" : "outline"}
                    className={filter === category 
                      ? "bg-neonGreen text-darkBlue hover:bg-neonGreen/80 font-mono" 
                      : "border-neonGreen/50 text-neonGreen hover:bg-neonGreen/10 font-mono"
                    }
                    onClick={() => setFilter(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </motion.div>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="glass rounded-xl overflow-hidden group hover:ring-2 hover:ring-neonGreen/50 transition-all"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                      {project.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-mono text-neonGreen mb-1">{project.client}</p>
                    <h3 className="text-xl font-mono font-semibold mb-3">{project.title}</h3>
                    <p className="text-white/70 font-mono mb-4 line-clamp-2">{project.description}</p>
                    <Button 
                      variant="ghost" 
                      className="text-neonGreen hover:bg-neonGreen/10 px-0" 
                      asChild
                    >
                      <Link to={`/portfolio/${project.id}`} className="flex items-center">
                        View Details <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
                    Ready to Build Your Next Project?
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-xl text-white/70 font-mono mb-8"
                  >
                    Let us help you transform your idea into a powerful digital solution.
                  </motion.p>
                  <Button 
                    className="button-glow bg-neonGreen text-darkBlue hover:bg-neonGreen/80 font-mono" 
                    asChild
                  >
                    <Link to="/contact">
                      Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
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

export default Portfolio;
