import { Type_Nav_Items } from "@/types/layout";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ navItems }: { navItems: Type_Nav_Items[] }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  //   const logoSrc = process.env.REACT_APP_LOGO_LIGHT; // Replace with the actual environment variable

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
        } bg-white md:w-[350px] h-screen md:shadow-lg shadow-2xl overflow-hidden z-10 absolute md:relative transition-all`}
      >
        <div className="p-10">
          {/* <img src={logoSrc} className="md:w-[150px]" alt="box bank" /> */}
          Logo
        </div>
        <div className="mt-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-2 p-4 text-xl font-semibold hover:bg-soft-gray"
              //   activeClassName="router-link-active router-link-exact-active"
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
