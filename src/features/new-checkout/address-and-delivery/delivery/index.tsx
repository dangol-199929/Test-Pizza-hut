import { getCookie } from "cookies-next";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useDeliveryAddressHooks } from "@/hooks/useDeliveryAddress.hooks";
import { IDeliveryAddress } from "@/interface/delivery-address.interface";
import {
  addDeliverAddress,
  deleteDeliverAddressById,
  updateDeliveryAddressByAddressId,
} from "@/services/delivery-address.service";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import AddressCard from "../address-card";

const addressSchema = z.object({
  addressTitle: z.string().min(1, "Address Title is required"),
  location: z.string().min(1, "Location is required"),
  customerName: z.string().min(1, "Customer Name is required"),
  mobile_number: z
    .string()
    .min(1, "Customer Phone Number is required")
    .max(10, "Customer Phone Number is invalid"),
});
// Correcting the dynamic import for LeafletMap

const LeafletMap = dynamic(
  () =>
    typeof window !== "undefined"
      ? import("@/shared/components/leaflet").then((mod) => mod.default)
      : Promise.resolve(() => null),
  {
    ssr: false,
  }
);

const DeliveryMode = () => {
  const token = getToken();
  const queryClient = useQueryClient();
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formActive, setFormActive] = useState<boolean>(false);
  const [formData, setFormData] = useState<IDeliveryAddress>({
    address: "",
    mobile_number: "",
    name: "",
    default: false,
    lat: 0,
    lng: 0,
    title: "",
  });
  const loggedIn = getCookie("isLoggedIn");
  const { deliveryAddressData, isDeliveryAddressLoading, getDeliveryAddress } =
    useDeliveryAddressHooks();

  const fetchDeliveryAddress = async () => {
    await getDeliveryAddress();
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
  } = useForm<IDeliveryAddress>();
  const form = useForm({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = (data: any) => {
    if (formData.lat === 0 || formData.lng === 0) {
      showToast(TOAST_TYPES.error, "Please select a location");
      return;
    }
    const payload = {
      ...data,
      default: data?.default,
      mobile_number: data?.mobile_number || "",
      title: data?.title || "",
      name: data?.name || "",
      location: formData?.address || "",
      lat: formData?.lat,
      lng: formData?.lng,
    };
    if (isEditing) {
      updateAddressMutation.mutate(payload);
    } else {
      newAddressMutation.mutate(payload);
    }
  };

  const updateAddressMutation = useMutation({
    mutationFn: updateDeliveryAddressByAddressId,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Delivery Address Updated Successfully.");
      fetchDeliveryAddress();
      reset({
        title: "",
        location: "",
        name: "",
        mobile_number: "",
      });
      setFormActive(false);
      setIsEditing(false);
      queryClient.invalidateQueries(["getDeliverAddress", token]);
    },
    onError: (error: any) => {
      const errors = error?.response?.data?.errors;
      errors.map((err: any) => {
        showToast(TOAST_TYPES.error, err.detail);
      });
    },
  });

  const newAddressMutation = useMutation({
    mutationFn: addDeliverAddress,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Delivery Address Added Successfully.");
      queryClient.invalidateQueries(["getDeliverAddress", token]);
      getDeliveryAddress();
      reset({
        title: "",
        location: "",
        name: "",
        mobile_number: "",
      });
      setFormActive(false);
    },
    onError: (error: any) => {
      const errors = error?.response?.data?.errors;
      errors.map((err: any) => {
        showToast(TOAST_TYPES.error, err.detail);
      });
    },
  });

  const handleSelectAddress = async (id: any) => {
    setSelectedAddressId(id);
  };

  const handleMap = (lat: any, lng: any, address: string) => {
    setFormData((prevData: any) => ({
      ...prevData,
      lat,
      lng,
      address,
    }));
  };

  const handleAddNew = () => {
    reset({
      title: "",
      location: "",
      name: "",
      mobile_number: "",
    });
    setIsEditing(false);
    if (deliveryAddressData?.length <= 3) {
      setFormActive(true);
    }
  };
  const handleEdit = (addressId: any) => {
    // For finfing  address object with the specified ID
    const addressData = deliveryAddressData.find(
      (address: any) => address.id === addressId
    );
    if (addressData) {
      // Set isEditing to true when editing
      setIsEditing(true);
      reset({
        id: addressData?.id,
        title: addressData?.title,
        name: addressData?.name,
        mobile_number: addressData?.mobileNumber,
        lat: addressData?.lat,
        lng: addressData?.lng,
        default: addressData?.isDefault,
      });
      // Show the modal for editing
      // setShowModal(true);
    }
  };

  const updateDefault = useMutation({
    mutationFn: updateDeliveryAddressByAddressId,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Delivery Address Updated Successfully.");
      fetchDeliveryAddress();
      queryClient.invalidateQueries(["getDeliverAddress", token]);
    },
    onError: (error: any) => {
      const errors = error?.response?.data?.errors;
      errors.map((err: any) => {
        showToast(TOAST_TYPES.error, err.detail);
      });
    },
  });

  const handleDefault = (data: any) => {
    const payload = {
      ...data,
      default: true,
      mobile_number: data?.mobile_number || "",
      title: data?.title || "",
      name: data?.name || "",
      location: formData?.address || "",
      lat: formData?.lat,
      lng: formData?.lng,
    };
    updateDefault.mutate(payload);
  };
  const deleteAdddressMutation = useMutation({
    mutationFn: deleteDeliverAddressById,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Delivery Address has been deleted");
      queryClient.invalidateQueries(["getDeliverAddress"]);
    },
    onError: (error: any) => {
      const errors = error?.response?.data?.errors;
      showToast(TOAST_TYPES.error, errors[0]?.message);
    },
  });

  //Delete Address
  const handleDeleteAddress = async (id: any) => {
    // setDeliveryAddressId(id);
    deleteAdddressMutation.mutate(id);
  };

  return (
    <div>
      <p className="text-base font-semibold mb-4">Delivery Details</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {deliveryAddressData?.map((deliveryAddressContent: any, index: any) => (
          <div key={index}>
            <AddressCard
              selectedAddressId={selectedAddressId}
              handleSelectAddress={handleSelectAddress}
              deliveryAddressContent={deliveryAddressContent}
              handleEdit={handleEdit}
              handleDeleteAddress={handleDeleteAddress}
              handleDefault={handleDefault}
            />
          </div>
        ))}
        {deliveryAddressData?.length < 3 &&
        (!formActive || isEditing) &&
        loggedIn ? (
          <Button variant={"outline"} onClick={handleAddNew}>
            Add New Address
          </Button>
        ) : (
          ""
        )}
      </div>
      {(formActive || isEditing) && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="col-span-1">
            <label
              htmlFor="title"
              className="font-normal text-xs text-[#707070]"
            >
              Address Title
            </label>
            <Input id="title" placeholder="Title" {...register("title")} />
            {errors.title && <p>{errors.title.message}</p>}
          </div>
          <div className="col-span-1">
            <label htmlFor="location">Location</label>
            <Input
              id="location"
              readOnly
              value={formData.address || ""}
              placeholder="Address"
              {...register("location")}
            />
            {errors.location && <p>{errors.location.message}</p>}
          </div>
          <div className="col-span-1">
            <label htmlFor="name">Customer Name</label>
            <Input
              id="name"
              placeholder="Customer Name"
              {...register("name")}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className="col-span-1">
            <label htmlFor="mobile_number">Customer Phone Number</label>
            <Input
              type="number"
              id="mobile_number"
              placeholder="Customer Phone Number"
              {...register("mobile_number")}
            />
            {errors.mobile_number && <p>{errors.mobile_number.message}</p>}
          </div>
          <div className="col-span-1 sm:col-span-2">
            <div className="h-[280px] mb-3">
              <LeafletMap
                lat={formData.lat || 27.7172}
                long={formData.lng || 85.324}
                address={formData.address || ""}
                onChange={handleMap}
              />
            </div>
            <div className="mt-4">
              <Button
                variant={"default"}
                type="submit"
                className="w-full sm:w-[50%]"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default DeliveryMode;
