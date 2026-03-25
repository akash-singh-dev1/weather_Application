import axios from "axios";

export const airQualityApi = axios.create({
  baseURL: "https://air-quality-api.open-meteo.com/v1",
  timeout: 10000,
});

export const fetchCurrentAirQuality = async (
  latitude,
  longitude,
  selectedDate,
) => {
  const response = await airQualityApi.get("/air-quality", {
    params: {
      latitude,
      longitude,

      start_date: selectedDate,
      end_date: selectedDate,

      current:
        "pm10,pm2_5,carbon_monoxide,carbon_dioxide,nitrogen_dioxide,sulphur_dioxide,european_aqi",

      hourly:
        "pm10,pm2_5,carbon_monoxide,carbon_dioxide,nitrogen_dioxide,sulphur_dioxide,european_aqi",

      timezone: "auto",
    },
  });

  return response.data;
};
