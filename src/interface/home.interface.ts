import { IMeta } from "./config.interface";
import { IProduct } from "./product.interface";

export interface IHome {
  data: IHomeData;
}
export interface IHomeData {
  adBanners: IAdBanner[];
  appCategories: IAppCategories[];
  banners: IBanner[];
  brands: IBrands[];
  id: number;
  testimonials: ITestimonials[];
  page: {
    " min-price": number;
  };
}
// Default value for appCategories as an empty array

export interface IAdBanner {
  bannerImage: string;
  id: number;
  linkTo: string;
  position: number;
  shortDescription: string;
  title: string;
  type: string;
  websiteUrl: string;
}

export interface IBanner {
  bannerImage: string;
  webpBannerImage: string;
  id: number;
  linkTo: string;
  position: number;
  shortDescription: string;
  title: string;
  linkType: string;
  slug: string;
  products: IBannerProduct[];
}

export interface UnitPrice {
  alwaysAvailable: boolean;
  barcode: string | null;
  hasOffer: boolean;
  id: number;
  markedPrice: number;
  newPrice: number;
  oldPrice: number;
  sellingPrice: number;
  size: string;
  sku: string;
  stock: number;
  title: string;
  isVeg: boolean;
}

interface IBannerProduct {
  categorySlug: string;
  categoryTitle: string;
  hasOffer: boolean;
  id: number;
  slug: string;
  title: string;
  unitPrice: UnitPrice[];
}

interface IBrands {
  content: string;
  icon: string | null;
  id: number;
  slug: string;
  title: string;
}

export interface IAppCategories {
  collection_type: string;
  description: string | null;
  icon: string | null;
  id: number;
  position: number;
  product: IProduct[]; // Replace 'any' with the appropriate type for the 'products' property
  title: string;
  type: string;
}

export interface IWarehouseBounds {
  east: number;
  north: number;
  south: number;
  west: number;
}

export interface IWareHouse {
  bounds: IWarehouseBounds;
  name: string;
  address: string;
  childrenWarehouses: Array<any>;
  contact: string;
  contactNo: string;
  id: number;
  lat: string;
  lng: string;
  min: number;
  max: number;
  minZoom: number | string;
  openingTime: string;
  closingTime: string;
  latitude: string;
  longitude: string;
}

export interface IPaymentMethod {
  isDefault: boolean;
  icon: string;
  webpIcon: string;
  id: number;
  live: boolean;
  merchantCode: string;
  merchantId: string;
  merchantSecret: string;
  title: string;
  url: string;
  cashback?: string;
}

export interface PaymentFormProps {
  paymentMethods: IPaymentMethod[];
}

export interface IAdBanner {
  id: number;
  title: string;
  description: string;
  status: boolean;
  warehouseId: string;
  type: string;
  linkType: string;
  linkValue: string;
  slug: string;
  webImage: string;
  appImage: string;
  webpWebImage: string;
  webpAppImage: string;
  webAltText: string | null;
  appAltText: string | null;
  position: number;
}

export interface IPopupBanner {
  id: number;
  title: string;
  description: string;
  status: boolean;
  position: number | null;
  type: string;
  warehouseId: number;
  linkTo: string;
  linkValue: string | null;
  webImage: string;
  appImage: string;
  webpWebImage: string;
  webpAppImage: string;
  webImageAltText: string | null;
  appImageAltText: string | null;
  startingDate: string;
  expiryDate: string;
}

export interface ITestimonials {
  content: string;
  createdAt: string;
  designation: string | null;
  icon: string;
  iconAltText: string | null;
  id: number;
  name: string;
  rating: number;
  reviewedFrom: string | null;
  webpIcon: string;
}

export interface INavCategoryMain {
  data: INavCategories[];
  meta: IMeta;
}
export interface INavCategories {
  id: number;
  isRestaurant: boolean;
  name: string;
  icon: string;
  backgroundImage: string;
  webpIcon: string;
  webpBackgroundImage: string;
  iconAltText: string | null;
  backgroundImageAltText: string | null;
  description: string | null;
  parentId: number | null;
  slug: string;
  level: number;
  position: number;
  subCategories: INavSubCategories[];
}
export interface INavSubCategories {
  id: number;
  isRestaurant: boolean;
  level: number | null;
  name: string;
  parentId: number;
  position: number;
  slug: string;
}

export interface IProfileShow {
  avatar: string;
  createdAt: string;
  current_loyalty_points: number;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  mobileNumber: string;
  next_level: string;
  required_points_next: number;
  total_loyalty_points: number;
  updatedAt: string;
  user_level: string;
  username: string;
  verified: boolean;
}
