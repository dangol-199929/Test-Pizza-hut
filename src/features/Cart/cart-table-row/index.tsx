import { useCartsHooks } from "@/hooks/cart.hooks";
import { useDebounce } from "@/hooks/useDebounce.hooks";
import { ICreateCartItem, IUpdateCartItem } from "@/interface/cart.interface";
import { addToCart } from "@/services/cart.service";
import ButtonLoader from "@/shared/components/btn-loading";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useCart as useCartStore } from "@/store/cart";
import { useConfig as useConfigStores } from "@/store/config";
import { Input } from "@/shared/components/ui/input";
import TrashIcon from "@/shared/icons/common/TrashIcon";
import CustomImage from "@/shared/components/custom-image";
import { FallBackImg } from "@/shared/lib/image-config";

const CartTableRow = ({ item }: any) => {
  const { coupon } = useCartStore();
  const [quantity, setQuantity] = useState<number>(item?.quantity || 1);
  const [isLoading, setIsLoading] = useState(false);
  const stock: any = item?.selectedUnit?.stock;
  const queryClient = useQueryClient();
  const { configData } = useConfigStores();
  const { updateCartMutation, handleRemoveFromCart, cartDeleteLoading } =
    useCartsHooks(); //customHook

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Product Updated Successfully");
      setIsLoading(false);
      queryClient.invalidateQueries(["getRelatedProductsFromId"]);
      queryClient.invalidateQueries(["getCartProducts"]);
      queryClient.invalidateQueries(["getCart"]);
      if (coupon) {
        queryClient.invalidateQueries(["addCoupon"]);
      }
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error?.response?.data?.errors[0]?.detail);
    },
  });

  /*
   ** Provides payload to the update api when the value is being increased or decreased.
   */
  const handleUpdateCart = (newQuantity: number, itemId: number) => {
    if (newQuantity <= stock) {
      // const payload: IUpdateCartItem = {
      //     note: '',
      //     quantity: newQuantity,
      //     product_number: itemId,
      // }
      const payload: ICreateCartItem = {
        note: "",
        // variant_id: selectedPrice?.id,
        variant_id: itemId,
        quantity: newQuantity,
      };
      mutation.mutate(payload);
    }
  };

  /**
   * Used in order to debounce the value(quantity) that is being updated.
   */
  const debouncedHandleUpdateCart = useCallback(
    //debounce callback to call when value changes
    debounce((newQuantity) => {
      handleUpdateCart(newQuantity, item?.selectedUnit?.id!);
    }, 300),
    [item]
  );

  /**
   * For btn onClick function to pass the new value either being increased or decreased.
   */
  const updateCartCall = (newQuantity: number) => {
    setIsLoading(true);
    setQuantity(newQuantity); //set the updated value
    debouncedHandleUpdateCart(newQuantity); //debounce callback added the updated value
  };

  const selectedUnit = item?.selectedUnit;
  const selectedImg = item?.product?.images.find(
    (img: any) => img?.unit_price_id === JSON.parse(selectedUnit?.id)
  );

  return (
    <tr className="border-b-gray-350">
      <td className="!py-4 !ps-6 !pe-0 !w-[108px]  text-gray-650 text-start flex justify-start items-center  font-medium">
        <CustomImage
          fallback={FallBackImg}
          src={
            selectedImg
              ? selectedImg?.imageName
              : item?.product?.images[0]?.imageName
          }
          height={80}
          width={80}
          quality={100}
          alt={item?.product?.name}
          className="aspect-square rounded-xl"
        />
      </td>
      <td className="!py-4 !pe-6 !ps-0 w-full text-[#32373D] text-start font-medium whitespace-nowrap">
        <Link
          href={`/products/${item?.product?.slug}`}
          className="text-base hover:text-primary"
          aria-label="indoor-plants"
        >
          {item?.product?.name} ({item?.product?.variants[0].title})
          {/* <span className="block capitalize text-orange-4500">({item?.selectedUnit?.title})</span> */}
        </Link>
        {selectedUnit?.stock === 0 && (
          <p className="px-2 m-auto mt-2 text-xs border border-primary text-primary w-fit">
            Out Of Stock
          </p>
        )}
      </td>
      <td className="!py-4 !px-6  text-[#32373D] text-center  font-medium text-base whitespace-nowrap">
        {selectedUnit?.hasOffer && (
          <>
            <div className="flex flex-col">
              <span className="text-primary">
                {configData?.data?.currency} {item?.selectedUnit?.newPrice}
              </span>
              <span className="line-through">
                {configData?.data?.currency} {item?.selectedUnit?.oldPrice}
              </span>
            </div>
          </>
        )}
        {!selectedUnit?.hasOffer && (
          <>
            <span>
              {configData?.data?.currency} {item?.selectedUnit?.sellingPrice}
            </span>
          </>
        )}
      </td>
      <td className="!py-4 !px-6 min-w-[180px] text-[#32373D] text-center  font-medium">
        <div className="flex justify-center m-auto h-[40px] max-w-[115px] border border-primary rounded-lg overflow-hidden">
          <button
            className="px-3 text-xl font-light text-primary p-[5px] transition-all delay-100 duration-150 hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:hover:opacity-50 "
            onClick={() => {
              updateCartCall(quantity - 1);
            }}
            disabled={(quantity === 1 ? true : false) || isLoading}
          >
            -
          </button>
          <Input
            type="text"
            className="w-full text-sm text-center  bg-transparent border-0 focus:outline-0 !p-0 !h-auto mt-1 flex justify-center items-center"
            readOnly
            value={item?.quantity}
            maxLength={3}
          />
          <button
            className="text-xl font-light text-primary p-[5px] transition-all delay-100 duration-150 hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:hover:opacity-50 px-3"
            onClick={() => {
              updateCartCall(quantity + 1);
            }}
            disabled={(quantity === stock ? true : false) || isLoading}
          >
            +
          </button>
        </div>
      </td>
      <td className="!py-4 !px-6 text-[#32373D] text-center  font-medium text-[15px] whitespace-nowrap">
        {selectedUnit?.hasOffer && (
          <>
            {configData?.data?.currency}{" "}
            {item?.selectedUnit?.newPrice * item?.quantity}
          </>
        )}
        {!selectedUnit?.hasOffer && (
          <>
            <span>
              {configData?.data?.currency}{" "}
              {item?.selectedUnit?.sellingPrice * item?.quantity}
            </span>
          </>
        )}
      </td>
      <td className="!py-4 !px-6 w-[100px] text-center ">
        <button
          disabled={cartDeleteLoading}
          className="disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-0 flex items-center justify-center m-auto transition-all delay-100 duration-150 w-[40px] h-[36px] hover:bg-gray-200 rounded-xl"
          onClick={() => handleRemoveFromCart(item?.id)}
        >
          {cartDeleteLoading ? (
            <ButtonLoader className="!border-primary" />
          ) : (
            <TrashIcon />
          )}
        </button>
      </td>
    </tr>
  );
};

export default CartTableRow;
