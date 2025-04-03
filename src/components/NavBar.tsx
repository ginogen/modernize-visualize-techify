import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import logo from "@/assets/logobuilders.png";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <img 
            src={logo} 
            alt="Builders AI" 
            className="h-20 w-auto" 
          />
        </Link>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/services">Servicios</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/portfolio">Portfolio</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/contact">Contacto</Link>
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar; 