import { useQuery } from "@tanstack/react-query";

import { fetchHistoricalWeather } from "../api/historicalWeatherApi";

export default function useHistoricalWeather(
  latitude,
  longitude,
  startDate,
  endDate,
) {
  return useQuery({
    queryKey: ["historical-weather", latitude, longitude, startDate, endDate],

    queryFn: () =>
      fetchHistoricalWeather(latitude, longitude, startDate, endDate),

    enabled: !!latitude && !!longitude && !!startDate && !!endDate,
  });
}
