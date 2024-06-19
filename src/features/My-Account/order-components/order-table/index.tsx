import Loader from "@/components/Loading";
import { IOrderDetails, IOrders } from "@/interface/order.interface";
import { getOrderDetails, getOrders } from "@/services/order.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import React, { useState } from "react";
import OrderDetailModal from "../order-detail-modal";
import Pagination from "@/shared/components/pagination";
import { useConfig as useConfigStores } from "@/store/config";

const OrderTable = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [orderDetails, setOrderDetails] = useState<IOrderDetails>();
  const [pageNumber, setPageNumber] = useState(1);
  const perPage = 10;
  const { configData } = useConfigStores();

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery(
    ["getOrder", pageNumber, perPage],
    async () =>
      await getOrders(pageNumber, perPage).then((response) => {
        return response;
      })
  );
  const orderPerPage = orders?.meta?.pagination?.per_page;
  const orderCurrentPage = orders?.meta?.pagination?.current_page;
  const orderTotalContent = orders?.meta?.pagination?.total;

  const mutation = useMutation({
    mutationFn: getOrderDetails,
    onSuccess: (data) => {
      setOrderDetails(data?.data);
    },
  });
  // const changeDateFormat = (dateString: string) => {
  //     const date = parseISO(dateString);
  //     return <span>{format(date, 'yyyy MMMM d hh:MM a')}</span>
  // }

  const handleOrderDetail = (showOrder: boolean, orderId: number) => {
    setShowModal(showOrder);
    mutation.mutate(orderId);
  };

  /**
   * to set page num after pagination trigger
   */
  const handlePageChange = (value: number) => {
    setPageNumber(value);
  };

  /**
   * order status change color according to status from api
   */
  const handleOrderStatus = (status: string) => {
    const foundItem = configData?.data?.orderColor?.find(
      (item: any) => item?.status === status
    );
    const bgClass = foundItem?.color || ""; // Return the color value or an empty string if not found
    return bgClass;
  };

  return (
    <div className="p-4 bg-white rounded-xl">
      <div className="overflow-x-auto min-h-[60%]">
        <table className="table ">
          {/* head */}
          <thead>
            <tr className="border-b-gray-1250">
              <th className="table-header">Orders</th>
              <th className="text-center table-header">Date</th>
              <th className="text-center table-header">Status</th>
              <th className="text-center table-header">Total</th>
              <th className="text-center table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={5}>
                  <Loader />
                </td>
              </tr>
            )}
            {orders && orders?.data?.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  {/* <EmptyOrder /> */}
                  No order history available.
                </td>
              </tr>
            ) : (
              orders?.data.map((order: IOrders) => (
                <tr key={`app-order-$${order?.id}`}>
                  <td className="px-5 py-5 text-sm text-light-black">
                    #{order?.orderNumber}
                  </td>
                  <td className="px-5 py-5 text-sm text-center capitalize whitespace-nowrap">
                    {order?.orderDate}
                  </td>
                  <td className="text-center ">
                    <span
                      style={{
                        background: `${handleOrderStatus(order?.orderStatus)}`,
                      }}
                      className={`py-1.5 whitespace-nowrap px-2.5 text-xs leading-4 text-white rounded-[12px]`}
                    >
                      {order?.orderStatus}
                    </span>
                  </td>
                  <td className="px-5 py-5 text-sm text-center whitespace-nowrap">
                    {configData?.data?.currency} {order?.total}
                  </td>
                  <td className="px-5 py-5 text-sm text-center">
                    <button
                      className="bg-primary text-center px-[30px] transition-all py-[5px] text-white rounded-[4px] hover:bg-slate-850"
                      onClick={() => handleOrderDetail(!showModal, order?.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <OrderDetailModal
          orderDetails={orderDetails}
          setShowModal={setShowModal}
          showModal={showModal}
          loading={mutation.isLoading}
        />
      </div>

      {orders && orderTotalContent > 10 && (
        <>
          <div className="pl-5 mt-4">
            <p className="text-sm text-gray-1450">
              Showing {orderPerPage * (orderCurrentPage - 1) + 1} to {""}
              {orderCurrentPage * orderPerPage < orderTotalContent
                ? orderCurrentPage * orderPerPage
                : orderTotalContent}{" "}
              of {orderTotalContent} entries
            </p>
          </div>
          <Pagination
            totalPages={orders?.meta?.pagination?.total_pages}
            currentPage={orderCurrentPage}
            pageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default OrderTable;
