
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useLanguage } from "@/contexts/LanguageContext";

const VideoCarousel = () => {
  const {
    t
  } = useLanguage();
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const videoSources = ["https://www.tella.tv/video/cm89ib26f00000al2fnttcdg4/embed?b=0&title=0&a=1&loop=0&t=0&muted=0&wt=0", "https://www.tella.tv/video/cm6hc1xa5001r0aky73z502xr/embed?b=0&title=0&a=1&loop=0&t=0&muted=0&wt=0", "https://www.tella.tv/video/cm6f4bam4001a0bjj05sa1y9m/embed?b=0&title=0&a=1&loop=0&t=0&muted=0&wt=1"];

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return <section className="section-padding bg-darkBlue text-white relative overflow-hidden">
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
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
            Builders AI en acción
          </h2>
          
        </motion.div>

        <Carousel setApi={setApi} className="w-full max-w-4xl mx-auto" opts={{
        align: "center",
        loop: true
      }}>
          <CarouselContent>
            {videoSources.map((src, index) => <CarouselItem key={index} className="md:basis-4/5 lg:basis-3/4">
                <div className="bg-white/5 p-1 rounded-xl border border-white/10 overflow-hidden">
                  <div className="relative w-full" style={{
                paddingBottom: "56.25%"
              }}>
                    <iframe src={src} style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0
                }} allowFullScreen allowTransparency title={`Video ${index + 1}`} />
                  </div>
                </div>
              </CarouselItem>)}
          </CarouselContent>
          
          <div className="flex items-center justify-center mt-8 gap-4">
            <CarouselPrevious className="relative static bg-neonGreen/20 hover:bg-neonGreen/30 border-neonGreen/50 text-neonGreen" />
            <span className="text-sm font-mono">
              {current} / {count}
            </span>
            <CarouselNext className="relative static bg-neonGreen/20 hover:bg-neonGreen/30 border-neonGreen/50 text-neonGreen" />
          </div>
        </Carousel>
      </div>
    </section>;
};

export default VideoCarousel;
