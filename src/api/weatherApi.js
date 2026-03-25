import axios from "axios";

export const weatherApi = axios.create({
  baseURL: "https://api.open-meteo.com/v1",
  timeout: 10000,
});

//function to fetch currentWeather condition based on location intentionally fetching only required data.
export const fetchCurrentWeather = async (latitude, longitude) => {
  const response = await weatherApi.get("/forecast", {
    params: {
      latitude,
      longitude,

      current: "temperature_2m,relative_humidity_2m,uv_index",

      daily: "temperature_2m_max,temperature_2m_min,sunrise,sunset",

      hourly:
        "temperature_2m,relative_humidity_2m,precipitation,visibility,wind_speed_10m",

      timezone: "auto",
    },
  });

  return response.data;
};
