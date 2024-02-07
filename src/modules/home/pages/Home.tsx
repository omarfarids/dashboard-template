import Loading from "@/components/Loading";
import Table from "@/components/Table";
import { useGetData } from "@/hooks/useGetData";

const TITLES: any = [
  { label: "Image", key: "image", type: "image" },
  { label: "Restaurant", key: "username", type: "text" },
  { label: "Email", key: "email", type: "text" },
];

const Dashboard = () => {
  // ------------ hooks -------------
  const { data, isLoading } = useGetData(`/user`);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="p-2 md:p-5">
      <Table title={TITLES} data={data?.data} />
    </section>
  );
};

export default Dashboard;
