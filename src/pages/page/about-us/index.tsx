import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../../_app";
import MainLayout from "@/shared/main-layout";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getPageData } from "@/services/page.service";
import Head from "next/head";
import { config } from "../../../../config";
import axios from "axios";
import Loader from "@/components/Loading";
import TermsBanner from "@/shared/components/terms-banner";

const AboutUs: NextPageWithLayout = () => {
  const router = useRouter();
  const { asPath } = router;
  const [descriptionContent, setDescriptionContent] = useState<string>("");
  const path = asPath.split("/");
  const slug = path[path.length - 1];
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
        <title>{"About Us"}</title>
      </Head>

      {fetchLoading ? (
        <Loader />
      ) : (
        <>
          <TermsBanner title={aboutData?.data?.title} />
          <div className="container">
            <div
              className="main-wrapper-block"
              dangerouslySetInnerHTML={{ __html: descriptionContent }}
            />
          </div>
        </>
      )}
    </>
  );
};
export default AboutUs;
AboutUs.getLayout = (page) => {
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
