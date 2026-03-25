import { NavLink } from "react-router";
import { useTemperatureUnit } from "../context/TemperatureUnitContext";

const Navbar = () => {
  const { unit, toggleUnit } = useTemperatureUnit();
  return (
    <header className="bg-white border-b px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium ${
                isActive ? "text-brand-primary" : "text-brand-text-secondary"
              }`
            }
          >
            Hourly Forecast
          </NavLink>

          <NavLink
            to="/historical"
            className={({ isActive }) =>
              `font-medium ${
                isActive ? "text-brand-primary" : "text-brand-text-secondary"
              }`
            }
          >
            Historical Data
          </NavLink>
        </div>

        {/* Right side Temperature Toggle */}
        <div className="flex items-center gap-2">
          <span className={unit === "celsius" ? "font-semibold" : ""}>°C</span>
          <button
            onClick={toggleUnit}
            className="w-12 h-6 bg-brand-secondary rounded-full relative transition"
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-brand-primary rounded-full transition-all ${
                unit === "fahrenheit" ? "left-7" : "left-1"
              }`}
            />
          </button>

          <span className={unit === "fahrenheit" ? "font-semibold" : ""}>
            °F
          </span>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
