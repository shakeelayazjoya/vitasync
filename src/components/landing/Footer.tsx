import { Leaf, Mail, MapPin, Phone } from "lucide-react";
import whitelogo from "../../../public/nutrisynclogo.png";

const Footer = () => (
  <footer id="contact" className="bg-zinc-950 text-zinc-400 pt-20 pb-12 relative overflow-hidden">
    {/* Subtle green accent glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />

    <div className="container-narrow px-6">
      <div className="grid md:grid-cols-12 gap-12 mb-16">
        {/* Brand Column */}
        <div className="md:col-span-5">
          <a href="#" className="flex items-center gap-3 mb-6">
            <img 
              src={whitelogo} 
              alt="NutriSync" 
              className="h-14 w-auto" 
            />
          </a>
          
          <p className="text-lg leading-relaxed text-zinc-300 max-w-md">
            Pakistan's smartest AI-powered nutrition companion. 
            Understanding every desi meal — from biryani to nihari.
          </p>

          <div className="flex items-center gap-2 mt-8 text-emerald-500">
            <Leaf className="h-5 w-5" />
            <span className="font-medium text-sm tracking-wider">MADE FOR PAKISTAN 🇵🇰</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3">
          <h4 className="text-white font-semibold text-lg mb-6">Product</h4>
          <ul className="space-y-4">
            {["Features", "How it Works", "Pricing", "AI Coach", "Dashboard"].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                   className="hover:text-white transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-white font-semibold text-lg mb-6">Company</h4>
          <ul className="space-y-4">
            {["About Us", "Blog", "Careers", "Press"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-white font-semibold text-lg mb-6">Support</h4>
          <ul className="space-y-4">
            {["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10 pt-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-zinc-500">
            © 2026 NutriSync. All rights reserved.
          </div>

          <div className="flex items-center gap-8 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-500">
            Built with ❤️ in <span className="text-emerald-400 font-medium">, Pakistan</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;