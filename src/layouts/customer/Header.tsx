import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector((state: any) => state?.global?.restaurantInfo);
  const cartItems = useSelector((state: any) => state?.cart?.cartItems);
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const total = cartItems?.reduce(
      (total: any, item: any) => total + item.price * item.quantity,
      0
    );
    setPrice(total);
  }, [cartItems]);

  return (
    <div className="navbar bg-[#CFB997] fixed z-10 shadow-md">
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
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5  text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartItems.length > 0 && (
                <span className="badge badge-sm indicator-item">
                  {cartItems.length}
                </span>
              )}
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body" style={{ direction: "rtl" }}>
              <span className="font-bold text-lg">{cartItems.length} عنصر</span>
              <span className="font-bold text-[15px]">
                التكلفة الإجمالية : {price}
              </span>
              <div className="card-actions">
                <button
                  className="btn btn-neutral btn-block"
                  onClick={() => navigate(`/customer/orders`)}
                >
                  إظهار السلة
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
