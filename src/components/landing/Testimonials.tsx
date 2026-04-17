import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Raza",
    role: "Fitness Enthusiast, Lahore",
    text: "Finally an app that knows what a plate of biryani actually contains! Lost 8kg in 3 months without giving up desi food.",
    avatar: "🏋️",
  },
  {
    name: "Fatima Khan",
    role: "Mother of 3, Islamabad",
    text: "I track meals for my whole family. The kids' profiles and doctor reports feature saved us so many trips to the nutritionist.",
    avatar: "👩‍👧‍👦",
  },
  {
    name: "Dr. Hassan Ali",
    role: "Diabetic Patient, Karachi",
    text: "The body response tracking helped me identify which foods spike my sugar. My HbA1c dropped from 8.2 to 6.9!",
    avatar: "🩺",
  },
  {
    name: "Sara Malik",
    role: "Working Professional, Faisalabad",
    text: "The AI coach noticed my energy crashes after chai. Switched to green tea after lunch and my productivity skyrocketed!",
    avatar: "💼",
  },
];

const Testimonials = () => (
  <section className="section-padding bg-background">
    <div className="container-narrow">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Testimonials</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
          Loved by <span className="gradient-text">Thousands</span> Across Pakistan
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {testimonials.map((t) => (
          <div key={t.name} className="glass-card-hover p-5">
            <div className="flex gap-0.5 mb-3">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
            <div className="flex items-center gap-3 pt-3 border-t border-border">
              <span className="text-2xl">{t.avatar}</span>
              <div>
                <p className="text-sm font-bold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
