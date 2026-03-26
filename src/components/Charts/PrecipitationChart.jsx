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

const PrecipitationChart = ({ hourlyData }) => {
  const chartData = hourlyData?.time.map((time, index) => ({
    time: time.split("T")[1],
    precipitation: hourlyData.precipitation[index],
  }));

  return (
    <ChartContainer title="Precipitation (mm)">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" unit="hr" />
        <YAxis unit="mm" />
        <Tooltip
          labelFormatter={(label) => `${label} hr`}
          formatter={(value, name) => [`${value}mm`, name]}
        />
        <Line
          type="stepAfter"
          dataKey="precipitation"
          stroke="#0ea5e9"
          strokeWidth={2}
          fill="#0ea5e9"
        />
        <Brush dataKey="time" height={30} stroke="#0ea5e9" />
      </LineChart>
    </ChartContainer>
  );
};

export default PrecipitationChart;
