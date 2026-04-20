import { TrendingUp, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockInsights } from "@/utils/mockData";
import { useEffect, useMemo } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchUserMeals } from "@/redux/thunks/userMeals";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";
import PageHeader from "@/components/shared/PageHeader";

const iconMap = { warning: AlertTriangle, info: Info, success: CheckCircle };
const colorMap = { warning: "text-warning", info: "text-secondary", success: "text-primary" };
const bgMap = { warning: "bg-warning/10", info: "bg-secondary/10", success: "bg-primary/10" };


// Helper: get last 7 days (Mon-Sun) labels
function getLast7Days() {
  const days = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    days.push({
      date: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
    });
  }
  return days;
}

const AnalyticsPage = () => {
  const dispatch = useAppDispatch();
  const { meals, isLoading, error } = useAppSelector((state) => state.userMeals);

  useEffect(() => {
    if (!meals || meals.length === 0) dispatch(fetchUserMeals());
  }, [dispatch]);

  // Compute weekly data from meals
  const weeklyData = useMemo(() => {
    const days = getLast7Days();
    return days.map(({ date, label }) => {
      const dayMeals = (meals || []).filter(
        (m) => (m.loggedAt || m.createdAt)?.slice(0, 10) === date
      );
      const calories = dayMeals.reduce((sum, m) => sum + (m.totalCalories || 0), 0);
      // Average energy (if available)
      let energy = null;
      const energies = dayMeals.map((m) => m.bodyResponse?.energy).filter((e) => typeof e === "number");
      if (energies.length > 0) {
        energy = energies.reduce((a, b) => a + b, 0) / energies.length;
      }
      return {
        day: label,
        calories,
        energy: energy !== null ? Math.round(energy) : 0,
      };
    });
  }, [meals]);

  return (
    <div className="space-y-6 py-12">
      <PageHeader title="Analytics" description="Insights and patterns from your nutrition data" />

      {isLoading ? (
        <div className="flex justify-center py-12"><span>Loading...</span></div>
      ) : error ? (
        <div className="text-destructive text-center py-12">{error}</div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Weekly Calories</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                      <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem" }} />
                      <Bar dataKey="calories" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-base">Energy Trend</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                      <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} domain={[0, 10]} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem" }} />
                      <Line type="monotone" dataKey="energy" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(var(--accent))" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle className="text-base">Smart Insights</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {mockInsights.map((insight) => {
                const Icon = iconMap[insight.type];
                return (
                  <div key={insight.id} className={`flex gap-3 p-4 rounded-xl ${bgMap[insight.type]}`}>
                    <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${colorMap[insight.type]}`} />
                    <div>
                      <p className="font-medium text-foreground text-sm">{insight.title}</p>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AnalyticsPage;
