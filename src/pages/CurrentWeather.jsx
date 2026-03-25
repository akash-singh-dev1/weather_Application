import { useLocationContext } from "../context/LocationContext";
import { useTemperatureUnit } from "../context/TemperatureUnitContext";
import useCurrentWeather from "../hooks/useCurrentWeather";
import { convertTemperature } from "../utils/temperature";

const CurrentWeather = () => {
  const {
    location,
    loading: locationLoading,
    error: locationError,
  } = useLocationContext();

  //from tanstack-query
  const {
    data: weatherData,
    isLoading,
    isError,
  } = useCurrentWeather(location?.latitude, location?.longitude);

  const { unit } = useTemperatureUnit();

  const temperature = convertTemperature(
    weatherData?.current.temperature_2m,
    unit,
  );

  if (locationLoading) return <p>Detecting location...</p>;

  if (locationError) return <p>{locationError}</p>;

  if (isLoading) return <p>Loading weather...</p>;

  if (isError) return <p>Error fetching weather</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Current Weather</h1>

      <pre className="mt-4 bg-white p-4 rounded">
        {JSON.stringify(weatherData, null, 2)}
      </pre>
    </div>
  );
};
export default CurrentWeather;
