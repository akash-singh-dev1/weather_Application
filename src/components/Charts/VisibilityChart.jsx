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

const VisibilityChart = ({ hourlyData }) => {
  const chartData = hourlyData?.time.map((time, index) => ({
    time: time.split("T")[1],
    // Convert meters to kilometers for better readability
    visibility: (hourlyData?.visibility[index] / 1000).toFixed(1),
  }));

  return (
    <ChartContainer title="Visibility (km)">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" unit="hr" />
        <YAxis unit="km" />
        <Tooltip
          labelFormatter={(label) => `${label} hr`}
          formatter={(value, name) => [`${value}km`, name]}
        />
        <Line
          type="monotone"
          dataKey="visibility"
          stroke="#6366f1"
          strokeWidth={2}
          dot={false}
        />
        <Brush dataKey="time" height={30} stroke="#6366f1" />
      </LineChart>
    </ChartContainer>
  );
};

export default VisibilityChart;
