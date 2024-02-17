import Table from "@/components/Table";
import { useGetData } from "@/hooks/useGetData";
import Button from "@/components/Button";
import ModalWrapper from "@/components/ModalWrapper";
import { useState } from "react";
import { useMutate } from "@/hooks/useMutate";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/components/TextInput";
import Avatar from "@/components/Avatar";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import Loading from "@/components/Loading";

const TITLES: any = [
  { label: "Image", key: "image", type: "image" },
  { label: "Name", key: "name", type: "text" },
  { label: "Description", key: "description", type: "text" },
  { label: "Created at", key: "createdAt", type: "date" },
  { label: "Update at", key: "updatedAt", type: "date" },
  { label: "Price", key: "price", type: "text" },
];

const Products = () => {
  // ------------ hooks -------------
  const [openModal, setOpenModal] = useState(false);
  const param = useParams();
  const [editedId, setEditedId] = useState<any>(null);
  const [loading, setLoading] = useState<any>({
    add: false,
    edit: false,
    delete: false,
  });

  const { data, isLoading, refetch } = useGetData(
    `/product/${param.categoryId}`,
    `clientProducts-${param.categoryId}`
  );
  const [value, setValue] = useState<any>(null);
  const [displayImages, setdisplayImages] = useState<any>(null);
  const { mutateAsync } = useMutate();

  const schema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    description: yup.string().required("Description is a required field"),
    price: yup.string().required("Price is a required field"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setFormValues,
  }: any = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<any> = (data: any) => {
    setLoading((prev: any) => ({ ...prev, add: true }));
    mutateAsync({
      url: "/product",
      method: "POST",
      body: { ...data, image: value, categoryId: param.categoryId },
    })
      .then(async () => {
        await refetch();
        setLoading((prev: any) => ({ ...prev, add: false }));
        handleClose();
      })
      .then(() => {
        setFormValues("name", "");
        setFormValues("price", "");
        setFormValues("description", "");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  // -------------- functions ----------------
  const handleOpen = () => {
    setFormValues("name", "");
    setFormValues("description", "");
    setFormValues("price", "");
    setdisplayImages(null);
    setOpenModal(true);
  };
  const handleClose = () => {
    setEditedId(null);
    setOpenModal(false);
  };
  const onDelete: SubmitHandler<any> = (data: any) => {
    setLoading((prev: any) => ({ ...prev, delete: true }));
    mutateAsync({
      url: `/product/${data}`,
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

  const onEdit: SubmitHandler<any> = (data: any) => {
    setLoading((prev: any) => ({ ...prev, add: true }));
    mutateAsync({
      url: "/product",
      method: "PUT",
      body: { ...data, image: value, productId: editedId },
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
        setFormValues("price", "");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const getData = (id: any) => {
    mutateAsync({
      url: `/product/single-product/${id}`,
      method: "GET",
    })
      .then((res) => {
        setFormValues("name", res?.data?.name);
        setFormValues("description", res?.data?.description);
        setFormValues("price", res?.data?.price);
        setdisplayImages(res?.data?.image);
        setEditedId(id);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="p-2 md:p-5 flex flex-col">
      <header>
        <h1 className="text-3xl font-semibold capitalize">Products</h1>
      </header>
      <div className="my-5 w-72 self-end">
        <Button
          onClick={handleOpen}
          className="w-56"
          label="Create New Product"
        />
        <ModalWrapper openModal={openModal} handleClose={handleClose}>
          <div>
            <h1 className="text-xl font-bold mb-5">
              {editedId ? "Edit" : "Create"} New Product
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
              <TextInput
                placeholder="Price"
                className="w-full sm:wح-[100px] input input-bordered"
                {...register("price")}
              />
              <p>{errors.price?.message}</p>
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

export default Products;
