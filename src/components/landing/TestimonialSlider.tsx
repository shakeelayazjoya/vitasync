import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Raza",
    role: "Fitness Enthusiast, Lahore",
    text: "Finally an app that knows what a plate of biryani actually contains! Lost 8kg in 3 months without giving up desi food.",
    avatar: "🏋️",
    rating: 5,
  },
  {
    name: "Fatima Khan",
    role: "Mother of 3, Islamabad",
    text: "I track meals for my whole family. The kids' profiles and doctor reports feature saved us so many trips to the nutritionist.",
    avatar: "👩‍👧‍👦",
    rating: 5,
  },
  {
    name: "Dr. Hassan Ali",
    role: "Diabetic Patient, Karachi",
    text: "The body response tracking helped me identify which foods spike my sugar. My HbA1c dropped from 8.2 to 6.9!",
    avatar: "🩺",
    rating: 5,
  },
  {
    name: "Sara Malik",
    role: "Working Professional, Faisalabad",
    text: "The AI coach noticed my energy crashes after chai. Switched to green tea after lunch and my productivity skyrocketed!",
    avatar: "💼",
    rating: 5,
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const id = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, [isAutoPlaying]);

  const go = (dir: number) => {
    setIsAutoPlaying(false);
    setCurrent((p) => (p + dir + testimonials.length) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container-narrow relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Loved by <span className="gradient-text">Thousands</span> Across Pakistan
          </h2>
        </div>

        {/* Main card */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-8 md:p-10 relative">
            <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10" />
            
            <div className="flex gap-1 mb-4">
              {Array(t.rating).fill(0).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6 font-medium min-h-[80px]">
              "{t.text}"
            </p>
            
            <div className="flex items-center gap-4">
              <span className="text-3xl bg-muted w-14 h-14 rounded-full flex items-center justify-center">{t.avatar}</span>
              <div>
                <p className="font-bold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => go(-1)}
              className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIsAutoPlaying(false); setCurrent(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
