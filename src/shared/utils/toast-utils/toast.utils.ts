import { toast } from "react-toastify";

export enum TOAST_TYPES {
  info,
  success,
  error,
  warning,
}

export const showToast = (type: TOAST_TYPES, message: string) => {
  //   const placement = 'topRight'; //topLeft bottomRight bottomLeft
  switch (type) {
    case TOAST_TYPES.info:
      toast.info((message = message));
      break;
    case TOAST_TYPES.error:
      toast.error((message = message));
      break;
    case TOAST_TYPES.warning:
      toast.warning((message = message));
      break;
    default:
      toast.success((message = message));
  }
};
