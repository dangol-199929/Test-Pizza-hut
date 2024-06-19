import axios from "axios";
import MainLayout from "@/shared/main-layout";

import { config } from "../../../config";
import { NextPageWithLayout } from "../_app";
import NewCheckoutContent from "@/features/new-checkout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGetCartProductHooks } from "@/hooks/getCartProduct.hooks";

const Checkout: NextPageWithLayout = () => {
  const router = useRouter();
  const { cartProducts } = useGetCartProductHooks();
  useEffect(() => {
    if (cartProducts?.cartProducts.length === 0) {
      router.push("/");
    }
  }, [cartProducts]);
  return <NewCheckoutContent />;
};

export default Checkout;
Checkout.getLayout = (page: any) => {
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
