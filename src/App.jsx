import { Navigate, Route, Routes } from "react-router";
import RootLayout from "./layout/RootLayout";
import CurrentWeather from "./pages/CurrentWeather";
import HistoricalWeather from "./pages/HistoricalWeather";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<CurrentWeather />} />
          <Route path="/historical" element={<HistoricalWeather />} />

          {/*Default route if no route is matched*/}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  );
};
export default App;
