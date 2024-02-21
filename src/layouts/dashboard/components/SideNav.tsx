import { Type_Nav_Items } from "@/types/layout";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import logo from "@/assets/logoo.jpeg";

const Sidebar = ({ navItems }: { navItems: Type_Nav_Items[] }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const globalState = useSelector((state: any) => state.global);
  const { pathname } = useLocation();

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <>
      <div
        className="absolute flex justify-center items-center top-3 left-5 cursor-pointer w-8 h-8 rounded-full hover:bg-soft-gray z-20 md:hidden"
        onClick={toggleSideBar}
      >
        <i className="pi pi-bars"></i>
      </div>
      <div
        className={`${
          isSideBarOpen ? "w-[350px]" : "w-0"
        } bg-white md:w-1/5 h-screen md:shadow-lg shadow-2xl overflow-hidden z-10 absolute md:relative transition-all`}
      >
        <div className="p-10">
          <img src={logo} alt="logo" className="w-[50px] h-[50px]" />
        </div>
        <div className="mt-6">
          {navItems
            ?.filter(
              (item) =>
                item.role === "all" || item.role === globalState?.user?.role
            )
            ?.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={`${
                  item.path.slice(1) === pathname?.split("/")[1] &&
                  "active-route"
                } flex items-center gap-2 p-4 text-xl font-semibold hover:bg-soft-gray`}
              >
                <i className={item.icon}></i>
                {item.name}
              </NavLink>
            ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
