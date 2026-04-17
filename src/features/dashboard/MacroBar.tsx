interface MacroBarProps {
  label: string;
  current: number;
  goal: number;
  color: string;
}

const MacroBar = ({ label, current, goal, color }: MacroBarProps) => {
  const pct = Math.min((current / goal) * 100, 100);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="font-mono text-muted-foreground">{current}g / {goal}g</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-700 ease-out`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default MacroBar;
