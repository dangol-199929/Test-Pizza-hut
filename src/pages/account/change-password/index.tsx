import ChangePasswordForm from "@/features/My-Account/change-password-form";
import AccountSidebarLayout from "@/shared/account-sidebar-layout";
import MainLayout from "@/shared/main-layout";
import Head from "next/head";
import React from "react";
import { config } from "../../../../config";
import axios from "axios";

const ChangePassword = () => {
  return (
    <>
      <Head>
        <title>Pizza Hut | Change Password</title>
      </Head>

      <h5 className="py-4 text-3xl font-black">Change Password</h5>
      <div className="bg-white p-4 rounded-xl">
        <ChangePasswordForm />
      </div>
    </>
  );
};

export default ChangePassword;

ChangePassword.getLayout = (page: any) => {
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
