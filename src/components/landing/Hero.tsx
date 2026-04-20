import { ArrowRight, Play, Flame, Droplets, Zap, TrendingUp, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const CalorieRing = () => (
  <div className="relative w-40 h-40">
    <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
      <circle 
        cx="60" cy="60" r="52" 
        fill="none" 
        stroke="#1f2937" 
        strokeWidth="10" 
      />
      <circle 
        cx="60" cy="60" r="52" 
        fill="none" 
        stroke="#22c55e" 
        strokeWidth="10" 
        strokeLinecap="round"
        strokeDasharray={`${2 * Math.PI * 52 * 0.72} ${2 * Math.PI * 52}`} 
        className="transition-all duration-700"
      />
    </svg>
    
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
      <div className="flex items-center gap-1.5 mb-1">
        <Flame className="h-5 w-5 text-orange-400" />
        <span className="text-xs font-medium tracking-widest text-emerald-400">TODAY</span>
      </div>
      <span className="text-2xl font-bold text-white font-mono tracking-tighter">1,440</span>
      <span className="text-sm text-white/70 -mt-1">/ 2,000 kcal</span>
      <div className="mt-2 flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
        <Leaf className="h-4 w-4" /> 72% • On Track
      </div>
    </div>
  </div>
);

const MacroBar = ({ 
  label, 
  value, 
  max, 
  color 
}: { 
  label: string; 
  value: number; 
  max: number; 
  color: string;
}) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm text-white/80">
      <span>{label}</span>
      <span className="font-mono text-white">
        {value}<span className="text-white/50">/{max}g</span>
      </span>
    </div>
    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all duration-700 ${color}`}
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  </div>
);

const DashboardMock = () => (
  <div className="bg-zinc-900/95 backdrop-blur-3xl rounded-3xl border border-emerald-500/30 p-8 w-full max-w-sm shadow-2xl relative overflow-hidden">
    {/* Top glow */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

    <div className="flex items-start gap-8 mb-10">
      <CalorieRing />
      
      <div className="flex-1 space-y-6 pt-3">
        <MacroBar label="Protein" value={98} max={130} color="bg-emerald-500" />
        <MacroBar label="Carbs" value={172} max={245} color="bg-lime-500" />
        <MacroBar label="Fat" value={48} max={68} color="bg-green-500" />
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4">
      {[
        { icon: Droplets, label: "WATER", val: "7/8", color: "text-sky-400" },
        { icon: Zap, label: "ENERGY", val: "High", color: "text-lime-400" },
        { icon: TrendingUp, label: "STREAK", val: "15", color: "text-emerald-400" },
      ].map(({ icon: Icon, label, val, color }) => (
        <div 
          key={label} 
          className="bg-zinc-950/80 border border-white/10 hover:border-emerald-500/40 rounded-2xl p-5 text-center transition-all group"
        >
          <Icon className={`h-6 w-6 mx-auto mb-3 ${color} group-hover:scale-110 transition-transform`} />
          <p className="text-[10px] tracking-[1px] text-white/50 font-medium">{label}</p>
          <p className="text-2xl font-semibold text-white mt-1">{val}</p>
        </div>
      ))}
    </div>

    <div className="mt-8 text-center text-xs text-emerald-400/80">
      Last logged: Chicken Biryani • 620 kcal
    </div>
  </div>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0f0a]">
    {/* Background */}
    <div className="absolute inset-0">
      <img 
        src={heroBg} 
        alt="NutriSync Hero Background" 
        className="w-full h-full object-cover opacity-60" 
        width={1920} 
        height={1080} 
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f0a] via-[#0a0f0a]/95 to-black/90" />
    </div>

    {/* Decorative green glows */}
    <div className="absolute top-32 left-10 w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-[140px]" />
    <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-lime-500/10 rounded-full blur-[160px]" />

    <div className="container-narrow relative z-10 grid md:grid-cols-2 gap-16 items-center px-6 pt-24 pb-20">
      {/* Left Content */}
      <div className="space-y-10">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-900/60 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-sm font-medium px-6 py-2.5 rounded-full">
          <Leaf className="h-4 w-4" />
          AI-Powered • Desi Food Expert
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-7xl font-bold leading-[1.05] tracking-[-2.5px] text-white">
          Smart Nutrition for{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-300 bg-clip-text text-transparent">
            Real Pakistani Lives
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl text-zinc-300 max-w-lg leading-relaxed">
          NutriSync tracks biryani, nihari, paratha, and every desi meal with accuracy. 
          Get personalized AI insights, macro goals, and health streaks that actually fit your lifestyle.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link to="/register">
            <Button 
              size="lg"
              className="rounded-2xl px-10 py-7 text-lg font-semibold bg-emerald-500 hover:bg-emerald-600 text-black shadow-2xl shadow-emerald-500/40 transition-all active:scale-[0.97]"
            >
              Get Started Free <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </Link>

          <Button 
            variant="outline" 
            size="lg"
            className="bg-transparentrounded-2xl px-9 py-7 text-lg font-semibold border-white/30 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-md flex items-center gap-3"
          >
            <Play className="h-5 w-5" /> Watch Demo
          </Button>
        </div>

        {/* Trust Signals */}
        <div className="flex items-center gap-8 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            ✓ Free Plan Forever
          </div>
          <div className="flex items-center gap-2">
            ✓ No Credit Card
          </div>
          <div>15,000+ Pakistanis tracking daily</div>
        </div>
      </div>

      {/* Right Side - Dashboard */}
      <div className="flex justify-center pt-10 md:pt-0">
        <DashboardMock />
      </div>
    </div>

    {/* Bottom fade */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0f0a] to-transparent" />
  </section>
);

export default Hero;