import { lazy, Suspense } from "react";
import { useLocationContext } from "../context/LocationContext";
import useCurrentAirQuality from "../hooks/useCurrentAirQuality";
import useCurrentWeather from "../hooks/useCurrentWeather";

//Lazy load the components
const TemperatureChart = lazy(() => import("./Charts/TemperatureChart"));
const HumidityChart = lazy(() => import("./Charts/HumidityChart"));
const PrecipitationChart = lazy(() => import("./Charts/PrecipitationChart"));
const VisibilityChart = lazy(() => import("./Charts/VisibilityChart"));
const WindSpeedChart = lazy(() => import("./Charts/WindSpeedChart"));
const AirQualityChart = lazy(() => import("./Charts/AirQualityChart"));

// A simple loading placeholder to prevent layout shift
const ChartSkeleton = () => (
  <div className="h-75 w-full bg-slate-100 animate-pulse rounded-lg" />
);

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
      <Suspense
        fallback={
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(6)].map((_, i) => (
              <ChartSkeleton key={i} />
            ))}
          </div>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TemperatureChart hourlyData={weatherData?.hourly} />
          <HumidityChart hourlyData={weatherData?.hourly} />
          <PrecipitationChart hourlyData={weatherData?.hourly} />
          <VisibilityChart hourlyData={weatherData?.hourly} />
          <WindSpeedChart hourlyData={weatherData?.hourly} />
          <AirQualityChart hourlyData={airQualityData?.hourly} />
        </div>
      </Suspense>
    </section>
  );
};
export default ChartSection;
