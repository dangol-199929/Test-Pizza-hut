import { getCookie } from "cookies-next";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

import { useCartsHooks } from "@/hooks/cart.hooks";
import { useGetCartProductHooks } from "@/hooks/getCartProduct.hooks";
import { useWishlists } from "@/hooks/wishlist.hooks";
import { ICreateCartItem } from "@/interface/cart.interface";
import { addToCart } from "@/services/cart.service";
import CardHeartIcon from "@/shared/icons/common/CardHeartIcon";
import NonVegIcon from "@/shared/icons/common/NonVegIcon";
import TrashIcon from "@/shared/icons/common/TrashIcon";
import VegIcon from "@/shared/icons/common/VegIcon";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { useConfig as useConfigStores } from "@/store/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import ButtonLoader from "../btn-loading";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Props } from "./card.props";
import BagIcon from "@/shared/icons/common/BagIcon";
import CustomImage from "../custom-image";
import { FallBackImg } from "@/shared/lib/image-config";

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
  // Replace the single quantity state with a map of quantities for each variant
  const [quantities, setQuantities] = useState<{ [variantId: string]: number }>(
    product.variants.reduce((acc, variant) => {
      acc[variant.id] = 1; // Initialize each variant's quantity to 1
      return acc;
    }, {} as { [variantId: string]: number })
  );
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
   * Handle Add to cart payload function
   */
  const handleAddToCart = () => {
    const payload: ICreateCartItem = {
      note: "",
      variant_id: Number(size),
      quantity: quantities[size], // Use the quantity from the state map
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
      setQuantities({ ...quantities, [itemId]: newQuantity }); // Update the quantity in the state map
    }
  };

  /**
   * Used in order to debounce the value(quantity) that is being updated.
   */
  const debouncedHandleUpdateCart = useCallback(
    debounce(({ newQuantity, itemId }) => {
      handleUpdateCart(newQuantity, itemId);
    }, 300),
    [cartItem] // Ensure this dependency array is correctly capturing all dependencies
  );

  /**
   * For btn onClick function to pass the new value either being increased or decreased.
   */
  const updateCartCall = (newQuantity: number, itemId: number) => {
    setQuantities({ ...quantities, [itemId]: newQuantity }); // Update the quantity in the state map
    debouncedHandleUpdateCart({ newQuantity, itemId }); // Pass as an object
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
      setQuantities({
        ...quantities,
        [cartItem?.selectedUnit?.id]: cartItem?.quantity,
      });
    }
  }, []);

  useEffect(() => {
    if (loggedIn !== undefined) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [loggedIn]);
  return (
    <>
      <div className=" card plant-card !rounded-[16px]">
        <figure className="relative aspect-auto-[282/216] min-h-[216px] image-container">
          {product?.webpImages && product?.webpImages?.length > 0 ? (
            <CustomImage
              fallback={FallBackImg}
              src={product?.webpImages[0]?.imageName}
              alt="Plant"
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="!rounded-t-[16px] !rounded-b-[0px] "
            />
          ) : (
            <CustomImage
              fallback={FallBackImg}
              src={product?.images[0]?.imageName}
              alt="Plant"
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          {product?.hasOffer && (
            <p className="absolute px-2 py-1 text-xs font-medium text-white rounded-lg top-3 right-3 bg-primary">
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
                  className="absolute bottom-3 right-3 z-[2] p-2 rounded-full bg-black/10"
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
                  className="absolute bottom-3 right-3 z-[2] p-2 rounded-full bg-black/10"
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
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
              <p className="self-stretch text-neutral-700 text-lg font-semibold capitalize h-[56px] line-clamp-[2]">
                {product?.name}
              </p>
              <div className="self-stretch text-neutral-500 text-sm font-normal leading-tight mb-4">
                {product?.description}
              </div>
            </div>
            <Select
              defaultValue={product?.variants[0]?.id.toString()}
              onValueChange={(value: string) => setSize(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {product?.variants?.map((variant, index) => (
                    <SelectItem
                      key={index}
                      className="capitalize min-h-[32px]"
                      value={variant?.id.toString()}
                    >
                      {variant?.title}
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
                {
                  product?.variants?.find((variant) => variant?.id === +size)
                    ?.sellingPrice
                }
              </p>
            )}

            {!cart?.cartProducts?.some((item: any) =>
              item?.product.variants.some(
                (variant: any) => variant.id === Number(size)
              )
            ) ? (
              <Button
                className={`${
                  mutation.isLoading && "opacity-70 "
                } disabled:cursor-not-allowed rounded-xl text-sm flex justify-start items-center gap-1 min-w-[100px] ps-[7px] pe-[8px]`}
                onClick={handleAddToCart}
                disabled={mutation.isLoading}
                variant={"outline"}
              >
                {mutation.isLoading ? (
                  <ButtonLoader className="!w-4 !h-4 !border-primary" />
                ) : (
                  <>
                    <BagIcon className="h-[24px] w-[24px]" />
                    Add to Box
                  </>
                )}
              </Button>
            ) : (
              cart?.cartProducts?.some((item: any) =>
                item?.product.variants.some(
                  (variant: any) => variant.id === Number(size)
                )
              ) && (
                <div className="flex items-center gap-2 px-3 border rounded-xl border-primary h-[40px]">
                  {quantities[size] === 1 ? (
                    <button
                      onClick={() => {
                        const cartProductId = cart?.cartProducts?.find(
                          (item: any) =>
                            item?.product.variants.some(
                              (variant: any) => variant?.id === Number(size)
                            )
                        )?.id;
                        handleRemoveFromCart(Number(cartProductId));
                      }}
                      disabled={cartDeleteLoading}
                    >
                      {cartDeleteLoading ? (
                        <ButtonLoader className="hover:!border-white !border-primary !block max-w-[18px] h-[18px]" />
                      ) : (
                        <TrashIcon className="text-primary max-w-[16px] h-auto" />
                      )}
                    </button>
                  ) : (
                    <button
                      className="text-primary py-1 text-sm w-[14px]"
                      onClick={() => {
                        updateCartCall(quantities[size] - 1, Number(size));
                      }}
                    >
                      {" "}
                      <FaMinus className="max-w-[9px] h-auto" />{" "}
                    </button>
                  )}
                  <input
                    type="text"
                    className="text-center max-w-[35px] h-full font-bold text-sm border-0 focus:outline-0 text-primary"
                    value={quantities[size]}
                    readOnly
                    maxLength={3}
                  />
                  <button
                    className="text-primary py-1 w-[14px] disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none"
                    onClick={() => {
                      updateCartCall(quantities[size] + 1, Number(size));
                    }}
                    disabled={quantities[size] === stock ? true : false}
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
