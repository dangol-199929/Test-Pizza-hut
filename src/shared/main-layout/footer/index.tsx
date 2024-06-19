import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import { FooterLogo } from "@/shared/lib/image-config";
import { useConfig as useConfigStores } from "@/store/config";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { configData } = useConfigStores();

  return (
    <div className="relative bg-neutral-800">
      <footer className="relative block p-4 md:p-[54px] sm:p-10 footer">
        <div className="container grid grid-cols-4 gap-6 footer">
          <div>
            <Image
              src={
                configData?.data?.pageData?.logo
                  ? configData?.data?.pageData?.logo
                  : FooterLogo
              }
              height={175}
              width={175}
              alt="footer-logo"
              priority={true}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          <div className="col-span-2 pe-12">
            <p className="text-base text-start leading-snug font-normal text-slate-100 mb-6">
              {configData?.data?.pageData?.["section1 description"]}
            </p>
            <div className="flex gap-7 mt-4">
              {configData?.data?.pageData && (
                <>
                  <Link
                    href={`${configData?.data?.pageData?.["section5 facebook"]}`}
                    aria-label="fb-link"
                    target="_blank"
                    className="hover:text-primary text-white"
                  >
                    <FaFacebook className="h-8 w-8 " />
                  </Link>
                  <Link
                    href={`${configData?.data?.pageData["section5 twitter"]}`}
                    aria-label="twitter-link"
                    target="_blank"
                    className="hover:text-primary text-white"
                  >
                    <FaTwitter className="h-8 w-8 " />
                  </Link>
                  <Link
                    href={`${configData?.data?.pageData["section5 instagram"]}`}
                    aria-label="instagram-link"
                    target="_blank"
                    className="hover:text-primary text-white"
                  >
                    <FaInstagram className="h-8 w-8 " />
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-4">
            <Link
              className="text-slate-100 text-base font-medium hover:text-primary"
              href={"/pizza"}
            >
              Menu
            </Link>
            <Link
              className="text-slate-100 text-base font-medium hover:text-primary"
              href={"#"}
            >
              Nearby Location
            </Link>
            <Link
              className="text-slate-100 text-base font-medium hover:text-primary"
              href={"#"}
            >
              Contact
            </Link>
            <Link
              className="text-slate-100 text-base font-medium hover:text-primary"
              href={"#"}
            >
              Terms & Condition
            </Link>
            <Link
              className="text-slate-100 text-base font-medium hover:text-primary"
              href={"#"}
            >
              Private Policy
            </Link>
          </div>
          {/* {configData?.data?.pageData && (
            <>
              <div className="w-full xs:w-[45%] md:w-[30%] mb-3">
                <span className="text-base font-bold footer-title">
                  {configData?.data?.pageData?.["section1 title"]}
                </span>
                <div className="flex items-center justify-start gap-4 mb-3">
                  <PhoneIcon className="min-w-[24px]" />
                  <div>
                    <Link
                      className="p-0 footer-link"
                      href={`tel:${configData?.data?.pageData?.["section1 mobile2"]}`}
                    >
                      {configData?.data?.pageData?.["section1 mobile2"]!}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-4 mb-3">
                  <MailIcon className="min-w-[24px]" />
                  <div>
                    <Link
                      href={`mailTo:${configData?.data?.pageData?.["section1 email"]}`}
                    >
                      <button className="p-0 footer-link">
                        {configData?.data?.pageData?.["section1 email"]}
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-4 mb-3">
                  <LocationIcon className="min-w-[24px]" />
                  <div>
                    <button className="p-0 footer-link">
                      {configData?.data?.pageData?.["section1 address"]}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )} */}
          {/* <div className="w-full xs:w-[45%] md:w-[23%] mb-3">
            <span className="text-base font-bold footer-title">
              {configData?.data?.pageData?.["section2 title"]}
            </span>
            {configData?.data?.pageData && (
              <>
                <div className="flex items-center justify-start gap-4 mb-3">
                  <Link
                    href={`${configData?.data?.pageData?.["section2 link1"]}`}
                    aria-label="about-us"
                    className="p-0 footer-link"
                  >
                    {configData?.data?.pageData?.["section2 content1"]}
                  </Link>
                </div>
                <div className="flex items-center justify-start gap-4 mb-3">
                  <Link
                    href={`${configData?.data?.pageData?.["section2 link2"]}`}
                    aria-label="privacy-policy-footter"
                    className="p-0 footer-link"
                  >
                    {configData?.data?.pageData?.["section2 content2"]}
                  </Link>
                </div>
                <div className="flex items-center justify-start gap-4 mb-3">
                  <Link
                    href={`${configData?.data?.pageData?.["section2 link3"]}`}
                    aria-label="faq-footer"
                    className="p-0 footer-link"
                  >
                    {configData?.data?.pageData?.["section2 content3"]}
                  </Link>
                </div>
                <div className="flex items-center justify-start gap-4 mb-3">
                  <Link
                    href={`${configData?.data?.pageData?.["section2 link4"]}`}
                    aria-label="contact-us"
                    className="p-0 footer-link"
                  >
                    {configData?.data?.pageData?.["section2 content4"]}
                  </Link>
                </div>
                <div className="flex items-center justify-start gap-4 mb-3">
                  <Link
                    href={`${configData?.data?.pageData?.["section2 link5"]}`}
                    aria-label="terms-and-condition"
                    className="p-0 footer-link"
                  >
                    {configData?.data?.pageData?.["section2 content5"]}
                  </Link>
                </div>
              </>
            )}
          </div>
          <div className="w-full xs:w-[45%] md:w-[15%] mb-3">
            <span className="text-base font-bold footer-title">{`${configData?.data?.pageData?.["section4 title"]}`}</span>
            <div>
              <Image
                src={
                  configData?.data?.pageData?.qr_code
                    ? configData?.data?.pageData?.qr_code
                    : QR
                }
                alt="QR"
                width={150}
                height={190}
                quality={100}
                style={{ width: "auto", height: "auto" }}
                className="max-w-[150px]"
              />
            </div>
          </div> */}
        </div>
        {/* <div className="container flex flex-wrap items-center justify-center gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-base font-bold text-white me-4">
              DOWNLOAD THE APP ON
            </h3>
            <div className="flex gap-3">
              {configData?.data?.pageData && (
                <>
                  <Link
                    aria-label="play-store"
                    target="_blank"
                    href={`${configData?.data?.pageData?.["section4 googleplay link"]}`}
                    className="p-0 btn"
                  >
                    <Image
                      src={PlayStore}
                      height={32}
                      width={108}
                      quality={100}
                      alt="play-store"
                      className="rounded-sm"
                    />
                  </Link>
                  <Link
                    target="_blank"
                    aria-label="app-store"
                    href={`${configData?.data?.pageData?.["section4 appstore link"]}`}
                    className="p-0 btn"
                  >
                    <Image
                      src={AppStore}
                      className="rounded-sm"
                      quality={100}
                      height={32}
                      width={108}
                      alt="app-store"
                    />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div> */}
      </footer>
      <div className="bg-[#282929] text-white text-sm py-4">
        <div className="container mx-auto flex justify-between items-center">
          <p>© {currentYear} Pizza Hut. All Rights Reserved</p>
          <p>
            Powered by{" "}
            <Link
              href="https://koklass.com/"
              target="_blank"
              className="hover:text-primary font-medium"
            >
              Koklass
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
