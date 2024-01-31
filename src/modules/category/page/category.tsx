import Table from "@/components/Table";
import { useGetData } from "@/hooks/useGetData";
import Button from "@/components/Button";
import { useSelector } from "react-redux";
import ModalWrapper from "@/components/ModalWrapper";

const TITLES: any = [
  { label: "Image", key: "image", type: "image" },
  { label: "Name", key: "name", type: "text" },
  { label: "Description", key: "description", type: "text" },
  { label: "Created at", key: "create_at", type: "text" },
  { label: "Update at", key: "update_at", type: "text" },
  { label: "Action", key: "action", type: "text" },
];

const Category = () => {
  // ------------ hooks -------------
  const globalState = useSelector((state: any) => state.global);

  const { data } = useGetData(`/category/${globalState?.user?.userId}`);

  return (
    <section className="p-2 md:p-5">
      <div className="flex justify-end mb-5">
        <ModalWrapper
          button={({ onClick }: any) => (
            <Button
              onClick={onClick}
              className="w-72"
              label="Create New Category"
            />
          )}
        >
          <div>
            <h1 className="text-xl font-bold">Create new category</h1>
          </div>
        </ModalWrapper>
      </div>
      <Table title={TITLES} data={data?.data} />
    </section>
  );
};

export default Category;
