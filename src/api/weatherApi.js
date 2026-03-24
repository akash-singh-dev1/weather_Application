import axios from "axios";

export const weatherApi = axios.create({
  baseURL: "https://api.open-meteo.com/v1",
  timeout: 10000,
});
