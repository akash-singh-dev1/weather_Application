import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ChartContainer from "../ChartContainer";

const AirQualityTrendChart = ({ dailyData }) => {
  return (
    <ChartContainer title="Historical PM10 & PM2.5 (μg/m³)">
      <LineChart data={dailyData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" />

        <YAxis />

        <Tooltip
          labelFormatter={(label) => `Date: ${label}`}
          formatter={(value, name) => [`${value} μg/m³`, name]}
        />

        <Legend />

        {/* WHO 24-hour safety limit for PM2.5 is 15 μg/m³ */}
        <ReferenceLine
          y={15}
          label={{
            value: "WHO Safety Limit: 15μg/m³",
            position: "top",
            fill: "#ef4444",
            fontSize: 12,
            fontWeight: "bold",
          }}
          stroke="#ef4444"
          strokeDasharray="3 3"
        />

        <Line
          name="PM10"
          type="monotone"
          dataKey="pm10"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />

        <Line
          name="PM2.5"
          type="monotone"
          dataKey="pm2_5"
          stroke="#82ca9d"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />

        <Brush dataKey="date" stroke="#cbd5e1" />
      </LineChart>
    </ChartContainer>
  );
};

export default AirQualityTrendChart;
