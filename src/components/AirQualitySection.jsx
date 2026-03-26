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

  if (isPending)
    return (
      <p className="text-center text-brand-primary font-bold text-2xl">
        Fetching Air Quality Data Have Patient
      </p>
    );
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

  return (
    <>
      <section className="mt-8 mx-auto">
        <h2 className="text-lg font-semibold mb-4 text-center text-brand-primary">
          Current Air Quality
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
            title="Air Quality Index"
            value={airQualityData?.hourly?.european_aqi[timeIndex]}
            subtitle={aqiLabel}
            unit={"EAQI"}
          />
          <div>
            <div className="flex justify-center gap-4">
              <WeatherCard
                title="Particulate Matter"
                value={airQualityData?.hourly?.pm10[timeIndex]}
                subtitle={"pm10"}
                unit={"μg/m³"}
              />
              <WeatherCard
                title="Particulate Matter"
                value={airQualityData?.hourly?.pm2_5[timeIndex]}
                subtitle={"pm2_5"}
                unit={"μg/m³"}
              />
            </div>
          </div>
          {/*gases */}
          <div>
            <div className="flex justify-center gap-4">
              <WeatherCard
                title="carbon_monoxide"
                value={airQualityData?.hourly?.carbon_monoxide[timeIndex]}
                unit={"μg/m³"}
              />
              <WeatherCard
                title="carbon_dioxide "
                value={airQualityData?.hourly?.carbon_dioxide[timeIndex]}
                unit={"ppm"}
              />
            </div>
          </div>
          <div>
            <div>
              <div className="flex justify-center gap-4">
                <WeatherCard
                  title="nitrogen_dioxide "
                  value={airQualityData?.hourly?.nitrogen_dioxide[timeIndex]}
                  unit={"μg/m³"}
                />
                <WeatherCard
                  title="sulphur_dioxide "
                  value={airQualityData?.hourly?.sulphur_dioxide[timeIndex]}
                  unit={"μg/m³"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default AirQualitySection;
