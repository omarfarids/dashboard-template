import { Outlet } from "react-router-dom";
import Header from "./Header";

const CusomerLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default CusomerLayout;
