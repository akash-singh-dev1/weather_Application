import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LocationContext = createContext();
// constant for checking for geolocation support.
const isGeoSupported =
  typeof window !== "undefined" && "geolocation" in navigator;

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(
    isGeoSupported ? null : "Geolocation not supported",
  );
  const [loading, setLoading] = useState(isGeoSupported);

  useEffect(() => {
    //  If not supported, we don't even need to run the effect logic
    if (!isGeoSupported) return;

    //if geolocation supported we get the currentPosition(longitude and latitude of agent)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
  }, []);

  // This prevents children from re-rendering unless location, loading, or error actually change.
  const contextValue = useMemo(
    () => ({
      location,
      loading,
      error,
    }),
    [location, loading, error],
  );

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};

export function useLocationContext() {
  const context = useContext(LocationContext);
  //  Safety Check: Throw an error if hook is used outside the provider
  if (context === undefined) {
    throw new Error(
      "useLocationContext must be used within a LocationProvider",
    );
  }
  return context;
}
