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
import { useTemperatureUnit } from "../../context/TemperatureUnitContext";
import { convertTemperature } from "../../utils/convertTemperature";
import ChartContainer from "./ChartContainer";

const TemperatureChart = ({ hourlyData }) => {
  const { unit } = useTemperatureUnit();
  const unitSymbol = unit === "celsius" ? "°C" : "°F";

  const chartData = useMemo(() => {
    if (!hourlyData) return [];

    return hourlyData.time.map((time, index) => ({
      time: time.split("T")[1],
      temperature: convertTemperature(hourlyData.temperature_2m[index], unit),
    }));
  }, [hourlyData, unit]);

  return (
    <ChartContainer title={`Temperature (${unitSymbol})`}>
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="tempColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
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

        {/* Glassmorphic Tooltip */}
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(12px)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            color: "#0f172a",
            padding: "12px",
          }}
          itemStyle={{ color: "#3b82f6", fontWeight: "700", fontSize: "16px" }}
          labelStyle={{
            color: "#64748b",
            fontWeight: "500",
            marginBottom: "4px",
          }}
          labelFormatter={(label) => `${label} hr`}
          formatter={(value) => [`${value}${unitSymbol}`, "Temp"]}
        />

        {/* The Line & Gradient Area */}
        <Area
          type="monotone"
          dataKey="temperature"
          stroke="#3b82f6"
          strokeWidth={3}
          fill="url(#tempColor)"
          activeDot={{
            r: 6,
            strokeWidth: 0,
            fill: "#3b82f6",
            shadow: "0 0 10px rgba(59,130,246,0.5)",
          }}
        />

        {/* Kept your brush, but made the lines match the brand colors */}
        <Brush dataKey="time" height={30} stroke="#94a3b8" fill="#f8fafc" />
      </AreaChart>
    </ChartContainer>
  );
};

export default TemperatureChart;
