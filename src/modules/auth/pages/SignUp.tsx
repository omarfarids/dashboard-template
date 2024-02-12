import { useNavigate } from "react-router-dom";
import TextInput from "@/components/TextInput"; // Adjust the import path as needed
import Button from "@/components/Button"; // Adjust the import path as needed
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutate } from "@/hooks/useMutate";
import Avatar from "@/components/Avatar";
import { useState } from "react";

const SignUp = () => {
  // ------------ hooks -------------
  const [value, setValue] = useState<any>(null);
  const [displayImages, setdisplayImages] = useState<any>(null);
  const { mutateAsync, isPending } = useMutate();

  const schema = yup.object().shape({
    username: yup.string().required("Username is a required field"),
    email: yup.string().email().required("Email is a required field"),
    phone: yup.string().required("Phone number is a required field"),
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
  const onSubmit: SubmitHandler<any> = (data: any) => {
    mutateAsync({
      url: "/auth/signup",
      method: "POST",
      body: { ...data, image: value },
    })
      .then(() => {
        navigate("/auth/login");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 items-center"
      >
        <h1 className="text-3xl font-semibold mb-5">Sign Up</h1>
        <Avatar
          displayImages={displayImages}
          setDisplayImages={setdisplayImages}
          setValue={setValue}
        />
        <TextInput placeholder="username..." {...register("username")} />
        <p>{errors.username?.message}</p>
        <TextInput placeholder="Email Address" {...register("email")} />
        <p>{errors.email?.message}</p>
        <TextInput placeholder="Phone number" {...register("phone")} />
        <p>{errors.phone?.message}</p>
        <TextInput
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        <TextInput
          placeholder="Confirm Password"
          type="password"
          {...register("confirmPassword")}
        />
        <p>{errors.confirmPassword?.message}</p>
        <Button
          isLoading={isPending}
          label="Submit"
          className="w-full rounded-sm mt-2"
        />
      </form>
    </section>
  );
};

export default SignUp;
