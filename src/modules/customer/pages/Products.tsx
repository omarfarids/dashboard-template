import { useGetData } from "@/hooks/useGetData";
import { setCartItems } from "@/store/reducers/cartReducer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dammyProduct from "@/assets/product.webp";
import Loading from "@/components/Loading";
import customer from "@/assets/customer.jpeg";
import { useSearch } from "@/hooks/useSearch";

const Products = () => {
  // ------------- hooks -------------
  const { categoryId, userId } = useParams();
  const { data, isLoading } = useGetData(
    `/customer/product/${categoryId}?userId=${userId}`,
    `restaurantProducts-${categoryId}`
  );
  const cartItems = useSelector((state: any) => state?.cart?.cartItems);
  const dispatch = useDispatch();
  const [itemIDs, setItemIDs] = useState<any>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchedData] = useSearch(data?.data, searchInput, "name");

  return (
    <div className="relative min-h-screen bg-[#CFB99799]">
      <img
        src={customer}
        alt="customr"
        className="w-full h-full opacity-70 object-cover absolute top-0 left-0 z-0  "
      />
      <div className="">s</div>

      <div className="md:w-72 mx-10 mt-14 mb-5">
        <label className="input input-bordered flex items-center gap-2 relative z-5">
          <input
            value={searchInput}
            onChange={(e: any) => setSearchInput(e.target.value)}
            type="text"
            className="grow"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="min-h-96 rounded-xl mx-10">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:p-5">
            {searchedData?.map((item: any) => (
              <div
                style={{ direction: "rtl" }}
                key={item?._id}
                className="card card-compact w-full overflow-hidden bg-base-100 shadow-md hover:shadow-2xl cursor-pointer border border-gray hover:bg-softGray"
              >
                <div>
                  <figure>
                    <img
                      src={item?.image?.length ? item?.image : dammyProduct}
                      alt="Food"
                      className="h-40 border border-lightGray cover w-full"
                    />
                  </figure>
                </div>
                <div className="card-body">
                  <h2 className="card-title">{item?.name}</h2>
                  <p className="text-lg">{item?.description}</p>
                  <div className="flex flex-row justify-between items-center">
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
                          إضافة للسلة
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
                          تم اضافته
                        </button>
                      )}
                    </div>
                    <div>
                      <p className="font-bold">السعر : {item?.price}</p>
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
