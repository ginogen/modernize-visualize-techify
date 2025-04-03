
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Users, Clock, Lightbulb, Trophy, Laptop, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      name: "Alexander Chen",
      position: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2Zlc3Npb25hbHxlbnwwfHwwfHx8MA%3D%3D",
      description: "With over 15 years of experience in software development and AI, Alex leads our technical strategy and innovation."
    },
    {
      name: "Sophia Rodriguez",
      position: "AI Research Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww",
      description: "Sophia holds a Ph.D. in Machine Learning and leads our AI research initiatives, ensuring we stay at the cutting edge."
    },
    {
      name: "Marcus Johnson",
      position: "Lead Software Architect",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww",
      description: "Marcus specializes in designing scalable, robust software architectures that power our enterprise solutions."
    },
    {
      name: "Priya Patel",
      position: "UX/UI Design Lead",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2Zlc3Npb25hbHxlbnwwfHwwfHx8MA%3D%3D",
      description: "Priya combines aesthetic sensibility with deep technical knowledge to create intuitive, beautiful user experiences."
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-sm md:text-base font-mono font-medium px-4 py-2 rounded-full bg-neonGreen/10 text-neonGreen inline-block mb-4">
                  About Us
                </p>
                <h1 className="text-4xl md:text-5xl font-mono font-bold mb-6">
                  We Build Intelligent Digital Solutions
                </h1>
                <p className="text-xl text-white/70 font-mono mb-8">
                  Builders AI is a team of passionate technologists, innovators, and problem solvers dedicated to transforming businesses through cutting-edge software and AI solutions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    className="button-glow bg-neonGreen text-darkBlue hover:bg-neonGreen/80 font-mono" 
                    asChild
                  >
                    <Link to="/services">
                      Our Services <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-neonGreen text-neonGreen hover:bg-neonGreen/10" 
                    asChild
                  >
                    <Link to="/portfolio">
                      View Our Work
                    </Link>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -right-4 -bottom-4 bg-neonGreen/10 w-full h-full rounded-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop" 
                  alt="Builders AI Team" 
                  className="rounded-xl relative z-10 w-full h-auto shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Values Section */}
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
                Our Mission & Values
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-white/70 font-mono"
              >
                What drives us and defines how we work
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-mono font-semibold mb-4 text-neonGreen">Our Mission</h3>
                <p className="text-white/70 font-mono leading-relaxed mb-6">
                  To harness the power of advanced technology and artificial intelligence to solve complex business challenges, drive innovation, and create exceptional value for our clients.
                </p>
                <p className="text-white/70 font-mono leading-relaxed">
                  We believe that intelligent software solutions can transform not just businesses, but entire industries, creating more efficient, sustainable, and human-centered systems.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-2xl font-mono font-semibold mb-4 text-neonGreen">Our Values</h3>
                <ul className="space-y-4">
                  {[
                    "Innovation: We push boundaries and explore new possibilities.",
                    "Excellence: We demand the highest quality in everything we do.",
                    "Integrity: We are honest, transparent, and ethical in all our dealings.",
                    "Collaboration: We believe the best solutions come from teamwork.",
                    "Client Focus: We measure our success by our clients' success."
                  ].map((value, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-3 mt-1">
                        <Check className="h-5 w-5 text-neonGreen" />
                      </div>
                      <p className="text-white/70 font-mono">{value}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding py-24">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Users className="h-8 w-8 text-neonGreen" />, value: "50+", label: "Team Members" },
                { icon: <Clock className="h-8 w-8 text-neonGreen" />, value: "8+", label: "Years Experience" },
                { icon: <Laptop className="h-8 w-8 text-neonGreen" />, value: "100+", label: "Completed Projects" },
                { icon: <Globe className="h-8 w-8 text-neonGreen" />, value: "20+", label: "Countries Served" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass p-8 rounded-xl text-center"
                >
                  <div className="mx-auto bg-neonGreen/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-4xl font-mono font-bold mb-2 text-neonGreen">{stat.value}</h3>
                  <p className="text-white/70 font-mono">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section-padding bg-black/20">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-sm md:text-base font-mono font-medium px-4 py-2 rounded-full bg-neonGreen/10 text-neonGreen inline-block mb-4"
              >
                Our Team
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl font-mono font-bold mb-6"
              >
                Meet Our Leadership
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-white/70 font-mono"
              >
                The experts behind our innovative solutions
              </motion.p>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="glass rounded-xl overflow-hidden group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white/70 font-mono text-sm leading-relaxed">
                        {member.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-mono font-semibold">{member.name}</h3>
                    <p className="text-neonGreen font-mono text-sm">{member.position}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-mono font-bold mb-6"
              >
                Why Choose Builders AI
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-white/70 font-mono"
              >
                What sets us apart from other technology providers
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Lightbulb className="h-8 w-8 text-neonGreen" />,
                  title: "Technical Excellence",
                  description: "Our team includes PhDs and industry veterans who bring deep expertise in AI, machine learning, and software development."
                },
                {
                  icon: <Users className="h-8 w-8 text-neonGreen" />,
                  title: "Collaborative Approach",
                  description: "We work closely with your team, ensuring that solutions align perfectly with your business objectives and processes."
                },
                {
                  icon: <Trophy className="h-8 w-8 text-neonGreen" />,
                  title: "Proven Track Record",
                  description: "With 100+ successful projects across various industries, we have the experience to tackle complex challenges."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass p-6 rounded-xl"
                >
                  <div className="p-3 rounded-lg bg-neonGreen/10 inline-block mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-mono font-semibold mb-3">{feature.title}</h3>
                  <p className="text-white/70 font-mono">{feature.description}</p>
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
                    Ready to Work With Us?
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-xl text-white/70 font-mono mb-8"
                  >
                    Let's discuss how our team can help you achieve your technology goals.
                  </motion.p>
                  <Button 
                    className="button-glow bg-neonGreen text-darkBlue hover:bg-neonGreen/80 font-mono" 
                    asChild
                  >
                    <Link to="/contact">
                      Contact Us <ArrowRight className="ml-2 h-4 w-4" />
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

export default About;
