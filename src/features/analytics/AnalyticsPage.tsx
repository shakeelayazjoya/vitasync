import { TrendingUp, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockInsights, mockWeeklyData } from "@/utils/mockData";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";
import PageHeader from "@/components/shared/PageHeader";

const iconMap = { warning: AlertTriangle, info: Info, success: CheckCircle };
const colorMap = { warning: "text-warning", info: "text-secondary", success: "text-primary" };
const bgMap = { warning: "bg-warning/10", info: "bg-secondary/10", success: "bg-primary/10" };

const AnalyticsPage = () => (
  <div className="space-y-6 py-12">
    <PageHeader title="Analytics" description="Insights and patterns from your nutrition data" />

    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle className="text-base">Weekly Calories</CardTitle></CardHeader>
        <CardContent>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockWeeklyData}>
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
              <LineChart data={mockWeeklyData}>
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
  </div>
);

export default AnalyticsPage;
