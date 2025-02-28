
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="relative max-w-5xl mx-auto">
          {/* Background Elements */}
          <div className="absolute -z-10 top-1/2 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 opacity-70"></div>
          <div className="absolute -z-10 top-1/2 right-1/4 w-64 h-64 bg-green-400/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 opacity-60"></div>
          
          <div className="glass rounded-3xl overflow-hidden shadow-xl relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"></div>
            
            <div className="p-8 md:p-12 lg:p-16">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold mb-6 animate-fade-in">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-lg md:text-xl text-foreground/80 mb-8 animate-fade-in font-mono" style={{ animationDelay: "0.1s" }}>
                  Let's discuss how our software and bot solutions can help you achieve your business goals. Schedule a free consultation today.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <Button className="button-glow px-8 py-6 text-lg bg-neonGreen text-black hover:bg-neonGreen/80 font-mono" asChild>
                    <Link to="/contact">
                      Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="px-8 py-6 text-lg font-mono border-neonGreen text-neonGreen hover:bg-neonGreen/10">
                    View Pricing
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
