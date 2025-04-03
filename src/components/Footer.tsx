import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logobuilders.png";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Builders AI" className="h-10 w-auto" />
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Transformamos negocios con soluciones de IA personalizadas. 
              Automatizamos procesos, mejoramos la experiencia del cliente y 
              potenciamos el crecimiento con tecnología inteligente.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" />
                <a 
                  href="mailto:hola@builders-ai.com"
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                >
                  hola@builders-ai.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" />
                <a 
                  href="tel:+17864087985"
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                >
                  +1 (786) 408-7985
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-1 text-gray-600 dark:text-gray-300" />
                <div className="text-gray-600 dark:text-gray-300">
                  <p>New Mexico, USA</p>
                  <p>Rosario, Argentina</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} Builders AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
