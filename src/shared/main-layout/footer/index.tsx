import Link from "next/link";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import { FallBackImg, FooterLogo } from "@/shared/lib/image-config";
import { useConfig as useConfigStores } from "@/store/config";
import CustomImage from "@/shared/components/custom-image";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { configData } = useConfigStores();
  return (
    <div className="relative bg-neutral-800">
      <footer className="relative block p-4 md:p-[54px] sm:p-10 footer">
        <div className="container grid grid-cols-4 gap-6 footer">
          <div className="col-span-4 xs:col-span-1">
            <CustomImage
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
              fallback={FallBackImg}
            />
          </div>
          <div className="col-span-4 xs:col-span-2 sm:col-span-2 sm:pe-12">
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
          <div className="flex flex-col justify-start items-start gap-4 col-span-4 sm:col-span-1">
            <Link
              className="text-slate-100 text-base font-medium hover:text-primary"
              href={`${configData?.data?.pageData?.["section2 link1"]}`}
            >
              {configData?.data?.pageData?.["section2 content1"]}
            </Link>
            <Link
              className="text-slate-100 text-base font-medium hover:text-primary"
              href={`${configData?.data?.pageData?.["section2 link2"]}`}
            >
              {configData?.data?.pageData?.["section2 content2"]}
            </Link>
            <Link
              className="text-slate-100 text-base font-medium hover:text-primary"
              href={`${configData?.data?.pageData?.["section2 link3"]}`}
            >
              {configData?.data?.pageData?.["section2 content3"]}
            </Link>
            <Link
              className="text-slate-100 text-base font-medium hover:text-primary"
              href={`${configData?.data?.pageData?.["section2 link4"]}`}
            >
              {configData?.data?.pageData?.["section2 content4"]}
            </Link>
            <Link
              className="text-slate-100 text-base font-medium hover:text-primary"
              href={`${configData?.data?.pageData?.["section2 link5"]}`}
            >
              {configData?.data?.pageData?.["section2 content5"]}
            </Link>
            <Link
              className="text-slate-100 text-base font-medium hover:text-primary"
              href={`${configData?.data?.pageData?.["section2 link6"]}`}
            >
              {configData?.data?.pageData?.["section2 content6"]}
            </Link>
          </div>
        </div>
      </footer>
      <div className="bg-[#282929] text-white text-sm py-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
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
