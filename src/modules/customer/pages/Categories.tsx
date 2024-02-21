import { useGetData } from "@/hooks/useGetData";
import { useNavigate, useParams } from "react-router-dom";
import dummyProduct from "@/assets/product.webp";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { setRestaurantInfo } from "@/store/reducers/globalReducer";
import { useDispatch } from "react-redux";
import { notify } from "@/utils/notify";
import restaurantBG from "@/assets/restaurant2.jpg";
import { useSearch } from "@/hooks/useSearch";

const Categories = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { data, isLoading, isError } = useGetData(
    `/customer/category/${userId}?userId=${userId}`,
    "restaurantCategories"
  );
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchedData] = useSearch(data?.data, searchInput, "name");
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.user) {
      dispatch(setRestaurantInfo(data?.user));
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      notify("User subscription has expired", "error");
    }
  }, [isError]);

  return (
    <div className="h-full bg-[#CFB99799]">
      <div className=" ">
        s
        <div className="mx-10 mt-16 mb-5">
          <img
            src={restaurantBG}
            className="w-full cover opacity-60 shadow-md rounded-xl h-[80vh] "
            alt="restaurant"
          />
        </div>
      </div>
      <div className="md:w-72 mx-10">
        <label className="input input-bordered flex items-center gap-2">
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
      <div id="orders" className="min-h-96 rounded-xl mx-4">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid sm:grid-cols-4  md:grid-cols-5 lg:grid-cols-6 gap-5 p-5">
            {searchedData?.map((item: any) => (
              <div
                key={item?._id}
                className="card card-compact bg-base-100 shadow-md hover:shadow-2xl cursor-pointer border border-gray hover:scale-105 hover:bg-softGray"
                onClick={() => {
                  navigate(`/customer/products/${item?._id}/${userId}`);
                }}
              >
                <figure>
                  <img
                    className="h-40 border border-lightGray cover w-full"
                    src={item?.image?.length ? item?.image : dummyProduct}
                    alt="Food"
                  />
                </figure>
                <div className="p-2">
                  <h2 className="text-xl font-semibold">{item?.name}</h2>
                  <p>{item?.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
