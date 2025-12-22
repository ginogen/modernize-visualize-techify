import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

const BotBisio = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://builderbotia.com/js/widget/k6b7vo1eyc48ihta/full.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Bot Bisio - Asistente Virtual</title>
        <meta name="description" content="Bot Bisio - Tu asistente virtual inteligente" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Bot Bisio - Asistente Virtual" />
        <meta property="og:description" content="Bot Bisio - Tu asistente virtual inteligente" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            Bot Bisio
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Tu asistente virtual inteligente
          </p>
        </div>
      </main>
    </div>
  );
};

export default BotBisio;