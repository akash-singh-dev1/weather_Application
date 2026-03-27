import { useLocationContext } from "../context/LocationContext";

const LocationAccessRequired = () => {
  const { getLocation } = useLocationContext();
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 animate-slide-up bg-white/30 backdrop-blur-lg rounded-3xl p-10 border border-white/40 shadow-xl max-w-md mx-auto mt-12">
      <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-2">
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
      <p className="text-center text-brand-text-primary font-semibold text-xl">
        Location Access Required
      </p>
      <button
        onClick={getLocation}
        className="px-8 py-3 bg-brand-primary text-white rounded-full hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 font-medium"
      >
        Enable Location
      </button>
    </div>
  );
};
export default LocationAccessRequired;
