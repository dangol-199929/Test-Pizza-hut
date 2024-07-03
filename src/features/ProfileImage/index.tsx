import React, { FC, useEffect, useRef, useState } from "react";

import Image from "next/image";
import { FallBackImg, ProfileImg } from "@/shared/lib/image-config";
import { FiEdit } from "react-icons/fi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { uploadProfileImage } from "@/services/profile.service";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import SkeletonProfileLoading from "@/shared/components/skeleton/profile";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import CustomImage from "@/shared/components/custom-image";

const ProfileImage = () => {
  const token = getToken();
  /**
   * Use States
   */
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  /**
   * Get api calls
   */
  const { data: profile, initialLoading: profileLoading }: any = useQuery([
    "getProfile",
    token,
  ]);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/png", "image/jpeg"];
    const maxSize = 3; // MB

    // Validation
    let newErrorMessage: string | null = null;

    if (!allowedTypes.includes(file.type)) {
      newErrorMessage = "Only Images are allowed ( JPG | PNG )";
    }
    if (file.size / 1024 / 1024 > maxSize) {
      newErrorMessage = `Maximum size allowed is ${maxSize}MB`;
    }

    if (!newErrorMessage) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const profileImageBase64 = reader.result as string;
        setSelectedImage(profileImageBase64);
        profileImageMutation.mutate(file);
        setErrorMessage("");
      };
    } else {
      setErrorMessage(newErrorMessage);
    }
  };

  const handleEditButtonClick = () => {
    fileInputRef.current?.click();
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  const profileImageMutation = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, "Profile uploaded successfully");
    },
    onError: (error: any) => {
      const errors = error?.response?.data?.errors;
      showToast(TOAST_TYPES.error, errors[0]?.message);
    },
  });

  /**
   * Use effects
   */
  useEffect(() => {
    if (profile) {
      setSelectedImage(profile?.data?.avatar);
    }
  }, [profile]);
  return (
    <div className="">
      <div className="relative w-[130px] h-auto m-auto">
        {profileLoading ? (
          <SkeletonProfileLoading />
        ) : (
          <CustomImage
            fallback={FallBackImg}
            width={200}
            height={200}
            src={selectedImage}
            alt="User image"
            className="object-cover w-full m-auto border rounded-full aspect-square border-gray-950"
          />
        )}
        <button
          className="absolute top-0 right-0 flex flex-col items-center justify-center gap-3 p-2 text-center bg-white border rounded-full hover:text-primary hover:border-primary hover:bg-gray-200"
          onClick={handleEditButtonClick}
        >
          <label
            htmlFor="fileInput"
            className="hidden block w-full text-sm cursor-pointer text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          >
            Choose File
          </label>
          <input
            id="fileInput"
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />
          <FiEdit className="text-[19px] tetx-slate-850" />
        </button>
      </div>
      {errorMessage && (
        <div className="text-destructive text-xs leading-[16px] mt-2 text-center">
          {errorMessage}
        </div>
      )}
      {/* Image Upload */}
    </div>
  );
};

export default ProfileImage;
