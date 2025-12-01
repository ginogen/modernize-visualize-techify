import { useEffect } from 'react';

const BotPrueba = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.uchat.com.au/js/widget/km1nj1hxtwu90bwc/full.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://www.uchat.com.au/js/widget/km1nj1hxtwu90bwc/full.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Bot-Prueba
        </h1>
        <div className="text-center text-gray-600">
          <p>Bienvenido a Bot-Prueba</p>
        </div>
      </div>
    </div>
  );
};

export default BotPrueba;