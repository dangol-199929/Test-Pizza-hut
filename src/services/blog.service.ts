import axiosInstance from "@/axios/axiosInstance";
import { config } from "../../config";
const apiEndPoint1 = config.gateway.apiEndPoint1;

export const getBlogs = async () => {
  try {
    const response = await axiosInstance.get(`/${apiEndPoint1}/pages`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getBlogDetailsFromSlug = async (slug: string | string[]) => {
  try {
    const response = await axiosInstance.get(`/${apiEndPoint1}/pages/${slug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
