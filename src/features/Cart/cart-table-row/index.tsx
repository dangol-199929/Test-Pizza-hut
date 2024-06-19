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

const CartTableRow = ({ item }: any) => {
  const { coupon } = useCartStore();
  const [quantity, setQuantity] = useState<number>(item?.quantity || 1);
  const stock: any = item?.selectedUnit?.stock;
  const queryClient = useQueryClient();
  const { configData } = useConfigStores();
  const { updateCartMutation, handleRemoveFromCart, cartDeleteLoading } =
    useCartsHooks(); //customHook

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Product Updated Successfully");

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
    setQuantity(newQuantity); //set the updated value
    debouncedHandleUpdateCart(newQuantity); //debounce callback added the updated value
  };

  // useEffect(() => {
  //     handleUpdateCart(debounceSearchValue);
  // }, [debounceSearchValue])
  const selectedUnit = item?.selectedUnit;
  const selectedImg = item?.product?.images.find(
    (img: any) => img?.unit_price_id === JSON.parse(selectedUnit?.id)
  );

  /**
   * To display toast if stock limit reached
   */
  // useEffect(() => {
  //     if (quantity === stock) {
  //         showToast(TOAST_TYPES.warning, 'Stock limit reached')
  //     }
  // }, [quantity])

  return (
    <tr className="border-b-gray-350">
      <td className="!py-4 !ps-6 !pe-0 !w-[108px]  text-gray-650 text-start flex justify-start items-center  font-medium">
        <Image
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
          {item?.product?.name}
          {/* <span className="block capitalize text-orange-4500">({item?.selectedUnit?.title})</span> */}
        </Link>
        {selectedUnit?.stock === 0 && (
          <p className="px-2 m-auto mt-2 text-xs border border-red-250 text-red-250 w-fit">
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
        <div className="flex justify-center m-auto h-[40px] max-w-[115px] border border-red-500 rounded-lg overflow-hidden">
          <button
            className="px-3 text-xl font-light text-red-500 p-[5px] transition-all delay-100 duration-150 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:hover:opacity-50 "
            onClick={() => {
              updateCartCall(quantity - 1);
            }}
            disabled={quantity === 1 ? true : false}
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
            className="text-xl font-light text-red-500 p-[5px] transition-all delay-100 duration-150 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:hover:opacity-50 px-3"
            onClick={() => {
              updateCartCall(quantity + 1);
            }}
            disabled={quantity === stock ? true : false}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.8499 9.13965L18.1999 19.2096C18.0899 20.7796 17.9999 21.9996 15.2099 21.9996H8.7899C5.9999 21.9996 5.9099 20.7796 5.7999 19.2096L5.1499 9.13965"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.33 16.5H13.66"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 12.5H14.5"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </td>
    </tr>
  );
};

export default CartTableRow;
