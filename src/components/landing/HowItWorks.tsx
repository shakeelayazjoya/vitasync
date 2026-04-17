import { UtensilsCrossed, HeartPulse, Sparkles } from "lucide-react";

const steps = [
  {
    icon: UtensilsCrossed,
    title: "Log Your Meals",
    description: "Search or scan your desi meals. Our database knows the difference between Karachi biryani and Lahori biryani.",
    color: "text-primary",
    bg: "bg-primary/10",
    ring: "ring-primary/20",
  },
  {
    icon: HeartPulse,
    title: "Track Body Response",
    description: "Log how you feel — energy, mood, digestion, sleep. Build a complete picture of your health.",
    color: "text-secondary",
    bg: "bg-secondary/10",
    ring: "ring-secondary/20",
  },
  {
    icon: Sparkles,
    title: "Get AI Insights",
    description: "Our AI connects the dots and gives you personalized, actionable recommendations.",
    color: "text-accent",
    bg: "bg-accent/10",
    ring: "ring-accent/20",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="section-padding bg-card">
    <div className="container-narrow">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">How It Works</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
          Three Simple Steps to{" "}
          <span className="gradient-text">Better Health</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 relative">
        <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary via-secondary to-accent opacity-20" />
        {steps.map((s, i) => (
          <div key={s.title} className="text-center relative animate-fade-up" style={{ animationDelay: `${i * 0.15}s`, opacity: 0, animationFillMode: "forwards" }}>
            <div className={`${s.bg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 ring-4 ${s.ring} relative z-10`}>
              <s.icon className={`h-7 w-7 ${s.color}`} />
            </div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Step {i + 1}</span>
            <h3 className="text-xl font-bold text-foreground mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
