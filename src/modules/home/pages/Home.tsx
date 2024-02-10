import Loading from "@/components/Loading";
import Table from "@/components/Table";
import { useGetData } from "@/hooks/useGetData";
import { useMutate } from "@/hooks/useMutate";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

const TITLES: any = [
  { label: "Image", key: "image", type: "image" },
  { label: "Restaurant", key: "username", type: "text" },
  { label: "Email", key: "email", type: "text" },
];

const Dashboard = () => {
  // ------------ hooks -------------
  const { data, isLoading, isRefetching, refetch } = useGetData(`/user`);
  const [setLoading] = useState<any>({
    add: false,
    edit: false,
    delete: false,
  });
  const { mutateAsync } = useMutate();

  // --------------- function ----------------
  const onDelete: SubmitHandler<any> = (data: any) => {
    setLoading((prev: any) => ({ ...prev, delete: true }));
    mutateAsync({
      url: `/user/${data?._id}`,
      method: "DELETE",
    })
      .then(async () => {
        await refetch();
        setLoading((prev: any) => ({ ...prev, delete: false }));
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  if (isLoading || isRefetching) {
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
          data={data?.data}
          isNavigatable={true}
          hasActions={true}
          onDelete={onDelete}
        />
      </div>
    </section>
  );
};

export default Dashboard;
