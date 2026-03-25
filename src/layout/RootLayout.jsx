import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { LocationProvider } from "../context/LocationContext";
import { TemperatureUnitProvider } from "../context/TemperatureUnitContext";
const RootLayout = () => {
  return (
    <>
      <LocationProvider>
        <TemperatureUnitProvider>
          <div className="min-h-screen bg-brand-bg">
            <Navbar />

            <main className="p-6 mx-auto px-4 ">
              <Outlet />
            </main>
          </div>
        </TemperatureUnitProvider>
      </LocationProvider>
    </>
  );
};
export default RootLayout;
