import { IPaymentMethod } from "@/interface/home.interface";
import { useConfig as useConfigStores } from "@/store/config";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { getCookie } from "cookies-next";
import CustomImage from "@/shared/components/custom-image";
import { FallBackImg } from "@/shared/lib/image-config";
interface IProps {
  selectedPayment: any;
  setSelectedPayment: any;
}
const PaymentMethodModule: FC<IProps> = ({
  selectedPayment,
  setSelectedPayment,
}) => {
  const loggedIn = getCookie("isLoggedIn");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const selectHandler = (payment: IPaymentMethod) => {
    setSelectedPayment(payment);
  };
  // Get Config Data
  const { configData } = useConfigStores();
  const defaultPaymentMethod = configData?.data?.paymentMethods[0]?.title;

  useEffect(() => {
    setIsLoggedIn(!!loggedIn);
  }, [loggedIn]);
  return (
    <div
      className={`bg-white py-4 mt-4 ${
        isLoggedIn ? "" : "opacity-50 cursor-not-allowed"
      }`}
    >
      <h1 className="text-xl font-semibold px-6 pb-4 mb-4 border-b-[1px]">
        Payment Method
      </h1>

      <RadioGroup
        defaultValue={defaultPaymentMethod}
        className="flex flex-wrap gap-4 px-6 mb-4"
        disabled={!isLoggedIn}
      >
        {configData?.data?.paymentMethods?.map((payment: IPaymentMethod) => (
          <div
            className={`flex items-center p-4 border rounded-lg cursor-pointer relative ${
              selectedPayment?.id === payment.id
                ? "border-red-500 bg-red-50"
                : "border-gray-200"
            }`}
            key={payment.id}
            onClick={() => selectHandler(payment)}
          >
            <CustomImage
              fallback={FallBackImg}
              alt="Checkout Img"
              width={50}
              height={50}
              quality={100}
              src={payment?.webpIcon ? payment?.webpIcon : payment?.icon}
              className="w-[50px] h-[50px] mb-2"
            />
            <span className="capitalize whitespace-nowrap ms-2">
              {payment.title}
            </span>
            {payment?.cashback && (
              <span className="mt-1 whitespace-nowrap text-xs p-1 px-2 rounded-md bg-yellow-500 absolute -bottom-2 left-[50%] translate-x-[-50%]">
                {payment.cashback}
              </span>
            )}
            <RadioGroupItem
              checked={selectedPayment?.id === payment.id}
              value={payment?.title}
              id={payment?.title}
              className="hidden"
            />
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodModule;
