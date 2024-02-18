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
    <div className="  h-full bg-bgcolor ">
      {/* <img
        src={customer}
        alt="customr"
        className="w-full h-full opacity-70 object-cover absolute top-0 left-0 z-0  "
      /> */}
      <div className="hero min-h-screen">
        <img
          src={restaurantBG}
          className="w-full cover opacity-60 shadow-md"
          alt="restaurant"
        />
        <p className="w-1/2 text-3xl font-bold text-center text-white">
          "Indulge in our culinary creations, where each dish is crafted with
          passion, offering flavors that dance on your palate and memories that
          linger long after."
        </p>
      </div>
      <div id="orders" className="min-h-96 rounded-xl mx-12 mt-10">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-row flex-wrap justify-start gap-5 p-5">
            {data?.data?.map((item: any) => (
              <div
                key={item?._id}
                className="card card-compact w-80 bg-base-100 shadow-md hover:shadow-2xl cursor-pointer border border-gray hover:bg-cardBg hover:text-white"
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
