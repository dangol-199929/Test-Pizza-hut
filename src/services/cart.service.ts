import axiosInstance, {
  setAuthorizationHeader,
  setCartIDHeader,
  setCartNumberHeader,
  setCouponHeader,
  setWarehouseIdAxios,
} from "@/axios/axiosInstance";
import { ICreateCartItem } from "@/interface/cart.interface";
import { CookieKeys } from "@/shared/enum";
import { getCartNumber } from "@/shared/utils/cookies-utils/cookies.utils";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { config } from "../../config";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { getWareId } from "@/shared/utils/local-storage-utils";

const apiURL = config.gateway.apiURL;
const apiEndPoint1 = config.gateway.apiEndPoint1;
const apiEndPoint2 = config.gateway.apiEndPoint2;

// export const setCartNumberCookie = async () => {
//   try {
//     const response = await axiosInstance.get(`/cart`);
//     if (response.status === 200) {
//       setCookie(CookieKeys.CARTNUMBER, response?.data?.data?.cartNumber);
//     }
//     return response.data.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const getCartData = async (params: { coupon?: string }) => {
  try {
    if (params.coupon) {
      setCouponHeader({
        coupon: params.coupon,
      });
    } else {
      setCouponHeader({
        coupon: "",
      });
    }
    setAuthorizationHeader();
    await setWarehouseIdAxios();
    const response = await axiosInstance.get(`/${apiEndPoint2}/carts`);
    if (!getCookie(CookieKeys.CARTNUMBER)) {
      setCookie(CookieKeys.CARTNUMBER, response?.data?.data?.cartNumber);
    }
    if (!getCookie(CookieKeys.CARTID)) {
      setCookie(CookieKeys.CARTID, response?.data?.data?.id);
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// export const flushCart = async () => {
//   try {
//     setAuthorizationHeader();
//     await setWarehouseIdAxios();
//     const response = await axiosInstance.get(`/${apiEndPoint2}/carts?flush=1`);
//     return response.data.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const flushCart = async () => {
  try {
    setAuthorizationHeader();
    await setWarehouseIdAxios();
    const response = await axiosInstance.get(`/${apiEndPoint2}/carts?flush=1`);
    if (response.data.data.cartNumber) {
      setCookie(CookieKeys.CARTNUMBER, response?.data?.data?.cartNumber);
    }
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};
export const getCartProduct = async () => {
  try {
    setCartNumberHeader();
    await setWarehouseIdAxios();
    const response = await axiosInstance.get(`/${apiEndPoint2}/cart-products`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCartItemById = async (id: number) => {
  try {
    setCartNumberHeader();
    const response = await axiosInstance.delete(
      `/${apiEndPoint2}/cart-products/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const addToCart = async (data: ICreateCartItem) => {
  try {
    setCartNumberHeader();
    const response = await axiosInstance.post(
      `/${apiEndPoint2}/cart-products`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const updateCart = async (data: IUpdateCartItem) => {
//   const payload = {
//     ...data,
//   };
//   delete payload.product_number;
//   try {
//     const response = await axiosInstance.patch(
//       `/cart-product/${data.product_number}`,
//       payload
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const bulkDeleteCart = async () => {
  try {
    setCartNumberHeader();
    const response = await axiosInstance.delete(`/${apiEndPoint1}/carts`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const associateCart = async (auth: any, status: string) => {
  const associateCartUrl = `${apiURL}/${apiEndPoint1}/cart/associate`;

  const headers = {
    ...(getCartNumber() && { "Cart-Number": getCartNumber() }),
    // ...(getCoupon() && { Coupon: getCoupon() }),
    Authorization: `Bearer ${auth}`,
    "Api-Key": config.gateway.apiKey,
    "Warehouse-Id": getWareId(),
  };
  if (status === "true" || status === "false") {
    headers["Flush-Old-Cart"] = status;
  }

  try {
    const response = await axios.get(`${associateCartUrl}`, { headers });
    return { response, error: null };
  } catch (error) {
    return { response: null, error };
  }
};

export const addCouponCode = async (code: string) => {
  try {
    setCartNumberHeader();
    setCartIDHeader();
    const response = await axiosInstance.get(
      `/${apiEndPoint1}/carts/coupon/${code}`
    );
    return response.data.data;
  } catch (error: any) {
    throw error.response?.data?.errors;
  }
};
