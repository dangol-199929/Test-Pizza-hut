import { signUp } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegister } from "../../../interface/register.interface";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import ButtonLoader from "@/shared/components/btn-loading";
import {
  handleKeyDownAlphabet,
  handleKeyDownNumber,
} from "@/shared/utils/form-validation-utils";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";

const RegisterForm = () => {
  const router = useRouter();
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true); // Track password match status

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "User Created Successfully.");
      router.push("/login");
    },
    onError: (error: any) => {
      const errors = error?.response?.data?.errors;
      errors.map((err: any) => {
        showToast(TOAST_TYPES.error, err.detail);
      });
    },
  });

  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    trigger,
  } = useForm<IRegister>();

  const registerSubmit: SubmitHandler<IRegister> = (data: any) => {
    mutation.mutate(data);
  };

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
    <form onSubmit={handleSubmit(registerSubmit)} autoComplete="off">
      <h5 className="font-semibold text-xl mb-7">Sign Up</h5>

      <div className="flex flex-col mb-[20px]">
        <label className="text-xs text-[#707070] mb-2">First Name</label>

        <Input
          type="text"
          placeholder="Enter Your First Name"
          {...register("first_name", {
            required: "First name is required",
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "Only alphabetical characters are allowed",
            },
          })}
          maxLength={20}
          onKeyUp={() => trigger("first_name")}
          onKeyDown={handleKeyDownAlphabet}
          className={` ${
            errors.first_name ? "border-destructive" : "border-gray-350"
          }`}
        />
        {errors.first_name && (
          <p className="text-destructive text-xs leading-[24px] mt-1">
            {errors.first_name.message}
          </p>
        )}
      </div>
      <div className="flex flex-col mb-[20px]">
        <label className="text-xs text-[#707070] mb-2">Last Name</label>

        <Input
          type="text"
          {...register("last_name", {
            required: "Last name is required",
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "Only alphabetical characters are allowed",
            },
          })}
          placeholder="Enter Your Last Name"
          onKeyUp={() => trigger("last_name")}
          maxLength={20}
          onKeyDown={handleKeyDownAlphabet}
          className={` ${
            errors.last_name ? "border-destructive" : "border-gray-350"
          }`}
        />
        {errors.last_name && (
          <p className="text-destructive text-xs leading-[24px] mt-1">
            {errors.last_name.message}
          </p>
        )}
      </div>
      <div className="flex flex-col mb-[20px]">
        <label className="text-xs text-[#707070] mb-2">Phone Number</label>

        <Input
          type="text"
          {...register("mobile_number", {
            required: "Phone number is required",
            pattern: {
              value: /^9\d*$/,
              message: "Incorrect phone number format",
            },
            validate: (value) => {
              if (value.length < 10) {
                return "Phone number must be exactly 10 digits";
              }
            },
          })}
          onKeyUp={() => trigger("mobile_number")}
          pattern="^[1-9]\d*$"
          maxLength={10}
          inputMode="numeric"
          placeholder="Enter Your Phone Number"
          onKeyDown={handleKeyDownNumber}
          className={` ${
            errors.mobile_number ? "border-destructive" : "border-gray-350"
          }`}
        />
        {errors.mobile_number && (
          <p className="text-destructive text-xs leading-[24px] mt-1">
            {errors.mobile_number.message}
          </p>
        )}
      </div>
      <div className="flex flex-col mb-[20px]">
        <label className="text-xs text-[#707070] mb-2">Email</label>

        <Input
          type="text"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          onKeyUp={() => trigger("email")}
          placeholder="Enter Your Email"
          className={` ${
            errors.email ? "border-destructive" : "border-gray-350"
          }`}
        />
        {errors.email && (
          <p className="text-destructive text-xs leading-[24px] mt-1">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="flex flex-col mb-[20px]">
        <label className="text-xs text-[#707070] mb-2">Password</label>

        <Input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 7,
              message: "Password must have at least 8 characters",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
            },
          })}
          onKeyUp={() => trigger("password")}
          className={` ${
            errors.password ? "border-destructive" : "border-gray-350"
          }`}
        />
        {errors.password && (
          <p className="text-destructive text-xs leading-[24px] mt-1">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="flex flex-col mb-[20px]">
        <label className="text-xs text-[#707070] mb-2">Confirm Password</label>

        <Input
          type="password"
          placeholder="Confirm Password"
          {...register("password_confirmation", {
            required: "Confirm Password is required",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          onKeyUp={() => trigger("password_confirmation")}
          className={` ${
            errors.password_confirmation || !passwordMatch
              ? "border-destructive"
              : "border-gray-350"
          }`}
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
                    <p className='text-destructive text-xs leading-[24px] mt-1'>Passwords do not match.</p>
                } */}
      </div>
      <div className="flex items-center justify-between px-6 my-10">
        <Button type="submit" className="w-full" disabled={mutation.isLoading}>
          Sign Up
          {mutation.isLoading && <ButtonLoader />}
        </Button>
      </div>
      <p className="text-center text-sm text-slate-850">
        Already have an account?{" "}
        <Link href="/login" className="text-primary">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
