import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MainLayout from "@/shared/main-layout";
import Loader from "@/components/Loading";

const AccountPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/account/profile");
  }, []);

  return (
    <div>
      <Loader />
    </div>
  );
};

export default AccountPage;

AccountPage.getLayout = (page: any) => {
  const configData = page?.props;
  return <MainLayout configData={configData}>{page}</MainLayout>;
};
