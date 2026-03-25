import { useQuery } from "@tanstack/react-query";
import { fetchCurrentWeather } from "../api/weatherApi";

export default function useCurrentWeather(latitude, longitude) {
  return useQuery({
    queryKey: ["current-weather", latitude, longitude],

    queryFn: () => fetchCurrentWeather(latitude, longitude),

    enabled: !!latitude && !!longitude,
  });
}
