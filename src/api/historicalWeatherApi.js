import axios from "axios";

export const historicalWeatherApi = axios.create({
  baseURL: "https://archive-api.open-meteo.com/v1",
  timeout: 10000,
});

export const fetchHistoricalWeather = async (
  latitude,
  longitude,
  startDate,
  endDate,
) => {
  const response = await historicalWeatherApi.get("/archive", {
    params: {
      latitude,
      longitude,

      start_date: startDate,
      end_date: endDate,

      daily:
        "temperature_2m_mean,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant",

      timezone: "auto",
    },
  });

  return response.data;
};
