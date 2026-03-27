import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  Legend,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartContainer from "../ChartContainer";

const AirQualityTrendChart = ({ dailyData }) => {
  return (
    <ChartContainer title="Historical PM10 & PM2.5 (μg/m³)">
      <AreaChart
        data={dailyData}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorPm10Hist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPm25Hist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
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
            `${value} μg/m³`,
            name === "pm10" ? "PM 10" : "PM 2.5",
          ]}
        />

        <Legend
          wrapperStyle={{
            paddingTop: "10px",
            fontSize: "14px",
            fontWeight: "500",
          }}
        />

        {/* WHO 24-hour safety limit refined styling */}
        <ReferenceLine
          y={15}
          label={{
            value: "WHO Limit (15)",
            position: "insideTopLeft",
            fill: "#ef4444",
            fontSize: 12,
            fontWeight: "600",
          }}
          stroke="#ef4444"
          strokeDasharray="4 4"
          strokeOpacity={0.6}
        />

        <Area
          name="PM10"
          type="monotone"
          dataKey="pm10"
          stroke="#8884d8"
          strokeWidth={3}
          fill="url(#colorPm10Hist)"
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
        <Area
          name="PM2.5"
          type="monotone"
          dataKey="pm2_5"
          stroke="#82ca9d"
          strokeWidth={3}
          fill="url(#colorPm25Hist)"
          activeDot={{ r: 6, strokeWidth: 0 }}
        />

        <Brush dataKey="date" height={30} stroke="#94a3b8" fill="#f8fafc" />
      </AreaChart>
    </ChartContainer>
  );
};

export default AirQualityTrendChart;
