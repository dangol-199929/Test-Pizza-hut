import { IWareHouse, UnitPrice } from "./home.interface";

export interface ICartProduct {
  id: number;
  price: number;
  product: IProduct;
  quantity: number;
  selectedUnit: ISelectedUnit;
}

export interface ISelectedUnit {
  alwaysAvailable: boolean;
  barcode: string;
  hasOffer: boolean;
  id: string;
  markedPrice: number;
  newPrice: number;
  oldPrice: number;
  sellingPrice: number;
  size: string;
  sku: string;
  stock: number;
  title: string;
}

export interface IProduct {
  brand: string | null;
  categoryBackgroundImage: string;
  categoryIcon: string;
  categoryId: number;
  categorySlug: string;
  restaurantName: string;
  decimal: boolean;
  description: string;
  hasOffer: boolean;
  id: number;
  images: IProductImage[];
  webpImages: IProductImage[];
  link: string;
  moreInfo: string;
  slug: string;
  tags: IProductTag[];
  taxable: boolean;
  taxableAmount: number;
  name: string;
  variants: UnitPrice[];
  warehouses: IWareHouse[];
  isFav?: boolean;
  favId?: number;
  type?: string;
}

interface IProductImage {
  id: number;
  imageName: string;
  unit_price_id: number | null;
}

interface IProductTag {
  content: string;
  featured: boolean;
  id: number;
  imageLink: string | null;
  slug: string;
  title: string;
}

interface IProductTag {
  content: string;
  featured: boolean;
  id: number;
  imageLink: string | null;
  slug: string;
  title: string;
}
