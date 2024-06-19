import { format, parse } from "date-fns";
import { useRouter } from "next/router";
import { useState } from "react";

import { useDeliveryAddressHooks } from "@/hooks/useDeliveryAddress.hooks";
import { checkout } from "@/services/checkout.service";
import Breadcrumb from "@/shared/components/breadcrumb";
import { PaymentMethod } from "@/shared/enum";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { useCart as useCartStores } from "@/store/cart";
import { useQueryClient } from "@tanstack/react-query";

import AccountDetail from "./account-detail";
import AddressAndDelivery from "./address-and-delivery";
import OrderNote from "./order-note";
import OrderSummary from "./order-summary";
import PaymentMethodModule from "./payment-methods";

const NewCheckoutContent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [note, setNote] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<any>();
  const [isHomeDelivery, setIsHomeDelivery] = useState<boolean>(true);
  const [pickupData, setPickupData] = useState<any>({});
  const [outletId, setOutletId] = useState<number>(0);

  const token = getToken();
  const { couponData } = useCartStores();
  const { deliveryAddressData, isDeliveryAddressLoading } =
    useDeliveryAddressHooks();
  const defaultAddress = deliveryAddressData?.find(
    (address: any) => address.isDefault
  );
  const handlePlaceOrder = async () => {
    if (token) {
      const couponCode = couponData?.code;
      const selectedPaymentMethodId = selectedPayment?.id;

      if (isHomeDelivery) {
        const selectedDeliveryAddressId = defaultAddress?.id;

        const payload = {
          delivery_address_id: selectedDeliveryAddressId,
          payment_method_id: selectedPaymentMethodId,
          note: note,
          // coupon: coupon,
        };
        checkout(payload, couponCode)
          .then((res) => {
            switch (selectedPayment?.title) {
              case PaymentMethod.CASH_ON_DELIVERY:
                checkoutSuccessfulRedirect();
                break;
              case PaymentMethod.ESEWA:
                redirectPaymentPortal(res?.data?.data);
                break;
              case PaymentMethod.KHALTI:
                redirectPaymentPortal(res?.data?.data);
                break;
            }
            queryClient.invalidateQueries(["getCart"]);

            // setPlaceBtnDisable(false);
          })

          .catch((error) => {
            // setPlaceBtnDisable(false);
            const errors = error?.response?.data?.errors;
            errors.map((err: any) => {
              showToast(TOAST_TYPES.error, err.detail);
            });
          });
      } else {
        // Ensure the time string is correctly parsed into a Date object
        const parsedTime = parse(pickupData?.time, "HH:mm", new Date());

        // Format the Date object into a string with format "HH:mm:ss"
        const formattedTime = format(parsedTime, "HH:mm:ss");

        const payload = {
          outlet_id: outletId,
          contact_number: pickupData?.phoneNumber,
          name: pickupData?.name,
          pickup_schedule_time: `${format(
            pickupData?.date,
            "yyyy-MM-dd"
          )} ${formattedTime}`,
          payment_method_id: selectedPaymentMethodId,
          note: note,
          // coupon: coupon,
        };
        checkout(payload, couponCode)
          .then((res) => {
            switch (selectedPayment?.title) {
              case PaymentMethod.CASH_ON_DELIVERY:
                checkoutSuccessfulRedirect();
                break;
              case PaymentMethod.ESEWA:
                redirectPaymentPortal(res?.data?.data);
                break;
              case PaymentMethod.KHALTI:
                redirectPaymentPortal(res?.data?.data);
                break;
            }
            queryClient.invalidateQueries(["getCart"]);

            // setPlaceBtnDisable(false);
          })

          .catch((error) => {
            // setPlaceBtnDisable(false);
            const errors = error?.response?.data?.errors;
            errors.map((err: any) => {
              showToast(TOAST_TYPES.error, err.detail);
            });
          });
      }
    } else {
      // setPlaceBtnDisable(false);
      showToast(
        TOAST_TYPES.error,
        "Please Add Personal Detail and click on the Next button"
      );
    }
  };
  const checkoutSuccessfulRedirect = () => {
    goToCheckoutReviewPage(true);
    // setPlaceOrdered(true);
    showToast(TOAST_TYPES.success, "Checkout Successful.");
  };

  const redirectPaymentPortal = (data: any) => {
    if (data?.url) {
      window.open(data?.url, "_self");
    } else {
      goToCheckoutReviewPage(false);
    }
  };
  const goToCheckoutReviewPage = (success: any) => {
    router.push({
      pathname: "/checkout/review",
      query: { success: success.toString() },
    });
  };
  return (
    <div>
      <Breadcrumb />
      <div className="grid grid-cols-12 gap-4 container my-6">
        <div className="col-span-8">
          <AccountDetail />
          <AddressAndDelivery
            setOutletId={setOutletId}
            outletId={outletId}
            setIsHomeDelivery={setIsHomeDelivery}
            setPickupData={setPickupData}
            pickupData={pickupData}
          />
          <PaymentMethodModule
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
          />
          <OrderNote note={note} setNote={setNote} />
        </div>
        <div className="col-span-4">
          <OrderSummary
            isHomeDelivery={isHomeDelivery}
            selectedPayment={selectedPayment}
            handlePlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default NewCheckoutContent;
