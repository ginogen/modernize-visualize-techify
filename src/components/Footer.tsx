import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logobuilders.png";

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="Builders AI - Logo footer" className="h-6 w-auto" />
            </Link>
            <p className="text-sm text-gray-600 max-w-sm">
              Transformamos negocios con soluciones de IA personalizadas. 
              Automatización inteligente para el crecimiento empresarial.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-sm text-gray-600 hover:text-gray-900">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-sm text-gray-600 hover:text-gray-900">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/capacitacion" className="text-sm text-gray-600 hover:text-gray-900">
                  Capacitación
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:hola@builders-ai.com"
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  hola@builders-ai.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+17864087985"
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  +1 (786) 408-7985
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-600">
                  <p>New Mexico, USA</p>
                  <p>Rosario, Argentina</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Builders AI. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-700">
                Privacidad
              </Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-700">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;