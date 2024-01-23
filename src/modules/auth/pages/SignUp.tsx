import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "@/components/TextInput"; // Adjust the import path as needed
import Button from "@/components/Button"; // Adjust the import path as needed
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const SignUp = () => {
  // ------------ hooks -------------
  const schema = yup.object().shape({
    userName: yup.string().required("User Name is a required field"),
    email: yup.string().email().required("Email is a required field"),
    password: yup.string().required("Password is a required field"),
    confirmpassword: yup
      .string()
      .required("Confirm Password is a required field"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  }: any = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const [displayImages, setdisplayImages] = useState("");
  const imageRef: any = useRef(null);

  // ------------ functions ------------
  const onSubmit: SubmitHandler<any> = (data: any) => {
    navigate("/auth/login");
    console.log(data);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const display = URL.createObjectURL(fileList[0]);
    setValue("profileImage", fileList[0]);
    setdisplayImages(display);
    // Optionally, you can set the image preview here using 'display'
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 items-center"
      >
        <h1 className="text-3xl font-semibold mb-5">Sign Up</h1>
        {displayImages.length ? (
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img
                src={displayImages}
                alt="Aavatar"
                className="cursor-pointer"
              />
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                {...register("profileImage")}
                onChange={(event: any) => {
                  handleImageChange(event);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="avatar cursor-pointer">
            <div className="w-24 rounded-full">
              <input
                ref={imageRef}
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                {...register("profileImage")}
                onChange={(event: any) => {
                  handleImageChange(event);
                }}
              />
            </div>
          </div>
        )}
        <TextInput placeholder="username..." {...register("userName")} />
        <p>{errors.userName?.message}</p>
        <TextInput placeholder="Email Address" {...register("email")} />
        <p>{errors.email?.message}</p>
        <TextInput
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        <TextInput
          placeholder="Confirm Password"
          type="password"
          {...register("confirmpassword")}
        />
        <p>{errors.confirmPassword?.message}</p>
        <Button label="Submit" className="w-full rounded-sm mt-2" />
      </form>
    </section>
  );
};

export default SignUp;
