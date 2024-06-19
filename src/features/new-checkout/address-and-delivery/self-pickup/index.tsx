import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import { IOutlets } from "@/interface/checkout.interface";
import { getOutletAddress } from "@/services/checkout.service";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Label } from "@/shared/components/ui/label";
import { useProfile as useProfileStore } from "@/store/profile";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/shared/utils/utils";
import { CalendarIcon, MapPin } from "lucide-react";
import { Calendar } from "@/shared/components/ui/calendar";
const addressSchema = z.object({
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  customerName: z.string().min(1, "Customer Name is required"),
  customerPhoneNumber: z.string().min(1, "Customer Phone Number is required"),
  pickupMode: z.enum(["myself", "forOthers"]),
});
interface IProps {
  outletId: any;
  setOutletId: any;
  pickupSelected: any;
  setPickupSelected: any;
  pickupData: any;
  setPickupData: any;
}

const SelfPickupMode: FC<IProps> = ({
  outletId,
  setOutletId,
  pickupSelected,
  setPickupSelected,
  pickupData,
  setPickupData,
}) => {
  const form = useForm({
    resolver: zodResolver(addressSchema),
  });

  const token = getToken();

  const { data: outlets } = useQuery<IOutlets[]>(
    ["getOutlets"],
    getOutletAddress
  );

  const { profileData } = useProfileStore();
  const [optionChanged, setOptionChanged] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
  } = useForm<any>({
    defaultValues: {
      date: undefined,
      time: "",
      name: "",
      phoneNumber: "",
    },
  });

  const changeOption = (value: string) => {
    setOptionChanged(true);
    setPickupSelected(value);
  };

  const handleNext = (data: any) => {
    setPickupData(data);
  };

  //Restting field when the user clicks on 'others' radio
  useEffect(() => {
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + 40);
    const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}`;

    if (optionChanged && pickupSelected === "other") {
      reset({
        name: "",
        phoneNumber: "",
        time: formattedTime,
        date: new Date(),
      });
    } else if (optionChanged && pickupSelected === "self") {
      reset({
        name: `${profileData?.firstName} ${profileData?.lastName}`,
        phoneNumber: profileData?.mobileNumber,
        date: new Date(),
        time: formattedTime,
      });
    } else {
      reset({
        name: pickupData?.name
          ? pickupData?.name
          : `${profileData?.firstName} ${profileData?.lastName}`,
        phoneNumber: pickupData?.phoneNumber
          ? pickupData?.phoneNumber
          : profileData?.mobileNumber,
        date: pickupData?.date ? pickupData?.date : new Date(),
        time: pickupData?.time ? pickupData?.time : formattedTime,
      });
    }
  }, [optionChanged, pickupSelected]);
  return (
    <div>
      <p className="text-base font-semibold">Self Outlets</p>

      <div className="max-w-[446px] border rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center">
          <MapPin className="w-6 h-6 mr-2" />
          <div>
            <div className="flex items-center">
              <h2 className="font-semibold text-lg">
                {outlets && outlets[0]?.name}
              </h2>
              <span className="text-green-500 text-sm ml-2">1.3km</span>
            </div>
            <p className="text-gray-600"> {outlets && outlets[0]?.address}</p>
            <p className="text-gray-500 text-sm">
              Store Timing ( {outlets && outlets[0]?.closingTime})
            </p>
            <p className="text-gray-800">{outlets && outlets[0]?.phone}</p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">Change</button>
      </div>
      {/* <div className="grid grid-cols-2 gap-4 mb-4">
        <RadioGroup>
          {outlets?.map((outlet: any) => (
            <div
              className="flex items-center pb-2 mb-2 space-x-2 border p-3 rounded-lg"
              key={outlet.id}
            >
              <RadioGroupItem
                onClick={() => setOutletId(outlet?.id)}
                checked={outletId === outlet?.id}
                value={outlet?.id}
                id={outlet?.id}
                className="hidden"
              />
              <Label
                htmlFor={outlet?.id}
                className="flex items-center cursor-pointer"
              >
                <span className="capitalize">{outlet?.name}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div> */}

      <form
        onSubmit={handleSubmit(handleNext)}
        className="grid grid-cols-12 gap-0 md:gap-4 mt-6"
      >
        <p className="text-base font-semibold col-span-12">
          Pickup Information
        </p>

        {/* Date */}
        <div className="flex flex-col col-span-12 md:col-span-6 mb-[15px]">
          <label className="mb-2 label">
            <span className="font-normal text-xs text-[#707070]">Date</span>
          </label>

          <Controller
            name="date"
            control={control}
            rules={{ required: "Date is required." }}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "w-full rounded-md bg-[#F0F3F5] border-0  h-12 justify-start text-base font-normal",
                      errors?.date && "border-destructive"
                    )}
                  >
                    {field?.value ? (
                      format(field?.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="h-4 w-4 ml-auto opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date: any) => {
                      field.onChange(date);
                      trigger("date");
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {/* {errors?.date && (
            <p className="text-destructive text-xs leading-[24px] mt-1">
              {errors?.date?.message}
            </p>
          )} */}
        </div>

        {/* Time */}
        <div className="flex flex-col col-span-12 md:col-span-6 mb-[15px]">
          <label className="mb-2 label">
            <span className="font-normal text-xs text-[#707070]">Time</span>
          </label>
          <Input
            type="time"
            placeholder="Enter Your Name"
            maxLength={20}
            {...register("time", { required: "Time is required." })}
            className={`input-time flex justify-between items-center w-full ${
              errors.time ? "border-destructive" : "border-gray-350"
            }`}
          />
          {/* {errors?.time && (
            <p className=P"text-destructive text-xs leading-[24px] mt-1">
              {errors.time.message}
            </p>
          )} */}
        </div>

        <div className="col-span-12">
          <p className="text-base font-semibold">Customer Details</p>
          <RadioGroup
            defaultValue={pickupSelected}
            className="flex items-center gap-6 mt-4"
          >
            <div
              className={`flex items-center border rounded-xl  ${
                pickupSelected === "self" ? "border-red-500 !bg-red-500/10" : ""
              } `}
              onClick={(e: any) => changeOption(e.target.value)}
            >
              <RadioGroupItem
                onClick={(e: any) => changeOption(e.target.value)}
                value={"self"}
                id={"self"}
                className="hidden"
              />
              <Label
                htmlFor={"self"}
                className="flex items-center cursor-pointer py-4 px-12"
              >
                <span className="capitalize font-normal text-base">Myself</span>
              </Label>
            </div>
            <div
              className={`flex items-center border rounded-xl ${
                pickupSelected === "other"
                  ? "border-red-500 !bg-red-500/10"
                  : ""
              } `}
              onClick={(e: any) => changeOption(e.target.value)}
            >
              <RadioGroupItem
                onClick={(e: any) => changeOption(e.target.value)}
                value={"other"}
                id={"other"}
                className="hidden"
              />
              <Label
                htmlFor={"other"}
                className="flex items-center cursor-pointer py-4 px-12"
              >
                <span className="capitalize font-normal text-base">
                  For Others
                </span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        {/* Name */}
        <div className="flex flex-col col-span-12 md:col-span-6 mb-[15px]">
          <label className="mb-2 label">
            <span className="font-normal text-xs text-[#707070]">
              Customer Name
            </span>
          </label>
          <Input
            type="text"
            placeholder="Enter Your Name"
            maxLength={20}
            readOnly={pickupSelected === "self"}
            onKeyUp={() => trigger("name")}
            // onKeyDown={handleKeyDownAlphabet}
            className={` ${
              errors.name ? "border-destructive" : "border-gray-350"
            }`}
            {...register("name", {
              required: "Name is required",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Only alphabetical characters are allowed",
              },
            })}
          />
          {/* {errors.name && (
            <p className="text-destructive text-xs leading-[24px] mt-1">
              {errors.name.message}
            </p>
          )} */}
        </div>

        {/* Phone NUmber */}
        <div className="flex flex-col col-span-12 md:col-span-6 mb-[15px]">
          <label className="mb-2 label">
            <span className="font-normal text-xs text-[#707070]">
              Customer Phone Number
            </span>
          </label>
          <Input
            type="number"
            {...register("phoneNumber")}
            readOnly={pickupSelected === "self"}
            onKeyUp={() => trigger("phoneNumber")}
            // onKeyDown={handleKeyDownNumber}
            placeholder="Enter Your Phone Number"
            className={`${
              errors.phoneNumber ? "border-destructive" : "border-gray-350"
            }`}
          />
          {/* {errors.phoneNumber && (
            <p className="text-destructive text-xs leading-[24px] mt-1">
              {errors.phoneNumber.message
                ? errors.phoneNumber.message
                : "Error in phone number"}
            </p>
          )} */}
        </div>
        <Button type="submit" className="col-span-6" variant={"default"}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SelfPickupMode;
