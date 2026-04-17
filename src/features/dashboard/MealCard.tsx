import { Badge } from "@/components/ui/badge";

interface MealCardProps {
  type: string;
  time: string;
  foods: string[];
  calories: number;
  mood: string;
  energy: string;
  digestion: string;
}

const MealCard = ({ type, time, foods, calories, mood, energy, digestion }: MealCardProps) => (
  <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <Badge variant="outline" className="text-xs border-primary/30 text-primary">{type}</Badge>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
      <p className="text-sm text-foreground truncate">{foods.join(", ")}</p>
    </div>
    <div className="text-right shrink-0">
      <p className="font-mono font-semibold text-primary">{calories}</p>
      <p className="text-xs text-muted-foreground">kcal</p>
    </div>
    {(mood || energy || digestion) && (
      <div className="flex gap-1 text-base shrink-0">
        {energy && <span title="Energy">{energy}</span>}
        {mood && <span title="Mood">{mood}</span>}
        {digestion && <span title="Digestion">{digestion}</span>}
      </div>
    )}
  </div>
);

export default MealCard;
