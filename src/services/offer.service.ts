import axiosInstance from "@/axios/axiosInstance";
import { config } from "../../config";

const apiEndPoint1 = config.gateway.apiEndPoint1;

export const getOffers = async (
  query: any,
  page: any,
  offer: any,
  sortBy?: string,
  priceOrder?: string
) => {
  try {
    const response = await axiosInstance.get(`/${apiEndPoint1}/products`, {
      params: {
        query,
        page,
        offer,
        sortBy,
        priceOrder,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
