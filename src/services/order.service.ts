import axiosInstance from "@/axios/axiosInstance";
import { config } from "../../config";

const apiEndPoint1 = config.gateway.apiEndPoint1;

export const getOrders = async (page: number, perPage: number) => {
  try {
    const response = await axiosInstance.get(`/${apiEndPoint1}/orders`, {
      params: {
        page,
        perPage,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderDetails = async (orderId: number) => {
  try {
    const response = await axiosInstance.get(
      `/${apiEndPoint1}/orders/${orderId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
