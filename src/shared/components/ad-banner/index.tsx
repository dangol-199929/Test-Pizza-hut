import { IAdBanner } from "@/interface/home.interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Title from "../title";
import CustomImage from "../custom-image";
import { FallBackImg } from "@/shared/lib/image-config";

export interface IAdBannerComponent {
  adBanner: IAdBanner;
}

const AdBanner = ({ adBanner }: IAdBannerComponent) => {
  return (
    <>
      {adBanner?.linkType === "Website" ? (
        <Link
          className="absolute w-full h-full z-[1]"
          target="_blank"
          href={`${adBanner?.linkValue}`}
        />
      ) : adBanner?.linkType === "Category" ? (
        <Link
          className="absolute w-full h-full z-[1]"
          href={`/categories/${adBanner?.slug}`}
        />
      ) : adBanner?.linkType === "Product" ? (
        <Link
          className="absolute w-full h-full z-[1]"
          href={`/products/${adBanner?.slug}`}
        />
      ) : (
        ""
      )}
      <CustomImage
        fallback={FallBackImg}
        src={
          adBanner?.webpWebImage ? adBanner?.webpWebImage : adBanner?.webImage
        }
        alt={`bannerImage-${adBanner?.id}`}
        className="!h-full w-full transition-all duration-300 ease-linear translate group-hover:scale-[1.035]"
        width={1000}
        height={1000}
        priority={true}
        quality={100}
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </>
  );
};

export default AdBanner;
