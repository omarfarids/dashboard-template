import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector((state: any) => state?.global?.restaurantInfo);
  const navigate = useNavigate();

  return (
    <div className="navbar bg-[#0C2D57] fixed z-10 shadow-md">
      <div className="flex-1">
        {user?.image?.length ? (
          <img className="w-8" src={user?.image} alt="avatar" />
        ) : null}
      </div>

      <div className="flex-none">
        <button
          className="btn btn-ghost btn-circle text-white"
          onClick={() => navigate(`${user?.username}`)}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Header;
