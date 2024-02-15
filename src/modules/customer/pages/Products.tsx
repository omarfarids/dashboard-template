import { useGetData } from "@/hooks/useGetData";
import { setCartItems } from "@/store/reducers/cartReducer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import dammyProduct from "@/assets/product.webp";
import Loading from "@/components/Loading";

const Products = () => {
  // ------------- hooks -------------
  const navigate = useNavigate();
  const { categoryId, userId } = useParams();
  const { data, isLoading, isRefetching } = useGetData(
    `/customer/product/${categoryId}?userId=${userId}`
  );
  const cartItems = useSelector((state: any) => state?.cart?.cartItems);
  const dispatch = useDispatch();
  const [itemIDs, setItemIDs] = useState<any>([]);

  return (
    <div>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 100,
        }}
      >
        <button
          className="btn btn-neutral w-fit"
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

      <div className="min-h-screen">
        {isLoading || isRefetching ? (
          <Loading />
        ) : (
          <div className="flex flex-row flex-wrap justify-start gap-5 m-5  ">
            {data?.data?.map((item: any) => (
              <div
                key={item?._id}
                className="card card-compact w-96 bg-base-100 shadow-md hover:shadow-2xl cursor-pointer"
              >
                <div
                  style={{
                    justifyTracks: "center",
                    width: "200px",
                    height: "150px",
                  }}
                >
                  <figure className="h-full w-full ">
                    <img
                      src={item?.image?.length ? item?.image : dammyProduct}
                      alt="Food"
                    />
                  </figure>
                </div>
                <div className="card-body">
                  <h2 className="card-title">{item?.name}</h2>
                  <p className="text-lg">{item?.description}</p>
                  <div className=" flex flex-row justify-between items-center">
                    <div>
                      {!itemIDs?.includes(item?._id) ? (
                        <button
                          className="btn btn-neutral w-fit"
                          onClick={() => {
                            dispatch(
                              setCartItems([
                                ...cartItems,
                                { ...item, quantity: 1 },
                              ])
                            );
                            setItemIDs((prev: any) => [...prev, item?._id]);
                          }}
                        >
                          Add to card
                        </button>
                      ) : (
                        <button
                          className="btn btn-success hover:bg-red-500 w-fit"
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
                          Added
                        </button>
                      )}
                    </div>
                    <div>
                      <p className="font-bold">Price : {item?.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
