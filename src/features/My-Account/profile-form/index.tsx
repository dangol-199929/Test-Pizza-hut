import { IProfile } from "@/interface/profile.interface";
import { getProfile, updateProfile } from "@/services/profile.service";
import SkeletonInput from "@/shared/components/skeleton/input";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import {
  handleKeyDownAlphabet,
  handleKeyDownNumber,
} from "@/shared/utils/form-validation-utils";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ProfileForm = () => {
  const queryClient = useQueryClient();
  const token = getToken();
  const { data: profile, initialLoading: profileLoading }: any = useQuery({
    queryKey: ["getProfile", token],
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm<IProfile>({
    defaultValues: {
      first_name: profile && profile?.data?.firstName,
      last_name: profile && profile?.data?.lastName,
      mobile_number: profile && profile?.data?.mobileNumber,
    },
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "User Updated Successfully.");
      queryClient.invalidateQueries(["getProfile"]);
    },
    onError: (error: any) => {
      const errors = error?.response?.data?.errors;
      errors.map((err: any) => {
        showToast(TOAST_TYPES.error, err.detail);
      });
    },
  });
  const profileSubmit: SubmitHandler<IProfile> = (data: any) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    profile &&
      reset({
        first_name: profile?.data?.firstName,
        last_name: profile?.data?.lastName,
        mobile_number: profile?.data?.mobileNumber,
      });
  }, [profile]);

  return (
    <form
      onSubmit={handleSubmit(profileSubmit)}
      autoComplete="off"
      className="px-6 py-6"
    >
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <label className="block mb-2" htmlFor="firstname">
            First Name
          </label>
          {profileLoading ? (
            <SkeletonInput />
          ) : (
            <>
              <Input
                type="text"
                placeholder="First Name"
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
                className={`${
                  errors.first_name ? "border-destructive" : "border-gray-350"
                } `}
              />
              {errors.first_name && (
                <p className="text-destructive text-xs leading-[24px] mt-1">
                  {errors.first_name.message}
                </p>
              )}
            </>
          )}
        </div>
        <div className="col-span-12">
          <label className="block mb-2" htmlFor="firstname">
            Last Name
          </label>
          {profileLoading ? (
            <SkeletonInput />
          ) : (
            <>
              <Input
                type="text"
                placeholder="Last Name"
                {...register("last_name", {
                  required: "Last name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Only alphabetical characters are allowed",
                  },
                })}
                onKeyUp={() => trigger("last_name")}
                maxLength={20}
                onKeyDown={handleKeyDownAlphabet}
                className={`${
                  errors.last_name ? "border-destructive" : "border-gray-350"
                }`}
              />
              {errors.last_name && (
                <p className="text-destructive text-xs leading-[24px] mt-1">
                  {errors.last_name.message}
                </p>
              )}
            </>
          )}
        </div>
        <div className="col-span-12">
          <label className="block mb-2" htmlFor="firstname">
            Email Address
          </label>
          {profileLoading ? (
            <SkeletonInput />
          ) : (
            <>
              <Input
                type="text"
                readOnly
                placeholder="Email Address"
                defaultValue={profile?.data?.email}
                className="border-gray-350 read-only:bg-gray-350 "
              />
            </>
          )}
        </div>
        <div className="col-span-12">
          <label className="block mb-2" htmlFor="firstname">
            Phone number
          </label>
          {profileLoading ? (
            <SkeletonInput />
          ) : (
            <>
              <Input
                type="text"
                placeholder="Phone Number"
                {...register("mobile_number", {
                  required: "Phone number is required.",
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
                pattern="^[1-9]\d*$"
                inputMode="numeric"
                maxLength={10}
                onBlur={() => trigger("mobile_number")}
                onKeyDown={handleKeyDownNumber}
                className={`${
                  errors.mobile_number
                    ? "border-destructive"
                    : "border-gray-350"
                }`}
              />
              {errors.mobile_number && (
                <p className="text-destructive text-xs leading-[24px] mt-1">
                  {errors.mobile_number.message}
                </p>
              )}
            </>
          )}
        </div>
        <div className="flex justify-between col-span-12">
          <Button type="submit" disabled={mutation.isLoading} className="px-8">
            Save
            {mutation.isLoading && (
              <span className="w-5 h-5 border-4 border-white border-dotted rounded-full border-t-transparent animate-spin"></span>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
