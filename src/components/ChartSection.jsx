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

//glassmorphic loading placeholder
const ChartSkeleton = () => (
  <div className="h-80 w-full bg-white/20 backdrop-blur-md border border-white/40 shadow-sm rounded-3xl animate-pulse flex items-center justify-center">
    <div className="w-1/3 h-2 bg-brand-text-secondary/20 rounded-full"></div>
  </div>
);

const ChartWrapper = ({ children }) => (
  <div className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 transition-all duration-300 hover:shadow-lg">
    {children}
  </div>
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
    <section
      className="mt-12 animate-slide-up"
      style={{ animationDelay: "200ms" }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-6 bg-brand-primary rounded-full"></div>
        <h2 className="text-2xl font-bold tracking-tight text-brand-text-primary">
          Forecast Analytics
        </h2>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <ChartSkeleton key={i} />
            ))}
          </div>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartWrapper>
            <TemperatureChart hourlyData={weatherData?.hourly} />
          </ChartWrapper>

          <ChartWrapper>
            <HumidityChart hourlyData={weatherData?.hourly} />
          </ChartWrapper>

          <ChartWrapper>
            <PrecipitationChart hourlyData={weatherData?.hourly} />
          </ChartWrapper>

          <ChartWrapper>
            <VisibilityChart hourlyData={weatherData?.hourly} />
          </ChartWrapper>

          <ChartWrapper>
            <WindSpeedChart hourlyData={weatherData?.hourly} />
          </ChartWrapper>

          <ChartWrapper>
            <AirQualityChart hourlyData={airQualityData?.hourly} />
          </ChartWrapper>
        </div>
      </Suspense>
    </section>
  );
};

export default ChartSection;
