'use client'

import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "0",
    description: "Perfect for getting started with basic tracking",
    features: [
      "Track up to 3 meals per day",
      "Basic calorie & macro tracking",
      "Access to 50+ desi foods",
      "Weekly health summary",
    ],
    highlight: false,
    cta: "Start Free",
  },
  {
    name: "Pro",
    price: "500",
    description: "Unlock full NutriSync experience with AI insights",
    features: [
      "Unlimited meal tracking",
      "Body response monitoring",
      "AI Health Coach insights",
      "Smart pattern detection",
      "Doctor-ready PDF reports",
      "500+ desi food database",
    ],
    highlight: true,
    cta: "Upgrade to Pro",
  },
  {
    name: "Family",
    price: "800",
    description: "Manage health for your entire family",
    features: [
      "Everything in Pro",
      "Up to 5 family profiles",
      "Shared dashboards",
      "Family meal planning",
      "Priority support",
    ],
    highlight: false,
    cta: "Get Family Plan",
  },
];

const Pricing = () => {
  return (
    <section className="relative py-28 bg-background overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20">
          <p className="text-primary uppercase tracking-widest text-sm font-semibold mb-3">
            Pricing
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Simple Pricing. <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              No Surprises.
            </span>
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Start free and upgrade when you're ready. No hidden fees.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8">

          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-3xl transition-all duration-300 hover:-translate-y-2 ${
                plan.highlight ? "scale-105 z-10" : ""
              }`}
            >
              {/* GLOW FOR PRO */}
              {plan.highlight && (
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-30"></div>
              )}

              {/* CARD */}
              <div
                className={`relative rounded-3xl p-7 h-full flex flex-col shadow-xl ${
                  plan.highlight
                    ? "bg-[#0B0F19] text-white border border-primary/30"
                    : "bg-white/70 backdrop-blur-md border border-gray-200"
                }`}
              >

                {/* BADGE */}
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full shadow-md">
                    Most Popular
                  </span>
                )}

                {/* TITLE */}
                <h3 className="text-xl font-bold mb-2">
                  {plan.name}
                </h3>

                {/* DESC */}
                <p className={`text-sm mb-5 ${
                  plan.highlight ? "text-white/70" : "text-muted-foreground"
                }`}>
                  {plan.description}
                </p>

                {/* PRICE */}
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">
                    PKR {plan.price}
                  </span>
                  {plan.price !== "0" && (
                    <span className={`text-sm ${
                      plan.highlight ? "text-white/60" : "text-muted-foreground"
                    }`}>
                      {" "} /month
                    </span>
                  )}
                </div>

                {/* CTA */}
                <button
                  className={`w-full py-3 rounded-xl font-semibold mb-6 transition ${
                    plan.highlight
                      ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30"
                      : "bg-gray-100 hover:bg-gray-200 text-foreground"
                  }`}
                >
                  {plan.cta}
                </button>

                {/* FEATURES */}
                <ul className="space-y-3 mt-auto">
                  {plan.features.map((f, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-3 text-sm ${
                        plan.highlight ? "text-white/80" : "text-muted-foreground"
                      }`}
                    >
                      <Check className="w-4 h-4 text-primary mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Pricing;