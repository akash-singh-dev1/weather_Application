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

//take a specific time string and turn it into a decimal number representing total hours.
const convertTimeToHour = (isoString) => {
  if (!isoString) return 0;
  const timePart = isoString.split("T")[1]; // "06:12"
  const [hours, minutes] = timePart.split(":").map(Number);
  return hours + minutes / 60; //6.16
};

// Formatter to turn 6.5 back into "06:30" for the UI
const formatHourToClock = (decimalHour) => {
  const hours = Math.floor(decimalHour);
  const minutes = Math.round((decimalHour - hours) * 60);
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};

const SunCycleChart = ({ dailyData }) => {
  const chartData = dailyData?.time.map((date, index) => ({
    date,
    sunrise: convertTimeToHour(dailyData?.sunrise[index]),
    sunset: convertTimeToHour(dailyData?.sunset[index]),
  }));

  return (
    <ChartContainer title="Historical Sun Cycle (IST)">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" />
        <YAxis
          domain={[0, 24]}
          ticks={[0, 4, 8, 12, 16, 20, 24]}
          tickFormatter={(val) => `${val}:00`}
          // label={{ value: "Hour of Day", angle: -90, position: "insideLeft" }}
        />

        <Tooltip
          labelFormatter={(label) => `Date: ${label}`}
          formatter={(value, name) => [
            formatHourToClock(value),
            name.toUpperCase(),
          ]}
        />

        <Legend />

        <Line
          name="Sunrise"
          type="monotone"
          dataKey="sunrise"
          stroke="#fbbf24" // Amber/Yellow
          strokeWidth={2}
          dot={false}
        />

        <Line
          name="Sunset"
          type="monotone"
          dataKey="sunset"
          stroke="#f87171" // Red/Orange
          strokeWidth={2}
          dot={false}
        />

        <Brush dataKey="date" height={30} stroke="#cbd5e1" />
      </LineChart>
    </ChartContainer>
  );
};

export default SunCycleChart;
