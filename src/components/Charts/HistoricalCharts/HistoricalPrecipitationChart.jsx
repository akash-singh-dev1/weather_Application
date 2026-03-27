import { useMemo } from "react";
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartContainer from "../ChartContainer";

const PrecipitationChart = ({ dailyData }) => {
  const chartData = useMemo(() => {
    if (!dailyData) return [];
    return dailyData?.time.map((date, index) => ({
      date,
      precipitation: dailyData?.precipitation_sum[index],
    }));
  }, [dailyData]);

  return (
    <ChartContainer title="Total Precipitation (mm)">
      <BarChart
        data={chartData}
        margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorPrecipBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.4} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="4 4"
          vertical={false}
          stroke="#cbd5e1"
          strokeOpacity={0.4}
        />

        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748b", fontSize: 12 }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748b", fontSize: 12 }}
          dx={-10}
          unit="mm"
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(12px)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            color: "#0f172a",
            padding: "12px",
          }}
          itemStyle={{ color: "#3b82f6", fontWeight: "700" }}
          labelStyle={{
            color: "#64748b",
            fontWeight: "500",
            marginBottom: "4px",
          }}
          labelFormatter={(label) => `Date: ${label}`}
          formatter={(value) => [`${value} mm`, "Precipitation"]}
          cursor={{ fill: "rgba(59, 130, 246, 0.05)" }}
        />

        <Bar
          dataKey="precipitation"
          fill="url(#colorPrecipBar)"
          radius={[6, 6, 0, 0]}
          maxBarSize={40}
        />

        <Brush dataKey="date" height={30} stroke="#94a3b8" fill="#f8fafc" />
      </BarChart>
    </ChartContainer>
  );
};

export default PrecipitationChart;
