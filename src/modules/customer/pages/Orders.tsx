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
        backgroundColor: "#0b7180",
        height: "100%",
      }}
    >
      <div>
        <div
          className="flex flex-col flex-wrap items-center justify-start gap-5 pt-20"
          style={{ direction: "rtl" }}
        >
          {cartItems?.map((item: any) => (
            <div className="card card-compact border border-gray bg-base-100 shadow-xl flex flex-col w-4/5 md:w-2/5 md:flex-row mx-5 gap-5 md:gap-20">
              <div className="m-3">
                <img
                  src={item?.image?.length ? item?.image : dammyProduct}
                  alt="Food"
                  className="w-full h-60 md:w-48 md:h-48"
                />
                <h2 className="card-title  justify-center">{item?.name}</h2>
              </div>
              <div className="card-body flex flex-col items-center md:items-end justify-end gap-5">
                <div className="flex flex-row gap-5 font-bold">
                  <p>السعر : {item?.price} </p>
                  <p>الكمية : {item?.quantity}</p>
                </div>
                <div className="card-actions justify-center md:justify-end">
                  <button
                    className="btn bg-cardBg text-white hover:text-black"
                    onClick={() => incrementPrice(item?._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                  <button
                    className="btn bg-cardBg text-white hover:text-black"
                    onClick={() => decrementPrice(item?._id)}
                    disabled={item?.quantity === 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14"
                      />
                    </svg>
                  </button>
                  <button
                    className="btn bg-cardBg text-white hover:text-black"
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
        <div
          style={{ direction: "rtl" }}
          className="card card-compact gap-5 bg-base-100 shadow-xl md:w-1/2 mx-auto mt-5 p-5 border border-base-300 card bg-base-100 shadow-xl flex justify-center"
        >
          <p className="font-bold text-[40px]">السعر الكلي : {price}</p>
          <textarea
            placeholder="معلومات اضافية ..."
            className="textarea textarea-bordered textarea-xs w-full max-w-xs "
            onChange={(e) => setAdditional(e.target.value)}
          ></textarea>

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
            اطلب الان
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Orders;
