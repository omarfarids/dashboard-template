import TextInput from "@/components/TextInput";
import Button from "@/components/Button"; // Adjust the import path as needed
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutate } from "@/hooks/useMutate";
import Avatar from "@/components/Avatar";
import { useEffect, useRef, useState } from "react";
import { useGetData } from "@/hooks/useGetData";
import Cookies from "js-cookie";
import Loading from "@/components/Loading";
import QRCode from "react-qr-code";
import ChangePassword from "../component/ChangePassword";

const Settings = () => {
  // ------------ hooks -------------
  const inputRef: any = useRef(null);
  const [image, setImage] = useState<any>(null);
  const { mutateAsync, isPending } = useMutate();
  const [displayImages, setdisplayImages] = useState<any>(null);
  const { data, refetch, isRefetching, isLoading } = useGetData(
    `/user/${Cookies.get("userId")}`
  );

  const schema = yup.object().shape({
    username: yup.string().required("Username is a required field"),
    email: yup.string().email().required("Email is a required field"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  }: any = useForm({
    resolver: yupResolver(schema),
  });

  // ------------ functions ------------
  const onSubmit: SubmitHandler<any> = (data: any) => {
    mutateAsync({
      url: `/user/${Cookies.get("userId")}`,
      method: "PUT",
      body: {
        username: data.username,
        email: data.email,
        image,
        id: Cookies.get("userId"),
      },
    })
      .then(() => {
        refetch();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const copyContent = () => {
    // Select the input field
    inputRef.current.select();

    // Copy the selected content to the clipboard
    document.execCommand("copy");
  };

  // ------------- useEffect ------------
  useEffect(() => {
    if (data?.data) {
      setValue("username", data?.data?.username);
      setValue("email", data?.data?.email);
      setdisplayImages(data?.data?.image);
    }
  }, [data]);

  if (isLoading || isRefetching) {
    return <Loading />;
  }

  return (
    <section className="p-2 md:px-5 w-full">
      <p className="text-2xl font-semibold">Update your profile</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 items-center mt-5"
      >
        <Avatar
          displayImages={displayImages}
          setDisplayImages={setdisplayImages}
          setValue={setImage}
        />
        <p className=" font-semibold">Upload new avatar</p>

        <ChangePassword />

        {!data?.data?._doc?.isAdmin && (
          <div>
            <div className="flex justify-center">
              <QRCode
                value={
                  import.meta.env.VITE_BASE_FRONTEND_URL +
                  `/customer/${data?.data?.id}`
                }
                size={250}
              />
            </div>
          </div>
        )}
        <div className="flex flex-col items-start gap-2">
          {!data?.data?._doc?.isAdmin && (
            <>
              {" "}
              <p className="font-semibold pb-1">Your restaurant link</p>
              <input
                type="text"
                ref={inputRef}
                value={
                  import.meta.env.VITE_BASE_FRONTEND_URL +
                  `/customer/${data?.data?.id ? data?.data?.id : ""}`
                }
                readOnly
                onClick={copyContent}
                className="input input-bordered w-full input-md rounded-sm bg-softGray text-gray cursor-pointer w-full sm:w-[450px]"
              />
            </>
          )}
          <div>
            <TextInput placeholder="username..." {...register("username")} />
            <p>{errors.username?.message}</p>
          </div>
          <div>
            <TextInput placeholder="Email Address" {...register("email")} />
            <p>{errors.email?.message}</p>
          </div>
          <Button
            isLoading={isPending}
            label="Save changes"
            className="w-full rounded-sm "
          />
        </div>
      </form>
    </section>
  );
};

export default Settings;
