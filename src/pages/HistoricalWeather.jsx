import { lazy, Suspense, useMemo, useState } from "react";

import { useLocationContext } from "../context/LocationContext";

import useHistoricalAirQuality from "../hooks/useHistoricalAirQuality";
import useHistoricalWeather from "../hooks/useHistoricalWeather";

import {
  getDefaultStartDate,
  getMaxHistoricalDate,
  getMinHistoricalDate,
} from "../utils/historicalDate";

import { groupHourlyToDailyMean } from "../utils/airQualityTransform";
//Lazy load the charts (Notice I fixed the casing to 'Charts')
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

// Simple placeholder for charts
const ChartPlaceholder = () => (
  <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-xl" />
);

const HistoricalWeather = () => {
  const {
    location,
    loading: locationLoading,
    error: locationError,
    getLocation,
  } = useLocationContext();

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

  if (locationLoading)
    return (
      <p className="text-center text-brand-primary font-bold text-2xl">
        Detecting location...
      </p>
    );

  if (locationError)
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-center text-brand-primary font-bold text-2xl">
          {locationError}
        </p>
        <button
          onClick={getLocation}
          className="px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-90 transition-all font-semibold shadow-md"
        >
          Allow Location Access
        </button>
        <p className="text-sm text-gray-500">
          (You may need to reset site permissions in your browser settings if
          you clicked "Block")
        </p>
      </div>
    );
  if (isPending)
    return (
      <p className="text-center text-brand-primary font-bold text-2xl">
        Loading historical data...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-brand-primary font-bold text-2xl">
        {error.message}
      </p>
    );

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6 text-center text-brand-primary">
        Historical Weather Trends
      </h1>

      {/* Date Range Picker */}

      <div className="flex flex-wrap gap-4 mb-8">
        <div>
          <label className="block text-sm mb-1">Start Date</label>

          <input
            type="date"
            value={startDate}
            min={getMinHistoricalDate()}
            max={getMaxHistoricalDate()}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-3 py-2 rounded bg-white"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">End Date</label>

          <input
            type="date"
            value={endDate}
            min={startDate}
            max={getMaxHistoricalDate()}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-3 py-2 rounded bg-white"
          />
        </div>
      </div>

      {/* Charts */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <ChartPlaceholder key={i} />
            ))}
          </div>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <HistoricalTemperatureChart dailyData={weatherData?.daily} />
          <SunCycleChart dailyData={weatherData?.daily} />
          <PrecipitationChart dailyData={weatherData?.daily} />
          <WindChart dailyData={weatherData?.daily} />
          <AirQualityTrendChart dailyData={dailyAirQuality} />
        </div>
      </Suspense>
    </div>
  );
};

export default HistoricalWeather;
