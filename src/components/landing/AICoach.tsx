import { Bot, User, Sparkles } from "lucide-react";
import aiIllustration from "@/assets/ai-illustration.png";

const messages = [
  { role: "ai", text: "I noticed you feel bloated after chai with milk. Have you tried switching to green tea after heavy meals?" },
  { role: "user", text: "Really? I never connected the two!" },
  { role: "ai", text: "Your energy dips around 3 PM on days you skip protein at lunch. Try adding daal or chicken to your afternoon meal." },
  { role: "user", text: "That makes so much sense. What about my sleep?" },
  { role: "ai", text: "Your sleep quality improves 23% on days you eat dinner before 8 PM. Let's set a reminder! 🌙" },
];

const AICoach = () => (
  <section className="section-padding bg-card relative overflow-hidden">
    {/* Accent glow */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/8 rounded-full blur-[120px]" />

    <div className="container-narrow relative">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-accent/20">
            <Sparkles className="h-3.5 w-3.5" /> AI-Powered
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Your Personal{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-accent)" }}>
              AI Health Coach
            </span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            VitaSync's AI analyzes your food patterns, body responses, and habits to give you insights no generic app ever could.
          </p>

          {/* AI Brain illustration */}
          <img
            src={aiIllustration}
            alt="AI Brain visualization"
            className="w-48 h-48 object-contain mb-6 opacity-80"
            loading="lazy"
            width={700}
            height={700}
          />

          <ul className="space-y-3 text-sm text-muted-foreground">
            {["Detects food sensitivities", "Finds energy & mood patterns", "Personalized meal suggestions", "Understands desi food context"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-5 max-w-md mx-auto w-full shadow-xl">
          <div className="flex items-center gap-2 pb-4 border-b border-border mb-4">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <Bot className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">VitaSync Coach</p>
              <p className="text-[10px] text-primary">● Online</p>
            </div>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "ai" && (
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-3 w-3 text-accent" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm max-w-[80%] ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  {m.text}
                </div>
                {m.role === "user" && (
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-3 w-3 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AICoach;
