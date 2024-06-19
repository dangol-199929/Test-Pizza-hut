import {
  addCouponCode,
  addToCart,
  bulkDeleteCart,
  deleteCartItemById,
} from "@/services/cart.service";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCart as useCartStore } from "@/store/cart";

export const useCartsHooks = () => {
  const [selectedId, setSelectedId] = useState<number>(0);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { coupon } = useCartStore();

  const cartDelete = useMutation({
    mutationFn: deleteCartItemById,
    onSuccess: () => {
      queryClient.invalidateQueries(["getCart"]);
      showToast(TOAST_TYPES.success, "Item Deleted From Cart Successfully");
      if (router.pathname === "/wishlist") {
        queryClient.invalidateQueries(["wishlistProducts"]);
      }
      if (coupon) {
        queryClient.invalidateQueries(["addCoupon"]);
      }
    },
  });

  const handleRemoveFromCart = (id: number) => {
    setSelectedId(id);
    cartDelete.mutate(id);
  };

  const updateCartMutation = useMutation({
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

  const bulkCartDelete = useMutation({
    mutationFn: bulkDeleteCart,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Items Deleted From Cart Successfully");
      deleteCookie("cart_number");
      queryClient.invalidateQueries(["getCart"]);

      if (coupon) {
        queryClient.invalidateQueries(["addCoupon"]);
      }
    },
  });

  // const addCoupon = useMutation({
  //     mutationFn: addCouponCode,
  //     onSuccess: (data) => {
  //         queryClient.invalidateQueries(['getCart'])
  //     },
  //     onError: (error: any) => {
  //         showToast(TOAST_TYPES.error, error[0]?.title)
  //         if (localStorage.getItem('coupon')) {
  //             localStorage.removeItem('coupon')
  //         }
  //     }
  // })

  return {
    handleRemoveFromCart,
    cartDelete,
    selectedId,
    updateCartMutation,
    bulkCartDelete,
    bulkDeleteLoading: bulkCartDelete.isLoading,
    updateCartLoading: updateCartMutation.isLoading,
    cartDeleteLoading: cartDelete.isLoading,
  };
};
