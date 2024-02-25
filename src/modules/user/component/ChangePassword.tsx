import Button from "@/components/Button";
import ModalWrapper from "@/components/ModalWrapper";
import TextInput from "@/components/TextInput";
import { useState } from "react";
import Cookies from "js-cookie";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutate } from "@/hooks/useMutate";

const ChangePassword = () => {
  const [openModal, setOpenModal] = useState(false);
  const { mutateAsync, isPending } = useMutate();

  const updatePasswordSchema = yup.object().shape({
    password: yup.string().required("Password is a required field"),
    oldPassword: yup.string().required("Old Password is a required field"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is a required field"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  }: any = useForm({
    resolver: yupResolver(updatePasswordSchema),
  });

  const onChangePassword: SubmitHandler<any> = (data: any) => {
    mutateAsync({
      url: `/user/update-password`,
      method: "PUT",
      body: {
        oldPassword: data.oldPassword,
        password: data.password,
        confirmPassword: data.confirmPassword,
        userId: Cookies.get("userId"),
      },
    })
      .then(() => {
        handleClose();
        setValue("password", "");
        setValue("oldPassword", "");
        setValue("confirmPassword", "");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <p
        onClick={handleOpen}
        className="underline text-gray cursor-pointer pb-5 font-semibold"
      >
        Update your password?
      </p>

      <ModalWrapper openModal={openModal} handleClose={handleClose}>
        <div>
          <h1 className="text-xl font-bold mb-5">Update Your Password</h1>
        </div>
        <div>
          <div className="flex flex-col gap-2 items-center">
            <TextInput
              placeholder="Old Password"
              type="password"
              {...register("oldPassword")}
            />
            <p>{errors.oldPassword?.message}</p>
            <TextInput
              placeholder="New Password"
              type="password"
              {...register("password")}
            />
            <p>{errors.password?.message}</p>
            <TextInput
              placeholder="Confirm New Password"
              type="password"
              {...register("confirmPassword")}
            />
            <p>{errors.confirmPassword?.message}</p>

            <Button
              onClick={handleSubmit(onChangePassword)}
              label="Submit"
              isLoading={isPending}
              className="w-full rounded-sm mt-2"
            />
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default ChangePassword;
