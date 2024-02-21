import { useGetData } from "@/hooks/useGetData";
import { useNavigate, useParams } from "react-router-dom";
import dummyProduct from "@/assets/product.webp";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import { setRestaurantInfo } from "@/store/reducers/globalReducer";
import { useDispatch } from "react-redux";
import { notify } from "@/utils/notify";
import restaurantBG from "@/assets/restaurant2.jpg";

const Categories = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { data, isLoading, isError } = useGetData(
    `/customer/category/${userId}?userId=${userId}`,
    "restaurantCategories"
  );
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
    <div
      className="  h-full bg-bgcolor opacity-70"
      style={{ backgroundColor: "#941b10" }}
    >
      {/* <img
        src={customer}
        alt="customr"
        className="w-full h-full opacity-70 object-cover absolute top-0 left-0 z-0  "
      /> */}
      <div className=" ">
        s
        <div className=" m-10 mt-16">
          <img
            src={restaurantBG}
            className="w-full cover opacity-60 shadow-md rounded-xl h-96"
            alt="restaurant"
          />
        </div>
      </div>
      <div className="divider mx-12"></div>
      <div className="w-60 mx-12 ">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
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
      <div id="orders" className="min-h-96 rounded-xl mx-4 mt-10">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-row flex-wrap justify-start gap-5 p-5">
            {data?.data?.map((item: any) => (
              <div
                key={item?._id}
                className="card card-compact w-56 bg-base-100 shadow-md hover:shadow-2xl cursor-pointer border border-gray hover:scale-105 hover:bg-softGray"
                onClick={() => {
                  navigate(`/customer/products/${item?._id}/${userId}`);
                }}
              >
                <figure>
                  <img
                    className="h-60 border border-lightGray cover w-full"
                    src={item?.image?.length ? item?.image : dummyProduct}
                    alt="Food"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item?.name}</h2>
                  <p>{item?.description}</p>
                  <div className="card-actions justify-end"></div>
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
