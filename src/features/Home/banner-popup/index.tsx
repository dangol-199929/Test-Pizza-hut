import { IPopupBanner } from "@/interface/home.interface";
import CustomImage from "@/shared/components/custom-image";
import SkeletonImage from "@/shared/components/skeleton/image";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { FallBackImg } from "@/shared/lib/image-config";
import { setCookie } from "cookies-next";
import Image from "next/image";
import React from "react";
import { FaTimes } from "react-icons/fa";

export interface IBannerPopup {
  popupData: IPopupBanner;
  setShowPopupModal: (arg: boolean) => void;
  showPopupModal: boolean;
  bannerPopupLoading: boolean;
}

const BannerPopup = ({
  popupData,
  showPopupModal,
  setShowPopupModal,
  bannerPopupLoading,
}: IBannerPopup) => {
  const cancelBannerModal = () => {
    setShowPopupModal(false);
    setCookie("bannerPopup", true);
  };

  return (
    <>
      <Dialog open={showPopupModal} onOpenChange={cancelBannerModal}>
        <DialogContent className="!max-w-5xl p-3 modal-content">
          <>
            {bannerPopupLoading ? (
              <SkeletonImage className="w-full !mb-0" />
            ) : popupData?.webpWebImage ? (
              <CustomImage
                fallback={FallBackImg}
                width={2000}
                height={2000}
                quality={100}
                className="w-full h-auto"
                src={popupData?.webpWebImage}
                alt="Popup data"
              />
            ) : (
              <CustomImage
                fallback={FallBackImg}
                width={100}
                height={100}
                quality={100}
                src={popupData?.appImage}
                alt="BannerPoppup"
              />
            )}
          </>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BannerPopup;
