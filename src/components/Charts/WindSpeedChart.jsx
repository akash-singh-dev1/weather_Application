import {
  Brush,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartContainer from "./ChartContainer";

const WindSpeedChart = ({ hourlyData }) => {
  const chartData = hourlyData?.time.map((time, index) => ({
    time: time.split("T")[1],
    windSpeed: hourlyData?.wind_speed_10m[index],
  }));

  return (
    <ChartContainer title="Wind Speed (km/h)">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" unit="hr" />
        <YAxis unit="km/h" />
        <Tooltip
          labelFormatter={(label) => `${label} hr`}
          formatter={(value, name) => [`${value}km/h`, name]}
        />
        <Line
          type="monotone"
          dataKey="windSpeed"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={false}
        />
        <Brush dataKey="time" height={30} stroke="#f59e0b" />
      </LineChart>
    </ChartContainer>
  );
};

export default WindSpeedChart;
