import axiosInstance from "@/axios/axiosInstance";
import { config } from "../../config";

const apiEndPoint1 = config.gateway.apiEndPoint1;

export const getSearchResults = async (
  type?: string,
  keyword?: string,
  page?: number,
  sortBy?: string,
  priceOrder?: string
) => {
  try {
    let apiUrl = "";

    if (type === "category") {
      apiUrl = `${apiEndPoint1}/categories`;
    } else if (type === "product") {
      apiUrl = `${apiEndPoint1}/products`;
    } else {
      throw new Error("Invalid search type");
    }

    const response = await axiosInstance.get(apiUrl, {
      params: {
        keyword,
        page,
        sortBy,
        priceOrder,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

//suggestion
export const getSuggestionResults = async (type?: string, keyword?: string) => {
  try {
    const response = await axiosInstance.get(`/${apiEndPoint1}/suggest`, {
      params: {
        type,
        keyword,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
