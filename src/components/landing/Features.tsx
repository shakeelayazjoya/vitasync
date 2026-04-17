import { UtensilsCrossed, Activity, Bot, Users, Brain, FileText } from "lucide-react";
import featuresIllustration from "@/assets/features-illustration.png";

const features = [
  {
    icon: UtensilsCrossed,
    title: "Desi Food Tracking",
    description: "Log biryani, roti, nihari, and 500+ Pakistani dishes with accurate macros — no more guessing.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Activity,
    title: "Body Response Tracking",
    description: "Track energy, mood, digestion, and sleep after meals. Understand how food truly affects you.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Bot,
    title: "AI Health Coach",
    description: "Get personalized advice based on your patterns. Like having a nutritionist in your pocket.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Users,
    title: "Family Profiles",
    description: "Track nutrition for your whole family — kids, elders, and everyone in between.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Brain,
    title: "Smart Insights",
    description: "AI-powered pattern detection reveals hidden connections between your diet and well-being.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: FileText,
    title: "Doctor Reports",
    description: "Export detailed nutrition and health reports as PDF — perfect for doctor visits.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

const Features = () => (
  <section id="features" className="section-padding bg-background relative overflow-hidden">
    {/* Subtle gradient orb */}
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />

    <div className="container-narrow relative">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Features</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
          Everything You Need for{" "}
          <span className="gradient-text">Better Health</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Built specifically for Pakistani lifestyles, VitaSync goes beyond calorie counting.
        </p>
      </div>

      {/* Illustration */}
      <div className="flex justify-center mb-12">
        <img
          src={featuresIllustration}
          alt="Pakistani family enjoying healthy food together"
          className="w-full max-w-md rounded-2xl"
          loading="lazy"
          width={800}
          height={800}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="glass-card-hover p-6 group animate-fade-up"
            style={{ animationDelay: `${i * 0.1}s`, opacity: 0, animationFillMode: "forwards" }}
          >
            <div className={`${f.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <f.icon className={`h-6 w-6 ${f.color}`} />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
