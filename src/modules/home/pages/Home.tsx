import Table from "@/components/Table";
import { useGetData } from "@/hooks/useGetData";

const TITLES: any = [
  { label: "Image", key: "image", type: "image" },
  { label: "Restaurant", key: "username", type: "text" },
  { label: "Email", key: "email", type: "text" },
];

const Dashboard = () => {
  // ------------ hooks -------------
  const { data } = useGetData(`/user`);

  return (
    <section className="p-2 md:p-5">
      <Table title={TITLES} data={data?.data} isNavigatable={true} />
    </section>
  );
};

export default Dashboard;
