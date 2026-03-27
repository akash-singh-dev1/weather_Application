import { useMemo } from "react";
import {
  Area,
  Brush,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartContainer from "../ChartContainer";

const getCompassDirection = (deg) => {
  if (deg === undefined) return "N/A";
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

const WindChart = ({ dailyData }) => {
  const chartData = useMemo(() => {
    if (!dailyData) return [];
    return dailyData?.time.map((date, index) => ({
      date,
      speed: dailyData?.wind_speed_10m_max[index],
      direction: dailyData?.wind_direction_10m_dominant[index],
    }));
  }, [dailyData]);

  return (
    <ChartContainer title="Wind Trends (Max Speed & Direction)">
      <ComposedChart
        data={chartData}
        margin={{ top: 10, right: 10, left: 2, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorWindSpeed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
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

        {/* Left Y-Axis for Speed */}
        <YAxis
          yAxisId="left"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#f59e0b", fontSize: 12, fontWeight: "600" }}
          dx={-10}
          unit=" km/h"
        />

        {/* Right Y-Axis for Direction (0-360) */}
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[0, 360]}
          tickCount={5}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#10b981", fontSize: 12, fontWeight: "600" }}
          dx={10}
          unit="°"
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
          labelStyle={{
            color: "#64748b",
            fontWeight: "500",
            marginBottom: "4px",
          }}
          labelFormatter={(label) => `Date: ${label}`}
          formatter={(value, name) => {
            if (name === "direction")
              return [`${value}° (${getCompassDirection(value)})`, "Direction"];
            return [`${value} km/h`, "Max Speed"];
          }}
        />

        <Legend
          wrapperStyle={{
            paddingTop: "10px",
            fontSize: "14px",
            fontWeight: "500",
          }}
        />

        {/* Speed Area linked to Left Axis */}
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="speed"
          name="speed"
          stroke="#f59e0b"
          strokeWidth={3}
          fill="url(#colorWindSpeed)"
          activeDot={{ r: 6, strokeWidth: 0 }}
        />

        {/* Direction Line linked to Right Axis (Kept as Step so it doesn't look like an area curve) */}
        <Line
          yAxisId="right"
          type="step"
          dataKey="direction"
          name="direction"
          stroke="#10b981"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 2, fill: "#10b981" }}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />

        <Brush dataKey="date" height={30} stroke="#94a3b8" fill="#f8fafc" />
      </ComposedChart>
    </ChartContainer>
  );
};

export default WindChart;
