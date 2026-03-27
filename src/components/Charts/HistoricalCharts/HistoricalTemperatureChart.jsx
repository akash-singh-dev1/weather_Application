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
import { useTemperatureUnit } from "../../../context/TemperatureUnitContext";
import { convertTemperature } from "../../../utils/convertTemperature";
import ChartContainer from "../ChartContainer";

const HistoricalTemperatureChart = ({ dailyData }) => {
  const { unit } = useTemperatureUnit();
  const unitSymbol = unit === "celsius" ? "°C" : "°F";

  const chartData = useMemo(() => {
    if (!dailyData) return [];

    return dailyData?.time.map((date, index) => ({
      date,
      mean: convertTemperature(dailyData?.temperature_2m_mean?.[index], unit),
      max: convertTemperature(dailyData?.temperature_2m_max?.[index], unit),
      min: convertTemperature(dailyData?.temperature_2m_min?.[index], unit),
    }));
  }, [dailyData, unit]);

  return (
    <ChartContainer title={`Temperature Trends (${unitSymbol})`}>
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f87171" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorMean" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
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
          unit={unitSymbol}
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
            `${value}${unitSymbol}`,
            name.charAt(0).toUpperCase() + name.slice(1),
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
          name="Max"
          type="monotone"
          dataKey="max"
          stroke="#f87171"
          strokeWidth={3}
          fill="url(#colorMax)"
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
        <Area
          name="Mean"
          type="monotone"
          dataKey="mean"
          stroke="#8b5cf6"
          strokeWidth={3}
          fill="url(#colorMean)"
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
        <Area
          name="Min"
          type="monotone"
          dataKey="min"
          stroke="#38bdf8"
          strokeWidth={3}
          fill="url(#colorMin)"
          activeDot={{ r: 6, strokeWidth: 0 }}
        />

        <Brush dataKey="date" height={30} stroke="#94a3b8" fill="#f8fafc" />
      </AreaChart>
    </ChartContainer>
  );
};

export default HistoricalTemperatureChart;
