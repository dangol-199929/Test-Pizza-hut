import React, { useEffect, useState } from "react";
import { NextPageWithLayout } from "../../_app";
import MainLayout from "@/shared/main-layout";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getPageData } from "@/services/page.service";
import Breadcrumb from "@/shared/components/breadcrumb";
import Loader from "@/components/Loading";
import Head from "next/head";
import SkeletonDynamicPage from "@/shared/components/skeleton/dynamic-page";
import { config } from "../../../../config";
import axios from "axios";

const CSRProjects: NextPageWithLayout = () => {
  const router = useRouter();
  const { asPath } = router;
  const [descriptionContent, setDescriptionContent] = useState<string>("");
  const path = asPath.split("/");
  const slug = path[path.length - 1];
  const { data: csrProjectData, isInitialLoading: fetchLoading } = useQuery({
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
    if (csrProjectData) {
      setDescriptionContent(csrProjectData?.data?.content || "");
    }
  }, [csrProjectData]);
  return (
    <>
      <Head>
        <title>{csrProjectData?.data?.title || "Pizza Hut"}</title>
      </Head>
      {fetchLoading ? (
        <SkeletonDynamicPage />
      ) : (
        <>
          <Breadcrumb title={csrProjectData?.data?.title} />
          <div
            className="main-wrapper-block"
            dangerouslySetInnerHTML={{ __html: descriptionContent }}
          />
        </>
      )}
    </>
  );
};
export default CSRProjects;
CSRProjects.getLayout = (page) => {
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
