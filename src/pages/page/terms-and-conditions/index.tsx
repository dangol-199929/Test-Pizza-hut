import Loader from "@/components/Loading";
import { getPageData } from "@/services/page.service";
import Breadcrumb from "@/shared/components/breadcrumb";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { NextPageWithLayout } from "../../_app";
import MainLayout from "@/shared/main-layout";
import { config } from "../../../../config";
import axios from "axios";
import TermsBanner from "@/shared/components/terms-banner";

const TermsAndCondition: NextPageWithLayout = () => {
  const router = useRouter();
  const { asPath } = router;
  const [descriptionContent, setDescriptionContent] = useState<string>("");
  const path = asPath.split("/");
  const slug = path[path.length - 1];
  const { data: termsAndCondition, isInitialLoading: fetchLoading } = useQuery({
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
    if (termsAndCondition) {
      setDescriptionContent(termsAndCondition?.data?.content || "");
    }
  }, [termsAndCondition]);
  return (
    <>
      <Head>
        <title>Terms and Condition</title>
      </Head>
      {fetchLoading ? (
        <Loader />
      ) : (
        <>
          <TermsBanner title={termsAndCondition?.data?.title} />
          <div className="container">
            <div
              className="main-wrapper-block mx-32 font-rubik"
              dangerouslySetInnerHTML={{ __html: descriptionContent }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default TermsAndCondition;

TermsAndCondition.getLayout = (page) => {
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
