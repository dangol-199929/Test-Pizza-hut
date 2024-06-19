import axiosInstance, { setCouponHeader } from "@/axios/axiosInstance";
import { config } from "../../config";
import {
  IChangePassword,
  IForgotPassword,
  IResetPassword,
} from "@/interface/password.interface";
import axios from "axios";
import { getCartNumber } from "@/shared/utils/cookies-utils/cookies.utils";
import { getWareId } from "@/shared/utils/local-storage-utils";
const apiURL = config.gateway.apiURL;
const apiEndpoint1 = config.gateway.apiEndPoint1;

export const signUp = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      `/${apiEndpoint1}/register`,
      data
    );

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const login = async (data: any) => {
  const grantType = "password";
  const type = "frontend";
  try {
    const response = await axiosInstance.post(`/${apiEndpoint1}/login`, {
      ...data,
      grantType,
      type,
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.get(`/${apiEndpoint1}/logout`);
    if (response.status === 204) {
      setCouponHeader({
        coupon: "",
      });
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (account: IForgotPassword) => {
  try {
    const response = await axiosInstance.post(
      `/${apiEndpoint1}/forget-password`,
      account
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (resetPasswordBody: IResetPassword) => {
  try {
    const response = await axiosInstance.post(
      `/${apiEndpoint1}/reset-password`,
      resetPasswordBody
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (changePasswordBody: IChangePassword) => {
  try {
    const response = await axiosInstance.post(
      `/${apiEndpoint1}/change-password`,
      changePasswordBody
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = async () => {
  try {
    const response = await axiosInstance.post(`/${apiEndpoint1}/user/delete`, {
      reason: "",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerGuestUser = async (data: any, isInitialSubmit: any) => {
  const registerGuestUserUrl = `${apiURL}/${apiEndpoint1}/guest/register`;
  let payload;
  if (isInitialSubmit) {
    payload = {
      checkPassword: false,
      password_confirmation: data.password_confirmation,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      mobile_number: data.mobile_number,
      password: data.password,
    };
  } else {
    payload = {
      checkPassword: false,
      password_confirmation: data.password_confirmation,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      mobile_number: data.mobile_number,
      password: data.password,
    };
  }

  try {
    const response = await axios.post(`${registerGuestUserUrl}`, payload, {
      headers: {
        "Cart-Number": getCartNumber(),
        "Api-Key": config.gateway.apiKey,
        "Warehouse-Id": getWareId(),
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async () => {
  // Implementation of fetching profile data
};
