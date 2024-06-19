import axiosInstance, { setAuthorizationHeader } from "@/axios/axiosInstance";
import { IProfileImage, IProfileSubmit } from "@/interface/profile.interface";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import axios from "axios";
import { config } from "../../config";
import { getWareId } from "@/shared/utils/local-storage-utils";
const apiURL = config.gateway.apiURL;
const apiEndPoint1 = config.gateway.apiEndPoint1;

export const getProfile = async () => {
  try {
    setAuthorizationHeader();
    const response = await axiosInstance.get(`/${apiEndPoint1}/profile`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data: IProfileSubmit) => {
  try {
    const response = await axiosInstance.put(
      `/${apiEndPoint1}/user/update`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadProfileImage = async (avatar: File) => {
  const imageUrl = `${apiURL}/${apiEndPoint1}/profile/image`;

  const headers = {
    ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
    "Api-Key": config.gateway.apiKey,
    "Warehouse-Id": getWareId(),
  };

  try {
    const formData = new FormData();
    formData.append("avatar", avatar);

    const response = await axios.post(imageUrl, formData, {
      headers: headers,
    });
  } catch (error) {
    throw error;
  }
};
