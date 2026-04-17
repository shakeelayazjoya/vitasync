import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Get started with basic tracking",
    features: ["Log up to 3 meals/day", "Basic macro tracking", "50+ desi food items", "Weekly summary"],
    highlighted: false,
    cta: "Start Free",
  },
  {
    name: "Pro",
    price: "500",
    description: "Unlock the full VitaSync experience",
    features: ["Unlimited meal logging", "Body response tracking", "AI Health Coach", "Smart Insights", "Doctor PDF Reports", "500+ desi food database"],
    highlighted: true,
    cta: "Get Pro",
  },
  {
    name: "Family",
    price: "800",
    description: "Health tracking for the whole family",
    features: ["Everything in Pro", "Up to 5 family profiles", "Family health dashboard", "Shared meal plans", "Priority support"],
    highlighted: false,
    cta: "Get Family",
  },
];

const Pricing = () => (
  <section id="pricing" className="section-padding bg-card">
    <div className="container-narrow">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Pricing</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
          Simple, <span className="gradient-text">Affordable</span> Plans
        </h2>
        <p className="text-muted-foreground text-lg">Start free. Upgrade when you're ready.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-6 transition-all duration-300 ${
              plan.highlighted
                ? "bg-dark text-dark-foreground ring-2 ring-primary shadow-xl shadow-primary/10 scale-[1.03]"
                : "glass-card-hover"
            }`}
          >
            {plan.highlighted && (
              <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-4">Most Popular</span>
            )}
            <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? "" : "text-foreground"}`}>{plan.name}</h3>
            <p className={`text-sm mb-4 ${plan.highlighted ? "text-dark-foreground/70" : "text-muted-foreground"}`}>{plan.description}</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold">PKR {plan.price}</span>
              {plan.price !== "0" && <span className={`text-sm ${plan.highlighted ? "text-dark-foreground/60" : "text-muted-foreground"}`}>/month</span>}
            </div>
            <Button
              className={`w-full rounded-xl py-5 font-semibold mb-6 ${
                plan.highlighted
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {plan.cta}
            </Button>
            <ul className="space-y-2.5">
              {plan.features.map((f) => (
                <li key={f} className={`flex items-start gap-2 text-sm ${plan.highlighted ? "text-dark-foreground/80" : "text-muted-foreground"}`}>
                  <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${plan.highlighted ? "text-primary" : "text-primary"}`} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
