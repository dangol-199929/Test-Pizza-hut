import axiosInstance, { setCouponHeader } from "@/axios/axiosInstance";
import { CookieKeys } from "@/shared/enum";
import { getCookie } from "cookies-next";
import { config } from "../../config";
import { useQueryClient } from "@tanstack/react-query";

const apiEndPoint1 = config.gateway.apiEndPoint1;
export const checkout = async (payload: any, coupon: string) => {
  try {
    if (coupon) {
      setCouponHeader({
        coupon: coupon,
      });
    } else {
      setCouponHeader({
        coupon: "",
      });
    }
    const response = await axiosInstance.post(
      `/${apiEndPoint1}/checkout`,
      payload
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const getCartNumber = (): any => {
  let number = getCookie(CookieKeys.CARTNUMBER);
  return number || "";
};

export const getOutletAddress = async () => {
  try {
    const response = await axiosInstance.get(
      `/${apiEndPoint1}/warehouses/outlet`
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};
