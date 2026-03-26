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

import { useTemperatureUnit } from "../../../context/TemperatureUnitContext";
import { convertTemperature } from "../../../utils/convertTemperature";
import ChartContainer from "../ChartContainer";

const HistoricalTemperatureChart = ({ dailyData }) => {
  const { unit } = useTemperatureUnit();
  const unitSymbol = unit === "celsius" ? "°C" : "°F";
  const chartData = dailyData?.time.map((date, index) => ({
    date,

    mean: convertTemperature(dailyData?.temperature_2m_mean[index], unit),

    max: convertTemperature(dailyData?.temperature_2m_max[index], unit),

    min: convertTemperature(dailyData?.temperature_2m_min[index], unit),
  }));

  return (
    <ChartContainer title="Temperature Trends">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" />

        <YAxis unit={unitSymbol} />

        <Tooltip
          labelFormatter={(label) => `Date: ${label}`}
          formatter={(value, name) => [`${value}${unitSymbol}`, name]}
        />

        <Legend />

        <Line
          type="monotone"
          dataKey="mean"
          dot={false}
          stroke="#8884d8"
          strokeWidth={2}
        />

        <Line
          type="monotone"
          dataKey="max"
          dot={false}
          stroke="#82ca9d"
          strokeWidth={2}
        />

        <Line
          type="monotone"
          dataKey="min"
          dot={false}
          stroke="#ca82b7"
          strokeWidth={2}
        />

        <Brush dataKey="date" />
      </LineChart>
    </ChartContainer>
  );
};

export default HistoricalTemperatureChart;
