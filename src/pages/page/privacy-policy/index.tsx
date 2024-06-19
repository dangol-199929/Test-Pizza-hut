import MainLayout from "@/shared/main-layout";
import React, { useEffect, useState } from "react";
import { NextPageWithLayout } from "../../_app";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getPageData } from "@/services/page.service";
import Loader from "@/components/Loading";
import Breadcrumb from "@/shared/components/breadcrumb";
import Head from "next/head";
import { config } from "../../../../config";
import axios from "axios";
import TermsBanner from "@/shared/components/terms-banner";

const PrivacyPolicy: NextPageWithLayout = () => {
  const router = useRouter();
  const { asPath } = router;
  const [descriptionContent, setDescriptionContent] = useState<string>("");
  const path = asPath.split("/");
  const slug = path[path.length - 1];
  const { data: privacyPolicy, isInitialLoading: fetchLoading } = useQuery({
    queryKey: ["getPageData", slug],
    queryFn: async () => {
      if (slug) {
        const response = await getPageData(slug);
        return response;
      }
    },
    enabled: !!slug,
  });

  useEffect(() => {
    if (privacyPolicy) {
      setDescriptionContent(privacyPolicy?.data?.content || "");
    }
  }, [privacyPolicy]);

  return (
    <>
      <Head>
        <title>Privacy Policy</title>
      </Head>
      {fetchLoading ? (
        <Loader />
      ) : (
        <>
          <TermsBanner title={`PIZZA HUT ${privacyPolicy?.data?.title}`} />
          <div
            className="main-wrapper-block !mx-32 font-rubik"
            dangerouslySetInnerHTML={{ __html: descriptionContent }}
          />
        </>
      )}
    </>
  );
};
export default PrivacyPolicy;

PrivacyPolicy.getLayout = (page) => {
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
