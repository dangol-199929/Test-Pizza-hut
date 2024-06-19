import { ICouponCartData } from "@/interface/cart.interface";
import { create } from "zustand";

interface IStore {
  coupon: string;
  setCoupon: (coupon: string) => void;
  //   cartData: any;
  couponData: ICouponCartData | any;
  setCouponData: (couponData: ICouponCartData | any) => void;
}

export const useCart = create<IStore>((set, get) => ({
  coupon: "",
  setCoupon: (coupon) => {
    set(() => ({ coupon: coupon }));
  },

  couponData: {},
  setCouponData: (data) => {
    set(() => ({ couponData: data }));
  },
}));
