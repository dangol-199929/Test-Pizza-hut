import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import { isMobile, isTablet, isAndroid } from "react-device-detect";

import { useConfig as useConfigStores } from "@/store/config";
import { Dialog, DialogContent } from "../components/ui/dialog";
import ConfirmationModal from "../components/confirmation-modal";
import { useWareHouse as useWareHouseStore } from "@/store/warehouse";

import Header from "./header";
import Footer from "./footer";
import ScrollToTopButton from "./scroll-to-top";
import { IWareHouse } from "@/interface/home.interface";
import { getWareId } from "../utils/local-storage-utils";
import LoadingBar from "react-top-loading-bar";
import { useHeaderLogic } from "@/hooks/header.hooks";
// import TagManager from "react-gtm-module";

const MainLayout: React.FC<{ children: React.ReactNode; configData: any }> = ({
  children,
  configData,
}) => {
  const router = useRouter();
  const { setConfigData } = useConfigStores();
  const { warehouseId, setWareHouseId } = useWareHouseStore();
  // const googleTagManagerId = configData?.data?.pageData?.googleTagManager;
  const [showMobileModal, setShowMobileModal] = useState<boolean>(false);
  const id: string | any = getWareId();
  const appRedirect = () => {
    if (isAndroid) {
      const redirectUrl =
        configData?.data?.pageData["section4 googleplay link"];
      router.push(redirectUrl);
    } else {
      const redirectUrl = configData?.data?.pageData["section4 appstore link"];
      router.push(redirectUrl);
    }
  };
  const cancelModal = () => {
    setShowMobileModal(false);
  };

  useEffect(() => {
    if (isMobile || isTablet) {
      setShowMobileModal(true);
    }
  }, [isMobile, isTablet]);

  useEffect(() => {
    if (configData) {
      setConfigData(configData);
    }
  }, [configData]);

  const changeWarehouse = (warehouse: IWareHouse) => {
    const id: any = warehouse?.id;
    const name: string = warehouse?.name;
    setWareHouseId(id);
  };

  useEffect(() => {
    if (id === undefined && configData?.data?.warehouses?.length > 0) {
      changeWarehouse(configData.data.warehouses[0]);
    }
  }, [configData]);
  // useEffect(() => {
  //   if (typeof googleTagManagerId !== "undefined") {
  //     TagManager.initialize({ gtmId: googleTagManagerId });
  //   }
  // }, [googleTagManagerId]);

  const [progress, setProgress] = useState(0);

  Router.events.on("routeChangeStart", () => {
    setProgress(70);
  });

  Router.events.on("routeChangeComplete", () => {
    setProgress(100);
  });

  return (
    <>
      <Head>
        <title>Pizza Hut</title>
        <meta
          name="description"
          content={configData ? configData?.meta?.socialTags.description : ""}
          key={configData ? configData?.meta?.socialTags.keywords : ""}
        />
        <meta
          property="og:title"
          content={configData && configData?.meta?.socialTags["og:title"]}
        />
        <meta
          property="og:description"
          content={configData && configData?.meta?.socialTags["og:description"]}
        />
        <meta
          property="og:image"
          content={configData && configData?.meta?.socialTags["og:image"]}
        />
        <meta
          property="twitter:title"
          content={configData && configData?.meta?.socialTags["twitter:title"]}
        />
        <meta
          property="twitter:description"
          content={
            configData && configData?.meta?.socialTags["twitter:description"]
          }
        />
        <meta
          property="twitter:image"
          content={configData && configData?.meta?.socialTags["twitter:image"]}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${googleTagManagerId}`}
        ></script> */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleTagManagerId}');
            `,
          }}
        /> */}
        {/* <GoogleTagManager googleTagManagerId={googleTagManagerId}/> */}
      </Head>
      <div className="bg-[#F9F8F6]">
        <LoadingBar color="#f11946" progress={progress} />

        <Header />
        {/* <NewHeader /> */}
        {children}
        <Footer />
        <ScrollToTopButton />
        {/* <ChatBot /> */}

        {/* Detecting if opened in mobile or not */}
        {showMobileModal && (
          <Dialog open={showMobileModal} onOpenChange={cancelModal}>
            <DialogContent>
              <ConfirmationModal
                confirmHeading="If you are on mobile, you will get much better experience using our mobile app."
                modalType="mobile-detect"
                btnName="Yes"
                showModal={showMobileModal}
                btnFunction={appRedirect}
                cancelFuntion={cancelModal}
                isLoading={false}
              >
                <p className="text-sm">Please Download The Pizza Hut App.</p>
              </ConfirmationModal>
            </DialogContent>
          </Dialog>
        )}

        {/* <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        /> */}
      </div>
    </>
  );
};

export default MainLayout;
