import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import PageLoader from "./components/PageLoader";
import RootLayout from "./layout/RootLayout";
//Replace static imports with lazy imports
const CurrentWeather = lazy(() => import("./pages/CurrentWeather"));
const HistoricalWeather = lazy(() => import("./pages/HistoricalWeather"));
const App = () => {
  return (
    <div>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<CurrentWeather />} />
            <Route path="/historical" element={<HistoricalWeather />} />

            {/* Default route if no route is matched */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};
export default App;
