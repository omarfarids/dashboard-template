import TextInput from "@/components/TextInput";
import Button from "@/components/Button"; // Adjust the import path as needed
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutate } from "@/hooks/useMutate";
import Avatar from "@/components/Avatar";
import { useEffect, useState } from "react";
import { useGetData } from "@/hooks/useGetData";
import Cookies from "js-cookie";

const Settings = () => {
  // ------------ hooks -------------
  const [image, setImage] = useState<any>(null);
  const { mutateAsync } = useMutate();
  const [displayImages, setdisplayImages] = useState<any>(null);
  const { data, refetch } = useGetData(`/user/${Cookies.get("userId")}`);

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
      body: { ...data, image, id: Cookies.get("userId") },
    })
      .then(() => {
        refetch();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  // ------------- useEffect ------------
  useEffect(() => {
    if (data?.data) {
      setValue("username", data?.data?.username);
      setValue("email", data?.data?.email);
      setdisplayImages(data?.data?.image);
    }
  }, [data]);

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
        <p className="underline text-gray cursor-pointer pb-5 font-semibold">
          Update your password?
        </p>

        <div className="flex flex-col items-start gap-2">
          <div>
            <TextInput placeholder="username..." {...register("username")} />
            <p>{errors.username?.message}</p>
          </div>
          <div>
            <TextInput placeholder="Email Address" {...register("email")} />
            <p>{errors.email?.message}</p>
          </div>
          <Button label="Save changes" className="w-full rounded-sm " />
        </div>
      </form>
    </section>
  );
};

export default Settings;
