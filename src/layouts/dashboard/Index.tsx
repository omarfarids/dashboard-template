import Header from "./components/Header"; // Adjust the path based on your project structure
import SideNav from "./components/SideNav"; // Adjust the path based on your project structure
import { NAV_ITEMS } from "./constants"; // Adjust the path based on your project structure
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="bg-secondary-100 h-screen">
      <div className="flex flex-row ">
        <SideNav navItems={NAV_ITEMS} />
        <div className="w-full md:w-4/5">
          <Header />
          <div className="h-[90vh] overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
