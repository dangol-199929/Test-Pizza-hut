import { IDeliveryAddress } from "@/interface/delivery-address.interface";
import {
  addDeliverAddress,
  getDeliverAddress,
  updateDeliveryAddressByAddressId,
} from "@/services/delivery-address.service";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import {
  handleKeyDownAlphabet,
  handleKeyDownNumber,
} from "@/shared/utils/form-validation-utils";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ButtonLoader from "../btn-loading";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

const LeafletMap = dynamic(
  () =>
    typeof window !== "undefined"
      ? import("@/shared/components/leaflet").then((mod) => mod.default)
      : Promise.resolve(() => null),
  {
    ssr: false,
  }
);

interface IProps {
  formData: IDeliveryAddress;
  setFormData: (arg1: any) => void;
  // setShowModal: (arg2: any) => void;
  setIsEditing: (arg3: any) => void;
  isEditing: boolean;
}

const DeliveryAddressModal: React.FC<IProps> = ({
  formData,
  setFormData,
  // setShowModal,
  setIsEditing,
  isEditing,
}) => {
  const queryClient = useQueryClient();
  const [addressSaved, setAddressSaved] = useState(false);
  const token = getToken();
  const handleMarkerClick = (lat: any, lng: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      lat,
      lng,
    }));
  };

  const handleAddNew = () => {
    // Reset the form data when adding a new address
    setFormData({
      address: "",
      mobile_number: "",
      name: "",
      default: false,
      lat: 0,
      lng: 0,
      title: "",
    });
    // Set isEditing to false when adding
    setIsEditing(false);
    // Show the modal for adding
    // setShowCreateModal(true);
  };

  const { data: deliveryAddressData, refetch: getDeliveryAddress } = useQuery({
    queryKey: ["getDeliverAddress", token],
    queryFn: getDeliverAddress,
    enabled: !!token,
  });

  const fetchDeliveryAddress = async () => {
    await getDeliveryAddress();
  };

  const updateAddressMutation = useMutation({
    mutationFn: updateDeliveryAddressByAddressId,
    onSuccess: () => {
      // setShowModal(false);
      showToast(TOAST_TYPES.success, "Delivery Address Updated Successfully.");
      fetchDeliveryAddress();
      setAddressSaved(false);
      reset();
      setIsEditing(false);
      queryClient.invalidateQueries(["getDeliverAddress", token]);
    },
    onError: (error: any) => {
      const errors = error?.response?.data?.errors;
      errors.map((err: any) => {
        // setShowModal(true);
        showToast(TOAST_TYPES.error, err.detail);
        setAddressSaved(false);
      });
    },
  });

  const addDeliverAddressMutation = useMutation({
    mutationFn: addDeliverAddress,
    onSuccess: () => {
      // setShowModal(false);
      showToast(TOAST_TYPES.success, "Delivery Address Added Successfully.");
      queryClient.invalidateQueries(["getDeliverAddress", token]);
      getDeliveryAddress();
    },
    onError: (error: any) => {
      const errors = error?.response?.data?.errors;
      errors.map((err: any) => {
        // setShowModal(true);
        showToast(TOAST_TYPES.error, err.detail);
        setAddressSaved(false);
      });
    },
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
  } = useForm<IDeliveryAddress>();

  const addressSubmit: SubmitHandler<IDeliveryAddress> = (data: any) => {
    if (formData.lat === 0 || formData.lng === 0) {
      showToast(TOAST_TYPES.error, "Please select a location");
      setAddressSaved(false);
      return;
    }
    setAddressSaved(true);
    const payload = {
      ...data,
      default: data?.default,
      mobile_number: data?.mobile_number || "",
      lat: formData?.lat,
      lng: formData?.lng,
    };
    if (isEditing) {
      updateAddressMutation.mutate(payload);
    } else {
      addDeliverAddressMutation.mutate(payload);
    }
  };

  useEffect(() => {
    if (formData && isEditing) {
      reset({
        lat: formData.lat !== undefined ? formData.lat : 27.7172,
        lng: formData.lng !== undefined ? formData.lng : 85.324,
        title: `${formData?.title}`,
        name: formData.name || "",
        mobile_number: formData?.mobile_number,
        default: formData?.default,
        id: formData?.id,
      });
    }
  }, [isEditing, formData]);

  return (
    <>
      <form onSubmit={handleSubmit(addressSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label htmlFor="addresstitle" className="block mb-2 text-sm">
              Address Title <span className="text-red-250">*</span>
            </label>
            <Input
              {...register("title", {
                required: "Address title is required",
                pattern: {
                  value: /^[A-Za-z ]+$/,
                  message: "Only alphabetical characters are allowed",
                },
              })}
              onKeyUp={() => trigger("title")}
              onKeyDown={handleKeyDownAlphabet}
              type="text"
              placeholder="Address Title"
              className={
                errors?.title ? "border-destructive" : "border-gray-350"
              }
              onBlur={() => trigger("title")}
            />
            {errors?.title && (
              <p className="text-destructive text-xs leading-[24px] mt-1">
                {errors?.title?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="location" className="block mb-2 text-sm">
              Location
            </label>
            <Input type="text" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="fullname" className="block mb-2 text-sm">
              Customer Name
            </label>
            <Input
              {...register("name", {
                pattern: {
                  value: /^[A-Za-z ]+$/,
                  message: "Only alphabetical characters are allowed",
                },
              })}
              onKeyUp={() => trigger("name")}
              onKeyDown={handleKeyDownAlphabet}
              type="text"
              placeholder="Full Name"
              className={
                errors?.name ? "border-destructive" : "border-gray-350"
              }
              onBlur={() => trigger("name")}
            />
            {errors?.name && (
              <p className="text-destructive text-xs leading-[24px] mt-1">
                {errors?.name?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="number" className="block mb-2 text-sm">
              Customer Phone Number
            </label>
            <Input
              type="text"
              {...register("mobile_number", {
                pattern: {
                  value: /^9\d{9}$/,
                  message:
                    "Phone number must start with 9 and be exactly 10 digits",
                },
              })}
              onKeyUp={() => trigger("mobile_number")}
              maxLength={10}
              inputMode="numeric"
              placeholder="Enter Your Phone Number"
              onKeyDown={handleKeyDownNumber}
              className={`${
                errors.mobile_number ? "border-destructive" : "border-gray-350"
              }`}
            />
            {errors?.mobile_number && (
              <p className="text-destructive text-xs leading-[24px] mt-1">
                {errors?.mobile_number?.message}
              </p>
            )}
          </div>
        </div>

        <div className="h-[280px] mb-4">
          <LeafletMap
            lat={formData.lat || 27.7172}
            long={formData.lng || 85.324}
            onChange={handleMarkerClick}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <Button
            disabled={
              isEditing ? updateAddressMutation?.isLoading : addressSaved
            }
            type="submit"
            variant={"default"}
          >
            {isEditing ? "Update" : "Submit"}
            {(isEditing ? updateAddressMutation?.isLoading : addressSaved) && (
              <ButtonLoader className="!border-primary ml-2" />
            )}
          </Button>
          <Button type="button" variant={"outline"} onClick={handleAddNew}>
            Add New
          </Button>
        </div>
      </form>
    </>
  );
};

export default DeliveryAddressModal;
