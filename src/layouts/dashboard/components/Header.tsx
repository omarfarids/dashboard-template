import AccountPopup from "./AccountPopup";
// import { useLocation } from "react-router-dom";

const Header = () => {
  // const { pathname } = useLocation();

  return (
    <div className="flex justify-between items-center p-2 bg-lightGray">
      <h1 className="text-3xl font-semibold capitalize"></h1>
      <div className="flex flex-row gap-2 items-center">
        <AccountPopup />
      </div>
    </div>
  );
};

export default Header;
