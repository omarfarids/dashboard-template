import { Outlet } from "react-router-dom";
import Header from "./Header";

const CusomerLayout = () => {
  return (
    <div className="">
      <Header />
      <Outlet />
    </div>
  );
};

export default CusomerLayout;
