import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { IContactUs } from "@/interface/contact-us.interface";
import { feedBackOption, sendFeedback } from "@/services/contact.service";
import { getProfile } from "@/services/profile.service";
import ButtonLoader from "@/shared/components/btn-loading";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Input } from "@/shared/components/ui/input";
import CaretDownIcon from "@/shared/icons/common/CaretDownIcon";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import {
  handleKeyDownAlphabet,
  handleKeyDownNumber,
} from "@/shared/utils/form-validation-utils";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { useMutation, useQuery } from "@tanstack/react-query";

// export interface IFeedBackOptions {
//     id: number,
//     title: string
// }

const ContactUsForm = () => {
  const router = useRouter();
  const token = getToken();
  const [options, setOptions] = useState<Array<Object>>([{}]);

  const [selectedType, setSelectedType] = useState("Please Select");

  const handleTypeChange = (text: string) => {
    setSelectedType(text);
  };

  const { data: showProfileData } = useQuery({
    queryKey: ["getProfile", token],
    queryFn: getProfile,
    enabled: !!token,
  });

  const { data: feedback } = useQuery(["getFeedbackOptions"], feedBackOption);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
  } = useForm<IContactUs>({
    defaultValues: {
      context: "",
      department: selectedType,
      email: "",
      first_name: "",
      last_name: "",
      mobile_number: "",
    },
  });
  const mutation = useMutation({
    mutationFn: sendFeedback,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Message Was Successfully Sent!");
      router.push("/");
    },
  });
  const feedBackSubmit = (data: IContactUs) => {
    mutation.mutate(data);
    reset();
  };
  useEffect(() => {
    if (showProfileData) {
      reset({
        first_name: `${showProfileData?.data?.firstName}`,
        last_name: `${showProfileData?.data?.lastName}`,
        mobile_number: showProfileData?.data?.mobileNumber,
        email: showProfileData?.data?.email,
      });
    }
  }, [showProfileData]);

  useEffect(() => {
    if (feedback) {
      setOptions(feedback?.data);
    }
  }, [feedback]);

  return (
    <div className="p-[40px] bg-white rounded-xl">
      <h5 className="mb-5 text-2xl font-bold text-slate-850">Get In Touch</h5>
      <form onSubmit={handleSubmit(feedBackSubmit)}>
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 sm:col-span-6">
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
              className={` ${
                errors?.first_name ? "border-destructive" : "border-zinc-450"
              }`}
            />
            {errors?.first_name && (
              <p className="text-destructive text-xs leading-[24px] mt-1">
                {errors?.first_name?.message}
              </p>
            )}
          </div>
          <div className="col-span-12 sm:col-span-6">
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
              className={` ${
                errors?.last_name ? "border-destructive" : "border-zinc-450"
              }`}
            />
            {errors?.last_name && (
              <p className="text-destructive text-xs leading-[24px] mt-1">
                {errors?.last_name?.message}
              </p>
            )}
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Input
              type="text"
              placeholder="Email"
              className={`${
                errors?.email ? "border-destructive" : "border-zinc-450"
              }`}
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address.",
                },
              })}
              onBlur={() => trigger("email")}
            />
            {errors?.email && (
              <p className="text-destructive text-xs leading-[24px] mt-1">
                {errors?.email?.message}
              </p>
            )}
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Input
              type="text"
              placeholder="Phone Number"
              className={`${
                errors?.mobile_number ? "border-destructive" : "border-zinc-450"
              }`}
              {...register("mobile_number", {
                required: "Phone number is required.",
                pattern: {
                  value: /^9\d*$/,
                  message: "Phone number must start with 9",
                },
                validate: (value) => {
                  if (value.length < 10) {
                    return "Phone number must be exactly 10 digits";
                  }
                },
              })}
              onKeyUp={() => trigger("mobile_number")}
              pattern="^[1-9]\d*$"
              inputMode="numeric"
              maxLength={10}
              onKeyDown={handleKeyDownNumber}
            />
            {errors?.mobile_number && (
              <p className="text-destructive text-xs leading-[24px] mt-1">
                {errors?.mobile_number?.message}
              </p>
            )}
          </div>
          <div className="col-span-12">
            <Controller
              name="department"
              control={control}
              rules={{ required: "Department is required." }}
              // onChange={ handleTypeChange(option?.title)}
              render={({ field }) => (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger className="flex justify-between items-center h-12 text-base bg-[#F0F3F5] w-full rounded-md border-0 border-input  px-3 py-2">
                    <span className="capitalize">{selectedType}</span>
                    <CaretDownIcon />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-full p-0 rounded-sm contact-dropdown"
                  >
                    <DropdownMenuItem
                      disabled
                      className="pointer-events-none bg-slate-150 hover:bg-none"
                    >
                      <span className="border-0 rounded-none bg-none hover:!bg-none opacity-25">
                        Please Select
                      </span>
                    </DropdownMenuItem>

                    {options?.map((option: any) => (
                      <DropdownMenuItem
                        key={option?.id}
                        onClick={() => {
                          field.onChange(option?.title); // Update the form control value
                          handleTypeChange(option?.title); // Update your state or value using handleTypeChange
                        }}
                        className={`hover:!bg-[#f5faff] py-2.5 ${
                          option?.title === selectedType ? "bg-[#ebf5ff]" : ""
                        }`}
                      >
                        <span className="border-0 rounded-none bg-none hover:!bg-none">
                          {option?.title}
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            />

            {errors?.department && (
              <p className="text-destructive text-xs leading-[24px] mt-1">
                {errors?.department?.message}
              </p>
            )}
          </div>
          <div className="col-span-12">
            <textarea
              {...register("context", {
                required: "Message is required.",
                minLength: {
                  value: 20,
                  message: "Message should be at least 20 characters long.",
                },
                maxLength: {
                  value: 500,
                  message: "Message should not exceed 500 characters.",
                },
              })}
              onKeyUp={() => trigger("context")}
              placeholder="Message Here"
              className={`p-3.5 text-black min-h-[200px] w-full outline-0  !font-normal rounded-xl !bg-[#F0F3F5] border-0 bg-transparent resize-none ${
                errors?.context ? "border-destructive" : "border-zinc-450"
              }`}
            ></textarea>
            {errors?.context && (
              <p className="text-destructive text-xs leading-[24px] mt-1">
                {errors?.context?.message}
              </p>
            )}
          </div>
          <div className="col-span-12">
            <Button
              className="w-full sm:w-[50%]"
              type="submit"
              disabled={mutation?.isLoading}
            >
              Send
              {mutation.isLoading && <ButtonLoader className="!block" />}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactUsForm;
