import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrencyCompact } from "../../lib/utils";

interface SavingsComparisonChartProps {
  baselineCost: number;
  hybridCost: number;
}

export function SavingsComparisonChart({
  baselineCost,
  hybridCost,
}: SavingsComparisonChartProps) {
  const data = [
    { name: "All Flash", value: baselineCost, fill: "#47a9ff" },
    { name: "Scality Hybrid", value: hybridCost, fill: "#8fe388" },
  ];

  return (
    <div className="h-44 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 8, left: 8, bottom: 8 }}
        >
          <CartesianGrid
            horizontal={false}
            stroke="rgba(255,255,255,0.08)"
            strokeDasharray="4 4"
          />
          <XAxis
            type="number"
            tick={{ fill: "#9db0ce", fontSize: 12 }}
            tickFormatter={formatCurrencyCompact}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "#eaf1ff", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
            width={110}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
            formatter={(value: number) => formatCurrencyCompact(value)}
            contentStyle={{
              background: "rgba(7, 14, 26, 0.96)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "16px",
              color: "#eef4ff",
            }}
          />
          <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={20}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
