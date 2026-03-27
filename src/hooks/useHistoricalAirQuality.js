import { useQuery } from "@tanstack/react-query";

import { fetchHistoricalAirQuality } from "../api/HistoricalAirQualityApi";

export default function useHistoricalAirQuality(
  latitude,
  longitude,
  startDate,
  endDate,
) {
  return useQuery({
    queryKey: [
      "historical-air-quality",
      latitude,
      longitude,
      startDate,
      endDate,
    ],

    queryFn: () =>
      fetchHistoricalAirQuality(latitude, longitude, startDate, endDate),

    enabled: !!latitude && !!longitude && !!startDate && !!endDate,
  });
}
