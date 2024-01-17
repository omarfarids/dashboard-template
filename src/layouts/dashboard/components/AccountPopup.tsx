import React from "react";
import { Link } from "react-router-dom";

const Dropdown = () => {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className=" flex flex-row items-center cursor-pointer hover:bg-soft-gray p-2 px-3 items-center rounded-full"
      >
        <div className="avatar">
          <div className="w-14 rounded-full">
            <img
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="avatar"
            />
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="m7 10l5 5l5-5z" />
        </svg>
      </div>
      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <Link to="/">Item 1</Link>
        </li>
        <li>
          <Link to="/">Item 2</Link>
        </li>
        <hr />
        <li className="pt-1">
          <Link to="/auth/login">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
