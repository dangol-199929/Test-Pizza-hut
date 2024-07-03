import axiosInstance, { setWarehouseIdAxios } from "@/axios/axiosInstance";
import { config } from "../../config";
import { addWareHouseToStorage } from "@/shared/utils/local-storage-utils";

const apiEndPoint1 = config.gateway.apiEndPoint1;
const apiEndPoint2 = config.gateway.apiEndPoint2;

// export const getCategoriesList = async () => {
//   try {
//     await setWarehouseIdAxios();
//     const response = await axiosInstance.get(
//       `/${apiEndPoint1}/categories?onlyTopLevel=true&withoutFilter=true`
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const getCategoriesV2 = async () => {
  try {
    await setWarehouseIdAxios();
    const response = await axiosInstance.get(
      `/${apiEndPoint2}/categories?parentId=`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHomeData = async () => {
  try {
    await setWarehouseIdAxios();
    const response = await axiosInstance.get(`/${apiEndPoint1}/web-home`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const getConfig = async () => {
//   try {
//     await setWarehouseIdAxios();
//     const response = await axiosInstance.get(`/${apiEndPoint1}/configs`);
//     addWareHouseToStorage(response?.data?.data?.warehouses);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const getConfig = async () => {
  try {
    const oneDayInMilliseconds = 12 * 60 * 60 * 1000;
    const storedConfigData = localStorage.getItem("configData");
    const storedTimestamp = localStorage.getItem("configDataTimestamp");

    if (storedConfigData && storedTimestamp) {
      const currentTime = new Date().getTime();
      const storedTime = parseInt(storedTimestamp, 10);

      if (currentTime - storedTime < oneDayInMilliseconds) {
        return JSON.parse(storedConfigData);
      } else {
        localStorage.removeItem("configData");
        localStorage.removeItem("configDataTimestamp");
      }
    }

    await setWarehouseIdAxios();
    const response = await axiosInstance.get(`/${apiEndPoint1}/web-config`);
    const configData = response.data;

    // Store the config data and timestamp in localStorage
    localStorage.setItem("configData", JSON.stringify(configData));
    localStorage.setItem(
      "configDataTimestamp",
      new Date().getTime().toString()
    );

    addWareHouseToStorage(response?.data?.data?.warehouses);
    return configData;
  } catch (error) {
    throw error;
  }
};

export const getBannerPopup = async () => {
  try {
    await setWarehouseIdAxios();
    const response = await axiosInstance.get(
      `${apiEndPoint1}/banner?type=popup`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNavCategories = async () => {
  try {
    await setWarehouseIdAxios();
    const response = await axiosInstance.get(
      `/${apiEndPoint1}/navHeader/categories`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
