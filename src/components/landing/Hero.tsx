import { ArrowRight, Play, Flame, Droplets, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const CalorieRing = () => (
  <div className="relative w-32 h-32">
    <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
      <circle cx="60" cy="60" r="52" fill="none" stroke="hsla(0,0%,100%,0.15)" strokeWidth="8" />
      <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round"
        strokeDasharray={`${2 * Math.PI * 52 * 0.72} ${2 * Math.PI * 52}`} />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <Flame className="h-4 w-4 text-primary mb-0.5" />
      <span className="text-lg font-bold text-dark-foreground font-mono">0</span>
      <span className="text-[10px] text-dark-foreground/60">/ 2,000 kcal</span>
    </div>
  </div>
);

const MacroBar = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs">
      <span className="text-dark-foreground/60">{label}</span>
      <span className="font-medium text-dark-foreground font-mono">{value}g / {max}g</span>
    </div>
    <div className="h-2 bg-dark-foreground/10 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${(value / max) * 100}%` }} />
    </div>
  </div>
);

const DashboardMock = () => (
  <div className="bg-dark/60 backdrop-blur-xl rounded-2xl border border-dark-foreground/10 p-5 w-full max-w-sm animate-float shadow-2xl">
    <div className="flex items-center gap-4 mb-5">
      <CalorieRing />
      <div className="flex-1 space-y-3">
        <MacroBar label="Protein" value={85} max={120} color="bg-primary" />
        <MacroBar label="Carbs" value={180} max={250} color="bg-secondary" />
        <MacroBar label="Fat" value={45} max={65} color="bg-accent" />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-2">
      {[
        { icon: Droplets, label: "Water", val: "6/8 glasses", color: "text-secondary" },
        { icon: Zap, label: "Energy", val: "High", color: "text-primary" },
        { icon: TrendingUp, label: "Streak", val: "12 days", color: "text-accent" },
      ].map(({ icon: Icon, label, val, color }) => (
        <div key={label} className="bg-dark-foreground/5 rounded-xl p-2.5 text-center">
          <Icon className={`h-4 w-4 mx-auto mb-1 ${color}`} />
          <p className="text-[10px] text-dark-foreground/50">{label}</p>
          <p className="text-xs font-semibold text-dark-foreground">{val}</p>
        </div>
      ))}
    </div>
  </div>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-dark/60" />
    </div>
    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[120px]" />
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-[150px]" />

    <div className="container-narrow relative z-10 grid md:grid-cols-2 gap-12 items-center px-4 pt-20">
      <div className="animate-fade-up">
        <div className="inline-flex items-center gap-2 bg-primary/15 backdrop-blur-sm text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-primary/20">
          <Zap className="h-3.5 w-3.5" /> Your Body's Operating System
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-dark-foreground mb-6">
          Understand Your Body,{" "}
          <span className="gradient-text">Not Just Calories</span>
        </h1>
        <p className="text-lg text-dark-foreground/70 max-w-lg mb-8 leading-relaxed">
          Pakistan's first AI-powered nutrition platform that understands desi food — from biryani to nihari.
          Track meals, monitor your body's response, and get personalized insights.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/register">
            <Button className="rounded-xl px-8 py-6 text-base font-semibold shadow-lg shadow-primary/30">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" className="rounded-xl px-8 py-6 text-base font-semibold border-primary/40 text-primary hover:bg-primary/10 backdrop-blur-sm">
            <Play className="mr-2 h-4 w-4" /> Watch Demo
          </Button>
        </div>
        <div className="mt-10 flex items-center gap-6 text-dark-foreground/40 text-sm">
          <span>✓ Free forever plan</span>
          <span>✓ No credit card</span>
          <span>✓ 10k+ users</span>
        </div>
      </div>
      <div className="flex justify-center animate-fade-up animate-fade-up-delay-2">
        <DashboardMock />
      </div>
    </div>
  </section>
);

export default Hero;
