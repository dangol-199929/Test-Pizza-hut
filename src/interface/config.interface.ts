import { IColor, IOrderColor } from "./color.interface";
import { EKHttpRes } from "./ek-http-res.interface";
import { IPaymentMethod, IWareHouse } from "./home.interface";
import { IPageData, ISchemeData } from "./page.interface";
import { ISocialTag } from "./social-tag.interface";


export interface IMeta {
  api: { version: string };
  copyright: string;
  emails: string;
  socialTags: ISocialTag;
  pagination?: IPagination;
  appCategory?: {title: string}
}

export interface IPagination {
  count: number;
  current_page: number;
  links: Array<any>;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface IData {
  paymentMethods: IPaymentMethod[];
  checkStock: boolean;
  aboutUs: string;
  colors: IColor;
  currency: string;
  favicon: string;
  sideLogo: string;
  id: number | null;
  closingMessage: any | null;
  'contactless-delivery': boolean;
  csr: string;
  menuHeader: string;
  minimumPrice: number;
  multiplePrice: boolean;
  orderColor: Array<IOrderColor>;
  outOfStockMessage: string;
  pageData: IPageData;
  serviceTax: number;
  stockMessage: string;
  tax: number;
  termsAndCondition: string;
  title: string;
  verifyUser: boolean;
  warehouses: IWareHouse[];
}
export interface IClosingMessage{
  title: string,
  images: string[]
}

export interface IConfig {
  data: IData,
  meta: IMeta
}