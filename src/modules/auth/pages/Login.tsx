import React from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "@/components/TextInput"; // Adjust the import path as needed
import Button from "@/components/Button"; // Adjust the import path as needed
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
  // ------------ hooks -------------
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
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
  const onSubmit: SubmitHandler<any> = (data: any) => {
    navigate("/home");
    console.log(data);
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 items-center"
      >
        <h1 className="text-3xl font-semibold mb-5">Login to your account</h1>
        <TextInput placeholder="Email Address" {...register("email")} />
        <p>{errors.email?.message}</p>
        <TextInput
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        <Button label="Login" className="w-full rounded-sm mt-2" />
        <Button
          label="Sign Up"
          className="w-full rounded-sm mt-2"
          onClick={() => navigate("/auth/sign-up")}
        />
      </form>
    </section>
  );
};

export default Login;
