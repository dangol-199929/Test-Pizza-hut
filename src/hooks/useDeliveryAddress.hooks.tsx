import { getDeliverAddress } from "@/services/delivery-address.service";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import { useQuery } from "@tanstack/react-query";

export const useDeliveryAddressHooks = () => {
  const token = getToken();
  const {
    data: deliveryAddressData,
    refetch: getDeliveryAddress,
    isLoading: isDeliveryAddressLoading,
  } = useQuery({
    queryKey: ["getDeliverAddress", token],
    queryFn: getDeliverAddress,
    enabled: !!token,
  });
  return {
    deliveryAddressData,
    getDeliveryAddress,
    isDeliveryAddressLoading,
  };
};
