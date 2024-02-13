import { setCartItems } from "@/store/reducers/cartReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dammyProduct from "@/assets/product.webp";
import { Link } from "react-router-dom";

const Orders = () => {
  // ------------- hooks -------------
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state?.cart?.cartItems);
  const [orderMessage, setOrderMessage] = useState("Cart%20is%20empty");
  const [additional, setAdditional] = useState("");
  const user = useSelector((state: any) => state?.global?.restaurantInfo);

  // ------------- function -------------

  const incrementPrice = (id: any) => {
    const newCartItems = cartItems.map((item: any) => {
      if (item._id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    dispatch(setCartItems(newCartItems));
  };
  const decrementPrice = (id: any) => {
    const newCartItems = cartItems.map((item: any) => {
      if (item._id === id) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    dispatch(setCartItems(newCartItems));
  };

  // ----------- side effects --------------

  useEffect(() => {
    const total = cartItems?.reduce(
      (total: any, item: any) => total + item.price * item.quantity,
      0
    );
    setPrice(total);

    const message = cartItems
      ?.map((item: any) => `${item.name}: ${item.quantity}`)
      .join("\n");
    const MergMessage = encodeURIComponent(
      `${message} \n Total: ${total} \n Additional: ${additional}`
    );
    setOrderMessage(MergMessage);
  }, [cartItems, additional]);

  return (
    <div
      style={{
        backgroundImage:
          "url(data:image/jpeg;base64,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)",
      }}
    >
      <div className="hero  max-h-screen">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md ">
            <h1 className="mb-5 text-5xl font-bold">Your Cart Items</h1>
            <p className="mb-5">
              Step into a world of culinary delight where every dish tells a
              story .
            </p>
          </div>
        </div>
      </div>
      <div className="min-h-screen">
        <div className="flex flex-row flex-wrap justify-start gap-5 my-5  ">
          {cartItems?.map((item: any) => (
            <div className="card card-compact  bg-base-100 shadow-xl flex flex-row w-full mx-5 h-40 ">
              <figure>
                <img
                  src={item?.image?.length ? item?.image : dammyProduct}
                  alt="Food"
                  className="w-40 h-40"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title  justify-center">{item?.name}</h2>
                <p>Price : {item?.price} </p>

                <div className="card-actions justify-end">
                  <p>Quantity : {item?.quantity}</p>
                  <button
                    className="btn"
                    onClick={() => incrementPrice(item?._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                  <button
                    className="btn"
                    onClick={() => decrementPrice(item?._id)}
                    disabled={item?.quantity === 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14"
                      />
                    </svg>
                  </button>
                  <button
                    className="btn"
                    onClick={() => dispatch(setCartItems([]))}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="card card-compact  bg-base-100 shadow-xl flex flex-row w-full h-40 mt-5">
          <div
            className="card bg-base-100 shadow-xl flex justify-center w-full 
         "
          >
            <div className=" flex justify-items-center justify-center gap-5 ">
              <textarea
                placeholder="additional notes ..."
                className="textarea textarea-bordered textarea-xs w-full max-w-xs "
                onChange={(e) => setAdditional(e.target.value)}
              ></textarea>
              <p className="font-bold ">Total amount : {price}</p>
            </div>

            <Link
              to={`https://wa.me/${user?.phone}/?text=${orderMessage}`}
              target="_blank"
              className="btn link-accent  m-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                />
              </svg>{" "}
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
