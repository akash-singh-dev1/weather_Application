import axios from "axios";

export const historicalAirQualityApi = axios.create({
  baseURL: "https://air-quality-api.open-meteo.com/v1",
  timeout: 10000,
});

export const fetchHistoricalAirQuality = async (
  latitude,
  longitude,
  startDate,
  endDate,
) => {
  const response = await historicalAirQualityApi.get("/air-quality", {
    params: {
      latitude,
      longitude,

      start_date: startDate,
      end_date: endDate,

      hourly: "pm10,pm2_5",

      timezone: "auto",
    },
  });

  return response.data;
};
