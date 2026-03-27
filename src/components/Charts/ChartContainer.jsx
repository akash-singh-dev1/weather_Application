import { memo } from "react";
import { ResponsiveContainer } from "recharts";

const ChartContainer = ({ title, children }) => {
  return (
    <div className="flex flex-col h-full w-full">
      {/* Sleek, modern chart header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
        <h3 className="text-sm font-semibold text-brand-text-secondary uppercase tracking-wider">
          {title}
        </h3>
      </div>

      {/* Kept your excellent mobile scroll logic, just cleaned up the spacing */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-brand-primary/20 scrollbar-track-transparent">
        <div className="min-w-150 h-75">
          <ResponsiveContainer
            width="100%"
            height={300}
            debounce={50}
            minWidth={0}
          >
            {children}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default memo(ChartContainer);
