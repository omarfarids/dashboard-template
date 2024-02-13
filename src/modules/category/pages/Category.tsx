import Table from "@/components/Table";
import { useGetData } from "@/hooks/useGetData";
import Button from "@/components/Button";
import { useSelector } from "react-redux";
import ModalWrapper from "@/components/ModalWrapper";
import { useState } from "react";
import { useMutate } from "@/hooks/useMutate";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "@/components/TextInput";
import Avatar from "@/components/Avatar";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loading from "@/components/Loading";

const TITLES: any = [
  { label: "Image", key: "image", type: "image" },
  { label: "Name", key: "name", type: "text" },
  { label: "Description", key: "description", type: "text" },
  { label: "Created at", key: "createdAt", type: "date" },
  { label: "Update at", key: "updatedAt", type: "date" },
];

const Category = () => {
  // ------------ hooks -------------
  const [openModal, setOpenModal] = useState(false);
  const [editedId, setEditedId] = useState<any>(null);
  const [loading, setLoading] = useState<any>({
    add: false,
    edit: false,
    delete: false,
  });

  const globalState = useSelector((state: any) => state.global);
  const { data, isLoading, refetch, isRefetching } = useGetData(
    `/category/${globalState?.user?.userId}`
  );
  const [value, setValue] = useState<any>(null);
  const [displayImages, setdisplayImages] = useState<any>(null);
  const { mutateAsync } = useMutate();

  const schema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    description: yup.string().required("Description is a required field"),
  });
  const categoryId = data?.data?.[0]?._id;
  // -------------- functions ----------------
  const handleOpen = () => {
    setFormValues("name", "");
    setFormValues("description", "");
    setdisplayImages(null);
    setOpenModal(true);
  };
  const handleClose = () => {
    setEditedId(null);
    setOpenModal(false);
  };
  console.log(categoryId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setFormValues,
  }: any = useForm({
    resolver: yupResolver(schema),
  });
  const onDelete: SubmitHandler<any> = (categoryId) => {
    setLoading((prev: any) => ({ ...prev, delete: true }));
    mutateAsync({
      url: `/category/${categoryId._id}`,
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

  const onSubmit: SubmitHandler<any> = (data: any) => {
    setLoading((prev: any) => ({ ...prev, add: true }));
    mutateAsync({
      url: "/category",
      method: "POST",
      body: { ...data, image: value, userId: globalState?.user?.userId },
    })
      .then(async () => {
        await refetch();
        setLoading((prev: any) => ({ ...prev, add: false }));
        handleClose();
      })
      .then(() => {
        setFormValues("name", "");
        setFormValues("description", "");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const onEdit: SubmitHandler<any> = (data: any) => {
    setLoading((prev: any) => ({ ...prev, add: true }));
    mutateAsync({
      url: "/category",
      method: "PUT",
      body: { ...data, image: value, categoryId: editedId },
    })
      .then(async () => {
        await refetch();
        setLoading((prev: any) => ({ ...prev, add: false }));
        handleClose();
        setEditedId(null);
      })
      .then(() => {
        setFormValues("name", "");
        setFormValues("description", "");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const getData = (id: any) => {
    mutateAsync({
      url: `/category/single-category/${id}`,
      method: "GET",
    })
      .then((res) => {
        setFormValues("name", res?.data?.name);
        setFormValues("description", res?.data?.description);
        setdisplayImages(res?.data?.image);
        setEditedId(id);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  if (isLoading || isRefetching) {
    return <Loading />;
  }

  return (
    <section className="p-2 md:p-5 flex flex-col">
      <header>
        <h1 className="text-3xl font-semibold capitalize">Category</h1>
      </header>
      <div className="my-5 w-72 self-end">
        <Button
          onClick={handleOpen}
          className="w-56"
          label="Create New Category"
        />
        <ModalWrapper openModal={openModal} handleClose={handleClose}>
          <div>
            <h1 className="text-xl font-bold mb-5">
              {editedId ? "Edit" : "Create"} new category
            </h1>
          </div>
          <div>
            <form
              onSubmit={handleSubmit(editedId ? onEdit : onSubmit)}
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

              <Button
                isLoading={loading.add}
                label="Submit"
                className="w-full rounded-sm mt-2"
              />
            </form>
          </div>
        </ModalWrapper>
      </div>
      <Table
        title={TITLES}
        data={data?.data}
        isNavigatable={true}
        hasActions={true}
        onEdit={async (id: string | number) => {
          getData(id);
          handleOpen();
        }}
        onDelete={onDelete}
      />
    </section>
  );
};

export default Category;
