
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Globe, Calendar, Users, BarChart3, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ProjectDetail {
  id: number;
  title: string;
  category: string;
  client: string;
  description: string;
  image: string;
  duration: string;
  teamSize: string;
  technologies: string[];
  challenge: string;
  solution: string;
  results: {
    title: string;
    value: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

const PortfolioDetail = () => {
  const { id } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data - in a real app, this would come from an API
  const projectsData: ProjectDetail[] = [
    {
      id: 1,
      title: "AI Customer Service Chatbot",
      category: "AI Chatbot",
      client: "E-commerce Giant",
      description: "An intelligent chatbot that handles customer inquiries, processes returns, and provides product recommendations 24/7.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop",
      duration: "4 months",
      teamSize: "6 specialists",
      technologies: ["Natural Language Processing", "Node.js", "React", "TensorFlow", "MongoDB"],
      challenge: "The client was experiencing high customer service costs and long wait times, especially during peak shopping seasons. They needed a solution that could handle 80% of common customer inquiries without human intervention while maintaining high customer satisfaction.",
      solution: "We developed an AI-powered chatbot using advanced NLP to understand customer queries, context, and sentiment. The system integrates with the client's existing CRM, inventory, and order management systems to provide real-time information. It features a continuous learning algorithm that improves responses based on customer interactions and feedback.",
      results: [
        { title: "Customer Service Cost", value: "Reduced by 35%" },
        { title: "Response Time", value: "From 15 min to seconds" },
        { title: "Resolution Rate", value: "78% without human intervention" },
        { title: "Customer Satisfaction", value: "Increased by 22%" }
      ],
      testimonial: {
        quote: "The AI chatbot transformed our customer service operation. We've reduced costs significantly while actually improving customer satisfaction. The most impressive part is how the system keeps getting smarter and handling more complex inquiries over time.",
        author: "Sarah Johnson",
        position: "Customer Experience Director, E-commerce Giant"
      }
    },
    {
      id: 2,
      title: "Financial Market Analysis Platform",
      category: "Software",
      client: "Investment Firm",
      description: "Real-time market data analysis platform with predictive modeling and custom alert systems for financial institutions.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
      duration: "6 months",
      teamSize: "8 specialists",
      technologies: ["Python", "React", "D3.js", "TensorFlow", "PostgreSQL", "AWS"],
      challenge: "The client needed a comprehensive platform to analyze vast amounts of market data in real-time, identify patterns, and generate actionable insights for their investment teams. Existing solutions were either too slow, lacked customization options, or missed critical signals.",
      solution: "We created a high-performance financial analysis platform that processes millions of data points per second. The system uses machine learning algorithms to identify market patterns and anomalies, providing predictive analytics and custom alerting based on user-defined parameters. The interface features interactive visualizations and scenario modeling tools.",
      results: [
        { title: "Data Processing Speed", value: "10x faster than previous solution" },
        { title: "Investment Performance", value: "12% improvement in returns" },
        { title: "Pattern Recognition", value: "93% accuracy rate" },
        { title: "Decision Time", value: "Reduced by 45%" }
      ],
      testimonial: {
        quote: "This platform has completely transformed how we analyze market opportunities. The speed and accuracy of the insights have given us a significant competitive advantage in our industry.",
        author: "Michael Chen",
        position: "Chief Investment Officer, Investment Firm"
      }
    }
  ];

  const project = projectsData.find(p => p.id === Number(id));

  if (!project) {
    return (
      <div className="min-h-screen bg-darkBlue text-white">
        <Header />
        <div className="container mx-auto py-24 text-center">
          <h1 className="text-4xl font-mono font-bold mb-6">Project Not Found</h1>
          <Button className="bg-neonGreen text-darkBlue hover:bg-neonGreen/80 font-mono" asChild>
            <Link to="/portfolio">Return to Portfolio</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-darkBlue text-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-darkBlue/90 via-darkBlue/70 to-darkBlue z-10"></div>
          <div className="h-[50vh] md:h-[70vh] w-full overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto absolute inset-0 z-20 flex flex-col justify-center">
            <div className="max-w-3xl">
              <Button 
                variant="ghost" 
                size="sm" 
                className="mb-6 text-neonGreen hover:bg-neonGreen/10"
                asChild
              >
                <Link to="/portfolio">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Portfolio
                </Link>
              </Button>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm md:text-base font-mono font-medium px-4 py-2 rounded-full bg-neonGreen/10 text-neonGreen inline-block mb-4"
              >
                {project.category}
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-6"
              >
                {project.title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-white/80 font-mono max-w-2xl"
              >
                {project.description}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Project Details Section */}
        <section className="section-padding py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-mono font-bold mb-8">Project Overview</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-mono font-semibold mb-4 text-neonGreen">The Challenge</h3>
                    <p className="text-white/70 font-mono leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-mono font-semibold mb-4 text-neonGreen">Our Solution</h3>
                    <p className="text-white/70 font-mono leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="text-xl font-mono font-semibold mb-6 text-neonGreen">Key Results</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.results.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="glass p-6 rounded-xl"
                      >
                        <div className="flex items-start">
                          <div className="p-2 rounded-lg bg-neonGreen/10 mr-4">
                            <BarChart3 className="w-6 h-6 text-neonGreen" />
                          </div>
                          <div>
                            <p className="text-white/70 font-mono text-sm">{result.title}</p>
                            <p className="text-2xl font-mono font-bold text-neonGreen">{result.value}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {project.testimonial && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-16 glass p-8 rounded-xl relative"
                  >
                    <div className="absolute -top-6 left-8 text-5xl text-neonGreen font-serif">"</div>
                    <p className="text-white/90 font-mono text-lg italic mb-6 pt-4">
                      {project.testimonial.quote}
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-neonGreen/20 flex items-center justify-center text-neonGreen font-bold text-xl mr-4">
                        {project.testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-mono font-semibold">{project.testimonial.author}</p>
                        <p className="text-white/70 font-mono text-sm">{project.testimonial.position}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div>
                <div className="glass p-8 rounded-xl sticky top-24">
                  <h3 className="text-xl font-mono font-semibold mb-6">Project Details</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Globe className="w-5 h-5 text-neonGreen mr-3 mt-1" />
                      <div>
                        <p className="text-white/70 font-mono text-sm">Client</p>
                        <p className="font-mono">{project.client}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 text-neonGreen mr-3 mt-1" />
                      <div>
                        <p className="text-white/70 font-mono text-sm">Project Duration</p>
                        <p className="font-mono">{project.duration}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users className="w-5 h-5 text-neonGreen mr-3 mt-1" />
                      <div>
                        <p className="text-white/70 font-mono text-sm">Team Size</p>
                        <p className="font-mono">{project.teamSize}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <p className="text-white/70 font-mono text-sm mb-3">Technologies Used</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <div 
                          key={index}
                          className="px-3 py-1 rounded-full bg-neonGreen/10 text-neonGreen text-sm font-mono"
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button 
                      className="w-full button-glow bg-neonGreen text-darkBlue hover:bg-neonGreen/80 font-mono" 
                      asChild
                    >
                      <Link to="/contact">
                        Discuss Your Project <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects Section */}
        <section className="section-padding py-16 bg-black/20">
          <div className="container mx-auto">
            <h2 className="text-3xl font-mono font-bold mb-8 text-center">More Case Studies</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData.filter(p => p.id !== project.id).map((relatedProject, index) => (
                <motion.div
                  key={relatedProject.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-xl overflow-hidden group hover:ring-2 hover:ring-neonGreen/50 transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={relatedProject.image} 
                      alt={relatedProject.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                      {relatedProject.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-mono font-semibold mb-3">{relatedProject.title}</h3>
                    <p className="text-white/70 font-mono mb-4 line-clamp-2">{relatedProject.description}</p>
                    <Button 
                      variant="ghost" 
                      className="text-neonGreen hover:bg-neonGreen/10" 
                      asChild
                    >
                      <Link to={`/portfolio/${relatedProject.id}`}>
                        View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioDetail;
