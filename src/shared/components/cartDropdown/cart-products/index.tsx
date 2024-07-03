import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useCartsHooks } from "@/hooks/cart.hooks";
import { FaTimes } from "react-icons/fa";
import { useConfig as useConfigStores } from "@/store/config";
import { Badge } from "../../ui/badge";
import CustomImage from "../../custom-image";
import { FallBackImg } from "@/shared/lib/image-config";

const CartDropdownProducts = ({ item }: any) => {
  const { cartDelete, handleRemoveFromCart, selectedId } = useCartsHooks();
  //for checking sku units
  const selectedUnit = item?.selectedUnit;
  const { configData } = useConfigStores();
  //used for finding the correct image to display according to selected id
  const selectedImg = item?.product?.webpImages
    ? item?.product?.webpImages.find(
        (img: any) => img?.unit_price_id === JSON.parse(selectedUnit?.id)
      )
    : item?.product?.images.find(
        (img: any) => img?.unit_price_id === JSON.parse(selectedUnit?.id)
      );

  //to display the offer price if the product has offer
  const checkOffer = item?.product?.variants?.find(
    (price: any) => price?.hasOffer
  );

  return (
    <div
      key={item.product?.id}
      className="relative flex gap-4 py-3 border-b border-gray-350"
    >
      <div className="min-w-[90px] max-w-[90px] min-h-[90px] aspect-square border border-gray-350 relative">
        <Link
          href={`/products/${item.product?.slug}`}
          className="absolute w-full h-full"
          aria-label={`product-item-slug`}
        />
        <CustomImage
          fallback={FallBackImg}
          width={85}
          height={100}
          style={{
            width: "auto",
            height: "auto",
          }}
          src={
            selectedImg
              ? selectedImg?.imageName
              : item?.product?.images[0]?.imageName
          }
          alt="image"
          className="object-contain aspect-square"
          crossOrigin="anonymous"
        />
        <Badge className="px-2 top-1 left-1">
          {" "}
          <span className="text-xs">{item.quantity}x</span>
        </Badge>
      </div>
      <div className="flex-grow min-w-0">
        <Link
          href={`/products/${item?.product?.slug}`}
          aria-label={`product-${item?.product?.id}`}
          className="overflow-hidden capitalize text-sm font-semibold transition-all delay-150 duration-150 block text-ellipsis whitespace-nowrap max-w-[90%] hover:text-primary "
        >
          {item?.product?.name}({item?.product?.variants[0].title})
        </Link>
        <p className="mt-1 text-sm gray-550">
          {" "}
          <span>{configData?.data?.currency}</span>{" "}
          {checkOffer
            ? checkOffer?.newPrice * item?.quantity
            : item?.selectedUnit?.sellingPrice * item?.quantity}
        </p>
        {selectedUnit?.stock === 0 && (
          <p className="mt-1 text-xs text-red-250">Out Of Stock</p>
        )}
      </div>
      <button
        className="absolute right-0 flex items-center justify-center w-5 rounded-full aspect-square hover:bg-primary hover:border-primary bg-gray-750 border-gray-750"
        onClick={() => handleRemoveFromCart(item?.id)}
        disabled={selectedId === item?.id && cartDelete.isLoading}
      >
        {selectedId === item?.id && cartDelete.isLoading ? (
          <span className="w-3 h-3 border-2 border-dotted rounded-full border-primary border-t-transparent animate-spin"></span>
        ) : (
          <FaTimes className="w-3 h-3 text-white" />
        )}
      </button>
    </div>
  );
};

export default CartDropdownProducts;
