import React from "react";
import AccountPopup from "./AccountPopup";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex justify-between items-center p-6">
      <h1 className="text-3xl font-semibold">{pathname.slice(1)}</h1>
      <div className="flex flex-row gap-2 items-center">
        <div className="relative hover:bg-soft-gray w-12 h-12 flex justify-center items-center rounded-full cursor-pointer">
          <svg
            className="absolute top-[-4px] right-[0px]"
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 16 16"
          >
            <path
              fill="#6F8DE8"
              d="M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
            />
          </svg>
          <img src="/public/assets/images/bill.svg" alt="" />
        </div>
        <AccountPopup />
      </div>
    </div>
  );
};

export default Header;
