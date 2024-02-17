import Loading from "@/components/Loading";
import Table from "@/components/Table";
import { useGetData } from "@/hooks/useGetData";
import { useMutate } from "@/hooks/useMutate";
import { handleSubscriptionDate } from "@/utils/functions";
import { SubmitHandler } from "react-hook-form";

const TITLES: any = [
  { label: "Image", key: "image", type: "image" },
  { label: "Restaurant", key: "username", type: "text" },
  { label: "Email", key: "email", type: "text" },
  { label: "Subscription", key: "subscription", type: "text" },
  { label: "Status", key: "status", type: "text" },
];

const Dashboard = () => {
  // ------------ hooks -------------
  const { data, isLoading, refetch } = useGetData(`/user`, "adminRestaurants");
  const { mutateAsync } = useMutate();

  // --------------- function ----------------
  const onDelete: SubmitHandler<any> = (data: any) => {
    mutateAsync({
      url: `/user/${data}`,
      method: "DELETE",
    })
      .then(async () => {
        await refetch();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="p-2 md:p-5">
      <header>
        <h1 className="text-3xl font-semibold capitalize">Restaurants</h1>
      </header>
      <div className="my-5">
        <Table
          title={TITLES}
          data={data?.data
            ?.filter((item: any) => !item?.isAdmin)
            ?.map((item: any) => {
              return {
                ...item,
                subscription: item?.isActive
                  ? handleSubscriptionDate(
                      item?.subscriptionDate,
                      item?.expiration
                    )?.split("T")[0]
                  : "Expired",
                status: item?.isActive ? "Active" : "Inactive",
              };
            })}
          isNavigatable={true}
          hasActions={true}
          onDelete={onDelete}
        />
      </div>
    </section>
  );
};

export default Dashboard;
