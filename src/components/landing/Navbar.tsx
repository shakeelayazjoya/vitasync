import { useState } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import whitelogo from "../../../public/nutrisynclogo.png";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-xl border-b border-white/10">
      <div className="container-narrow flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img 
            src={whitelogo} 
            alt="NutriSync" 
            className="h-14 w-auto" 
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button 
              variant="ghost" 
              className="text-zinc-400 hover:text-white hover:bg-white/10"
            >
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Get Started Free
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-zinc-400 hover:text-white transition-colors" 
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-white/10 px-4 py-6">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="block py-3 px-4 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors" 
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-white/10">
            <Link to="/login">
              <Button 
                variant="outline" 
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;