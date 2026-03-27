import { NavLink } from "react-router";
import { useTemperatureUnit } from "../context/TemperatureUnitContext";

const Navbar = () => {
  const { unit, toggleUnit } = useTemperatureUnit();

  return (
    <header className="sticky top-0 z-50 py-4 px-3 sm:px-6 lg:px-8">
      {/* Floating Glass Container - Always flex-row to keep it on one line */}
      <div className="max-w-6xl mx-auto bg-white/60 backdrop-blur-xl border border-white/60 shadow-sm rounded-3xl px-4 py-2.5 sm:px-6 sm:py-3 flex flex-row gap-2 items-center justify-between transition-all duration-300">
        {/* Left side Links */}
        <nav className="flex gap-2 sm:gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative px-2 py-1.5 text-xs sm:text-base font-semibold transition-colors duration-200 ${
                isActive
                  ? "text-brand-primary after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4/5 after:h-0.5 after:bg-brand-primary after:rounded-full"
                  : "text-brand-text-secondary hover:text-brand-text-primary"
              }`
            }
          >
            Hourly Forecast
          </NavLink>

          <NavLink
            to="/historical"
            className={({ isActive }) =>
              `relative px-2 py-1.5 text-xs sm:text-base font-semibold transition-colors duration-200 ${
                isActive
                  ? "text-brand-primary after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4/5 after:h-0.5 after:bg-brand-primary after:rounded-full"
                  : "text-brand-text-secondary hover:text-brand-text-primary"
              }`
            }
          >
            Historical Data
          </NavLink>
        </nav>

        {/* Right side Temperature Toggle */}
        <button
          onClick={toggleUnit}
          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white/80 backdrop-blur-md border border-brand-primary/20 text-brand-primary font-bold text-xs sm:text-sm rounded-full shadow-sm hover:bg-brand-primary hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 shrink-0"
          aria-label="Toggle Temperature Unit"
        >
          {unit === "celsius" ? "°C" : "°F"}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
