import Button from "@/components/Button";
import ModalWrapper from "@/components/ModalWrapper";
import TextInput from "@/components/TextInput";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutate } from "@/hooks/useMutate";

const ResetPassword = () => {
  const [openModal, setOpenModal] = useState(false);
  const { mutateAsync, isPending } = useMutate();

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required field"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  }: any = useForm({
    resolver: yupResolver(schema),
  });

  const onResetPassword: SubmitHandler<any> = (data: any) => {
    mutateAsync({
      url: `/auth/reset-password`,
      method: "POST",
      body: {
        email: data.email,
      },
    })
      .then(() => {
        handleClose();
        setValue("email", "");
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
        className="underline font-semibold mt-3 text-gray hover:text-softGray cursor-pointer"
      >
        Forget your password?
      </p>
      <ModalWrapper openModal={openModal} handleClose={handleClose}>
        <div>
          <h1 className="text-xl font-bold mb-5">Reset Password</h1>
        </div>
        <div>
          <div className="flex flex-col gap-2 items-center">
            <TextInput placeholder="Email" {...register("email")} />
            <p>{errors.email?.message}</p>

            <Button
              onClick={handleSubmit(onResetPassword)}
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

export default ResetPassword;
