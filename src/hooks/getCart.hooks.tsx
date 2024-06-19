import { getCartData } from "@/services/cart.service";
import { useQuery } from "@tanstack/react-query";
import { useCart as useCartStore } from "@/store/cart";
import { getCookie } from "cookies-next";
import { ICartData } from "@/interface/cart.interface";

export const useGetCartsHooks = () => {
  const loggedIn = getCookie("isLoggedIn");
  const { coupon } = useCartStore();
  const { data: cart, isLoading: cartLoading } = useQuery<ICartData>(
    ["getCart", loggedIn, coupon],
    () => getCartData({ coupon })
  );
  return { cart, cartLoading };
};
