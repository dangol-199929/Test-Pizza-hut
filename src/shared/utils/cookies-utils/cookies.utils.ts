import { deleteCookie, getCookie, setCookie } from "cookies-next";

import { CookieKeys } from "@/shared/enum";
import { ILogin, IWareHouseProps } from "@/interface/login.interface";
import { setAuthorizationHeader } from "@/axios/axiosInstance";

export const addAuthToStorage = (user: ILogin) => {
  setCookie(CookieKeys.TOKEN, user);
};

export const getToken = () => {
  return getCookie(CookieKeys.TOKEN);
};

export const clearAuthFromStorage = () => {
  deleteCookie(CookieKeys.USER);
};

// export const addWareHouseToStorage = (data: IWareHouseProps[]) => {
//   const id = data[0]?.id;
//   setCookie(CookieKeys.WAREHOUSE, id);
// };

// export const getWareId = (): any => {
//   let id = getCookie(CookieKeys.WAREHOUSE);
//   return id || "";
// };

export const getCartNumber = (): any => {
  let number = getCookie(CookieKeys.CARTNUMBER);
  return number || "";
};
export const getCartId = (): any => {
  let number = getCookie(CookieKeys.CARTID);
  return number || "";
};

export const generatePassword = (passwordLength: any) => {
  let numberChars = "0123456789";
  let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let lowerChars = "abcdefghijklmnopqrstuvwxyz";
  let allChars = numberChars + upperChars + lowerChars;
  let randPasswordArray = Array(passwordLength);
  randPasswordArray[0] = numberChars;
  randPasswordArray[1] = upperChars;
  randPasswordArray[2] = lowerChars;
  randPasswordArray = randPasswordArray.fill(allChars, 3);
  return shuffleArray(
    randPasswordArray.map(function (x) {
      return x[Math.floor(Math.random() * x.length)];
    })
  ).join("");
};

export const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export const validateNumber = (event: any) => {
  return event.charCode >= 48 && event.charCode <= 57;
};
