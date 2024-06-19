import { getCartProduct } from "@/services/cart.service";
import { useQuery } from "@tanstack/react-query";
import { ICartData } from "@/interface/cart.interface";

export const useGetCartProductHooks = () => {
  const { data: cartProducts, isLoading: cartProductsLoading } =
    useQuery<ICartData>(["getCartProducts"], getCartProduct);
  return { cartProducts, cartProductsLoading };
};
