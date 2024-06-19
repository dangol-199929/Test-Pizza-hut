import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { checkoutImg } from "@/shared/lib/image-config";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import SelfPickupMode from "./self-pickup";
import DeliveryMode from "./delivery";
import { getCookie } from "cookies-next";
interface IProps {
  setIsHomeDelivery: any;
  setOutletId: any;
  outletId: any;
  setPickupData: any;
  pickupData: any;
}
const AddressAndDelivery: FC<IProps> = ({
  setIsHomeDelivery,
  setOutletId,
  outletId,
  setPickupData,
  pickupData,
}) => {
  const loggedIn = getCookie("isLoggedIn");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pickupSelected, setPickupSelected] = useState<boolean>(false);
  // const [pickupData, setPickupData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  useEffect(() => {
    setIsLoggedIn(!!loggedIn);
  }, [loggedIn]);
  return (
    <div
      className={`bg-white py-4 ${
        isLoggedIn ? "" : "opacity-50 cursor-not-allowed"
      }`}
    >
      <h1 className="text-xl font-semibold px-6 pb-4 mb-4 border-b-[1px]">
        Address And Delivery
      </h1>
      <h3 className="text-base font-semibold mx-6">
        Choose Your Delivery Method
      </h3>
      <Tabs defaultValue="delivery" className=" bg-white rounded-xl m-6">
        <TabsList className="flex-wrap h-auto mb-6 gap-4">
          <TabsTrigger
            disabled={!isLoggedIn}
            value="delivery"
            onClick={() => {
              setIsHomeDelivery(true);
            }}
            className="text-base font-normal p-6 rounded-xl aspect-square flex flex-col items-center justify-center gap-4 border border-[#EDEDED]"
          >
            <Image
              src={checkoutImg?.delivery}
              alt="delivery"
              width={74}
              height={74}
            />
            Home Delivery
          </TabsTrigger>

          <TabsTrigger
            value="pickup"
            disabled={!isLoggedIn}
            onClick={() => {
              setIsHomeDelivery(false);
            }}
            className="text-base font-normal p-6 px-9 rounded-xl aspect-square flex flex-col items-center justify-center gap-4 border border-[#EDEDED]"
          >
            <Image
              src={checkoutImg?.pickUp}
              alt="delivery"
              width={74}
              height={74}
            />
            Self Pickup
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pickup">
          <SelfPickupMode
            outletId={outletId}
            setOutletId={setOutletId}
            pickupSelected={pickupSelected}
            setPickupSelected={setPickupSelected}
            pickupData={pickupData}
            setPickupData={setPickupData}
          />
        </TabsContent>
        <TabsContent value="delivery">
          <DeliveryMode />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AddressAndDelivery;
