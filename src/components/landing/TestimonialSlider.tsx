'use client'

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Raza",
    role: "Gym Enthusiast • Lahore",
    text: "I stopped guessing my diet. Even with biryani and paratha, I managed to lose 8kg — without starving myself.",
    avatar: "🏋️",
    rating: 5,
  },
  {
    name: "Fatima Khan",
    role: "Mother of 3 • Islamabad",
    text: "Managing my kids’ meals and my parents’ health in one app is a lifesaver. The reports helped our doctor instantly.",
    avatar: "👩‍👧‍👦",
    rating: 5,
  },
  {
    name: "Dr. Hassan Ali",
    role: "Diabetic • Karachi",
    text: "I finally understood which foods spike my sugar. My HbA1c improved significantly within months.",
    avatar: "🩺",
    rating: 5,
  },
  {
    name: "Sara Malik",
    role: "Working Professional • Faisalabad",
    text: "The AI insights were scary accurate. Fixing small habits boosted my daily energy more than I expected.",
    avatar: "💼",
    rating: 5,
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => {
      setCurrent((p) => (p + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(id);
  }, [auto]);

  const next = () => {
    setAuto(false);
    setCurrent((p) => (p + 1) % testimonials.length);
  };

  const prev = () => {
    setAuto(false);
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-28 overflow-hidden bg-background">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-[500px] h-[500px] bg-primary/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-widest text-sm font-semibold mb-3">
            Testimonials
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Real People. <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Real Results.
            </span>
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Thousands across Pakistan are improving their health without giving up the food they love.
          </p>
        </div>

        {/* SLIDER */}
        <div className="relative h-[320px] flex items-center justify-center">

          {testimonials.map((t, i) => {
            const position =
              i === current
                ? "translate-x-0 scale-100 z-20 opacity-100"
                : i === (current + 1) % testimonials.length
                ? "translate-x-[60%] scale-90 z-10 opacity-40"
                : i === (current - 1 + testimonials.length) % testimonials.length
                ? "-translate-x-[60%] scale-90 z-10 opacity-40"
                : "opacity-0";

            return (
              <div
                key={i}
                className={`absolute w-full max-w-xl transition-all duration-700 ease-in-out ${position}`}
              >
                <div className="p-[1px] rounded-3xl bg-gradient-to-br from-primary/40 to-accent/40 shadow-xl">
                  <div className="bg-background/90 backdrop-blur-xl p-8 rounded-3xl">

                    <Quote className="w-10 h-10 text-primary/10 mb-4" />

                    {/* STARS */}
                    <div className="flex gap-1 mb-4">
                      {Array(t.rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-primary text-primary"
                          />
                        ))}
                    </div>

                    {/* TEXT */}
                    <p className="text-lg text-foreground leading-relaxed mb-6 font-medium">
                      "{t.text}"
                    </p>

                    {/* USER */}
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-2xl">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="font-bold">{t.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {t.role}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}

          {/* CONTROLS */}
          <div className="absolute bottom-[-60px] flex items-center gap-6">

            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition"
            >
              <ChevronRight />
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialSlider;