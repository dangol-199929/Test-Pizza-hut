import { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { addCouponCode, getCartProduct } from "@/services/cart.service";
import { ICartData, ICouponCartData } from "@/interface/cart.interface";
import { useCart as useCartStores } from "@/store/cart";
import CartDropdownProducts from "./cart-products";
import { useConfig as useConfigStores } from "@/store/config";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import BoxIcon from "@/shared/icons/common/BoxIcon";
import { useGetCartsHooks } from "@/hooks/getCart.hooks";
import { useGetCartProductHooks } from "@/hooks/getCartProduct.hooks";

const CartDropdown = () => {
  const router = useRouter();

  const { configData } = useConfigStores();

  const { cartProducts, cartProductsLoading } = useGetCartProductHooks();
  const { coupon, setCoupon, couponData, setCouponData } = useCartStores();

  const enableCouponCall = coupon && cartProducts?.cartProducts?.length! > 0;

  const { data: couponCartData } = useQuery<ICouponCartData>({
    queryKey: ["addCoupon", coupon],
    queryFn: async () => addCouponCode(coupon),
    enabled: !!enableCouponCall,
    retry: false,
  });

  const { cart, cartLoading } = useGetCartsHooks();

  //checking if there is any item which is out of stock
  const hasOutOfStock = cartProducts?.cartProducts?.find(
    (item) => item?.selectedUnit?.stock === 0
  )
    ? true
    : false;
  useEffect(() => {
    if (window && localStorage && localStorage.getItem("coupon")) {
      setCoupon(localStorage.getItem("coupon") as string);
    }
  }, [coupon]);
  // }, [window, localStorage, coupon])

  useEffect(() => {
    if (couponCartData) {
      setCouponData(couponCartData);
    }
  }, [couponCartData]);

  useEffect(() => {
    if (cartProducts?.cartProducts?.length === 0) {
      if (localStorage.getItem("coupon")) {
        localStorage.removeItem("coupon");
      }
      setCouponData({});
      setCoupon("");
    }
  }, [cartProducts]);
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="flex items-center gap-4 focus:outline-none focus:border-0 focus-visible:outline-none focus-visible:border-0">
        {/* <div className='relative flex w-[40px] h-[40px] rounded-full bg-gray-1250 items-center justify-center'>
          <CartIcon className="max-w-[20px] m-auto text-gray-550" />
          <Badge variant="dark"> {cartList?.cartProducts?.length || 0}</Badge>
        </div>
        <div className='text-left'>
          <p className="hidden mb-1 text-sm font-bold text-gray-550 whitespace-nowrap md:block">
            TOTAL PRICE
          </p>
          <p className="text-[#222222] uppercase text-sm font-bold hidden xs:block whitespace-nowrap">
            {configData?.data?.currency} {couponData?.total ? couponData?.total : cart?.total || 0}
          </p >
        </div > */}
        <div className="flex items-center space-x-1 hover:text-primary">
          <div className="relative">
            <BoxIcon className="w-6 h-6 me-2" />{" "}
            {cartProducts?.cartProducts?.length !== 0 && (
              <Badge variant="destructive" className="left-[5px] top-[3px]">
                {" "}
                {cartProducts?.cartProducts?.length}
              </Badge>
            )}
          </div>
          <p className="text-base font-medium">Box</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[300px] md:w-[350px] border-none p-[25px]"
      >
        <div
          className={`max-h-42 overflow-auto ${
            cartProducts?.cartProducts?.length === 0 ? "" : "pb-[10px]"
          }`}
        >
          {!cartProducts || cartProducts?.cartProducts?.length === 0 ? (
            <p className="text-sm font-bold text-center text-slate-850">
              No Products in the cart.
            </p>
          ) : (
            <>
              <div className="overflow-y-scroll max-h-[250px]">
                {cartProducts &&
                  cartProducts?.cartProducts?.map(
                    (item: any, index: number) => (
                      <CartDropdownProducts item={item} key={index} />
                    )
                  )}
              </div>
              {/* pricing list */}
              <div className="my-[25px]">
                <p className="flex justify-between mb-1 font-normal text-gray-450">
                  Order Amount :{" "}
                  <span>
                    {configData?.data?.currency}{" "}
                    {couponData?.orderAmount
                      ? couponData?.orderAmount
                      : cart?.orderAmount}
                  </span>
                </p>
                {(couponData?.discountAmount > 0 ||
                  cart?.discountAmount! > 0) && (
                  <p className="flex justify-between mb-1 font-normal text-gray-450">
                    Discount :{" "}
                    <span>
                      {configData?.data?.currency}{" "}
                      {couponData?.discountAmount
                        ? couponData?.discountAmount
                        : cart?.discountAmount}
                    </span>
                  </p>
                )}
                {couponData?.couponDiscount && (
                  <p className="flex justify-between mb-1 font-normal text-gray-450">
                    Coupon Discount :{" "}
                    <span>
                      {configData?.data?.currency} {couponData?.couponDiscount}
                    </span>
                  </p>
                )}
                <p className="flex justify-between mb-1 font-normal text-gray-450">
                  Subtotal :{" "}
                  <span>
                    {configData?.data?.currency}{" "}
                    {couponData?.subTotal
                      ? couponData?.subTotal
                      : cart?.subTotal}
                  </span>
                </p>

                {(couponData?.deliveryCharge > 0 ||
                  cart?.deliveryCharge! > 0) && (
                  <p className="flex justify-between mb-1 font-normal text-gray-450">
                    Delivery charge :{" "}
                    <span>
                      {configData?.data?.currency}{" "}
                      {couponData?.deliveryCharge
                        ? couponData?.deliveryCharge
                        : cart?.deliveryCharge}
                    </span>
                  </p>
                )}
                <p className="flex justify-between text-slate-850">
                  Total :{" "}
                  <span>
                    {configData?.data?.currency}{" "}
                    {couponData?.total ? couponData?.total : cart?.total}
                  </span>
                </p>
              </div>
              <div className="[&>*:first-child]:mb-4">
                <DropdownMenuItem
                  className={`h-auto py-3.5 cursor-pointer font-normal w-full text-center block bg-gray-150 text-sm transition-all text-slate-850 rounded-3xl hover:bg-primary hover:text-white`}
                  onClick={() => router.push("/cart")}
                  aria-label="cart"
                >
                  CART
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={hasOutOfStock}
                  className="block w-full h-auto py-3.5 cursor-pointer text-sm font-normal text-center transition-all text-slate-850 bg-gray-150 rounded-3xl hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:pointer-events-auto "
                  onClick={() => router.push("/checkout")}
                >
                  CHECKOUT
                </DropdownMenuItem>
              </div>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartDropdown;
