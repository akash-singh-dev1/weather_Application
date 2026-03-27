import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartContainer from "../ChartContainer";

const convertTimeToHour = (isoString) => {
  if (!isoString) return 0;
  const timePart = isoString.split("T")[1];
  const [hours, minutes] = timePart.split(":").map(Number);
  return hours + minutes / 60;
};

const formatHourToClock = (decimalHour) => {
  const hours = Math.floor(decimalHour);
  const minutes = Math.round((decimalHour - hours) * 60);
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};

const SunCycleChart = ({ dailyData }) => {
  const chartData = useMemo(() => {
    if (!dailyData) return [];
    return dailyData?.time.map((date, index) => ({
      date,
      sunrise: convertTimeToHour(dailyData?.sunrise[index]),
      sunset: convertTimeToHour(dailyData?.sunset[index]),
    }));
  }, [dailyData]);

  return (
    <ChartContainer title="Historical Sun Cycle">
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorSunrise" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorSunset" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f87171" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
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
          domain={[0, 24]}
          ticks={[0, 4, 8, 12, 16, 20, 24]}
          tickFormatter={(val) => `${val}:00`}
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
          formatter={(value, name) => [
            formatHourToClock(value),
            name.toUpperCase(),
          ]}
        />

        <Legend
          wrapperStyle={{
            paddingTop: "10px",
            fontSize: "14px",
            fontWeight: "500",
          }}
        />

        <Area
          name="Sunrise"
          type="monotone"
          dataKey="sunrise"
          stroke="#fbbf24"
          strokeWidth={3}
          fill="url(#colorSunrise)"
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
        <Area
          name="Sunset"
          type="monotone"
          dataKey="sunset"
          stroke="#f87171"
          strokeWidth={3}
          fill="url(#colorSunset)"
          activeDot={{ r: 6, strokeWidth: 0 }}
        />

        <Brush dataKey="date" height={30} stroke="#94a3b8" fill="#f8fafc" />
      </AreaChart>
    </ChartContainer>
  );
};

export default SunCycleChart;
