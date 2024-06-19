import axios from "axios";
import { getCookie } from "cookies-next";
import Head from "next/head";
import React, { useState } from "react";

import AppCategories from "@/features/Home/app-categories";
import BannerPopup from "@/features/Home/banner-popup";
import Categories from "@/features/Home/categories";
import { useGetCategoriesHooks } from "@/hooks/geCategory.hooks";
import { useGetWebHome } from "@/hooks/webhome.hooks";
import { IAdBanner, IAppCategories } from "@/interface/home.interface";
import { getBannerPopup } from "@/services/home.service";
import AdBanner from "@/shared/components/ad-banner";
import Banner from "@/shared/components/banner";
import SkeletonLoadingCard from "@/shared/components/skeleton/products";
import Title from "@/shared/components/title";
import MainLayout from "@/shared/main-layout";
import { useQuery } from "@tanstack/react-query";

import { config } from "../../config";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const [showPopupModal, setShowPopupModal] = useState<boolean>(true);

  const { homeData, isInitialLoading } = useGetWebHome();

  const { categories, categoriesLoading } = useGetCategoriesHooks();

  const adBanners = homeData?.data?.adBanners || [];
  const { data: bannerPopupData, isLoading: bannerPopupLoading } = useQuery(
    ["getBannerPopup"],
    getBannerPopup
  );
  const bannerPop = getCookie("bannerPopup");

  return (
    <div className="bg-white pb-14 -mb-14">
      <Head>
        <title>Pizza Hut</title>
      </Head>
      <div className="text-lg font-bold pb-12">
        <Banner />

        <div
          className="py-14"
          style={{
            backgroundImage: "url('/images/bg-image.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        >
          {isInitialLoading ? (
            <div className="container my-6">
              <div className="w-20 h-5 mx-4 mb-5 bg-gray-300 rounded animate-pulse"></div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
                {[1, 2, 3, 4, 5].map((index) => (
                  <SkeletonLoadingCard key={`app-skeleton-${index}`} />
                ))}
              </div>
            </div>
          ) : (
            <>
              {homeData?.data?.appCategories?.map(
                (prev: IAppCategories, index: number) => (
                  <React.Fragment key={`appcatgories-${prev?.id}`}>
                    <AppCategories prev={prev} />
                  </React.Fragment>
                )
              )}
            </>
          )}
          {bannerPopupData?.data.length > 0 &&
            showPopupModal &&
            bannerPop !== (undefined || true) && (
              <BannerPopup
                setShowPopupModal={setShowPopupModal}
                showPopupModal={showPopupModal}
                popupData={bannerPopupData?.data[0]!}
                bannerPopupLoading={bannerPopupLoading}
              />
            )}
        </div>
        <div className="container overflow-visible">
          <div>
            <Categories
              loading={categoriesLoading}
              categories={categories?.data}
            />
          </div>
        </div>
        <div className="container">
          <Title type="title-section" text={"OFFER"} mb="!mb-[0px]" />

          {adBanners.length > 0 && (
            <div className="grid grid-cols-12 gap-4 my-2">
              {adBanners?.slice(0, 2).map((bannerImg: IAdBanner) => (
                <div
                  className="relative col-span-12 overflow-hidden group sm:col-span-6"
                  key={bannerImg?.id}
                >
                  <AdBanner adBanner={bannerImg} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
Home.getLayout = (page) => {
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
