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
import ChartContainer from "./ChartContainer";

const AirQualityChart = ({ hourlyData }) => {
  const chartData = hourlyData?.time.map((time, index) => ({
    time: time.split("T")[1],

    pm10: hourlyData.pm10[index],

    pm2_5: hourlyData.pm2_5[index],
  }));

  return (
    <ChartContainer title="PM10 & PM2.5">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="time" unit="hr" />

        <YAxis />

        <Tooltip
          labelFormatter={(label) => `${label} hr`}
          formatter={(value, name) => [`${value}μg/m³`, name]}
        />

        <Legend />

        <Line type="monotone" dataKey="pm10" stroke="#8884d8" strokeWidth={2} />
        <Line
          type="monotone"
          dataKey="pm2_5"
          stroke="#82ca9d"
          strokeWidth={2}
        />

        <Brush dataKey="time" />
      </LineChart>
    </ChartContainer>
  );
};

export default AirQualityChart;
