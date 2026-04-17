import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface WeeklyChartProps {
  data: Array<Record<string, string | number>>;
  secondaryDataKey?: string;
  secondaryLabel?: string;
}

const WeeklyChart = ({ data, secondaryDataKey = "energy", secondaryLabel = "Energy" }: WeeklyChartProps) => {
  const hasSecondary = secondaryDataKey ? data.some((item) => typeof item[secondaryDataKey] === "number") : false;

  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
          <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.75rem",
              fontSize: "13px",
            }}
          />
          <Line type="monotone" dataKey="calories" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(var(--primary))" }} name="Calories" />
          {hasSecondary && (
            <Line
              type="monotone"
              dataKey={secondaryDataKey}
              stroke="hsl(var(--accent))"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "hsl(var(--accent))" }}
              name={secondaryLabel}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyChart;
