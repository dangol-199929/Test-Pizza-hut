import axiosInstance from "@/axios/axiosInstance";
import { config } from "../../config";

const apiEndPoint1 = config.gateway.apiEndPoint1;

export const getProductsFromSlug = async (productSlug: any) => {
  try {
    const response = await axiosInstance.get(
      `/${apiEndPoint1}/products/${productSlug}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRelatedProductsFromId = async (productId: any) => {
  try {
    const response = await axiosInstance.get(
      `/${apiEndPoint1}/products/${productId}/related`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductByCategory = async (
  query: any,
  page: any,
  categoryId: any,
  minPrice: any,
  maxPrice: any,
  sortBy: string,
  priceOrder: string
) => {
  try {
    let url = `/${apiEndPoint1}/products?keyword=${query}&page=${page}&categoryId=${categoryId}&sortBy=${sortBy}&priceOrder=${priceOrder}&allProduct=1&perPage=15`;

    if (minPrice !== "" && maxPrice !== "") {
      url += `&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    }

    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductByPizza = async () => {
  try {
    let url = `/${apiEndPoint1}/category-product?priceOrder=low`;

    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};
