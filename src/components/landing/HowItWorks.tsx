'use client'

import { UtensilsCrossed, HeartPulse, Sparkles } from "lucide-react";

const steps = [
  {
    icon: UtensilsCrossed,
    title: "Log Your Meals",
    description:
      "Search or scan desi meals. We understand Karachi vs Lahori biryani — not just calories, but context.",
    color: "text-primary",
  },
  {
    icon: HeartPulse,
    title: "Track Body Response",
    description:
      "Log energy, mood, digestion & sleep. Build a real understanding of how food affects you.",
    color: "text-secondary",
  },
  {
    icon: Sparkles,
    title: "Get AI Insights",
    description:
      "AI connects patterns and gives clear, personalized recommendations for your lifestyle.",
    color: "text-accent",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-28 bg-background overflow-hidden">

      {/* Background Glow */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-72 h-72 bg-primary/10 blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
            How It Works
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Your Health Journey <br />
            <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
              in 3 Simple Steps
            </span>
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            No confusion. No complex tracking. Just a simple system designed for
            real Pakistani lifestyles.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative">

          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent opacity-20 rounded-full" />

          <div className="space-y-20">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={i}
                  className={`flex flex-col md:flex-row items-center ${
                    isLeft ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* CARD */}
                  <div className="md:w-1/2">
                    <div className="relative group p-[1px] rounded-2xl bg-gradient-to-br from-primary/40 to-accent/40 hover:scale-105 transition-all duration-300">
                      <div className="bg-background/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">

                        <span className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                          Step {i + 1}
                        </span>

                        <h3 className="text-xl font-bold mb-2">
                          {step.title}
                        </h3>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CENTER ICON */}
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-background border-4 border-primary/20 shadow-lg">
                    <step.icon className={`w-7 h-7 ${step.color}`} />
                  </div>

                  {/* EMPTY SPACE */}
                  <div className="md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;