import Table from "@/components/Table";
import { useGetData } from "@/hooks/useGetData";
import Button from "@/components/Button";
import Cookies from "js-cookie";

const TITLES: any = [
  { label: "ID", key: "id", type: "text" },
  { label: "Image", key: "image", type: "image" },
  { label: "Name", key: "name", type: "text" },
  { label: "Created at", key: "create_at", type: "text" },
  { label: "Update at", key: "update_at", type: "text" },
  { label: "Ordering", key: "ordering", type: "text" },
  { label: "Action", key: "action", type: "text" },
];

const Category = () => {
  // ------------ hooks -------------
  const { data, isLoading, isError, refetch } = useGetData(`/user`);

  return (
    <section className="p-2 md:p-5">
      <div className="flex justify-end mb-5">
        <Button label="Create New Category" />
      </div>
      <Table title={TITLES} data={data?.data} />
    </section>
  );
};

export default Category;
