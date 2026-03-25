import axios from "axios";

export const weatherApi = axios.create({
  baseURL: "https://api.open-meteo.com/v1",
  timeout: 10000,
});

//function to fetch currentWeather condition based on location intentionally fetching only required data.
export const fetchCurrentWeather = async (
  latitude,
  longitude,
  selectedDate,
) => {
  const response = await weatherApi.get("/forecast", {
    params: {
      latitude,
      longitude,

      start_date: selectedDate,
      end_date: selectedDate,

      current: "temperature_2m,relative_humidity_2m,uv_index,precipitation",

      daily:
        "temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,wind_speed_10m_max",

      hourly:
        "temperature_2m,relative_humidity_2m,precipitation,visibility,wind_speed_10m,pressure_msl,uv_index",

      timezone: "auto",
    },
  });

  return response.data;
};
