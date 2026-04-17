import { useEffect, useState } from "react";

interface CalorieRingProps {
  consumed: number;
  goal: number;
  protein: { current: number; goal: number };
  carbs: { current: number; goal: number };
  fat: { current: number; goal: number };
}

const CalorieRing = ({ consumed, goal, protein, carbs, fat }: CalorieRingProps) => {
  const [progress, setProgress] = useState(0);
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const percentage = goal > 0 ? Math.min(consumed / goal, 1) : 0;

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const segments = [
    { label: "Protein", ratio: protein.current / (protein.current + carbs.current + fat.current || 1), color: "hsl(var(--accent))" },
    { label: "Carbs", ratio: carbs.current / (protein.current + carbs.current + fat.current || 1), color: "hsl(var(--secondary))" },
    { label: "Fat", ratio: fat.current / (protein.current + carbs.current + fat.current || 1), color: "hsl(var(--primary))" },
  ];

  let cumulativeOffset = 0;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[200px] h-[200px]">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
          <circle cx="100" cy="100" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="12" />
          {segments.map((seg, i) => {
            const segLength = circumference * progress * seg.ratio;
            const offset = circumference - cumulativeOffset;
            cumulativeOffset += segLength;
            return (
              <circle
                key={i}
                cx="100" cy="100" r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${segLength} ${circumference - segLength}`}
                strokeDashoffset={offset}
                className="transition-all duration-1000 ease-out"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold font-mono text-foreground">{consumed.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">/ {goal.toLocaleString()} kcal</span>
        </div>
      </div>
      <div className="flex gap-4 mt-3">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-1.5 text-xs">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
            <span className="text-muted-foreground">{seg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalorieRing;
