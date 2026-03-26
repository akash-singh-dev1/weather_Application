import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const LocationContext = createContext();
const isGeoSupported =
  typeof window !== "undefined" && "geolocation" in navigator;

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(
    isGeoSupported ? null : "Geolocation not supported",
  );
  const [loading, setLoading] = useState(isGeoSupported);

  //  Create a stable function to request location
  const getLocation = useCallback(() => {
    if (!isGeoSupported) return;

    setLoading(true);
    setError(null); // Reset error state on retry

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

  //  Initial run on mount
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  // Add getLocation to the context value
  const contextValue = useMemo(
    () => ({
      location,
      loading,
      error,
      getLocation, // Now consumers can trigger a retry
    }),
    [location, loading, error, getLocation],
  );

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};

export function useLocationContext() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useLocationContext must be used within a LocationProvider",
    );
  }
  return context;
}
