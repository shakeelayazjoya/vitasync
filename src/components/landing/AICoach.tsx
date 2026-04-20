'use client'

import { Bot, User, Sparkles } from "lucide-react";
import aiIllustration from "@/assets/ai-illustration.png";

const messages = [
  {
    role: "ai",
    text: "I’ve noticed you often feel bloated after chai with milk, especially after heavy meals like biryani.",
  },
  {
    role: "user",
    text: "Yeah… I thought that was normal 😅",
  },
  {
    role: "ai",
    text: "It’s common, but not ideal. Try switching to green tea or kahwa after meals — it may improve digestion.",
  },
  {
    role: "ai",
    text: "Also, your energy drops around 3 PM on days you skip protein at lunch.",
  },
  {
    role: "user",
    text: "That explains my laziness at work 😭",
  },
  {
    role: "ai",
    text: "Exactly. Adding daal, chicken, or yogurt can stabilize your energy levels.",
  },
  {
    role: "ai",
    text: "One more thing — your sleep improves when you eat dinner before 8 PM 🌙",
  },
];

const AICoach = () => {
  return (
    <section className="relative py-28 overflow-hidden bg-background">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 blur-[140px] rounded-full" />

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-accent/20">
            <Sparkles className="w-4 h-4" />
            AI-Powered Intelligence
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Not Just Tracking. <br />
            <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
              Real Understanding.
            </span>
          </h2>

          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            NutriSync doesn’t just count calories — it understands your habits,
            your culture, and how your body reacts. Get insights that actually
            make sense for your daily life.
          </p>

          {/* ILLUSTRATION */}
          <img
            src={aiIllustration}
            alt="AI Health Insights"
            className="w-56 opacity-80 mb-8"
          />

          {/* FEATURES */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              "Detects hidden food sensitivities",
              "Tracks mood & energy patterns",
              "Suggests desi-friendly improvements",
              "Learns your habits over time",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-muted/40 px-3 py-2 rounded-lg"
              >
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CHAT UI */}
        <div className="relative">

          {/* GRADIENT BORDER */}
          <div className="p-[1px] rounded-3xl bg-gradient-to-br from-primary/40 to-accent/40 shadow-2xl">

            <div className="bg-background/80 backdrop-blur-xl rounded-3xl p-5 max-w-md mx-auto">

              {/* HEADER */}
              <div className="flex items-center gap-3 pb-4 border-b border-border mb-4">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-bold">NutriSync AI</p>
                  <p className="text-xs text-green-500">● Active now</p>
                </div>
              </div>

              {/* CHAT */}
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">

                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex items-end gap-2 ${
                      m.role === "user" ? "justify-end" : ""
                    }`}
                  >
                    {/* AI ICON */}
                    {m.role === "ai" && (
                      <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
                        <Bot className="w-3 h-3 text-accent" />
                      </div>
                    )}

                    {/* MESSAGE */}
                    <div
                      className={`px-4 py-2.5 text-sm rounded-2xl max-w-[80%] leading-relaxed shadow-sm ${
                        m.role === "user"
                          ? "bg-primary text-white rounded-br-md"
                          : "bg-muted text-foreground rounded-bl-md"
                      }`}
                    >
                      {m.text}
                    </div>

                    {/* USER ICON */}
                    {m.role === "user" && (
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-3 h-3 text-primary" />
                      </div>
                    )}
                  </div>
                ))}

                {/* TYPING INDICATOR */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
                    <Bot className="w-3 h-3 text-accent" />
                  </div>
                  <div className="bg-muted px-4 py-2 rounded-2xl flex gap-1">
                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce delay-150" />
                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce delay-300" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AICoach;