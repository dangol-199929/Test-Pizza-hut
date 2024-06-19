import axiosInstance from "@/axios/axiosInstance";
import { config } from "../../config";

const apiEndPoint1 = config.gateway.apiEndPoint1;

export const getTagList = async () => {
  try {
    const response = await axiosInstance.get(`/${apiEndPoint1}/tags`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductByTagId = async (
  keyword: any,
  page: any,
  tagId: any,
  maxPrice: any,
  minPrice: any,
  sortBy: any,
  priceOrder: any
) => {
  try {
    const response = await axiosInstance.get(`/${apiEndPoint1}/products`, {
      params: {
        keyword,
        page,
        tagId,
        maxPrice,
        minPrice,
        sortBy,
        priceOrder,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
