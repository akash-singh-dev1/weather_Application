import { useQuery } from "@tanstack/react-query";
import { fetchCurrentAirQuality } from "../api/airQualityApi";

export default function useCurrentAirQuality(
  latitude,
  longitude,
  selectedDate,
) {
  return useQuery({
    queryKey: ["current-air-quality", latitude, longitude, selectedDate],

    queryFn: () => fetchCurrentAirQuality(latitude, longitude, selectedDate),

    enabled: !!latitude && !!longitude && !!selectedDate,
  });
}
