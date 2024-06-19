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

const AppAboutUs: NextPageWithLayout = () => {
  const router = useRouter();
  const { asPath } = router;
  const [descriptionContent, setDescriptionContent] = useState<string>("");
  const path = asPath.split("/");
  const slug = asPath.replace("/page/app-", "");
  const { data: aboutData, isInitialLoading: fetchLoading } = useQuery({
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
    if (aboutData) {
      setDescriptionContent(aboutData?.data?.content || "");
    }
  }, [aboutData]);
  return (
    <>
      <Head>
        <title>{aboutData?.data?.title || "Pizza Hut"}</title>
      </Head>
      {fetchLoading ? (
        <SkeletonDynamicPage />
      ) : (
        <>
          <Breadcrumb title={aboutData?.data?.title} />
          <div
            className="main-wrapper-block aboutus-wrapper"
            dangerouslySetInnerHTML={{ __html: descriptionContent }}
          />
        </>
      )}
    </>
  );
};
export default AppAboutUs;
