import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { mockWeeklyData } from "@/utils/mockData";

const AdminAnalytics = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader><CardTitle className="text-base">Platform Analytics</CardTitle></CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockWeeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem" }} />
              <Bar dataKey="calories" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Avg Calories" />
              <Bar dataKey="energy" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="Avg Energy" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AdminAnalytics;
