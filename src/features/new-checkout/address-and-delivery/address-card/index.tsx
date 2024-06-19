import { useDeliveryAddressHooks } from "@/hooks/useDeliveryAddress.hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { BriefcaseIcon, Home } from "lucide-react";
import { useMemo } from "react";

interface AddressCardProps {
  deliveryAddressContent: {
    id: string;
    title: string;
    name: string;
    detail: {
      formatted_address: string;
    };
    mobileNumber: string;
  };
  handleEdit: (id: string) => void;
  handleDeleteAddress: (id: string) => void;
  selectedAddressId: string;
  handleSelectAddress: (id: string) => void;
  handleDefault: any;
}

export default function AddressCard({
  deliveryAddressContent,
  handleEdit,
  handleDeleteAddress,
  selectedAddressId,
  handleSelectAddress,
  handleDefault,
}: AddressCardProps) {
  const { deliveryAddressData, isDeliveryAddressLoading } =
    useDeliveryAddressHooks();
  const defaultAddress = deliveryAddressData?.find(
    (address: any) => address.isDefault
  );
  const Icon = useMemo(() => (Math.random() < 0.5 ? Home : BriefcaseIcon), []);

  return (
    <>
      <Card
        className={`border rounded-lg shadow-md ${
          deliveryAddressContent?.id === defaultAddress?.id
            ? "border-red-500 !bg-red-500/10"
            : ""
        }`}
      >
        <div
          className="cursor-pointer flex items-start gap-2 justify-start p-4"
          onClick={() => handleDefault(deliveryAddressContent)}
        >
          <div className="p-1">
            <Icon size={16} />
          </div>
          <div>
            <div>
              <CardTitle className="flex items-center text-base font-semibold">
                <p className="font-medium flex justify-start items-center gap-3">
                  {deliveryAddressContent?.title}
                </p>
              </CardTitle>
            </div>
            <div>
              <CardDescription className="text-sm font-normal">
                {deliveryAddressContent?.detail?.formatted_address}
                <br />
                Phone Number: {deliveryAddressContent?.mobileNumber}
              </CardDescription>
            </div>
          </div>
        </div>
        <div className="flex justify-start gap-4 pb-4 ps-12">
          <button
            className="text-red-500 font-medium text-xs"
            onClick={() => handleEdit(deliveryAddressContent?.id)}
          >
            EDIT
          </button>
          <button
            className="text-slate-800 font-medium text-xs"
            onClick={() => handleDeleteAddress(deliveryAddressContent?.id)}
          >
            DELETE
          </button>
        </div>
      </Card>
    </>
  );
}
