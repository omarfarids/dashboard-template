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
];

const UsersCategory = () => {
  // ------------ hooks -------------
  const [openModal, setOpenModal] = useState(false);
  const param = useParams();
  const [editedId, setEditedId] = useState<any>(null);
  const [loading, setLoading] = useState<any>({
    add: false,
    edit: false,
    delete: false,
  });
  const [subscriptionPeriod, setSubscriptionPeriod] = useState<any>(null);
  const { data, refetch, isRefetching, isLoading } = useGetData(
    `/category/${param.userId}`
  );
  const [value, setValue] = useState<any>(null);
  const [displayImages, setdisplayImages] = useState<any>(null);
  const { mutateAsync } = useMutate();

  const schema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    description: yup.string().required("Description is a required field"),
  });
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setFormValues,
  }: any = useForm({
    resolver: yupResolver(schema),
  });

  const onDelete: SubmitHandler<any> = (data) => {
    setLoading((prev: any) => ({ ...prev, delete: true }));
    mutateAsync({
      url: `/category/${data}`,
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
      body: { ...data, image: value, userId: param.userId },
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

  //   ------------ side effects ------------

  if (isLoading || isRefetching) {
    return <Loading />;
  }

  return (
    <section className="p-2 md:p-5 flex flex-col">
      <header>
        <h1 className="text-3xl font-semibold capitalize">Categories</h1>
      </header>
      <div className="flex flex-row my-5 justify-end gap-5">
        {data?.user?.isActive ? (
          <button
            onClick={() => {
              mutateAsync({
                url: "/user/user-activation",
                method: "Post",
                body: {
                  userId: param.userId,
                  isActive: 0,
                },
              })
                .then(() => {
                  refetch();
                })
                .catch((error: any) => {
                  console.log(error);
                });
            }}
            className="btn btn-outline btn-error"
          >
            Deactivate user
          </button>
        ) : (
          <>
            <button
              onClick={() =>
                (document.getElementById("my_modal_2") as any).showModal()
              }
              className="btn btn-outline btn-primary"
            >
              Activate user
            </button>
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">User Activation</h3>
                <input
                  type="number"
                  className="input my-5 input-bordered w-full input-md rounded-sm"
                  placeholder="Subscription period"
                  value={subscriptionPeriod}
                  onChange={(e: any) => {
                    setSubscriptionPeriod(e.target.value);
                  }}
                />
                <div className="flex flex-row gap-3 justify-end">
                  {/* <form method="dialog" className="modal-backdrop"> */}
                  <button
                    onClick={() => {
                      (document.getElementById("my_modal_2") as any).close();
                    }}
                    className="btn btn-outline btn-primary"
                  >
                    close
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      mutateAsync({
                        url: "/user/user-activation",
                        method: "Post",
                        body: {
                          userId: param.userId,
                          expiration: subscriptionPeriod,
                          isActive: 1,
                        },
                      })
                        .then(() => {
                          refetch();
                          (
                            document.getElementById("my_modal_2") as any
                          ).close();
                        })
                        .catch((error: any) => {
                          console.log(error);
                        });
                    }}
                  >
                    Submit
                  </button>
                  {/* </form> */}
                </div>
              </div>
            </dialog>
          </>
        )}
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

export default UsersCategory;
