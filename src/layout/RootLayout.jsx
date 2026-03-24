import { Outlet } from "react-router";
const RootLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-brand-bg">
        {/* <Navbar /> */}
        <div className=" mx-auto px-4 py-6">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default RootLayout;
