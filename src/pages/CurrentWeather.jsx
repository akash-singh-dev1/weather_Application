import { useState } from "react";
import AirQualitySection from "../components/AirQualitySection";
import WeatherCard from "../components/WeatherCard";
import { useLocationContext } from "../context/LocationContext";
import { useTemperatureUnit } from "../context/TemperatureUnitContext";
import useCurrentWeather from "../hooks/useCurrentWeather";
import { convertTemperature } from "../utils/convertTemperature";
import { getMaxDate, getMinDate, getTodayDate } from "../utils/date";
import { formatTime } from "../utils/formateTime";

const CurrentWeather = () => {
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const {
    location,
    loading: locationLoading,
    error: locationError,
  } = useLocationContext();

  //from tanstack-query
  const {
    data: weatherData,
    isPending,
    error: weatherError,
  } = useCurrentWeather(location?.latitude, location?.longitude, selectedDate);

  //what happening is we are getting the air quality data hourly and current time sometimes in minutes that is why iam using this constant so that i can show the air quality data per hour on any date .
  const currentHour = new Date().getHours().toString().padStart(2, "0");

  //  Combine the DATE the user picked with the CURRENT hour
  // Result: "2026-03-26T14:00"
  const targetTime = `${selectedDate}T${currentHour}:00`;

  //Find this specific hour in the hourly data
  const timeIndex = weatherData?.hourly?.time?.indexOf(targetTime) ?? 0;

  const { unit } = useTemperatureUnit();

  const temperature = convertTemperature(
    weatherData?.hourly?.temperature_2m[timeIndex],
    unit,
  );
  const tempMax = convertTemperature(
    weatherData?.daily.temperature_2m_max[0],
    unit,
  );

  const tempMin = convertTemperature(
    weatherData?.daily.temperature_2m_min[0],
    unit,
  );

  if (locationLoading)
    return (
      <p className="text-center text-brand-primary font-bold text-2xl">
        Detecting location...
      </p>
    );

  if (locationError)
    return (
      <p className="text-center text-brand-primary font-bold text-2xl">
        {locationError}
      </p>
    );

  if (isPending)
    return (
      <p className="text-center text-brand-primary font-bold text-2xl">
        Loading weather...
      </p>
    );
  if (weatherError)
    return (
      <p className="text-center text-brand-primary font-bold text-2xl">
        {weatherError.message}
      </p>
    );

  return (
    <div className="p-6">
      {/*date-picker */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Date</label>

        <input
          type="date"
          value={selectedDate}
          min={getMinDate()}
          max={getMaxDate()}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="
      border
      rounded
      px-3
      py-2
      bg-white
    "
        />
      </div>
      {/*start:section for individual weather variables */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-center text-brand-primary">
          Current Weather & Summary
        </h2>

        <div
          className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    gap-4
  "
        >
          <WeatherCard
            title="Temperature"
            value={temperature}
            unit={unit === "celsius" ? "°C" : "°F"}
            subtitle={`Min ${tempMin}° / Max ${tempMax}°`}
          />

          <WeatherCard
            title="Precipitation"
            value={weatherData?.hourly?.precipitation[timeIndex]}
            unit="mm"
          />

          <WeatherCard
            title="Relative Humidity"
            value={weatherData?.hourly?.relative_humidity_2m[timeIndex]}
            unit="%"
          />

          <WeatherCard
            title="UV Index"
            value={weatherData?.hourly?.uv_index[timeIndex]}
          />

          <div>
            <div className="flex justify-center gap-4 ">
              <WeatherCard
                title="Max Wind"
                value={weatherData?.daily.wind_speed_10m_max[0]}
                unit="km/h"
              />

              <WeatherCard
                title="Precipitation Probability"
                value={weatherData?.daily.precipitation_probability_max[0]}
                unit="%"
              />
            </div>
          </div>

          <WeatherCard
            title="Pressure"
            value={weatherData?.hourly?.pressure_msl[timeIndex]}
            unit="hPa"
          />

          <div>
            <div className="flex justify-center gap-4">
              <WeatherCard
                title="Sunrise"
                value={formatTime(weatherData?.daily.sunrise[0])}
              />

              <WeatherCard
                title="Sunset"
                value={formatTime(weatherData?.daily.sunset[0])}
              />
            </div>
          </div>
        </div>
      </section>
      {/*end:section for individual weather variables */}

      {/*start: of section of AirQuality */}
      <AirQualitySection selectedDate={selectedDate} />
      {/*end: of section of AirQuality */}

      <pre className="mt-4 bg-white p-4 rounded">
        {JSON.stringify(weatherData, null, 2)}
      </pre>
    </div>
  );
};
export default CurrentWeather;
