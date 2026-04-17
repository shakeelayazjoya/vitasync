import { useEffect, useState } from "react";
import { Users, Apple, TrendingUp, Heart, Award, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Active Users", color: "text-primary" },
  { icon: Apple, value: "500+", label: "Desi Foods Tracked", color: "text-secondary" },
  { icon: TrendingUp, value: "2.5M+", label: "Meals Logged", color: "text-primary" },
  { icon: Heart, value: "94%", label: "Feel Healthier", color: "text-accent" },
  { icon: Award, value: "#1", label: "Health App in PK", color: "text-secondary" },
  { icon: ShieldCheck, value: "100%", label: "Data Secure", color: "text-primary" },
];

const brands = [
  "Aga Khan University",
  "Shifa International",
  "Fitness Pakistan",
  "LUMS Health Lab",
  "NutriPK",
  "HealthBridge",
  "FitPak",
  "WellnessPK",
];

const StatsSlider = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setOffset((p) => p - 1), 30);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-card py-16">
      {/* Stats counters */}
      <div className="container-narrow px-4 mb-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center group animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s`, opacity: 0, animationFillMode: "forwards" }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-muted mb-3 group-hover:scale-110 transition-transform duration-300">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <p className="text-2xl md:text-3xl font-extrabold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite scrolling brand ticker */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-card to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-card to-transparent z-10" />
        <div className="overflow-hidden">
          <div
            className="flex items-center gap-12 whitespace-nowrap"
            style={{ transform: `translateX(${offset}px)` }}
          >
            {[...brands, ...brands, ...brands].map((b, i) => (
              <span
                key={`${b}-${i}`}
                className="text-lg font-semibold text-muted-foreground/40 hover:text-primary/60 transition-colors duration-300 select-none"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSlider;
