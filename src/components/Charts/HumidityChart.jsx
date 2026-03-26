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

const HumidityChart = ({ hourlyData }) => {
  const chartData = hourlyData?.time.map((time, index) => ({
    time: time.split("T")[1],
    humidity: hourlyData.relative_humidity_2m[index],
  }));

  return (
    <ChartContainer title="Relative Humidity (%)">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" unit="hr" />
        <YAxis unit="%" />
        <Tooltip
          labelFormatter={(label) => `${label} hr`}
          formatter={(value, name) => [`${value}%`, name]}
        />
        <Line
          type="monotone"
          dataKey="humidity"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
        />
        <Brush dataKey="time" height={30} stroke="#3b82f6" />
      </LineChart>
    </ChartContainer>
  );
};

export default HumidityChart;
