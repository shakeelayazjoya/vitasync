import { Flame, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import dashboardBg from "@/assets/dashboard-bg.jpg";

const weeklyData = [
  { day: "Mon", calories: 1800 },
  { day: "Tue", calories: 2100 },
  { day: "Wed", calories: 1650 },
  { day: "Thu", calories: 1920 },
  { day: "Fri", calories: 2300 },
  { day: "Sat", calories: 1750 },
  { day: "Sun", calories: 1980 },
];

const meals = [
  { name: "Paratha + Omelette", time: "8:30 AM", cal: 420, emoji: "🫓" },
  { name: "Chicken Biryani", time: "1:00 PM", cal: 580, emoji: "🍚" },
  { name: "Chai + Rusk", time: "4:30 PM", cal: 150, emoji: "☕" },
  { name: "Daal Chawal", time: "8:00 PM", cal: 380, emoji: "🍛" },
];

const DashboardPreview = () => (
  <section className="relative py-20 md:py-28 overflow-hidden">
    {/* Dark background with image */}
    <div className="absolute inset-0">
      <img src={dashboardBg} alt="" className="w-full h-full object-cover" loading="lazy" width={1920} height={900} />
      <div className="absolute inset-0 bg-dark/80" />
    </div>

    <div className="container-narrow relative z-10 px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Dashboard</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-dark-foreground mb-4">
          Your Health at a <span className="gradient-text">Glance</span>
        </h2>
        <p className="text-dark-foreground/60 text-lg">A beautiful, intuitive dashboard that makes health tracking effortless.</p>
      </div>

      <div className="bg-dark/50 backdrop-blur-xl rounded-2xl border border-dark-foreground/10 p-6 md:p-8 max-w-4xl mx-auto shadow-2xl">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Weekly Chart */}
          <div className="bg-dark-foreground/5 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-dark-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-secondary" /> Weekly Overview
              </h4>
              <span className="text-xs text-dark-foreground/50">This Week</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsla(0,0%,100%,0.05)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsla(0,0%,100%,0.5)" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Bar dataKey="calories" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Meal Log */}
          <div className="bg-dark-foreground/5 rounded-2xl p-5">
            <h4 className="font-bold text-dark-foreground flex items-center gap-2 mb-4">
              <Flame className="h-4 w-4 text-primary" /> Today's Meals
            </h4>
            <div className="space-y-3">
              {meals.map((m) => (
                <div key={m.name} className="flex items-center gap-3 bg-dark-foreground/5 rounded-xl p-3 hover:bg-dark-foreground/10 transition-colors">
                  <span className="text-2xl">{m.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-dark-foreground truncate">{m.name}</p>
                    <p className="text-xs text-dark-foreground/50">{m.time}</p>
                  </div>
                  <span className="text-sm font-bold text-primary">{m.cal} kcal</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DashboardPreview;
