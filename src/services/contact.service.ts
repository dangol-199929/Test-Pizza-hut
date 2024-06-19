import axiosInstance from "@/axios/axiosInstance";
import { IContactUs } from "@/interface/contact-us.interface";
import { config } from "../../config";

const apiEndPoint1 = config.gateway.apiEndPoint1;

export const sendFeedback = async (payload: IContactUs) => {
  try {
    const response = await axiosInstance.post(
      `/${apiEndPoint1}/contact-us`,
      payload
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const feedBackOption = async () => {
  try {
    const response = await axiosInstance.get(
      `/${apiEndPoint1}/feedbackSection`
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};
