import { useGetData } from "@/hooks/useGetData";
import { setCartItems } from "@/store/reducers/cartReducer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import dammyProduct from "@/assets/product.webp";

const Products = () => {
  // ------------- hooks -------------
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { data } = useGetData(`/customer/product/${categoryId}`);
  const cartItems = useSelector((state: any) => state?.cart?.cartItems);
  const dispatch = useDispatch();
  const [itemIDs, setItemIDs] = useState<any>([]);

  return (
    <div
      style={{
        backgroundImage:
          "url(data:image/jpeg;base64,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)",
      }}
    >
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 100,
        }}
      >
        <button
          className="btn btn-primary w-fit"
          onClick={() => navigate(`/customer/orders`)}
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
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </button>
      </div>
      <div className="hero  max-h-screen">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md ">
            <h1 className="mb-5 text-5xl font-bold">{itemIDs.name}</h1>
            <p className="mb-5">
              Step into a world of culinary delight where every dish tells a
              story and every meal is a journey. Whether you're seeking a cozy
              dinner for two, a lively family gathering, or a special
              celebration, we're thrilled to have you here.
            </p>
          </div>
        </div>
      </div>
      <div className="min-h-screen">
        <div className="flex flex-row flex-wrap justify-start gap-5 m-5  ">
          {data?.data?.map((item: any) => (
            <div
              key={item?._id}
              className="card card-compact w-96 bg-base-100 shadow-xl hover:opacity-80 cursor-pointer"
            >
              <figure>
                <img
                  src={item?.image?.length ? item?.image : dammyProduct}
                  alt="Food"
                  className="h-720"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item?.name}</h2>
                <p>Price : {item?.price}</p>

                <div className="card-actions justify-end"></div>

                {!itemIDs?.includes(item?._id) ? (
                  <button
                    className="btn btn-primary w-fit"
                    onClick={() => {
                      dispatch(
                        setCartItems([...cartItems, { ...item, quantity: 1 }])
                      );
                      setItemIDs((prev: any) => [...prev, item?._id]);
                    }}
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
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    className="btn btn-success w-fit"
                    onClick={() => {
                      dispatch(
                        setCartItems(
                          cartItems?.filter(
                            (item: any) => item?._id !== item?._id
                          )
                        )
                      );
                      setItemIDs((prev: any) =>
                        prev?.filter((i: any) => i !== item?._id)
                      );
                    }}
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
                        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
