import { lazy, Suspense, useMemo, useState } from "react";
import LocationAccessRequired from "../components/LocationAccessRequired";
import { useLocationContext } from "../context/LocationContext";
import useHistoricalAirQuality from "../hooks/useHistoricalAirQuality";
import useHistoricalWeather from "../hooks/useHistoricalWeather";

import { groupHourlyToDailyMean } from "../utils/airQualityTransform";
import {
  getDefaultStartDate,
  getMaxHistoricalDate,
  getMinHistoricalDate,
} from "../utils/historicalDate";

// Lazy load the charts
const AirQualityTrendChart = lazy(
  () => import("../components/Charts/HistoricalCharts/AirQualityTrendChart"),
);
const PrecipitationChart = lazy(
  () =>
    import("../components/Charts/HistoricalCharts/HistoricalPrecipitationChart"),
);
const HistoricalTemperatureChart = lazy(
  () =>
    import("../components/Charts/HistoricalCharts/HistoricalTemperatureChart"),
);
const SunCycleChart = lazy(
  () => import("../components/Charts/HistoricalCharts/SunCycleChart"),
);
const WindChart = lazy(
  () => import("../components/Charts/HistoricalCharts/WindChart"),
);

// A modern glassmorphic loading placeholder
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

const HistoricalWeather = () => {
  const { location, loading: locationLoading } = useLocationContext();

  const [startDate, setStartDate] = useState(getDefaultStartDate());
  const [endDate, setEndDate] = useState(getMaxHistoricalDate());

  const {
    data: weatherData,
    isPending,
    error,
  } = useHistoricalWeather(
    location?.latitude,
    location?.longitude,
    startDate,
    endDate,
  );

  const { data: airQualityData } = useHistoricalAirQuality(
    location?.latitude,
    location?.longitude,
    startDate,
    endDate,
  );

  const dailyAirQuality = useMemo(() => {
    if (!airQualityData?.hourly) return [];
    return groupHourlyToDailyMean(airQualityData?.hourly);
  }, [airQualityData]);

  if (locationLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center animate-pulse-soft">
        <p className="text-brand-text-secondary font-medium tracking-wide text-lg">
          Locating your sky...
        </p>
      </div>
    );
  }

  if (!location) {
    return <LocationAccessRequired />;
  }

  if (isPending) {
    return (
      <div className="flex h-[60vh] items-center justify-center animate-pulse-soft">
        <p className="text-brand-text-secondary font-medium tracking-wide text-lg">
          Loading historical timeline...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-red-500 font-medium tracking-wide text-lg bg-red-50 px-6 py-3 rounded-2xl">
          {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-slide-up">
      {/* Sleek Header & Date Range Pickers */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white/40 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-white/50 shadow-sm">
        <div className="flex items-center gap-3 ml-2">
          <div className="w-1.5 h-6 bg-brand-primary rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
          <h1 className="text-2xl font-bold tracking-tight text-brand-text-primary">
            Historical Trends
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative group w-full sm:w-auto">
            <label className="block text-xs font-semibold text-brand-text-secondary uppercase tracking-wider mb-1 ml-1">
              Start
            </label>
            <input
              type="date"
              value={startDate}
              min={getMinHistoricalDate()}
              max={getMaxHistoricalDate()}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full sm:w-auto appearance-none bg-white/70 backdrop-blur border border-white/60 hover:border-blue-300 text-brand-text-primary text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all shadow-sm cursor-pointer"
            />
          </div>

          <div className="hidden sm:block text-brand-text-secondary font-bold mt-5">
            →
          </div>

          <div className="relative group w-full sm:w-auto">
            <label className="block text-xs font-semibold text-brand-text-secondary uppercase tracking-wider mb-1 ml-1">
              End
            </label>
            <input
              type="date"
              value={endDate}
              min={startDate}
              max={getMaxHistoricalDate()}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full sm:w-auto appearance-none bg-white/70 backdrop-blur border border-white/60 hover:border-blue-300 text-brand-text-primary text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all shadow-sm cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <ChartSkeleton key={i} />
            ))}
          </div>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartWrapper>
            <HistoricalTemperatureChart dailyData={weatherData?.daily} />
          </ChartWrapper>

          <ChartWrapper>
            <SunCycleChart dailyData={weatherData?.daily} />
          </ChartWrapper>

          <ChartWrapper>
            <PrecipitationChart dailyData={weatherData?.daily} />
          </ChartWrapper>

          <ChartWrapper>
            <WindChart dailyData={weatherData?.daily} />
          </ChartWrapper>

          {/* Spanning full width for Air Quality if desired, or keep in grid */}
          <div className="col-span-1 lg:col-span-2">
            <ChartWrapper>
              <AirQualityTrendChart dailyData={dailyAirQuality} />
            </ChartWrapper>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default HistoricalWeather;
