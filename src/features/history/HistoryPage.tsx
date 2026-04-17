import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockHistory } from "@/utils/mockData";
import PageHeader from "@/components/shared/PageHeader";

const HistoryPage = () => (
  <div className="space-y-6 py-12">
    <PageHeader title="History" description="Your daily meal and nutrition history" />
    <div className="space-y-3">
      {mockHistory.map((day) => {
        const pct = Math.round((day.calories / day.goal) * 100);
        const isOver = pct > 100;
        return (
          <Card key={day.date} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-1">
                <p className="font-medium text-foreground">{new Date(day.date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</p>
                <p className="text-sm text-muted-foreground">{day.meals} meals logged</p>
              </div>
              <div className="text-center">
                <p className={`font-mono font-bold ${isOver ? "text-destructive" : "text-primary"}`}>{day.calories}</p>
                <p className="text-xs text-muted-foreground">/ {day.goal} kcal</p>
              </div>
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${isOver ? "bg-destructive" : "bg-primary"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
              </div>
              <span className="text-xl">{day.mood}</span>
              <Badge variant={isOver ? "destructive" : "outline"} className="text-xs">{pct}%</Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  </div>
);

export default HistoryPage;
