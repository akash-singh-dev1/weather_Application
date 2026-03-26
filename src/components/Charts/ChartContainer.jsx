import { ResponsiveContainer } from "recharts";
const ChartContainer = ({ title, children }) => {
  return (
    <section className="mt-10 border">
      <h2 className="text-lg font-semibold mb-4 text-center text-brand-primary ">
        {title}
      </h2>

      <div className="overflow-x-auto min-w-0">
        <div className="min-w-[700px] h-[300px]">
          <ResponsiveContainer
            width="100%"
            height={300}
            debounce={50} // Delays calculation by 50ms to let the DOM settle
            minWidth={0}
          >
            {children}
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};
export default ChartContainer;
