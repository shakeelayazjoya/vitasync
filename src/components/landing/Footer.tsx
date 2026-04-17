import { Activity } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const Footer = () => (
  <footer id="contact" className="bg-dark text-dark-foreground py-16 px-4">
    <div className="container-narrow">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-1">
          <a href="#" className="flex items-center gap-2 mb-4">
            <img src={logoIcon} alt="VitaSync" className="h-7 w-7" width={28} height={28} />
            <span className="text-lg font-bold">VitaSync</span>
          </a>
          <p className="text-sm text-dark-foreground/60 leading-relaxed">
            Your body's operating system. Built in Pakistan 🇵🇰 for healthier lives.
          </p>
        </div>

        {[
          { title: "Product", links: ["Features", "Pricing", "Dashboard", "AI Coach"] },
          { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
          { title: "Support", links: ["Help Center", "Privacy Policy", "Terms of Service", "Contact Us"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-bold text-sm mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-dark-foreground/60 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-dark-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-dark-foreground/50">© 2026 VitaSync. All rights reserved.</p>
        <p className="text-sm text-dark-foreground/50">Built with ❤️ in Pakistan 🇵🇰</p>
      </div>
    </div>
  </footer>
);

export default Footer;
