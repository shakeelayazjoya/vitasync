import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchUserMeals } from "@/redux/thunks/userMeals";

// Helper to group meals by date (YYYY-MM-DD)
function groupMealsByDate(meals) {
  return meals.reduce((acc, meal) => {
    const date = meal.loggedAt?.slice(0, 10) || meal.createdAt?.slice(0, 10);
    if (!date) return acc;
    if (!acc[date]) acc[date] = [];
    acc[date].push(meal);
    return acc;
  }, {});
}

const HistoryPage = () => {
  const dispatch = useAppDispatch();
  const { meals, isLoading, error } = useAppSelector((state) => state.userMeals);

  useEffect(() => {
    dispatch(fetchUserMeals());
  }, [dispatch]);

  // Group meals by date
  const grouped = groupMealsByDate(meals || []);
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="space-y-8 py-12">
      <PageHeader 
        title="History" 
        description="Your daily meal and nutrition history" 
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-destructive text-center py-12">{error}</div>
      ) : (
        <div className="space-y-8">
          {sortedDates.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
              No meal history found.
            </div>
          )}

          {sortedDates.map((date) => {
            const dayMeals = grouped[date];
            const totalCalories = dayMeals.reduce((sum, m) => sum + (m.totalCalories || 0), 0);
            const goal = 2000; // TODO: Replace with user goal if available
            const pct = Math.round((totalCalories / goal) * 100);
            const isOver = pct > 100;
            const mood = dayMeals.find((m) => m.bodyResponse?.mood)?.bodyResponse?.mood || "";

            // Circular progress value
            const progress = Math.min(pct, 100);

            return (
              <Card key={date} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  {/* Date Header */}
                  <div className="bg-muted/50 px-6 py-4 border-b flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-lg text-foreground">
                        {new Date(date).toLocaleDateString("en-US", { 
                          weekday: "long", 
                          month: "short", 
                          day: "numeric" 
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {dayMeals.length} meal{dayMeals.length !== 1 ? 's' : ''} logged
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Mood */}
                      {mood && (
                        <div className="text-3xl" title={`Mood: ${mood}`}>
                          {mood}
                        </div>
                      )}

                      {/* Calorie Summary */}
                      <div className="text-right">
                        <div className="flex items-baseline justify-end gap-1">
                          <span className={`font-mono text-2xl font-bold ${isOver ? "text-destructive" : "text-primary"}`}>
                            {totalCalories}
                          </span>
                          <span className="text-sm text-muted-foreground">/ {goal}</span>
                        </div>
                        <Badge variant={isOver ? "destructive" : "secondary"} className="text-xs font-mono">
                          {pct}% of goal
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar + Circular Indicator */}
                  <div className="px-6 pt-5 pb-6 border-b bg-card">
                    <div className="flex items-center gap-6">
                      {/* Circular Progress */}
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845
                               a 15.9155 15.9155 0 0 1 0 31.831
                               a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="3.5"
                          />
                          <path
                            d="M18 2.0845
                               a 15.9155 15.9155 0 0 1 0 31.831
                               a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={isOver ? "#ef4444" : "#3b82f6"}
                            strokeWidth="3.5"
                            strokeDasharray={`${progress}, 100`}
                            className="transition-all duration-500"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`font-mono font-bold text-lg ${isOver ? "text-destructive" : "text-primary"}`}>
                            {pct}%
                          </span>
                        </div>
                      </div>

                      {/* Linear Progress Bar (for visual reinforcement) */}
                      <div className="flex-1">
                        <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${isOver ? "bg-destructive" : "bg-primary"}`}
                            style={{ width: `${Math.min(pct, 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Daily calorie intake
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Meals List */}
                  <div className="divide-y divide-border">
                    {dayMeals.map((meal) => (
                      <div key={meal._id} className="px-6 py-5 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-base capitalize">
                                {meal.mealType}
                              </span>
                              <span className="text-xs text-muted-foreground font-mono">
                                {new Date(meal.loggedAt || meal.createdAt).toLocaleTimeString([], { 
                                  hour: "2-digit", 
                                  minute: "2-digit" 
                                })}
                              </span>
                            </div>

                            <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {meal.foods?.map((f) => f.name).join(", ") || "No foods listed"}
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <div className="font-mono font-semibold text-foreground">
                              {meal.totalCalories} kcal
                            </div>
                            {meal.bodyResponse?.mood && (
                              <div className="text-xs text-muted-foreground mt-0.5">
                                Mood: {meal.bodyResponse.mood}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;