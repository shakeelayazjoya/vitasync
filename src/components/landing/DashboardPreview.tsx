'use client'

import { Flame, TrendingUp, Activity, Moon } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
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

const DashboardPreview = () => {
  return (
    <section className="relative py-24 overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src={dashboardBg}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-widest text-sm font-semibold mb-3">
            Dashboard Preview
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            See Your Health, <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Not Just Numbers
            </span>
          </h2>

          <p className="text-white/60 max-w-xl mx-auto text-lg">
            Track meals, energy, and patterns — all in one clean, intelligent dashboard built for real life.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="relative p-[1px] rounded-3xl bg-gradient-to-br from-primary/40 to-accent/40 shadow-2xl">

          <div className="bg-black/70 backdrop-blur-xl rounded-3xl p-6 md:p-8">

            {/* TOP STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

              <div className="bg-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                  <Flame className="w-4 h-4 text-primary" />
                  Calories
                </div>
                <p className="text-xl font-bold text-white">1,980</p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                  <Activity className="w-4 h-4 text-secondary" />
                  Energy
                </div>
                <p className="text-xl font-bold text-white">High ⚡</p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                  <Moon className="w-4 h-4 text-accent" />
                  Sleep
                </div>
                <p className="text-xl font-bold text-white">7.5 hrs</p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  Trend
                </div>
                <p className="text-xl font-bold text-green-400">Improving</p>
              </div>

            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* CHART */}
              <div className="bg-white/5 rounded-2xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-secondary" />
                    Weekly Intake
                  </h4>
                  <span className="text-xs text-white/40">Last 7 Days</span>
                </div>

                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 11, fill: "rgba(255,255,255,0.5)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide />
                    <Bar
                      dataKey="calories"
                      fill="url(#gradient)"
                      radius={[8, 8, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="hsl(var(--accent))" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* MEALS TIMELINE */}
              <div className="bg-white/5 rounded-2xl p-5">
                <h4 className="text-white font-semibold flex items-center gap-2 mb-5">
                  <Flame className="w-4 h-4 text-primary" />
                  Today’s Meals
                </h4>

                <div className="space-y-4">
                  {meals.map((m, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 group"
                    >
                      {/* DOT */}
                      <div className="w-3 h-3 rounded-full bg-primary group-hover:scale-125 transition" />

                      {/* CONTENT */}
                      <div className="flex-1 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-semibold text-white">
                            {m.emoji} {m.name}
                          </p>
                          <span className="text-xs text-primary font-bold">
                            {m.cal} kcal
                          </span>
                        </div>
                        <p className="text-xs text-white/50">
                          {m.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;