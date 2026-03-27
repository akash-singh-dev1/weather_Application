import { useState } from "react";
import AirQualitySection from "../components/AirQualitySection";
import ChartSection from "../components/ChartSection";
import LocationAccessRequired from "../components/LocationAccessRequired";
import WeatherCard from "../components/WeatherCard";
import { useLocationContext } from "../context/LocationContext";
import { useTemperatureUnit } from "../context/TemperatureUnitContext";
import useCurrentWeather from "../hooks/useCurrentWeather";
import { convertTemperature } from "../utils/convertTemperature";
import { getMaxDate, getMinDate, getTodayDate } from "../utils/date";
import { formatTime } from "../utils/formateTime";

const CurrentWeather = () => {
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const { location, loading: locationLoading } = useLocationContext();

  const { data: weatherData, isPending } = useCurrentWeather(
    location?.latitude,
    location?.longitude,
    selectedDate,
  );

  //what happening is we are getting the air quality data hourly and current time sometimes in minutes that is why iam using this constant so that i can show the air quality data per hour on any date .
  const currentHour = new Date().getHours().toString().padStart(2, "0");
  const targetTime = `${selectedDate}T${currentHour}:00`;
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

  if (locationLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center animate-pulse-soft">
        <p className="text-brand-text-secondary font-medium tracking-wide text-lg">
          Locating your Location...
        </p>
      </div>
    );
  }

  // If no location is set
  if (!location) {
    return <LocationAccessRequired />;
  }

  if (isPending) {
    return (
      <div className="flex h-[60vh] items-center justify-center animate-pulse-soft">
        <p className="text-brand-text-secondary font-medium tracking-wide text-lg">
          Syncing Weather...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12 animate-slide-up">
      {/* Sleek Header & Date Picker Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-brand-text-primary ml-2">
          Forecast Overview
        </h1>
        <div className="relative group">
          <input
            type="date"
            value={selectedDate}
            min={getMinDate()}
            max={getMaxDate()}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full sm:w-auto appearance-none bg-white/70 backdrop-blur border border-white/60 hover:border-blue-300 text-brand-text-primary text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all shadow-sm cursor-pointer"
          />
        </div>
      </div>

      <section>
        {/* The Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-auto">
          {/* Main Hero Card: Temperature */}
          <div className="col-span-2 row-span-2">
            <WeatherCard
              title="Current Temp"
              value={temperature}
              unit={unit === "celsius" ? "°C" : "°F"}
              subtitle={`L: ${tempMin}° · H: ${tempMax}°`}
              isHero={true}
            />
          </div>

          {/* Standard Bento Items */}
          <div className="col-span-1">
            <WeatherCard
              title="Precipitation"
              value={weatherData?.hourly?.precipitation[timeIndex]}
              unit="mm"
            />
          </div>

          <div className="col-span-1">
            <WeatherCard
              title="UV Index"
              value={weatherData?.hourly?.uv_index[timeIndex]}
            />
          </div>

          <div className="col-span-1">
            <WeatherCard
              title="Humidity"
              value={weatherData?.hourly?.relative_humidity_2m[timeIndex]}
              unit="%"
            />
          </div>

          <div className="col-span-1">
            <WeatherCard
              title="Wind"
              value={weatherData?.daily.wind_speed_10m_max[0]}
              unit="km/h"
            />
          </div>

          {/* Combined Sun Cycle Card spanning 2 cols */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <div className="grid grid-cols-2 gap-4 h-full">
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

          <div className="col-span-2 lg:col-span-1">
            <WeatherCard
              title="Pressure"
              value={weatherData?.hourly?.pressure_msl[timeIndex]}
              unit="hPa"
            />
          </div>

          <div className="col-span-2 lg:col-span-1">
            <WeatherCard
              title="Precip Prob."
              value={weatherData?.daily.precipitation_probability_max[0]}
              unit="%"
            />
          </div>
        </div>
      </section>

      <div className="pt-4">
        <AirQualitySection selectedDate={selectedDate} />
      </div>

      <div className="pt-4">
        <ChartSection selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default CurrentWeather;
