import { IResetPassword } from "@/interface/password.interface";
import { resetPassword } from "@/services/auth.service";
import ButtonLoader from "@/shared/components/btn-loading";
import { Input } from "@/shared/components/ui/input";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ResetPasswordForm = () => {
  const router = useRouter();
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true); // Track password match status
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isDirty },
    trigger,
  } = useForm<IResetPassword>();

  const resetPasswordSubmit: SubmitHandler<IResetPassword> = (
    resetPassword
  ) => {
    mutation.mutate(resetPassword);
  };

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.message);
      router.push("/login");
    },
    onError: (error: any) => {
      const errors = error?.response?.data?.errors;
      showToast(TOAST_TYPES.error, errors[0]?.detail);
    },
  });

  useEffect(() => {
    if (getValues("password_confirmation") !== "") {
      // Update password match status whenever password or password_confirmation values change
      if (isDirty) {
        setPasswordMatch(watch("password") === watch("password_confirmation"));
        trigger("password_confirmation");
      }
    }
  }, [watch("password"), watch("password_confirmation"), isDirty]);
  return (
    <form onSubmit={handleSubmit(resetPasswordSubmit)} autoComplete="off">
      <div className="flex flex-col mb-[20px]">
        <Input
          type="text"
          placeholder="Enter Reset Code"
          className={` ${
            errors.token ? "border-destructive" : "border-gray-350"
          }`}
          {...register("token", { required: "Reset Code is required." })}
          onBlur={() => trigger("token")}
        />
        {errors.token && (
          <p className="text-destructive text-xs leading-[24px] mt-1">
            {errors?.token?.message}
          </p>
        )}
      </div>
      <div className="flex flex-col mb-[20px]">
        <Input
          type="password"
          placeholder="Enter Reset Password"
          className={` ${
            errors?.password ? "border-destructive" : "border-gray-350"
          }`}
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 7,
              message: "Password must have at least 8 characters.",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
            },
          })}
          onKeyUp={() => trigger("password")}
        />
        {errors.password && (
          <p className="text-destructive text-xs leading-[24px] mt-1">
            {errors?.password?.message}
          </p>
        )}
      </div>
      <div className="flex flex-col mb-[20px]">
        <Input
          type="password"
          placeholder="Confirm Password"
          className={` ${
            errors.password_confirmation || !passwordMatch
              ? "border-destructive"
              : "border-gray-350"
          }`}
          {...register("password_confirmation", {
            required: "Confirm Password is required.",
            validate: (value) =>
              value === watch("password") || "Password do not match.",
          })}
          onKeyUp={() => trigger("password_confirmation")}
        />

        {(errors.password_confirmation || !passwordMatch) && (
          <p className="text-destructive text-xs leading-[24px] mt-1">
            {errors.password_confirmation
              ? errors.password_confirmation.message
              : "Passwords do not match."}
          </p>
        )}
        {/* {
                    errors.password_confirmation && !passwordMatch &&
                    <p className='text-destructive text-xs leading-[24px] mt-1'>{errors.password_confirmation.message}</p>
                }
                {
                    !errors.password_confirmation && !passwordMatch && // Display error message when passwords don't match
                    <p className='text-destructive text-xs leading-[24px] mt-1'>Passwords do not match</p>
                } */}
      </div>
      <div className="flex items-center justify-between">
        <button className=" bg-tertiary flex items-center gap-2 text-slate-850 text-sm font-bold uppercase px-[30px] py-[11px] rounded-[30px] hover:bg-primary hover:text-white hover:border-primary">
          Change Password
          {mutation.isLoading && (
            <ButtonLoader className="!border-primary block" />
          )}
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
