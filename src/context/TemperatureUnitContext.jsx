import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const TemperatureUnitContext = createContext();

export function TemperatureUnitProvider({ children }) {
  const [unit, setUnit] = useState("celsius");

  // This ensures toggleUnit stays the same function between renders
  const toggleUnit = useCallback(() => {
    setUnit((prev) => (prev === "celsius" ? "fahrenheit" : "celsius"));
  }, []);

  // Now, the 'value' object only changes if 'unit' changes.
  // toggleUnit is stable, so it won't trigger an update.
  const value = useMemo(
    () => ({
      unit,
      toggleUnit,
    }),
    [unit, toggleUnit],
  );

  return (
    <TemperatureUnitContext.Provider value={value}>
      {children}
    </TemperatureUnitContext.Provider>
  );
}

export function useTemperatureUnit() {
  const context = useContext(TemperatureUnitContext);
  if (!context) {
    throw new Error(
      "useTemperatureUnit must be used within a TemperatureUnitProvider",
    );
  }
  return context;
}
