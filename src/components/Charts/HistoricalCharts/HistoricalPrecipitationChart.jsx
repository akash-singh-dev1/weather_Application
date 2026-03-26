import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ChartContainer from "../ChartContainer";

const PrecipitationChart = ({ dailyData }) => {
  const chartData = dailyData?.time.map((date, index) => ({
    date,

    precipitation: dailyData?.precipitation_sum[index],
  }));

  return (
    <ChartContainer title="Total Precipitation(mm)">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" />

        <YAxis unit="mm" />

        <Tooltip
          labelFormatter={(label) => `Date: ${label}`}
          formatter={(value, name) => [`${value}mm`, name]}
        />

        <Bar
          dataKey="precipitation"
          fill="#3b82f6" // A nice "Water Blue"
          radius={[4, 4, 0, 0]} // Rounds the top of the bars for a modern look
          maxBarSize={40}
        />

        <Brush dataKey="date" stroke="#cbd5e1" fill="#f8fafc" />
      </BarChart>
    </ChartContainer>
  );
};

export default PrecipitationChart;
