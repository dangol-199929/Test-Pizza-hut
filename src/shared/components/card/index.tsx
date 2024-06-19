import { getCookie } from "cookies-next";
import { debounce } from "lodash";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

import { useCartsHooks } from "@/hooks/cart.hooks";
import { useWishlists } from "@/hooks/wishlist.hooks";
import { ICartData, ICreateCartItem } from "@/interface/cart.interface";
import { addToCart } from "@/services/cart.service";
import CardHeartIcon from "@/shared/icons/common/CardHeartIcon";
import TrashIcon from "@/shared/icons/common/TrashIcon";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { useConfig as useConfigStores } from "@/store/config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import ButtonLoader from "../btn-loading";
import { Props } from "./card.props";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import NonVegIcon from "@/shared/icons/common/NonVegIcon";
import { useGetCartsHooks } from "@/hooks/getCart.hooks";
import { useGetCartProductHooks } from "@/hooks/getCartProduct.hooks";
import { Button } from "../ui/button";
import { VeganIcon } from "lucide-react";
import VegIcon from "@/shared/icons/common/VegIcon";

const Card: React.FC<Props> = ({ product, cartItem }) => {
  //Token
  const [logIn, setLogin] = useState<boolean>(false);
  const loggedIn = getCookie("isLoggedIn");
  const { configData } = useConfigStores();
  //Use query hook
  const { cartProducts: cart } = useGetCartProductHooks();
  const queryClient = useQueryClient();
  const stock: any = cartItem?.selectedUnit?.stock;
  const { addFavMutation, removeFavMutation, addLoading, removeLoading } =
    useWishlists(); //for adding products for wishlist ->hook

  /*
   * States
   */
  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<any>(product?.variants[0]?.id);
  const { updateCartMutation, handleRemoveFromCart, cartDeleteLoading } =
    useCartsHooks(); //customHook

  /*
   * Handle Add to cart api call
   */
  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Item Added To Cart Successfully");
      queryClient.invalidateQueries(["getCart"]);

      queryClient.invalidateQueries(["getCartProducts"]);
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error?.response?.data?.errors[0]?.message);
    },
  });

  /*
   * Handle Add to cart paylod function
   */
  const handleAddToCart = () => {
    const payload: ICreateCartItem = {
      note: "",
      variant_id: product?.id,
      size: size,
      // priceId: product?.unitPrice[0]?.id,
      quantity: quantity,
    };
    mutation.mutate(payload);
  };

  /*
   ** Provides payload to the update api when the value is being increased or decreased.
   */
  const handleUpdateCart = (newQuantity: number, itemId: number) => {
    if (newQuantity <= stock) {
      const payload: ICreateCartItem = {
        note: "",
        quantity: newQuantity,
        variant_id: itemId,
      };
      updateCartMutation.mutate(payload);
    }
  };

  /**
   * Used in order to debounce the value(quantity) that is being updated.
   */
  const debouncedHandleUpdateCart = useCallback(
    //debounce callback to call when value changes

    debounce((newQuantity) => {
      handleUpdateCart(newQuantity, product?.id);
    }, 300),
    [cartItem]
  );

  /**
   * For btn onClick function to pass the new value either being increased or decreased.
   */
  const updateCartCall = (newQuantity: number) => {
    setQuantity(newQuantity); //set the updated value
    debouncedHandleUpdateCart(newQuantity); //debounce callback added the updated value
  };

  /*
   ** Add product in favourite list
   */
  const addToFav = (id: number) => {
    addFavMutation.mutate(id);
  };

  /*
   ** Remove product from favourite list
   */
  const removeFromFav = (id: number) => {
    removeFavMutation.mutate(id);
  };

  /*
   ** Set Cart item updated value
   */
  useEffect(() => {
    if (cartItem?.quantity) {
      setQuantity(cartItem?.quantity);
    }
  }, []);

  useEffect(() => {
    if (loggedIn !== undefined) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [loggedIn]);
  {
  }
  return (
    <>
      <div className=" card plant-card !rounded-[16px]">
        <figure className="relative aspect-auto-[282/216] min-h-[216px] image-container">
          {product?.webpImages && product?.webpImages?.length > 0 ? (
            <Image
              src={product?.webpImages[0]?.imageName}
              alt="Plant"
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="!rounded-t-[16px] !rounded-b-[0px] "
            />
          ) : (
            <Image
              src={product?.images[0]?.imageName}
              alt="Plant"
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          {product?.hasOffer && (
            <p className="absolute px-2 py-1 text-xs font-medium text-white rounded-md bottom-2 left-3 bg-red-250">
              Offer
            </p>
          )}
          {product?.type === "Non Veg" ? (
            <NonVegIcon className="absolute text-xs font-medium bottom-2 left-3" />
          ) : (
            <VegIcon className="absolute text-xs font-medium bottom-2 left-3" />
          )}

          {logIn && (
            <>
              {!product?.isFav ? (
                <button
                  onClick={() => addToFav(product?.id)}
                  className="absolute bottom-3 right-3 z-[2]"
                >
                  {addLoading ? (
                    <ButtonLoader className="!border-primary !block" />
                  ) : (
                    <CardHeartIcon />
                  )}
                </button>
              ) : (
                <button
                  onClick={() => removeFromFav(product?.id!)}
                  className="absolute bottom-3 right-3 z-[2] "
                >
                  {removeLoading ? (
                    <ButtonLoader className="!border-primary !block" />
                  ) : (
                    <CardHeartIcon className="stroke-primary fill-primary" />
                  )}
                </button>
              )}
            </>
          )}
        </figure>
        <div className="card-body px-[15px] py-[20px] gap-[10px]">
          <div className="self-stretch flex-col justify-between items-start flex mb-4">
            <div className="self-stretch flex-col justify-start items-start gap-4 flex">
              <Link
                href={`/categories/${product?.categorySlug}`}
                className="self-stretch text-neutral-700 text-lg font-semibold capitalize"
              >
                {product?.name}
              </Link>
              <div className="self-stretch text-neutral-500 text-sm font-normal leading-tight mb-4">
                {product?.restaurantName}
              </div>
            </div>
            <Select onValueChange={(value: string) => setSize(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {product?.variants?.map((variant, index) => (
                    <SelectItem
                      key={index}
                      className="capitalize"
                      value={variant?.id.toString()}
                    >
                      {variant?.size}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center relative z-[3] h-[40px]">
            {product?.variants?.find((variant) => variant?.id === size)
              ?.hasOffer ? (
              <div className="flex flex-col ">
                <p className="flex-grow-0 mr-2 text-neutral-700 text-lg font-bold ">
                  {configData?.data?.currency}{" "}
                  {
                    product?.variants?.find((variant) => variant?.id === size)
                      ?.newPrice
                  }
                </p>
                <p className="flex-grow-0 mr-2 text-lg font-semibold line-through text-gray-1450">
                  {configData?.data?.currency}{" "}
                  {
                    product?.variants?.find((variant) => variant?.id === size)
                      ?.oldPrice
                  }
                </p>
              </div>
            ) : (
              <p className="text-neutral-700 text-lg font-bold ">
                {configData?.data?.currency}{" "}
                {product?.variants[0]?.sellingPrice}
              </p>
            )}

            {!cart?.cartProducts?.some(
              (item: any) => item?.product.id === product?.id
            ) ? (
              <Button
                className={`${
                  mutation.isLoading && "opacity-70 "
                } disabled:cursor-not-allowed rounded-xl text-sm`}
                onClick={handleAddToCart}
                disabled={mutation.isLoading}
                variant={"outline"}
              >
                Add to Box
                {mutation.isLoading && <ButtonLoader className="!w-4 !h-4" />}
              </Button>
            ) : (
              cart?.cartProducts?.some(
                (item: any) => item?.product.id === product?.id
              ) && (
                <div className="flex items-center gap-3 px-3 border rounded-lg border-primary h-[34px]">
                  {quantity === 1 ? (
                    <button
                      onClick={() => handleRemoveFromCart(cartItem?.id!)}
                      disabled={cartDeleteLoading}
                    >
                      {cartDeleteLoading ? (
                        <ButtonLoader className="hover:!border-white !border-primary !block max-w-[18px] h-[18px]" />
                      ) : (
                        <TrashIcon className="max-w-[14px] h-auto" />
                      )}
                    </button>
                  ) : (
                    <button
                      className="text-primary py-1 text-sm w-[14px]"
                      onClick={() => {
                        updateCartCall(quantity - 1);
                      }}
                    >
                      {" "}
                      <FaMinus className="max-w-[9px] h-auto" />{" "}
                    </button>
                  )}
                  <input
                    type="text"
                    className="text-center max-w-[35px] h-full font-bold text-sm border-0 focus:outline-0 text-primary"
                    value={quantity}
                    readOnly
                    maxLength={3}
                  />
                  <button
                    className="text-primary py-1 w-[14px] disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none"
                    onClick={() => {
                      updateCartCall(quantity + 1);
                    }}
                    disabled={quantity === stock ? true : false}
                  >
                    <FaPlus className="max-w-[10px] h-auto" />
                  </button>
                </div>
              )
            )}

            {/* ) */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
