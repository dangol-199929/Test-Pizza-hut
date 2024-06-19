import React, { useEffect, useState } from "react";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { IChangePassword } from "@/interface/password.interface";
import { changePassword, logout } from "@/services/auth.service";
import ButtonLoader from "@/shared/components/btn-loading";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";

const ChangePasswordForm = () => {
  const router = useRouter();

  /**
   * States
   */
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);

  /**
   * Get Api calls
   */
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isDirty },
    trigger,
  } = useForm<IChangePassword>();

  /**
   * Mutation function for changing password
   */
  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data: any) => {
      showToast(TOAST_TYPES.success, data?.message);
      logoutMutation.mutate();
    },
    onError: (error: any) => {
      const errors = error?.response?.data?.errors;
      showToast(TOAST_TYPES.error, errors[0]?.title);
    },
  });

  const changePasswordSubmit: SubmitHandler<IChangePassword> = (
    changePassword
  ) => {
    mutation.mutate(changePassword);
  };
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      deleteCookie("token");
      deleteCookie("isLoggedIn");
      deleteCookie("cart_number");
      deleteCookie("cart_id");
      router.push("/login");
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  /**
   * Effects
   */
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
    <form
      className="px-6 py-6"
      onSubmit={handleSubmit(changePasswordSubmit)}
      autoComplete="off"
    >
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <Input
            type="password"
            placeholder="Old Password"
            // className="w-full h-10 input input-bordered "
            className={` ${
              errors?.old_password ? "border-destructive" : "border-gray-350"
            }`}
            {...register("old_password", {
              required: "Old Password is required.",
            })}
            onKeyUp={() => trigger("old_password")}
          />
          {errors?.old_password && (
            <p className="text-destructive text-xs leading-[24px] mt-1">
              {errors?.old_password?.message}
            </p>
          )}
        </div>
        <div className="col-span-12">
          <Input
            type="password"
            placeholder="New Password"
            className={` ${
              errors?.password ? "border-destructive" : "border-gray-350"
            }`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 7,
                message: "Password must have at least 8 characters.",
              },
              validate: (value) =>
                value !== watch("old_password") ||
                "Old Password and New Password should be different.",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
              },
            })}
            onKeyUp={() => trigger("password")}
          />
          {errors?.password && (
            <p className="text-destructive text-xs leading-[24px] mt-1">
              {errors?.password?.message}
            </p>
          )}
        </div>
        <div className="col-span-12">
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
                value === watch("password") || "Passwords do not match",
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
                        <p className="text-destructive text-xs leading-[24px] mt-1">{errors?.password_confirmation?.message}</p>
                    }
                    {
                        !errors.password_confirmation && !passwordMatch && // Display error message when passwords don't match
                        <p className='text-destructive text-xs leading-[24px] mt-1'>Passwords do not match</p>
                    } */}
        </div>
        <div className="flex justify-between col-span-12">
          <Button disabled={mutation.isLoading} className="px-8">
            Save
            {mutation.isLoading && <ButtonLoader />}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
