import Table from "@/components/Table";
import { useGetData } from "@/hooks/useGetData";
import Button from "@/components/Button";
import { useSelector } from "react-redux";
import ModalWrapper from "@/components/ModalWrapper";
import { useState } from "react";
import { useMutate } from "@/hooks/useMutate";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/components/TextInput";
import Avatar from "@/components/Avatar";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const TITLES: any = [
  { label: "Image", key: "image", type: "image" },
  { label: "Name", key: "name", type: "text" },
  { label: "Description", key: "description", type: "text" },
  { label: "Created at", key: "create_at", type: "text" },
  { label: "Update at", key: "update_at", type: "text" },
  { label: "Action", key: "action", type: "text" },
];

const Products = () => {
  // ------------ hooks -------------
  const globalState = useSelector((state: any) => state.global);

  const { data } = useGetData(`/category/${globalState?.user?.userId}`);
  const [value, setValue] = useState<any>(null);
  const [displayImages, setdisplayImages] = useState<any>(null);
  const { mutateAsync } = useMutate();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    description: yup.string().required("Description is a required field"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<any> = (data: any) => {
    mutateAsync({
      url: "/category",
      method: "POST",
      body: { ...data, image: value, userId: globalState?.user?.userId },
    })
      .then(() => {
        navigate("/category");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  console.log(globalState?.user?.userId);

  return (
    <section className="p-2 md:p-5">
      <div className="flex justify-end mb-5">
        <ModalWrapper
          button={({ onClick }: any) => (
            <Button
              onClick={onClick}
              className="w-56"
              label="Create New Category"
            />
          )}
        >
          <div>
            <h1 className="text-xl font-bold mb-5">Create new category</h1>
          </div>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2 items-center"
            >
              <Avatar
                displayImages={displayImages}
                setDisplayImages={setdisplayImages}
                setValue={setValue}
              />
              <TextInput placeholder="Prodect name" {...register("name")} />
              <p>{errors.name?.message}</p>
              <textarea
                className="textarea textarea-bordered h-24 w-full sm:w-[450px]"
                placeholder="Description..."
                {...register("description")}
              />
              <p>{errors.description?.message}</p>

              <Button label="Submit" className="w-full rounded-sm mt-2" />
            </form>
          </div>
        </ModalWrapper>
      </div>
      <Table title={TITLES} data={data?.data} />
    </section>
  );
};

export default Products;
