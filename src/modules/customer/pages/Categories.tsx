import { useGetData } from "@/hooks/useGetData";
import { useNavigate, useParams } from "react-router-dom";
import dummyProduct from "@/assets/product.webp";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import { setRestaurantInfo } from "@/store/reducers/globalReducer";
import { useDispatch } from "react-redux";
import { notify } from "@/utils/notify";
import restaurantBG from "@/assets/restaurant1.jpg";

const Categories = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { data, isLoading, isRefetching, isError } = useGetData(
    `/customer/category/${userId}?userId=${userId}`
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
    <div>
      <div className="hero min-h-screen">
        <img
          src={restaurantBG}
          className="w-full cover opacity-70"
          alt="restaurant"
        />
      </div>
      <div id="orders" className="min-h-96">
        {isLoading || isRefetching ? (
          <Loading />
        ) : (
          <div className="flex flex-row flex-wrap justify-start gap-5 m-5">
            {data?.data?.map((item: any) => (
              <div
                key={item?._id}
                className="card card-compact w-80 bg-base-100 shadow-md hover:shadow-2xl cursor-pointer border border-gray"
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
