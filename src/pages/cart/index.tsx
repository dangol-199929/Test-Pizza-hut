import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import CartTableRow from "@/features/Cart/cart-table-row";
import { useCartsHooks } from "@/hooks/cart.hooks";
import { useGetCartsHooks } from "@/hooks/getCart.hooks";
import { ICouponCartData, ICouponCartError } from "@/interface/cart.interface";
import { addCouponCode } from "@/services/cart.service";
import Breadcrumb from "@/shared/components/breadcrumb";
import Title from "@/shared/components/title";
import MainLayout from "@/shared/main-layout";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { useCart as useCartStore } from "@/store/cart";
import { useConfig as useConfigStores } from "@/store/config";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { config } from "../../../config";
import EmptyCart from "../../shared/components/empty-content/empty-cart";
import { NextPageWithLayout } from "../_app";
import { getRelatedProductsFromId } from "@/services/product.service";
import RelatedProducts from "@/features/Product/related-products";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import { useGetCartProductHooks } from "@/hooks/getCartProduct.hooks";

enum COUPON_METHODS {
  ADD_COUPON = "Apply",
  DELETE_COUPON = "Remove",
}

const Cart: NextPageWithLayout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [tempCoupon, setTempCoupon] = useState("");
  const [couponToast, setCouponToast] = useState(false);
  const { configData } = useConfigStores();
  const { coupon, setCoupon, setCouponData, couponData } = useCartStore();
  const token = getToken();

  const [couponText, setCouponText] = useState<COUPON_METHODS>(
    COUPON_METHODS.ADD_COUPON
  );

  const { cart, cartLoading } = useGetCartsHooks();

  const { cartProducts, cartProductsLoading } = useGetCartProductHooks();
  const { bulkCartDelete, bulkDeleteLoading } = useCartsHooks();

  const {
    data: couponCartData,
    isError,
    isSuccess,
    error: couponCartError,
  } = useQuery<ICouponCartData, ICouponCartError[]>(
    ["addCoupon", coupon],
    async () => addCouponCode(coupon),
    {
      onSuccess: (data) => {
        setCouponData(data);
        setCouponToast(true);
        !couponToast &&
          showToast(TOAST_TYPES.success, "Coupon Added Successfully");
      },
      onError: (error) => {
        setCouponData({});
        if (localStorage.getItem("coupon")) {
          localStorage.removeItem("coupon");
        }
        setCouponText(COUPON_METHODS.ADD_COUPON);
        setCoupon("");
        setTempCoupon("");
        showToast(TOAST_TYPES.error, error[0]?.detail || "");
        queryClient.invalidateQueries(["getCart"]);
      },
      enabled: !!coupon,
      retry: false,
    }
  );

  const clearCart = () => {
    bulkCartDelete.mutate();
  };

  //checking if there is any item which is out of stock
  const hasOutOfStock = cartProducts?.cartProducts.find(
    (item) => item?.selectedUnit?.stock === 0
  )
    ? true
    : false;

  const handleApplyCoupon = () => {
    setCoupon(tempCoupon);
    localStorage.setItem("coupon", tempCoupon);
    setCouponText(COUPON_METHODS.DELETE_COUPON);

    queryClient.invalidateQueries(["addCoupon"]);
  };

  const handleRemoveCoupon = () => {
    if (localStorage.getItem("coupon")) {
      localStorage.removeItem("coupon");
    }
    setCouponToast(false);
    setCouponText(COUPON_METHODS.ADD_COUPON);
    setCoupon("");
    setTempCoupon("");
    setCouponData({});
    queryClient.invalidateQueries(["getCart"]);
    showToast(TOAST_TYPES.success, "Coupon Removed Successfully");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (couponText === COUPON_METHODS.ADD_COUPON) {
      handleApplyCoupon();
    } else {
      handleRemoveCoupon();
    }
  };

  useEffect(() => {
    if (window && localStorage && localStorage.getItem("coupon")) {
      setTempCoupon(localStorage.getItem("coupon") as any);
      setCoupon(localStorage.getItem("coupon") as any);
      setCouponText(COUPON_METHODS.DELETE_COUPON);
    }
  }, []);
  // }, [localStorage, window]);

  useEffect(() => {
    if (cart?.message != null) {
      showToast(TOAST_TYPES.success, cart?.message);
    }
  }, [cart]);

  /**
   * To show success message when coupon api is success.
   */
  // useEffect(() => {
  //   if (isSuccess) {
  //     showToast(TOAST_TYPES.success, 'Coupon Added Successfully')
  //   }
  // }, [coupon])

  /**
   * when coupon api throws error
   */
  const { data: favList }: any = useQuery<any>(["wishlistProducts", token], {
    enabled: !!token,
  });

  const { data: relatedProducts, isLoading: relatedProductsLoading } = useQuery(
    ["getRelatedProductsFromId", cartProducts],
    async () => {
      if (cartProducts) {
        const response = await getRelatedProductsFromId(
          cartProducts?.cartProducts[0]?.product?.id
        );
        return response;
      }
    }
  );
  useEffect(() => {
    if (isError && couponCartError) {
      setCouponData({});
    }
  }, [isError, couponCartError]);
  return (
    <>
      <Head>
        <title>Pizza Hut | Cart</title>
      </Head>
      {cartProducts?.cartProducts?.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <Breadcrumb />
          <div className="container my-[60px]">
            <div className="grid grid-cols-10 gap-3 md:gap-6">
              <div className="col-span-10 md:col-span-7">
                <div className="bg-white rounded-xl grow">
                  <Title
                    type=""
                    className="text-2xl text-slate-850 font-semibold mb-[30px m-6 "
                    text="In Your Box"
                  />
                  <div className="overflow-x-auto cart-table border-t-[1px] border-[#F2F3F8] pt-2">
                    <table className="  border-gray-350 ">
                      <thead className="">
                        <tr className="!bg-white !font-light ">
                          <th className="!font-normal !text-xs !text-[#767676] !py-4 !px-6">
                            PRODUCT DETAIL
                          </th>
                          <th className="!font-normal !text-xs !text-[#767676] !py-4 !px-6"></th>
                          <th className="!font-normal !text-xs !text-[#767676] !py-4 !px-6">
                            SIZE
                          </th>
                          <th className="!font-normal !text-xs !text-[#767676] !py-4 !px-6">
                            QUANTITY
                          </th>
                          <th className="!font-normal !text-xs !text-[#767676] !py-4 !px-6">
                            TOTAL
                          </th>
                          <th className="!font-normal !text-xs !text-[#767676] !py-4 !px-6"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartProducts?.cartProducts?.map(
                          (item: any, index: number) => (
                            <CartTableRow item={item} key={index} />
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 col-span-10 md:col-span-3 h-[430px]">
                <h4 className="text-lg font-bold text-slate-850">
                  Order Summary
                </h4>
                <div className="mt-[20px]">
                  <div className="flex items-center justify-between w-full mb-2">
                    <p className="text-sm">Item Total</p>
                    <p className="text-base font-medium">
                      {configData?.data?.currency}{" "}
                      {couponData?.orderAmount
                        ? couponData?.orderAmount
                        : cart?.orderAmount}
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full mb-2">
                    <p className="text-sm">Delivery Charge</p>
                    <p className="text-base font-medium">
                      {configData?.data?.currency}{" "}
                      {couponData?.deliveryCharge
                        ? couponData?.deliveryCharge
                        : cart?.deliveryCharge}
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full mb-2">
                    <p className="text-sm">Service Charge</p>
                    <p className="text-base font-medium">
                      {configData?.data?.currency}{" "}
                      {couponData?.serviceCharge
                        ? couponData?.serviceCharge
                        : cart?.serviceCharge}
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full mb-2">
                    <p className="text-sm">Discount</p>
                    <p className="text-base font-medium">
                      {couponData?.discount > 0 ||
                      (cart?.discountAmount ?? 0) > 0
                        ? "-"
                        : ""}
                      {configData?.data?.currency}{" "}
                      {couponData?.discount
                        ? couponData?.discount
                        : cart?.discountAmount}
                    </p>
                  </div>
                  <div className="mt-[20px]">
                    <form
                      onSubmit={handleSubmit}
                      className="flex items-center bg-white border border-gray-350 h-[45px] pl-2.5 w-full focus:outline-0 disabled:opacity-70 disabled:bg-gray-300 disabled:cursor-not-allowed p-2 rounded-lg"
                    >
                      <input
                        type="text"
                        value={tempCoupon}
                        disabled={
                          couponText === COUPON_METHODS.DELETE_COUPON
                            ? true
                            : false
                        }
                        onChange={(e) => setTempCoupon(e.target.value)}
                        className="border-0 outline-none grow"
                        placeholder="Promo Code"
                      />
                      <button
                        type="submit"
                        disabled={tempCoupon === "" || tempCoupon === null}
                        className="text-[#FF8910] text-base font-medium cursor-pointer whitespace-nowrap"
                      >
                        {couponText}
                      </button>
                    </form>
                  </div>
                  {couponData?.couponDiscount && (
                    <div className="flex items-center justify-between w-full mt-[20px] mb-2">
                      <p className="text-sm">Promo Code Discount</p>
                      <p className="text-base font-medium slate-850">
                        - {configData?.data?.currency}{" "}
                        {couponData?.couponDiscount}
                      </p>
                    </div>
                  )}
                  <div className="flex items-center justify-between w-full mt-[20px] mb-2">
                    <p className="text-sm font-medium">To Pay</p>
                    <p className="text-base font-medium">
                      {configData?.data?.currency}{" "}
                      {couponData?.total ? couponData?.total : cart?.total}
                    </p>
                  </div>
                  <button
                    onClick={() => router.push("/checkout")}
                    disabled={hasOutOfStock}
                    className="mt-[20px] bg-[#E5002B] text-sm uppercase font-medium px-[42px] py-[13px] rounded-lg text-white w-full hover:opacity-80 disabled:bg-gray-450 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Checkout
                  </button>
                </div>
              </div>
              <div className="col-span-10 md:col-span-7">
                {relatedProducts && relatedProducts?.data.length !== 0 && (
                  <RelatedProducts
                    relatedProductsLoading={relatedProductsLoading}
                    favList={favList}
                    relatedProducts={relatedProducts?.data}
                    cart={cartProducts}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;

Cart.getLayout = (page) => {
  const configData = page?.props;
  return <MainLayout configData={configData}>{page}</MainLayout>;
};

export async function getServerSideProps() {
  const baseUrl = config?.gateway?.apiURL;
  const endPoint1 = config?.gateway?.apiEndPoint1;
  const apiUrl = `${baseUrl}/${endPoint1}/configs`;
  const response: any = await axios.get(apiUrl, {
    headers: {
      Accept: "application/json",
      "Api-Key": config.gateway.apiKey,
    },
  });
  return {
    props: response?.data,
  };
}
