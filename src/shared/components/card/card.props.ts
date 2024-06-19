import { ICartItem } from "@/interface/cart.interface";
import { ICartProduct, IProduct } from "@/interface/product.interface";

export type Props = {
  product: IProduct;
  cartItem?: ICartProduct;
  setProductModalId: (arg: string) => void;
};
