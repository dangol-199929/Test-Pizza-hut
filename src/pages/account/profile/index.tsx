import ProfileForm from "@/features/My-Account/profile-form";
import ProfileImage from "@/features/ProfileImage";
import AccountSidebarLayout from "@/shared/account-sidebar-layout";
import MainLayout from "@/shared/main-layout";
import Head from "next/head";
import React from "react";

const Profile = () => {
  return (
    <>
      <Head>
        <title>Pizza Hut | Profile</title>
      </Head>
      <h5 className="py-4 text-3xl font-black">My Profile</h5>
      <div className="bg-white p-4 rounded-xl">
        <ProfileImage />
        <ProfileForm />
      </div>
    </>
  );
};

export default Profile;

Profile.getLayout = (page: any) => {
  const configData = page?.props;
  return (
    <MainLayout configData={configData}>
      <AccountSidebarLayout>{page}</AccountSidebarLayout>
    </MainLayout>
  );
};
