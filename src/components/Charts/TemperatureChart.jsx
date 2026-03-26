import {
  Brush,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTemperatureUnit } from "../../context/TemperatureUnitContext";
import ChartContainer from "./ChartContainer";

import { convertTemperature } from "../../utils/convertTemperature";

const TemperatureChart = ({ hourlyData }) => {
  const { unit } = useTemperatureUnit();
  const unitSymbol = unit === "celsius" ? "°C" : "°F";

  const chartData = hourlyData?.time.map((time, index) => ({
    time: time.split("T")[1],

    temperature: convertTemperature(hourlyData?.temperature_2m[index], unit),
  }));

  return (
    <ChartContainer title={`Temperature (${unitSymbol})`}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="time" unit="hr" />

        <YAxis unit={unitSymbol} />

        <Tooltip
          labelFormatter={(label) => `${label} hr`}
          formatter={(value, name) => [`${value}${unitSymbol}`, name]}
        />

        <Line type="monotone" dataKey="temperature" />

        <Brush dataKey="time" />
      </LineChart>
    </ChartContainer>
  );
};

export default TemperatureChart;
