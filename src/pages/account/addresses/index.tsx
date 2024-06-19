import axios from "axios";
import Head from "next/head";
import { useState } from "react";

import DeliveryMode from "@/features/new-checkout/address-and-delivery/delivery";
import { IDeliveryAddress } from "@/interface/delivery-address.interface";
import AccountSidebarLayout from "@/shared/account-sidebar-layout";
import MainLayout from "@/shared/main-layout";

import { config } from "../../../../config";

const DelieveryAddress = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showCreateMdodal, setShowCreateModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<IDeliveryAddress>({
    address: "",
    mobile_number: "",
    name: "",
    default: false,
    lat: 27.7172,
    lng: 85.324,
    title: "",
  });
  return (
    <>
      <Head>
        <title>Pizza Hut | Address</title>
      </Head>
      <h5 className="py-4 text-3xl font-black">My Address</h5>
      <div className="bg-white p-4 rounded-xl">
        <DeliveryMode />
      </div>
    </>
  );
};

export default DelieveryAddress;

DelieveryAddress.getLayout = (page: any) => {
  const configData = page?.props;
  return (
    <MainLayout configData={configData}>
      <AccountSidebarLayout>{page}</AccountSidebarLayout>
    </MainLayout>
  );
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
