import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { showToast } from "@/shared/utils/toast-utils/toast.utils";
import { TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { registerGuestUser } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { generatePassword } from "@/shared/utils/cookies-utils/cookies.utils";
import { getCookie, setCookie } from "cookies-next";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

// Define the schema using Zod
const formSchema = z.object({
  first_name: z.string().min(1, "First name is required."),
  last_name: z.string().min(1, "Last name is required."),
  mobile_number: z
    .string()
    .min(1, "Phone number is required.")
    .max(10, "Phone number is invalid."),
  email: z.string().min(1, "Email is required.").email("Invalid email format."),
  password: z.optional(
    z.string().min(8, "Password must be at least 8 characters.")
  ),
  password_confirmation: z.optional(
    z.string().min(8, "Password confirmation must be at least 8 characters.")
  ),
});

type FormData = z.infer<typeof formSchema>;

const AccountDetail = () => {
  const loggedIn = getCookie("isLoggedIn");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(
    null
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const generatePasswordValue = () => {
    if (!generatedPassword) {
      const password = generatePassword(8);
      setGeneratedPassword(password);
      setValue("password", password);
      setValue("password_confirmation", password);
      return password;
    }
    return generatedPassword;
  };

  const onSubmit = async (data: FormData) => {
    const password = generatePasswordValue();
    const payload = {
      ...data,
      password,
      password_confirmation: password,
      checkPassword: false,
    };
    try {
      const response = await registerGuestUser(payload, true);
      showToast(TOAST_TYPES.success, "Registration successful");
      const guestUserResponse = response;
      if (guestUserResponse.status === 200) {
        setCookie("token", guestUserResponse?.data?.data?.accessToken);
        setCookie("isLoggedIn", true);
        // setPersonalOpen(false);
        // setSubmitLoading(false);
        // setPersonalInfoSubmitted(true);
        // setAddressOpen(true);
        queryClient.invalidateQueries(["getCart"]);
        queryClient.invalidateQueries(["getProfile"]);
        router.push(`/checkout?id=${id}`);
      }
      // Additional actions based on success (e.g., redirect)
    } catch (error) {
      showToast(TOAST_TYPES.error, "Registration failed: " + errors.root);
    }
  };
  useEffect(() => {
    setIsLoggedIn(!!loggedIn);
  }, [loggedIn]);
  return (
    <div
      className={`mx-auto mb-4 py-4 bg-white ${isLoggedIn ? "!hidden" : ""}`}
    >
      <div className="flex justify-between items-center mb-6 px-6 pb-4 border-b-[1px]">
        <h1 className="text-2xl font-bold">Account Detail</h1>
        <Link href={"/login"}>
          <Button variant="outline" className="text-red-500 border-red-500">
            Login
          </Button>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6"
      >
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <Input type="text" {...register("first_name")} className="mt-1" />
          {errors.first_name && (
            <p className="text-red-500">{errors.first_name.message}</p>
          )}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <Input type="text" {...register("last_name")} className="mt-1" />
          {errors.last_name && (
            <p className="text-red-500">{errors.last_name.message}</p>
          )}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <Input
            type="number"
            {...register("mobile_number")}
            className="mt-1"
          />
          {errors.mobile_number && (
            <p className="text-red-500">{errors.mobile_number.message}</p>
          )}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <Input type="text" {...register("email")} className="mt-1" />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="col-span-1 sm:col-span-2">
          <Button type="submit" className="w-full bg-red-500 text-white">
            {isSubmitting ? "Loading..." : "NEXT"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetail;
