import { Type_Nav_Items } from "@/types/layout";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import AppsIcon from "@mui/icons-material/Apps";

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
        className="absolute flex justify-center items-center top-3 bg-[#ffffff44] left-5 cursor-pointer w-8 h-8 rounded-full hover:bg-soft-gray z-20 md:hidden"
        onClick={toggleSideBar}
      >
        <AppsIcon />
      </div>
      <div
        className={`${
          isSideBarOpen ? "w-[350px]" : "w-0"
        } bg-[#494E67] md:w-1/5 text-white h-screen md:shadow-lg shadow-2xl overflow-hidden z-10 absolute md:relative transition-all`}
      >
        <div className="p-10">Logo</div>
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
                  "bg-[#ffffff44] text-white"
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
