import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartContainer from "./ChartContainer";

const VisibilityChart = ({ hourlyData }) => {
  const chartData = useMemo(() => {
    if (!hourlyData) return [];
    return hourlyData?.time.map((time, index) => ({
      time: time.split("T")[1],
      visibility: (hourlyData?.visibility[index] / 1000).toFixed(1),
    }));
  }, [hourlyData]);

  return (
    <ChartContainer title="Visibility (km)">
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="4 4"
          vertical={false}
          stroke="#cbd5e1"
          strokeOpacity={0.4}
        />

        <XAxis
          dataKey="time"
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
          itemStyle={{ color: "#6366f1", fontWeight: "700" }}
          labelStyle={{
            color: "#64748b",
            fontWeight: "500",
            marginBottom: "4px",
          }}
          labelFormatter={(label) => `${label} hr`}
          formatter={(value) => [`${value} km`, "Visibility"]}
        />

        <Area
          type="monotone"
          dataKey="visibility"
          stroke="#6366f1"
          strokeWidth={3}
          fill="url(#colorVis)"
          activeDot={{ r: 6, strokeWidth: 0, fill: "#6366f1" }}
        />

        <Brush dataKey="time" height={30} stroke="#94a3b8" fill="#f8fafc" />
      </AreaChart>
    </ChartContainer>
  );
};

export default VisibilityChart;
