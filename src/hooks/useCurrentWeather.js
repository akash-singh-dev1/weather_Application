import { useQuery } from "@tanstack/react-query";
import { fetchCurrentWeather } from "../api/weatherApi";

export default function useCurrentWeather(latitude, longitude, selectedDate) {
  return useQuery({
    queryKey: ["current-weather", latitude, longitude, selectedDate],

    queryFn: () => fetchCurrentWeather(latitude, longitude, selectedDate),

    enabled: !!latitude && !!longitude && !!selectedDate,
  });
}
