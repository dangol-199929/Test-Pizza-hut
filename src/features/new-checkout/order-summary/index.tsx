import { FC, useState } from "react";
import { useConfig as useConfigStores } from "@/store/config";
import { useDeliveryAddressHooks } from "@/hooks/useDeliveryAddress.hooks";
import { useGetCartProductHooks } from "@/hooks/getCartProduct.hooks";
import { Button } from "@/shared/components/ui/button";
import { useCart as useCartStore } from "@/store/cart";
import { getCartData } from "@/services/cart.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ICartItem } from "@/interface/cart.interface";

interface IProps {
  isHomeDelivery: any;
  selectedPayment: any;
  handlePlaceOrder: () => void;
}

const OrderSummary: FC<IProps> = ({
  isHomeDelivery,
  selectedPayment,
  handlePlaceOrder,
}) => {
  const { deliveryAddressData, isDeliveryAddressLoading } =
    useDeliveryAddressHooks();
  const { coupon } = useCartStore();
  const { configData } = useConfigStores();
  const { cartProducts, cartProductsLoading } = useGetCartProductHooks();
  const { data: cart } = useQuery<ICartItem>(["getCart"], () =>
    getCartData({ coupon })
  );

  return (
    <div className="py-6 bg-white  text-sm">
      <h2 className="font-bold text-[20px] text-slate-850 px-4">
        Order Summary
      </h2>
      <div className="my-6 py-[18px] border-t-[1px] border-b-[1px] border-light-gray border-solid px-4 text-sm">
        <ul>
          {cartProducts?.cartProducts.map((productData, index) => (
            <li className="flex justify-between" key={index}>
              <span className="text-sm">
                {productData?.product?.name} X {productData?.quantity}
              </span>
              <span className="min-w-[90px] text-end text-sm">
                {configData?.data?.currency}{" "}
                {productData?.product?.hasOffer
                  ? productData.selectedUnit.newPrice * productData.quantity
                  : productData.selectedUnit.sellingPrice *
                    productData.quantity}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <ul className="flex justify-between px-4 mb-4">
        <li className="text-sm">Item Total</li>
        <li>
          {configData?.data?.currency}{" "}
          {cart?.orderAmount || cartProducts?.orderAmount}
        </li>
      </ul>
      <ul className="flex justify-between px-4 mb-4">
        <li className="font-light text-sm text-slate-850">Delivery Charge</li>
        <li className="text-[14px]">
          {configData?.data?.currency}{" "}
          {cart?.deliveryCharge || cartProducts?.deliveryCharge || 0}
        </li>
      </ul>
      <ul className="flex justify-between px-4 mb-4">
        <li className="text-sm">Service Charge</li>
        <li className="text-[14px]">
          {configData?.data?.currency}{" "}
          {cart?.serviceCharge || cartProducts?.serviceCharge || 0}
        </li>
      </ul>
      <ul className="flex justify-between px-4 mb-4">
        <li>Promo Code Discount</li>
        <li className="text-[14px]">
          - {configData?.data?.currency} {cart?.discountAmount}
        </li>
      </ul>
      <ul className="flex justify-between p-4 border-t-[1px] border-b-[1px] border-light-gray border-solid">
        <li className="font-medium">Total</li>
        <li className="font-medium">
          {configData?.data?.currency} {cartProducts?.total}
        </li>
      </ul>
      {isHomeDelivery && deliveryAddressData && (
        <ul className="flex justify-between px-4 my-4">
          <li className="font-base">Delivery Address</li>
          <li className="font-medium">
            {
              deliveryAddressData.find((address: any) => address.isDefault)
                ?.shortAddress
            }
          </li>
        </ul>
      )}
      {selectedPayment && (
        <ul className="flex justify-between px-4 mb-4">
          <li className="font-base">Payment Method</li>
          <li className="font-medium text-sm ">{selectedPayment.title}</li>
        </ul>
      )}
      <div className="flex justify-center mt-4 px-4">
        <Button onClick={handlePlaceOrder} variant={"default"} className="grow">
          PROCEED TO CHECKOUT
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
