import HumidityChart from "../components/charts/HumidityChart";
import PrecipitationChart from "../components/charts/PrecipitationChart";
import TemperatureChart from "../components/charts/TemperatureChart";
import VisibilityChart from "../components/charts/VisibilityChart";
import { useLocationContext } from "../context/LocationContext";
import useCurrentAirQuality from "../hooks/useCurrentAirQuality";
import useCurrentWeather from "../hooks/useCurrentWeather";
import AirQualityChart from "./Charts/AirQualityChart";
import WindSpeedChart from "./Charts/WindSpeedChart";

const ChartSection = ({ selectedDate }) => {
  const { location } = useLocationContext();

  const { data: airQualityData } = useCurrentAirQuality(
    location?.latitude,
    location?.longitude,
    selectedDate,
  );

  const { data: weatherData } = useCurrentWeather(
    location?.latitude,
    location?.longitude,
    selectedDate,
  );
  return (
    <section className="mt-8 mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-center text-brand-primary">
        Charts
      </h2>
      <div>
        <TemperatureChart hourlyData={weatherData?.hourly} />

        <HumidityChart hourlyData={weatherData?.hourly} />

        <PrecipitationChart hourlyData={weatherData?.hourly} />

        <VisibilityChart hourlyData={weatherData?.hourly} />

        <WindSpeedChart hourlyData={weatherData?.hourly} />

        <AirQualityChart hourlyData={airQualityData?.hourly} />
      </div>
    </section>
  );
};
export default ChartSection;
