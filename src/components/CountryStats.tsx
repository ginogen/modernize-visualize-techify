import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flag, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
interface CountryData {
  name: string;
  flag: string;
  clients: number;
  code: string;
}
const CountryStats = () => {
  const {
    t,
    language
  } = useLanguage();
  const [animatedCounts, setAnimatedCounts] = useState<Record<string, number>>({});
  const countries: CountryData[] = [{
    name: language === 'es' ? 'Argentina' : 'Argentina',
    flag: "🇦🇷",
    clients: 30,
    code: "AR"
  }, {
    name: language === 'es' ? 'Chile' : 'Chile',
    flag: "🇨🇱",
    clients: 15,
    code: "CL"
  }, {
    name: language === 'es' ? 'México' : 'Mexico',
    flag: "🇲🇽",
    clients: 18,
    code: "MX"
  }, {
    name: language === 'es' ? 'Estados Unidos' : 'United States',
    flag: "🇺🇸",
    clients: 12,
    code: "US"
  }, {
    name: language === 'es' ? 'España' : 'Spain',
    flag: "🇪🇸",
    clients: 16,
    code: "ES"
  }];
  useEffect(() => {
    const initialCounts = countries.reduce((acc, country) => {
      acc[country.code] = 0;
      return acc;
    }, {} as Record<string, number>);
    setAnimatedCounts(initialCounts);
    const timeouts = countries.map(country => {
      return setTimeout(() => {
        setAnimatedCounts(prev => ({
          ...prev,
          [country.code]: country.clients
        }));
      }, 500 + Math.random() * 1000);
    });
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  // Calculate total clients
  const totalClients = countries.reduce((sum, country) => sum + country.clients, 0);
  return <section className="section-padding bg-gradient-to-b from-darkBlue to-darkBlue/90 text-white relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} viewport={{
        once: true
      }} className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="outline" className="mb-4 text-neonGreen border-neonGreen/30 bg-neonGreen/5 font-mono">
            {language === 'es' ? 'PRESENCIA GLOBAL' : 'GLOBAL PRESENCE'}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            {language === 'es' ? 'Países que atendemos' : 'Countries We Serve'}
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-6">
            {language === 'es' ? 'Brindamos soluciones de IA y desarrollo personalizado a clientes en todo el mundo' : 'We provide AI solutions and custom development to clients worldwide'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
          {countries.map((country, index) => <motion.div key={country.code} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} viewport={{
          once: true
        }}>
              <Card className="bg-white/5 border-white/10 overflow-hidden backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl mb-3">{country.flag}</span>
                    <h3 className="text-xl font-mono font-bold mb-2">{country.name}</h3>
                    <div className="flex items-center gap-1.5 text-neonGreen">
                      <Users size={16} />
                      <span className="font-mono font-bold text-xl">
                        {animatedCounts[country.code] || 0}
                      </span>
                      <span className="text-white/60 text-sm">
                        {language === 'es' ? 'clientes' : 'clients'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>)}
        </div>

        
      </div>
    </section>;
};
export default CountryStats;