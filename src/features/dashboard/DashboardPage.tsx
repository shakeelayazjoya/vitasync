import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Flame, Droplets, UtensilsCrossed, Zap, Sparkles, Bot, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAuth } from "@/hooks/useAuth";
import { getGreeting, formatDate } from "@/utils/formatters";
import CalorieRing from "./CalorieRing";
import MacroBar from "./MacroBar";
import MealCard from "./MealCard";
import WeeklyChart from "./WeeklyChart";
import { fetchDashboardStats } from "@/redux/thunks/dashboard";
import { fetchTodayMeals } from "@/redux/thunks/todayMeals";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { stats, aiTip } = useAppSelector((s) => s.dashboard);
  const apiStats = useAppSelector((s) => s.dashboardStats.stats);

  const monthlyChartData = apiStats?.days?.map((day) => ({
    day: new Date(day.date).toLocaleDateString([], { day: "numeric", month: "short" }),
    calories: day.consumedCalories,
    goal: day.calorieGoal,
  })) ?? [];
  const { meals: todayMeals, isLoading: isTodayMealsLoading, error: todayMealsError } = useAppSelector((s) => s.todayMeals);
  const todayMealsList = Array.isArray(todayMeals) ? todayMeals : [];

  const todayTotals = todayMealsList.reduce(
    (acc, meal) => {
      acc.calories += meal.totalCalories;
      meal.foods.forEach((food) => {
        acc.protein += food.protein;
        acc.carbs += food.carbs;
        acc.fat += food.fat;
      });
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const todayProgress = {
    consumed: todayTotals.calories,
    goal: apiStats?.calorieGoal ?? stats.caloriesGoal,
    protein: {
      current: todayTotals.protein,
      goal: stats.protein.goal,
    },
    carbs: {
      current: todayTotals.carbs,
      goal: stats.carbs.goal,
    },
    fat: {
      current: todayTotals.fat,
      goal: stats.fat.goal,
    },
  };

  const todayReportData = todayMealsList.map((meal) => ({
    day: meal.mealType
      ? `${meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)} ${new Date(meal.loggedAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      : new Date(meal.loggedAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
    calories: meal.totalCalories,
    energy: meal.bodyResponse?.energy ?? 0,
  }));

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchTodayMeals());
  }, [dispatch]);

  const statCards = [
    {
      label: "Total Calories",
      value: apiStats ? `${apiStats.totalConsumedCalories}` : "—",
      sub: "kcal consumed",
      icon: Flame,
      color: "text-primary",
    },
    {
      label: "Monthly Goal",
      value: apiStats ? `${apiStats.monthlyGoalCalories}` : "—",
      sub: "kcal target",
      icon: Droplets,
      color: "text-secondary",
    },
    {
      label: "Goal Days Reached",
      value: apiStats ? `${apiStats.goalDaysReached}` : "—",
      sub: "days",
      icon: UtensilsCrossed,
      color: "text-accent",
    },
    {
      label: "Month Length",
      value: apiStats ? `${apiStats.totalMonthDays}` : "—",
      sub: "days",
      icon: Zap,
      color: "text-warning",
    },
  ];

  return (
    <div className="py-12">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">{getGreeting()}, {user?.name?.split(" ")[0]} 👋</h1>
        <p className="text-muted-foreground text-sm">{formatDate()}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-3">
        {statCards.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl bg-muted flex items-center justify-center`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-xl font-bold font-mono text-foreground">{s.value} <span className="text-xs font-normal text-muted-foreground">{s.sub}</span></p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-5 gap-6 py-3">
        {/* Left: Calorie Ring + Macros */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Today's Progress</CardTitle></CardHeader>
          <CardContent className="">
            <CalorieRing
              consumed={todayProgress.consumed}
              goal={todayProgress.goal}
              protein={todayProgress.protein}
              carbs={todayProgress.carbs}
              fat={todayProgress.fat}
            />
            <div className="space-y-3">
              <MacroBar label="Protein" current={todayProgress.protein.current} goal={todayProgress.protein.goal} color="bg-accent" />
              <MacroBar label="Carbs" current={todayProgress.carbs.current} goal={todayProgress.carbs.goal} color="bg-secondary" />
              <MacroBar label="Fat" current={todayProgress.fat.current} goal={todayProgress.fat.goal} color="bg-primary" />
            </div>

             
          </CardContent>
        </Card>

        {/* Right: Meals + AI Tip */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Today's Meals</CardTitle>
              <Link to="/log-meal">
                <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Log Meal</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {isTodayMealsLoading ? (
                <div className="py-8">
                  <LoadingSpinner />
                </div>
              ) : todayMealsError ? (
                <div className="text-destructive">{todayMealsError}</div>
              ) : todayMealsList.length === 0 ? (
                <div className="text-sm text-muted-foreground">No meals logged today. Log your first meal to see it here.</div>
              ) : (
                todayMealsList.map((meal) => {
                  const time = new Date(meal.loggedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <MealCard
                      key={meal._id}
                      type={meal.mealType || "Meal"}
                      time={time}
                      foods={meal.foods.map((food) => food.name)}
                      calories={meal.totalCalories}
                      mood={meal.bodyResponse?.mood ?? ""}
                      energy={meal.bodyResponse?.energy?.toString() ?? ""}
                      digestion={meal.bodyResponse?.digestion ?? ""}
                    />
                  );
                })
              )}
            </CardContent>
          </Card>

          {/* AI Tip */}
          <Card className="border-accent/30 bg-accent/5">
            <CardContent className="p-5 flex gap-4 items-start">
              <div className="h-10 w-10 bg-accent/15 rounded-xl flex items-center justify-center shrink-0">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-accent/15 text-accent border-0 text-xs">AI Insight</Badge>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{aiTip}</p>
                <Link to="/ai-coach">
                  <Button variant="ghost" size="sm" className="mt-2 text-accent hover:text-accent hover:bg-accent/10 p-0">
                    <Bot className="h-4 w-4 mr-1" /> Ask AI Coach →
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Monthly Chart */}
      <Card>
        <CardHeader><CardTitle className="text-base">Monthly Overview</CardTitle></CardHeader>
        <CardContent>
          {monthlyChartData.length > 0 ? (
            <WeeklyChart data={monthlyChartData} secondaryDataKey="goal" secondaryLabel="Goal" />
          ) : (
            <div className="text-sm text-muted-foreground">Monthly overview data is not available yet.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
