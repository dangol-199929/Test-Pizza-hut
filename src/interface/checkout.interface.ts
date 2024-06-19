export interface ICheckout {
  delivery_address_id: number;
  payment_method_id: number;
  note: string;
}

export interface IOutlets {
  address: string;
  closingTime: string;
  distance: string | null;
  id: number;
  image: string;
  imageAltText: string | null;
  lat: string;
  lng: string;
  name: string;
  openingTime: string;
  phone: number | null;
  provides_delivery: boolean;
  provides_takeaway: boolean;
}
