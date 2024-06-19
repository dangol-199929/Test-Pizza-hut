import { IForgotPassword } from "@/interface/password.interface";
import { forgotPassword } from "@/services/auth.service";
import ButtonLoader from "@/shared/components/btn-loading";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<IForgotPassword>();

  const forgotPasswordSubmit: SubmitHandler<IForgotPassword> = (data) => {
    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.message);
      router.push("/reset-password");
    },
    onError: (error: any) => {
      const errors = error?.response?.data?.errors;
      showToast(TOAST_TYPES.error, errors[0]?.message);
    },
  });

  return (
    <form onSubmit={handleSubmit(forgotPasswordSubmit)} autoComplete="off">
      <p className="mb-[20px] text-sm text-zinc-250 leading-[24px]">
        Please enter email address/phone number. You will receive a link to
        create new password via email or OTP in your phone number.
      </p>
      <div className="flex flex-col mb-[20px]">
        <Input
          type="text"
          placeholder="Enter Your Email or Phone number"
          className={` ${
            errors.account ? "border-destructive" : "border-gray-350"
          }`}
          {...register("account", {
            required: "Email or Phone Number is required.",
          })}
          onBlur={() => trigger("account")}
        />
        {errors.account && (
          <p className="text-destructive text-xs leading-[24px] mt-1">
            {errors.account.message}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between mx-8">
        <Button
          type="submit"
          className="w-full"
          disabled={mutation.isLoading ? true : false}
        >
          Reset Password
          {mutation.isLoading && (
            <ButtonLoader className="!border-primary block" />
          )}
        </Button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
