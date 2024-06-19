export interface IOrders {
  coupon: any;
  couponDiscount: number;
  createdAt: string;
  deliveryCharge: number;
  discount: number;
  id: number;
  orderAmount: number;
  orderDate: string;
  orderNumber: string;
  orderProductsCount: number;
  orderStatus: string;
  paymentStatus: string;
  pickUp: boolean;
  pickUpDelivery: IOrderPickup;
  requestedDate: string;
  scheme: number;
  serviceCharge: number;
  subTotal: number;
  taxableAmount: number;
  total: number;
  totalTax: number;
  updatedAt: string;
}
export interface IOrderPickup {
  contactNo: string;
  customerName: string;
  outletAddress: string;
  outletTitle: string;
  pickUpScheduleTime: string;
}

export interface IOrderDetails {
  coupon: any;
  couponDiscount: number;
  createdAt: string;
  delivery: boolean;
  deliveryAddress: any;
  deliveryCharge: number;
  discount: number;
  id: number;
  nonTaxableAmount: number;
  note: string;
  orderAmount: number;
  orderDate: string;
  orderNumber: string;
  orderProducts: Array<IOrderProduct>;
  orderStatus: string;
  paymentMethod: any;
  paymentStatus: string;
  pickUp: boolean;
  pickUpDelivery: IOrderPickup;
  requestedDate: string;
  scheme: number;
  serviceCharge: number;
  serviceChargePercent: number;
  statusLog: any;
  subTotal: number;
  taxableAmount: number;
  total: number;
  totalTax: number;
  updatedAt: string;
}

export interface IOrderProduct {
  createdAt: string;
  id: number;
  offer: boolean;
  orderId: number;
  productTitle: string;
  quantity: number;
  restaurantId: number | null;
  restaurantName: string | null;
  size: string;
  sku: string;
  title: string;
  total: number;
  unitPrice: number;
  updatedAt: string;
}
