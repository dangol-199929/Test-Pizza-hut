import Loader from "@/components/Loading";
import { IOrderDetails, IOrderProduct } from "@/interface/order.interface";
import React from "react";
import { useConfig as useConfigStores } from "@/store/config";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

export interface IOrderDetailModal {
  orderDetails: IOrderDetails | undefined;
  setShowModal: (arg0: boolean) => void;
  showModal: boolean;
  loading: boolean;
}

const OrderDetailModal = ({
  orderDetails,
  setShowModal,
  showModal,
  loading,
}: IOrderDetailModal) => {
  const { configData } = useConfigStores();
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="md:!max-w-3xl p-5 md:-8 ">
        <div>
          <h3 className="mb-[24px] pb-[24px] border-solid border-b-[1px] border-orange-550 text-center text-[20px]">
            Order Detail
          </h3>
          <div className="modal-body">
            {loading ? (
              <Loader />
            ) : (
              <div className="order-detail-inner order-detail-inner-div">
                <div className="grid grid-cols-12">
                  <div className="col-span-12 md:col-span-6">
                    <div className="list-detail-options has-checkbox">
                      <ul className="flex flex-col">
                        <li className="flex items-center order-number">
                          <strong className="data-title">Order ID :</strong>
                          <span className="data-desc">
                            {orderDetails?.orderNumber}
                          </span>
                        </li>
                        <li className="flex items-center">
                          <strong className="data-title">Order Date:</strong>
                          <span className="data-desc">
                            {orderDetails && orderDetails?.orderDate}
                          </span>
                        </li>
                        <li className="flex items-center">
                          <strong className="data-title">
                            Payment Method:
                          </strong>
                          <span className="data-desc">
                            {orderDetails?.paymentMethod?.title}
                          </span>
                        </li>
                        <li className="flex items-center">
                          <strong className="data-title">
                            Payment Status:
                          </strong>
                          <span className="capitalize data-desc">
                            {orderDetails?.paymentStatus}
                          </span>
                        </li>
                        <li className="flex items-center">
                          <strong className="data-title">Order Status:</strong>
                          <span className="data-desc">
                            {orderDetails?.orderStatus}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <div className="sm:py-0 py-[20px] mb-2">
                      <h3 className="text-left font-medium text-[18px] mb-2">
                        Customer Detail
                      </h3>
                      <ul className="flex flex-col">
                        <li className="flex items-center">
                          <strong className="data-title">Name :</strong>
                          <span className="data-desc">
                            {orderDetails?.pickUp
                              ? orderDetails?.pickUpDelivery?.customerName
                              : orderDetails?.deliveryAddress?.customerName}
                          </span>
                        </li>
                        <li className="flex items-center">
                          <strong className="data-title">Phone Number :</strong>
                          <span className="data-desc">
                            {orderDetails?.pickUp
                              ? orderDetails?.pickUpDelivery?.contactNo
                              : orderDetails?.deliveryAddress?.contactNo}
                          </span>
                        </li>
                        <li className="flex items-start">
                          <strong className="data-title whitespace-nowrap">
                            Address :
                          </strong>
                          <span className="data-desc">
                            {orderDetails?.pickUp
                              ? orderDetails?.pickUpDelivery?.outletTitle
                              : orderDetails?.deliveryAddress?.address}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {orderDetails?.note && (
                    <>
                      <div className="col-span-12 mb-3 md:col-span-6">
                        <p className="text-lg font-bold">Order Note:</p>
                      </div>
                      <div className="col-span-12 mb-3 md:col-span-6">
                        <p className="text-sm">{orderDetails?.note}</p>
                      </div>
                    </>
                  )}

                  <div className="col-span-12">
                    <div className="overflow-x-auto">
                      <table className="table table-zebra">
                        {/* head */}
                        <thead>
                          <tr className="border-b-gray-1250">
                            <th className="table-header whitespace-nowrap w-[355px] min-w-[200px]">
                              Products
                            </th>
                            <th className="table-header whitespace-nowrap">
                              Unit Price
                            </th>
                            <th className="text-right table-header whitespace-nowrap">
                              Total Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderDetails?.orderProducts?.map(
                            (product: IOrderProduct, index: number) => (
                              <tr key={index}>
                                <td className="w-[200px] text-sm leading-4 text-light-black md:w-auto">
                                  {product?.productTitle} X {product?.quantity}
                                </td>
                                <td className="text-sm whitespace-nowrap">
                                  {configData?.data?.currency}{" "}
                                  {product?.unitPrice}
                                </td>
                                <td className="text-sm text-right whitespace-nowrap">
                                  {configData?.data?.currency} {product?.total}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="grid grid-cols-12 pt-[10px]">
                      <div className="col-span-12 md:col-span-6">
                        <h3 className="pb-[6px] font-semibold text-supergray-1100-350">
                          Order Total
                        </h3>
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        <ul className="flex flex-col pr-[15px] ">
                          <li className="flex justify-between pb-[6px] mb-[6px] border-solid border-b-[1px] border-orange-550">
                            <strong className="data-title">
                              Order Amount:
                            </strong>
                            <span className="data-desc-2">
                              {configData?.data?.currency}{" "}
                              {orderDetails?.orderAmount}
                            </span>
                          </li>
                          {orderDetails?.discount !== 0 && (
                            <li className="flex justify-between pb-[6px] mb-[6px] border-solid border-b-[1px] border-orange-550">
                              <strong className="data-title">Discount:</strong>
                              <span className="data-desc-2">
                                {configData?.data?.currency}{" "}
                                {orderDetails?.discount}
                              </span>
                            </li>
                          )}
                          {orderDetails?.couponDiscount !== 0 && (
                            <li className="flex justify-between pb-[6px] mb-[6px] border-solid border-b-[1px] border-orange-550">
                              <strong className="data-title">
                                Coupon Discount:
                              </strong>
                              <span className="data-desc-2">
                                {configData?.data?.currency}{" "}
                                {orderDetails?.couponDiscount}
                              </span>
                            </li>
                          )}
                          <li className="flex justify-between pb-[6px] mb-[6px] border-solid border-b-[1px] border-orange-550">
                            <strong className="data-title">Subtotal:</strong>
                            <span className="data-desc-2">
                              {configData?.data?.currency}{" "}
                              {orderDetails?.subTotal}
                            </span>
                          </li>
                          {orderDetails?.deliveryCharge !== 0 && (
                            <li className="flex justify-between pb-[6px] mb-[6px] border-solid border-b-[1px] border-orange-550">
                              <strong className="data-title">
                                Delivery Charge:
                              </strong>
                              <span className="data-desc-2">
                                {configData?.data?.currency}{" "}
                                {orderDetails?.deliveryCharge}
                              </span>
                            </li>
                          )}
                          <li className="flex justify-between pb-[6px] mb-[6px] border-solid border-b-[1px] border-orange-550">
                            <strong className="!font-bold !text-gray-50 data-title">
                              Total Amount:
                            </strong>
                            <span className="data-desc-2">
                              {configData?.data?.currency} {orderDetails?.total}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;
