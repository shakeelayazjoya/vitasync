'use client'

import {
  UtensilsCrossed,
  Activity,
  Bot,
  Users,
  Brain,
  FileText,
} from "lucide-react";
import featuresIllustration from "@/assets/features-illustration.png";

const features = [
  {
    icon: UtensilsCrossed,
    title: "Desi Food Tracking",
    description:
      "Log biryani, nihari, paratha, haleem & 850+ Pakistani dishes with accurate macros.",
  },
  {
    icon: Activity,
    title: "Body Response",
    description:
      "Track energy, mood, digestion & sleep after every meal.",
  },
  {
    icon: Bot,
    title: "AI Health Coach",
    description:
      "Smart personalized advice based on your lifestyle.",
  },
  {
    icon: Users,
    title: "Family Profiles",
    description:
      "Manage nutrition for your entire family in one place.",
  },
  {
    icon: Brain,
    title: "Smart Insights",
    description:
      "Discover patterns between food and health.",
  },
  {
    icon: FileText,
    title: "Doctor Reports",
    description:
      "Generate PDF reports for professionals.",
  },
];

const Features = () => {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <p className="text-primary font-semibold uppercase tracking-widest mb-3 text-sm">
            Features
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            A Smarter Way to <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Track Your Health
            </span>
          </h2>

          <p className="text-muted-foreground text-lg mb-8">
            NutriSync is designed for Pakistani lifestyles — combining AI,
            nutrition science, and real-life habits into one powerful experience.
          </p>

          <img
            src={featuresIllustration}
            alt="Healthy lifestyle"
            className="rounded-2xl shadow-xl w-full max-w-md"
          />
        </div>

        {/* RIGHT SIDE - FLOATING CARDS */}
        <div className="relative grid grid-cols-2 gap-6">

          {features.map((f, i) => (
            <div
              key={i}
              className={`
                relative p-[1px] rounded-2xl 
                bg-gradient-to-br from-primary/40 to-accent/40
                hover:scale-105 transition-all duration-300
                ${i % 2 === 0 ? "translate-y-6" : "-translate-y-6"}
              `}
            >
              <div className="bg-background/80 backdrop-blur-xl rounded-2xl p-5 h-full shadow-lg hover:shadow-2xl transition">

                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="font-bold text-lg mb-2">
                  {f.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Features;