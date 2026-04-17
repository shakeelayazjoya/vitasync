import { useState } from "react";
import { Menu, X, Dna } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import whitelogo from "../../../public/vitasyndark.png";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-md border-b border-dark-foreground/10">
      <div className="container-narrow flex items-center justify-between h-16 px-4">
        <a href="#" className="flex items-center gap-2">
          <img src={whitelogo} alt="VitaSync Logo" className="h-36 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-sm text-dark-foreground/70 hover:text-primary transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" className="text-dark-foreground/70 hover:text-primary">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>

        <button className="md:hidden text-dark-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-dark border-t border-dark-foreground/10 px-4 pb-4">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="block py-3 text-dark-foreground/70 hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 mt-2">
            <Link to="/login"><Button variant="outline" className="w-full border-dark-foreground/20 text-dark-foreground">Login</Button></Link>
            <Link to="/register"><Button className="w-full">Get Started</Button></Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
