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
import Loading from "@/components/Loading";
import ChangePassword from "../component/ChangePassword";

const Settings = () => {
  // ------------ hooks -------------
  const [image, setImage] = useState<any>(null);
  const { mutateAsync, isPending } = useMutate();
  const [displayImages, setdisplayImages] = useState<any>(null);

  const { data, refetch, isLoading } = useGetData(
    `/user/${Cookies.get("userId")}`,
    `userSettings-${Cookies.get("userId")}`
  );

  const schema = yup.object().shape({
    phone: yup.string().required("Phone number is a required field"),
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
      url: `/user/${Cookies.get("username")}`,
      method: "PUT",
      body: {
        phone: data.phone,
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

  // ------------- useEffect ------------
  useEffect(() => {
    if (data?.data) {
      setValue("phone", data?.data?.phone);
      setValue("username", data?.data?.username);
      setValue("email", data?.data?.email);
      setdisplayImages(data?.data?.image);
    }
  }, [data]);

  if (isLoading) {
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
        <div className="flex flex-col items-start gap-2">
          <div>
            <TextInput
              placeholder="Number ex(+964xxxxxxxxxx...)"
              {...register("phone")}
            />
            <p>{errors.username?.message}</p>
          </div>
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
