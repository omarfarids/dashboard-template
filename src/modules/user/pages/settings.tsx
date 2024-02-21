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
import { handleImageChange } from "@/utils/functions";

const Settings = () => {
  // ------------ hooks -------------
  const inputRef: any = useRef(null);
  const [image, setImage] = useState<any>(null);
  const { mutateAsync, isPending } = useMutate();
  const [displayImages, setdisplayImages] = useState<any>(null);
  const [themeData, setThemeData] = useState<any>({
    headerImg: null,
    bgImg: null,
    bgColor: null,
  });
  const { data, refetch, isLoading } = useGetData(
    `/user/${Cookies.get("username")}`,
    `userSettings-${Cookies.get("username")}`
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

    console.log(themeData);
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

        {!data?.data?.isAdmin && (
          <div>
            <div className="flex justify-center">
              <QRCode
                value={
                  import.meta.env.VITE_BASE_FRONTEND_URL +
                  `/customer/${data?.data?.username}`
                }
                size={250}
              />
            </div>
          </div>
        )}
        <div className="flex flex-col items-start gap-2">
          {!data?.data?.isAdmin && (
            <>
              {" "}
              <p className="font-semibold pb-1">Your restaurant link</p>
              <input
                type="text"
                ref={inputRef}
                value={
                  import.meta.env.VITE_BASE_FRONTEND_URL +
                  `/customer/${
                    data?.data?.username ? data?.data?.username : ""
                  }`
                }
                readOnly
                onClick={copyContent}
                className="input input-bordered w-full input-md rounded-sm bg-softGray text-gray cursor-pointer w-full sm:w-[450px]"
              />
            </>
          )}
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
          <p className="font-semibold">Header Image</p>
          <input
            type="file"
            onChange={(e: any) => {
              setThemeData((prev: any) => {
                return {
                  ...prev,
                  headerImg: handleImageChange(e),
                };
              });
            }}
          />
          <p className="font-semibold">Background Image</p>
          <input
            type="file"
            onChange={(e: any) => {
              setThemeData((prev: any) => {
                return {
                  ...prev,
                  bgImg: handleImageChange(e),
                };
              });
            }}
          />
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <p className=" font-semibold">Background Color</p>
              </div>
              <select
                onChange={(e: any) =>
                  setThemeData((prev: any) => {
                    return {
                      ...prev,
                      bgColor: e.target.value,
                    };
                  })
                }
                className={`bg-[${themeData?.bgColor}] select-bordered`}
              >
                <option disabled></option>
                <option className="bg-[#084e5a]" value={"#084e5a"}></option>
                <option className="bg-[#292929]" value={"#292929"}></option>
                <option className="bg-[#1B3C73]" value={"#1B3C73"}></option>
                <option className="bg-[#0C2D57]" value={"#0C2D57"}></option>
                <option className="bg-[#561C24]" value={"#561C24"}></option>
                <option className="bg-[#294B29]" value={"#294B29"}></option>
                <option className="bg-[#3E3232]" value={"#3E3232"}></option>
                <option className="bg-[#332941]" value={"#332941"}></option>
                <option className="bg-[#CFB997]" value={"#CFB997"}></option>
              </select>
            </label>
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
