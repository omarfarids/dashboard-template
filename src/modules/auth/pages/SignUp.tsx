import React from "react";
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
    confirmPassword: yup
      .string()
      .required("Confirm Password is a required field"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  // ------------ functions ------------
  const onSubmit: SubmitHandler<any> = () => {
    navigate("/login");
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 items-center"
      >
        <h1 className="text-3xl font-semibold mb-5">Sign Up</h1>
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
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
