import { Users, Activity, UtensilsCrossed, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { useAppSelector } from "@/hooks/useAppSelector";
import { formatNumber } from "@/utils/formatters";

const AdminDashboard = () => {
  const { stats, userGrowth, planDistribution } = useAppSelector((s) => s.admin);
  const { users } = useAppSelector((s) => s.admin);

  const kpis = [
    { label: "Total Users", value: formatNumber(stats.totalUsers), icon: Users, color: "text-primary" },
    { label: "Active Today", value: formatNumber(stats.activeToday), icon: Activity, color: "text-secondary" },
    { label: "Meals Today", value: formatNumber(stats.mealsLoggedToday), icon: UtensilsCrossed, color: "text-accent" },
    { label: "AI Messages", value: formatNumber(stats.aiMessagesSent), icon: Bot, color: "text-warning" },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 bg-muted rounded-xl flex items-center justify-center">
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <p className="text-xl font-bold font-mono text-foreground">{kpi.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* User Growth */}
        <Card className="lg:col-span-3">
          <CardHeader><CardTitle className="text-base">User Growth (30 days)</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} interval={4} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem" }} />
                  <Area type="monotone" dataKey="users" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.15} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Plan Distribution */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Plan Distribution</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={planDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={50} paddingAngle={3}>
                    {planDistribution.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 mt-2 justify-center">
              {planDistribution.map((p) => (
                <div key={p.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.fill }} />
                  <span className="text-muted-foreground">{p.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Signups */}
      <Card>
        <CardHeader><CardTitle className="text-base">Recent Signups</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Goal</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.slice(0, 5).map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{u.plan}</Badge></TableCell>
                  <TableCell className="text-muted-foreground text-sm">{u.goal}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{u.joined}</TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${u.status === "active" ? "bg-primary/15 text-primary border-0" : "bg-destructive/15 text-destructive border-0"}`}>
                      {u.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
