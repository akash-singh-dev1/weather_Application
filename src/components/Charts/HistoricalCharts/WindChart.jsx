import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartContainer from "../ChartContainer";

// Helper to convert degrees (0-360) to Compass Points (N, E, S, W)
const getCompassDirection = (deg) => {
  if (deg === undefined) return "N/A";
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

const WindChart = ({ dailyData }) => {
  const chartData = dailyData?.time.map((date, index) => ({
    date,
    speed: dailyData?.wind_speed_10m_max[index],
    direction: dailyData?.wind_direction_10m_dominant[index],
  }));

  return (
    <ChartContainer title="Wind Trends (Max Speed & Direction)">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />

        <XAxis
          dataKey="date"
          // tickFormatter={(str) => str.split("-").slice(1).join("/")}
        />

        {/* Left Y-Axis for Speed */}
        <YAxis
          yAxisId="left"
          unit=" km/h"
          stroke="#f59e0b"
          // label={{ value: "Speed", angle: -90, position: "insideLeft" }}
        />

        {/* Right Y-Axis for Direction (0-360) */}
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[0, 360]}
          tickCount={9}
          stroke="#10b981"
          unit="°"
        />

        <Tooltip
          labelFormatter={(label) => `Date: ${label}`}
          formatter={(value, name) => {
            if (name === "direction")
              return [`${value}° (${getCompassDirection(value)})`, "Direction"];
            return [`${value} km/h`, "Max Speed"];
          }}
        />

        <Legend />

        {/* Speed Line linked to Left Axis */}
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="speed"
          name="speed"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={false}
        />

        {/* Direction Line linked to Right Axis */}
        <Line
          yAxisId="right"
          type="step" // Step looks better for direction than a smooth curve
          dataKey="direction"
          name="direction"
          stroke="#10b981"
          strokeDasharray="5 5"
          dot={false}
        />

        <Brush dataKey="date" stroke="#cbd5e1" />
      </LineChart>
    </ChartContainer>
  );
};

export default WindChart;
