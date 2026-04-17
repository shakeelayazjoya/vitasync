import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchUserMeals } from "@/redux/thunks/userMeals";
import { fetchFamilyMembers } from "@/redux/thunks/family";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FamilyMealsPage = () => {
  const dispatch = useAppDispatch();
  const { meals, isLoading, error } = useAppSelector((state) => state.userMeals);
  const { members } = useAppSelector((state) => state.family);
  const [selectedMember, setSelectedMember] = useState("all");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    dispatch(fetchUserMeals());
    dispatch(fetchFamilyMembers());
  }, [dispatch]);

  const familyMemberNames = useMemo(() => {
    const names = new Set<string>();

    members.forEach((member) => {
      if (member.name?.trim()) {
        names.add(member.name.trim());
      }
    });

    meals.forEach((meal) => {
      const name = meal.familyMember?.trim();
      if (name && name.toLowerCase() !== "self") {
        names.add(name);
      }
    });

    return Array.from(names).sort();
  }, [members, meals]);

  const todayStart = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const memberStats = useMemo(() => {
    const stats: Record<
      string,
      {
        name: string;
        goal?: string;
        totalCalories: number;
        mealCount: number;
        todayCalories: number;
        mealsToday: number;
        lastLoggedAt?: string;
      }
    > = {};

    const safeName = (member: { name?: string }) => member.name?.trim() || "Unknown";

    members.forEach((member) => {
      const name = safeName(member);
      stats[name] = {
        name,
        goal: member.goal ?? (member.calorieGoal ? `${member.calorieGoal} kcal` : undefined),
        totalCalories: 0,
        mealCount: 0,
        todayCalories: 0,
        mealsToday: 0,
      };
    });

    const isSameDay = (dateA: Date, dateB: Date) =>
      dateA.getFullYear() === dateB.getFullYear() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getDate() === dateB.getDate();

    meals.forEach((meal) => {
      const name = meal.familyMember?.trim();
      if (!name || name.toLowerCase() === "self") return;
      if (!stats[name]) {
        stats[name] = {
          name,
          totalCalories: 0,
          mealCount: 0,
          todayCalories: 0,
          mealsToday: 0,
        };
      }

      const loggedAt = new Date(meal.loggedAt);
      const memberStat = stats[name];
      memberStat.totalCalories += meal.totalCalories;
      memberStat.mealCount += 1;
      if (isSameDay(loggedAt, todayStart)) {
        memberStat.todayCalories += meal.totalCalories;
        memberStat.mealsToday += 1;
      }
      if (!memberStat.lastLoggedAt || new Date(memberStat.lastLoggedAt) < loggedAt) {
        memberStat.lastLoggedAt = meal.loggedAt;
      }
    });

    return Object.values(stats).sort((a, b) => b.todayCalories - a.todayCalories || b.totalCalories - a.totalCalories);
  }, [members, meals, todayStart]);

  const filteredMeals = useMemo(() => {
    const rangeStart = startDate ? new Date(startDate) : null;
    const rangeEnd = endDate ? new Date(endDate) : null;

    if (rangeEnd) {
      rangeEnd.setHours(23, 59, 59, 999);
    }

    return meals.filter((meal) => {
      const memberName = meal.familyMember?.trim();
      if (!memberName || memberName.toLowerCase() === "self") return false;
      if (selectedMember !== "all" && memberName !== selectedMember) return false;

      const loggedAt = new Date(meal.loggedAt);
      if (rangeStart && loggedAt < rangeStart) return false;
      if (rangeEnd && loggedAt > rangeEnd) return false;
      return true;
    });
  }, [meals, selectedMember, startDate, endDate]);

  const totalCalories = filteredMeals.reduce((sum, meal) => sum + meal.totalCalories, 0);
  const averageCalories = filteredMeals.length ? Math.round(totalCalories / filteredMeals.length) : 0;
  const dateSummary = startDate || endDate ? `${startDate || "Any"} → ${endDate || "Any"}` : "All dates";
  const memberSummary = selectedMember === "all" ? "All family members" : selectedMember;

  const resetFilters = () => {
    setSelectedMember("all");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="space-y-6 py-12">
      <PageHeader
        title="Family Meals"
        description="Review meals logged for family members and view nutrition details per member."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {memberStats.length > 0 ? (
          memberStats.map((member) => (
            <Card key={member.name} className="border-border">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.goal || "No goal set"}</p>
                  </div>
                  <Badge variant="outline" className="text-xs uppercase">
                    {member.mealCount} logs
                  </Badge>
                </div>

                <div className="grid gap-2 text-sm text-muted-foreground">
                  <div className="rounded-lg border border-border bg-muted px-3 py-2">
                    Today: <span className="font-semibold text-foreground">{member.todayCalories} kcal</span>
                  </div>
                  <div className="rounded-lg border border-border bg-muted px-3 py-2">
                    Meals today: <span className="font-semibold text-foreground">{member.mealsToday}</span>
                  </div>
                  <div className="rounded-lg border border-border bg-muted px-3 py-2">
                    Total calories: <span className="font-semibold text-foreground">{member.totalCalories} kcal</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="border-border">
            <CardContent className="p-5 text-sm text-muted-foreground">
              No family member stats available yet.
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="border-border">
        <CardHeader className="gap-6 md:flex md:items-end md:justify-between">
          <div>
            <CardTitle className="text-base">Filter family meal logs</CardTitle>
            <p className="text-sm text-muted-foreground">Select a family member and optional date range to narrow the meal list.</p>
          </div>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:items-center">
            <span className="font-medium text-foreground">Showing:</span>
            <span>{memberSummary}</span>
            <span>·</span>
            <span>{dateSummary}</span>
          </div>
        </CardHeader>

        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-[1fr_auto]">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="family-member">Family member</Label>
              <select
                id="family-member"
                value={selectedMember}
                onChange={(event) => setSelectedMember(event.target.value)}
                className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
                disabled={isLoading}
              >
                <option value="all">All family members</option>
                {familyMemberNames.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>

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
            <Button variant="outline" className="h-10" onClick={resetFilters} disabled={selectedMember === "all" && !startDate && !endDate}>
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
            No family meals found for the selected filters. Adjust the member or date range.
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
                    {meal.familyMember || "Family"}
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

export default FamilyMealsPage;
