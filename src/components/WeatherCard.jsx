import { memo } from "react";
const WeatherCard = ({ title, value, unit, subtitle, isHero }) => {
  return (
    <div
      className={`
        relative overflow-hidden
        bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]
        rounded-3xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1
        flex flex-col justify-between h-full group
        ${isHero ? "bg-linear-to-br from-blue-500/5 to-purple-500/5 border-blue-200/50" : ""}
      `}
    >
      {/* Subtle background glow effect specifically for the Hero card */}
      {isHero && (
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl group-hover:bg-brand-primary/20 transition-all duration-500"></div>
      )}

      <div className="relative z-10">
        <p className="text-sm font-medium text-brand-text-secondary mb-2 uppercase tracking-wider">
          {title}
        </p>

        <div className="flex items-baseline">
          <p
            className={`font-bold tracking-tight text-brand-text-primary ${isHero ? "text-6xl sm:text-7xl" : "text-3xl"}`}
          >
            {value !== undefined && value !== null ? value : "--"}
          </p>
          {unit && (
            <span
              className={`font-medium text-brand-text-secondary ml-1.5 ${isHero ? "text-3xl" : "text-lg"}`}
            >
              {unit}
            </span>
          )}
        </div>
      </div>

      {/* Styling the subtitle to look like a modern UI pill/badge */}
      {subtitle && (
        <div className="mt-6 relative z-10">
          <span className="inline-block text-sm font-semibold text-brand-text-primary bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/60 shadow-sm">
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(WeatherCard);
