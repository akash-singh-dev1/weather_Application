import { useLocationContext } from "../context/LocationContext";
import useCurrentAirQuality from "../hooks/useCurrentAirQuality";
import { getAQILabel } from "../utils/aqi";
import WeatherCard from "./WeatherCard";

const AirQualitySection = ({ selectedDate }) => {
  const { location } = useLocationContext();

  const {
    data: airQualityData,
    isPending,
    error,
  } = useCurrentAirQuality(
    location?.latitude,
    location?.longitude,
    selectedDate,
  );

  if (isPending) {
    return (
      <div className="flex h-32 items-center justify-center animate-pulse-soft">
        <p className="text-brand-text-secondary font-medium tracking-wide">
          fetching Air Quality Data Have Patient
        </p>
      </div>
    );
  }
  if (error)
    return (
      <p className="text-center text-brand-primary font-bold text-2xl">
        {error.message}
      </p>
    );

  //what happening is we are getting the air quality data hourly and current time sometimes in minutes that is why iam using this constant so that i can show the air quality data per hour on any date .
  const currentHour = new Date().getHours().toString().padStart(2, "0");

  //  Combine the DATE the user picked with the CURRENT hour
  // Result: "2026-03-26T14:00"
  const targetTime = `${selectedDate}T${currentHour}:00`;

  //  Find this specific hour in the hourly data
  const timeIndex = airQualityData?.hourly?.time?.indexOf(targetTime) ?? 0;

  const currentAQI = airQualityData?.hourly?.european_aqi?.[timeIndex];
  const aqiLabel = getAQILabel(currentAQI);
  // Dynamic visual cue for AQI
  const getAqiColorStyle = (aqiLabel) => {
    if (!aqiLabel) return "text-brand-text-primary";
    if (aqiLabel === "Good") return "text-blue-500";
    if (aqiLabel === "fair") return "text-green-500";
    if (aqiLabel === "moderate") return "text-yellow-500";
    if (aqiLabel === "Poor") return "text-red-500";
    if (aqiLabel === "very Poor") return "text-shadow-amber-900";
    if (aqiLabel === "Extremely Poor") return "text-violet-500";
  };

  return (
    <section
      className="mt-8 animate-slide-up"
      style={{ animationDelay: "100ms" }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-6 bg-brand-primary rounded-full"></div>
        <h2 className="text-2xl font-bold tracking-tight text-brand-text-primary">
          Air Quality
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-auto">
        {/* Hero AQI Card */}
        <div className="col-span-2 row-span-2">
          <div
            className={`
            relative overflow-hidden h-full flex flex-col justify-between
            bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]
            rounded-3xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group
          `}
          >
            <div className="relative z-10">
              <p className="text-sm font-medium text-brand-text-secondary mb-2 uppercase tracking-wider">
                Air Quality Index
              </p>
              <div className="flex items-baseline">
                <p
                  className={`font-bold tracking-tight text-5xl sm:text-6xl ${getAqiColorStyle(aqiLabel)}`}
                >
                  {currentAQI !== undefined ? currentAQI : "--"}
                </p>
                <span className="font-medium text-brand-text-secondary ml-2 text-xl">
                  EAQI
                </span>
              </div>
            </div>

            {aqiLabel && (
              <div className="mt-6 relative z-10">
                <span className="inline-block text-sm font-semibold text-brand-text-primary bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 shadow-sm">
                  {aqiLabel}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Particulates */}
        <div className="col-span-1">
          <WeatherCard
            title="PM 10"
            value={airQualityData?.hourly?.pm10[timeIndex]}
            unit="μg/m³"
          />
        </div>
        <div className="col-span-1">
          <WeatherCard
            title="PM 2.5"
            value={airQualityData?.hourly?.pm2_5[timeIndex]}
            unit="μg/m³"
          />
        </div>

        {/* Gases Block 1 */}
        <div className="col-span-2 md:col-span-4 lg:col-span-2">
          <div className="grid grid-cols-2 gap-4 h-full">
            <WeatherCard
              title="Carbon Monoxide"
              value={airQualityData?.hourly?.carbon_monoxide[timeIndex]}
              unit="μg/m³"
            />
            <WeatherCard
              title="Carbon Dioxide"
              value={airQualityData?.hourly?.carbon_dioxide[timeIndex]}
              unit="ppm"
            />
          </div>
        </div>

        {/* Gases Block 2 */}
        <div className="col-span-2 md:col-span-4 lg:col-span-2">
          <div className="grid grid-cols-2 gap-4 h-full">
            <WeatherCard
              title="Nitrogen Dioxide"
              value={airQualityData?.hourly?.nitrogen_dioxide[timeIndex]}
              unit="μg/m³"
            />
            <WeatherCard
              title="Sulphur Dioxide"
              value={airQualityData?.hourly?.sulphur_dioxide[timeIndex]}
              unit="μg/m³"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default AirQualitySection;
