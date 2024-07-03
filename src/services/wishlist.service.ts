import axiosInstance, { setAuthorizationHeader } from "@/axios/axiosInstance";
import { config } from "../../config";

const apiEndPoint1 = config.gateway.apiEndPoint1;

export const getWishlists = async (page: number, perPage: number) => {
  try {
    const response = await axiosInstance.get(
      `/${apiEndPoint1}/favourite/product`,
      {
        params: {
          page,
          perPage,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllWishlistProducts = async (token: any) => {
  setAuthorizationHeader();
  if (token) {
    try {
      const response = await axiosInstance.get(
        `/${apiEndPoint1}/favourite/product/list`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const updateProductInWishlist = async (id: number) => {
  try {
    const produtId = {
      id: id,
    };
    const response = await axiosInstance.post(
      `/${apiEndPoint1}/favourite/product`,
      produtId
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
