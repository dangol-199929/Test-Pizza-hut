import { useState } from "react";
import { NextPageWithLayout } from "../../_app";
import MainLayout from "@/shared/main-layout";
import Head from "next/head";
import Loader from "@/components/Loading";
import Breadcrumb from "@/shared/components/breadcrumb";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getFaqData } from "@/services/page.service";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { config } from "../../../../config";
import axios from "axios";
import TermsBanner from "@/shared/components/terms-banner";

export interface IFaq {
  question: string;
  answer: string;
  id: number;
}

const Faq: NextPageWithLayout = () => {
  const router = useRouter();
  const { asPath } = router;
  const path = asPath.split("/");
  const slug = path[path.length - 1];
  const { data: faqData, isInitialLoading: fetchLoading } = useQuery({
    queryKey: ["getPageData", slug],
    queryFn: getFaqData,
  });

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index: any) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <Head>
        <title>Faq</title>
      </Head>
      {fetchLoading ? (
        <Loader />
      ) : (
        <>
          <TermsBanner title={"FAQs"} subtitle="Frequently asked questions" />
          <div className="container">
            <div className="py-[60px]">
              <Accordion type="single" collapsible className="w-full">
                {faqData &&
                  faqData?.data.map((faq: IFaq, index: number) => (
                    <AccordionItem
                      value={`item-${index}`}
                      key={index}
                      className="border-0 faq-accordion mb-3.5"
                    >
                      <AccordionTrigger className="text-start text-lg font-medium faq-accordion__trigger !bg-[#F9F8F6] [&[data-state=open]]:text-primary  [&[data-state=open]]:rounded-t-lg">
                        {faq?.question}
                      </AccordionTrigger>
                      <AccordionContent className="faq-accordion__content !bg-[#F9F8F6] !border-0 ps-2">
                        <div
                          className="faq-accordion__content--desc text-base font-normal border-b "
                          dangerouslySetInnerHTML={{ __html: faq?.answer }}
                        ></div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Faq;

Faq.getLayout = (page) => {
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
