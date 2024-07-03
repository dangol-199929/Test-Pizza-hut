import { toast } from "react-toastify";

export enum TOAST_TYPES {
  info,
  success,
  error,
  warning,
}

export const showToast = (type: TOAST_TYPES, message: string) => {
  //   const placement = 'topRight'; //topLeft bottomRight bottomLeft
  const toastConfig = {
    autoClose: 1500, // Duration the toast will stay visible
  };
  switch (type) {
    case TOAST_TYPES.info:
      toast.info((message = message), toastConfig);
      break;
    case TOAST_TYPES.error:
      toast.error((message = message), toastConfig);
      break;
    case TOAST_TYPES.warning:
      toast.warning((message = message), toastConfig);
      break;
    default:
      toast.success((message = message), toastConfig);
  }
};
