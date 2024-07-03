import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { IoEarth, IoLogoInstagram } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";

import ContactUsForm from "@/features/Contact/contact-form";
import Breadcrumb from "@/shared/components/breadcrumb";
import MainLayout from "@/shared/main-layout";
import { useConfig as useCongfigStore } from "@/store/config";

import { config } from "../../../../config";
import { NextPageWithLayout } from "../../_app";

const ContactUs: NextPageWithLayout = () => {
  const { configData } = useCongfigStore();
  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <Breadcrumb title="Contact Us" />
      <div className="container">
        <div className="grid grid-cols-12 gap-4 my-[60px] items-center">
          <div className="col-span-12 md:col-span-5 lg:col-span-4 contact-us-right">
            <div className="p-[50px] md:py-[120px] md:pr-[70px] md:pl-[90px]">
              <div className="contact-us-right__desc">
                <MdLocalPhone className="contact-us-right__desc--icon" />
                <Link
                  href={`tel:${configData?.data?.pageData?.["section1 mobile2"]}`}
                  className="contact-us-right__desc--text"
                >
                  {configData?.data?.pageData?.["section1 mobile2"]!}
                </Link>
              </div>
              <div className="contact-us-right__desc">
                <IoEarth className="contact-us-right__desc--icon" />
                <Link
                  href={`mailTo:${configData?.data?.pageData?.["section1 email"]}`}
                  className="contact-us-right__desc--text"
                >
                  {configData?.data?.pageData?.["section1 email"]}
                </Link>
              </div>
              <div className="contact-us-right__desc">
                <ImLocation className="contact-us-right__desc--icon" />
                <p className="contact-us-right__desc--text">
                  {configData?.data?.pageData?.["section1 address"]}
                </p>
              </div>
              <div>
                <h4 className="mb-4 text-2xl font-bold text-slate-850 leading-1">
                  Follow Us
                </h4>
                <div className="flex items-center gap-3">
                  <Link
                    href={`${configData?.data?.pageData?.["section5 facebook"]}`}
                    aria-label="fb-link"
                    target="_blank"
                    className="text-[22px] transition-all hover:text-primary text-gray-650"
                  >
                    <FaFacebookF />
                  </Link>
                  <Link
                    href={`${configData?.data?.pageData?.["section5 instagram"]}`}
                    aria-label="insta-link"
                    target="_blank"
                    className="text-[22px] transition-all hover:text-primary text-gray-650"
                  >
                    <IoLogoInstagram />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 lg:col-span-8">
            <ContactUsForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;

ContactUs.getLayout = (page) => {
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
