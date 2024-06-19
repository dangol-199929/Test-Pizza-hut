import axiosInstance from "@/axios/axiosInstance";
import { config } from "../../config";

const apiEndPoint1 = config.gateway.apiEndPoint1;
export const getPageData = async (slug: any) => {
  try {
    const response = await axiosInstance.get(`/${apiEndPoint1}/pages/${slug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const getFaqData = async () => {
  try {
    const response = await axiosInstance.get(`/${apiEndPoint1}/faq`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
