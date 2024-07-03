import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { IOutlets } from "@/interface/checkout.interface";
import { getOutletAddress } from "@/services/checkout.service";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Label } from "@/shared/components/ui/label";
import { useProfile as useProfileStore } from "@/store/profile";
import { format } from "date-fns";
import { Map, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
const addressSchema = z.object({
  date: z.date(),
  name: z.string().min(1, "Customer Name is required"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format"),
  phoneNumber: z
    .string()
    .regex(/^9\d{9}$/, "Phone number must start with 9 and be 10 digits long"),
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
  const { data: outlets, isLoading: outletsLoading } = useQuery<IOutlets[]>(
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
    resolver: zodResolver(addressSchema),
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
  useEffect(() => {
    if (outlets) {
      setOutletId(outlets[0].id);
    }
  }, [outlets]);
  return (
    <div>
      <p className="text-base font-semibold mb-2">Self Outlets</p>
      {/* OUTLETS */}
      <div className="max-w-[446px] border rounded-lg p-4 flex items-center justify-between">
        {outletsLoading ? (
          <div className="w-[450px] me-6">
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <div className="flex items-center">
            <MapPin className="w-6 h-6 mr-2" />
            <div>
              <div className="flex items-center">
                <h2 className="font-semibold text-lg">
                  {outlets &&
                    outlets?.find((outlet) => outlet.id === outletId)?.name}
                </h2>
                {outlets && (
                  <span className="text-green-500 text-sm ml-2">
                    {outlets?.find((outlet) => outlet.id === outletId)?.distance
                      ? `${
                          outlets?.find((outlet) => outlet.id === outletId)
                            ?.distance
                        } km`
                      : ""}
                  </span>
                )}
              </div>
              <p className="text-gray-600">
                {outlets &&
                  outlets?.find((outlet) => outlet.id === outletId)?.address}
              </p>
              <p className="text-gray-500 text-sm">
                Store Timing ({" "}
                {outlets &&
                  outlets?.find((outlet) => outlet.id === outletId)
                    ?.closingTime}
                )
              </p>
              <p className="text-gray-800">
                {outlets &&
                  outlets?.find((outlet) => outlet.id === outletId)?.phone}
              </p>
            </div>
          </div>
        )}
        <Dialog>
          <DialogTrigger asChild>
            <div className="text-gray-500 hover:text-gray-700 cursor-pointer hover:text-gray-700">
              Change
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <RadioGroup defaultValue={outletId.toString()}>
              {outlets?.map((outlet: IOutlets, index: number) => (
                <div key={outlet?.id} className={`py-4 border-b`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 mb-1 w-full">
                      <Map size={18} />
                      <span className={`text-lg font-medium`}>
                        {outlet?.name}
                      </span>
                    </div>
                    <RadioGroupItem
                      id={`${outlet?.id}`}
                      value={`${outlet?.id}`}
                      className="ms-auto"
                      onClick={() => {
                        setOutletId(outlet?.id);
                        changeOption(`${outlet?.id}`);
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {outlet?.address}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Store Timing (9:00 AM to 10:00PM)
                  </p>
                  <p className="text-sm mb-1">{outlet?.phone}</p>
                  {outlet?.distance && (
                    <p className="text-sm text-green-600">
                      {outlet?.distance} Km Away
                    </p>
                  )}
                </div>
              ))}
            </RadioGroup>
          </DialogContent>
        </Dialog>
      </div>

      {/* PICKUP INFO */}
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
          <Input
            type="date"
            readOnly
            value={format(new Date(), "yyyy-MM-dd")}
          />
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
              errors.time ? "border-red-500 border-[1px] " : "border-gray-350"
            }`}
          />
          {errors?.time && (
            <p className="text-destructive text-xs leading-[24px] mt-1">
              {errors.time.message?.toString()}
            </p>
          )}
        </div>

        <div className="col-span-12">
          <p className="text-base font-semibold">Customer Details</p>
          <RadioGroup
            defaultValue={pickupSelected}
            className="flex items-center flex-wrap gap-6 mt-4"
          >
            <div
              className={`flex items-center border rounded-xl relative ${
                pickupSelected === "self" ? "border-red-500 !bg-red-500/10" : ""
              } `}
              // onClick={(e: any) => changeOption(e.target.value)}
            >
              <RadioGroupItem
                onClick={(e: any) => changeOption(e.target.value)}
                value={"self"}
                id={"self"}
                className="opacity-0 h-full w-full left-0 top-0 absolute z-10"
              />
              <Label
                htmlFor={"self"}
                className="flex items-center cursor-pointer py-4 px-12"
              >
                <span className="capitalize font-normal text-base">Myself</span>
              </Label>
            </div>
            <div
              className={`flex items-center border rounded-xl relative ${
                pickupSelected === "other"
                  ? "border-red-500 !bg-red-500/10"
                  : ""
              } `}
              // onClick={(e: any) => changeOption(e.target.value)}
            >
              <RadioGroupItem
                onClick={(e: any) => changeOption(e.target.value)}
                value={"other"}
                id={"other"}
                className="opacity-0 h-full w-full left-0 top-0 absolute z-10"
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
            placeholder="Enter Customer Name"
            maxLength={20}
            readOnly={pickupSelected === "self"}
            onKeyUp={() => trigger("name")}
            className={` ${
              errors.name ? "border-red-500 border-[1px] " : "border-gray-350"
            }`}
            {...register("name", {
              required: "Name is required",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Only alphabetical characters are allowed",
              },
            })}
          />
          {errors.name && (
            <p className="text-destructive text-xs leading-[24px] mt-1">
              {errors?.name?.message?.toString()}
            </p>
          )}
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
            {...register("phoneNumber", {
              required: "Number is required",
              pattern: {
                value: /^[9][0-9]{9}$/,
                message: "Number must be a 10-digit number starting with 9",
              },
            })}
            readOnly={pickupSelected === "self"}
            onKeyUp={() => trigger("phoneNumber")}
            placeholder="Enter Customer Phone Number"
            className={`${
              errors.phoneNumber
                ? "border-red-500 border-[1px] "
                : "border-gray-350"
            }`}
          />
          {errors?.phoneNumber?.message && (
            <p className="text-destructive text-xs leading-[24px] mt-1">
              {errors?.phoneNumber?.message.toString()}
            </p>
          )}
        </div>

        <Button type="submit" className="col-span-6" variant={"default"}>
          Submit
        </Button>
      </form>

      {/* PICKUP INFO END */}
    </div>
  );
};

export default SelfPickupMode;
