const WeatherCard = ({ title, value, unit, subtitle }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border flex-1">
      <p className="text-sm text-brand-text-secondary">{title}</p>

      <p className="text-2xl font-semibold mt-1">
        {value}
        {unit && <span className="text-base ml-1">{unit}</span>}
      </p>

      {subtitle && (
        <p className="text-sm text-brand-text-secondary mt-1">{subtitle}</p>
      )}
    </div>
  );
};
export default WeatherCard;
