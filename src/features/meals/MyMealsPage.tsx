import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchUserMeals } from "@/redux/thunks/userMeals";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MyMealsPage = () => {
  const dispatch = useAppDispatch();
  const { meals, isLoading, error } = useAppSelector((state) => state.userMeals);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    dispatch(fetchUserMeals());
  }, [dispatch]);

  const filteredMeals = useMemo(() => {
    const selfMeals = meals.filter((meal) => {
      const familyMember = meal.familyMember?.trim().toLowerCase();
      return !familyMember || familyMember === "self";
    });

    if (!startDate && !endDate) {
      return selfMeals;
    }

    const rangeStart = startDate ? new Date(startDate) : null;
    const rangeEnd = endDate ? new Date(endDate) : null;

    if (rangeEnd) {
      rangeEnd.setHours(23, 59, 59, 999);
    }

    return selfMeals.filter((meal) => {
      const loggedAt = new Date(meal.loggedAt);
      if (rangeStart && loggedAt < rangeStart) return false;
      if (rangeEnd && loggedAt > rangeEnd) return false;
      return true;
    });
  }, [meals, startDate, endDate]);

  const totalCalories = filteredMeals.reduce((sum, meal) => sum + meal.totalCalories, 0);
  const averageCalories = filteredMeals.length ? Math.round(totalCalories / filteredMeals.length) : 0;
  const totalMeals = filteredMeals.length;
  const dateSummary = startDate || endDate ? `${startDate || "Any"} → ${endDate || "Any"}` : "All dates";

  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="space-y-6 py-12">
      <PageHeader title="My Meals" description="Review your meal logs and filter entries by date range for faster insights." />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Meals in range</p>
            <p className="mt-2 text-3xl font-semibold text-foreground">{totalMeals}</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total calories</p>
            <p className="mt-2 text-3xl font-semibold text-foreground">{totalCalories} kcal</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Average per meal</p>
            <p className="mt-2 text-3xl font-semibold text-foreground">{averageCalories} kcal</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader className="gap-6 md:flex md:items-end md:justify-between">
          <div>
            <CardTitle className="text-base">Filter by date range</CardTitle>
            <p className="text-sm text-muted-foreground">Select a start and end date to view meals logged within that period.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Current range:</span>
            <span>{dateSummary}</span>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-[1fr_auto]">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-date">End date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex items-end justify-between gap-3">
            <div className="grid gap-2 rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
              <div className="text-foreground">{filteredMeals.length} logs</div>
              <div>Total {totalCalories} kcal</div>
              <div>Avg. {averageCalories} kcal / meal</div>
            </div>
            <Button variant="outline" className="h-10" onClick={resetFilters} disabled={!startDate && !endDate}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <Card>
          <CardContent className="p-8">
            <LoadingSpinner />
          </CardContent>
        </Card>
      ) : error ? (
        <Card>
          <CardContent className="p-8 text-center text-destructive">{error}</CardContent>
        </Card>
      ) : filteredMeals.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            No meals found for the selected date range. Adjust the filter or log a new meal.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredMeals.map((meal) => (
            <Card key={meal._id} className="border-border shadow-sm transition-shadow hover:shadow-md">
              <CardHeader className="space-y-4 p-6 pb-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-lg">{meal.mealType?.charAt(0).toUpperCase() + meal.mealType?.slice(1)}</CardTitle>
                    <p className="text-sm text-muted-foreground">Logged at {new Date(meal.loggedAt).toLocaleString()}</p>
                  </div>
                  <Badge variant="outline" className="uppercase text-[11px] font-semibold tracking-wide">
                    {meal.familyMember || "Self"}
                  </Badge>
                </div>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm text-muted-foreground">
                  <span className="rounded-lg border border-border bg-muted px-3 py-2">Total Calories: {meal.totalCalories} kcal</span>
                  <span className="rounded-lg border border-border bg-muted px-3 py-2">Energy: {meal.bodyResponse?.energy || "—"}</span>
                  <span className="rounded-lg border border-border bg-muted px-3 py-2">Mood: {meal.bodyResponse?.mood || "—"}</span>
                  <span className="rounded-lg border border-border bg-muted px-3 py-2">Digestion: {meal.bodyResponse?.digestion || "—"}</span>
                  <span className="rounded-lg border border-border bg-muted px-3 py-2">Focus: {meal.bodyResponse?.focus || "—"}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-0 px-6 pb-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  {meal.foods.map((food) => (
                    <div key={food._id} className="rounded-2xl border border-border bg-background p-4 shadow-sm">
                      <div className="flex items-center justify-between gap-3 text-sm font-semibold">
                        <span>{food.name}</span>
                        <Badge variant="secondary">{food.calories} kcal</Badge>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>{food.portion} {food.unit}</span>
                        <span>P {food.protein}g</span>
                        <span>C {food.carbs}g</span>
                        <span>F {food.fat}g</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyMealsPage;
