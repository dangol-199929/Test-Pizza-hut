import React, { useEffect, useState } from "react";
import { NextPageWithLayout } from "../../_app";
import MainLayout from "@/shared/main-layout";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getPageData } from "@/services/page.service";
import Breadcrumb from "@/shared/components/breadcrumb";
import Head from "next/head";
import SkeletonDynamicPage from "@/shared/components/skeleton/dynamic-page";
import { HomemImage } from "@/shared/lib/image-config";
import Image from "next/image";
import { config } from "../../../../config";
import axios from "axios";

const AboutUs: NextPageWithLayout = () => {
  const router = useRouter();
  const { asPath } = router;
  const [descriptionContent, setDescriptionContent] = useState<string>("");
  const path = asPath.split("/");
  // const slug = path[path.length - 1];
  // // const { data: aboutData, isInitialLoading: fetchLoading } = useQuery({
  // //   queryKey: ["getPageData", slug],
  // //   queryFn: async () => {
  // //     if (slug) {
  // //       const response = await getPageData(slug);
  // //       return response;
  // //     }
  // //   },
  // //   enabled: !!slug,
  // // });

  // // useEffect(() => {
  // //   if (aboutData) {
  // //     setDescriptionContent(aboutData?.data?.content || '');
  // //   }
  // // }, [aboutData]);
  return (
    <>
      <Head>
        <title>{"About Us"}</title>
      </Head>

      <Breadcrumb title={"About Us"} />
      <div className="main-wrapper-block">
        <div className="container">
          <div className="py-[50px] md:py-[100px]">
            <div className="grid grid-cols-12 gap-4 md:gap-0 mb-[50px] md:mb-[72px]">
              <div className="col-span-12 md:col-span-5">
                <div>
                  <p className="text-lg font-semibold leading-6 md:text-xl text-primary">
                    About Us
                  </p>
                  <h1 className="text-3xl md:text-5xl text-slate-450 leading-[40px] md:leading-[60px] font-bold tracking-wide">
                    Discover Our Restaurant Story
                  </h1>
                </div>
              </div>
              <div className="col-span-12 md:col-span-7">
                <p className="text-base md:text-lg leading-8 tracking-[0.18px]">
                  Welcome to Pizza Hut Restro and Bar - a culinary journey that
                  tantalizes your taste buds and elevates your dining experience
                  to new heights. Nestled in the heart of Jamsikhel, Lalitpur,
                  Pizza Hut Restro and Bar is not just a restaurant; it&apos;s
                  an embodiment of flavors, ambiance, and exceptional service.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-5 md:gap-5 mb-[50px] md:mb-[72px]">
              <div className="col-span-12 md:col-span-6">
                <Image
                  src={HomemImage}
                  width={580}
                  height={580}
                  quality={100}
                  className="w-full rounded-lg max-h-[500px]"
                  alt="About Image"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <div className="flex flex-wrap justify-between gap-6">
                  <Image
                    src={HomemImage}
                    width={900}
                    height={900}
                    quality={100}
                    className="max-w-[150px] md:max-w-[270px] h-auto rounded-lg"
                    alt="about-side"
                  />
                  <Image
                    src={HomemImage}
                    width={900}
                    height={900}
                    quality={100}
                    className="max-w-[150px] md:max-w-[270px] h-auto rounded-lg"
                    alt="about-side"
                  />
                  <Image
                    src={HomemImage}
                    width={900}
                    height={900}
                    quality={100}
                    className="max-w-[150px] md:max-w-[270px] h-auto rounded-lg"
                    alt="about-side"
                  />
                  <Image
                    src={HomemImage}
                    width={900}
                    height={900}
                    quality={100}
                    className="max-w-[150px] md:max-w-[270px] h-auto rounded-lg"
                    alt="about-side"
                  />
                </div>
              </div>
            </div>

            <div className="mb-[36px]">
              <h5 className="mb-3 text-lg font-bold md:mb-6 md:text-2xl">
                Our Story:
              </h5>
              <p className="text-base md:text-lg leading-8 tracking-[0.18px] text-slate-550">
                Pizza Hut Restro and Bar was founded with a shared passion for
                exceptional dining experiences. Fueled by a love for culinary
                arts and a commitment to quality, the vision was to create a
                place where delectable cuisine, exquisite drinks, and a
                welcoming atmosphere blend seamlessly to create cherished
                memories. This vision brought Pizza Hut Restro and Bar to life –
                a destination where flavors, ambiance, and hospitality
                intertwine to offer unforgettable moments.
              </p>
            </div>
            <div className="mb-[36px]">
              <h5 className="mb-3 text-lg font-bold md:mb-6 md:text-2xl">
                The Cuisine:
              </h5>
              <p className="text-base md:text-lg leading-8 tracking-[0.18px] text-slate-550">
                Prepare your taste buds for a remarkable journey through our
                diverse and thoughtfully curated menu. Our culinary artists
                blend traditional and contemporary techniques to create dishes
                that are both familiar and innovative. From savory to sweet, our
                menu pays homage to global cuisines while incorporating local
                and seasonal ingredients. Whether you&apos;re in the mood for a
                hearty meal or small plates to share, Pizza Hut Restro and Bar
                has something to satisfy every palate.
              </p>
            </div>
            <div className="mb-[36px]">
              <h5 className="mb-3 text-lg font-bold md:mb-6 md:text-2xl">
                The Bar:
              </h5>
              <p className="text-base md:text-lg leading-8 tracking-[0.18px] text-slate-550">
                Our bar is an oasis for connoisseurs of fine spirits and
                creative cocktails. Indulge in handcrafted concoctions that
                marry premium ingredients with imaginative presentation. Our
                skilled mixologists are passionate about the art of
                cocktail-making, and their dedication is evident in every sip
                you take.
              </p>
            </div>
            <div className="mb-[36px]">
              <h5 className="mb-3 text-lg font-bold md:mb-6 md:text-2xl">
                Ambiance:
              </h5>
              <p className="text-base md:text-lg leading-8 tracking-[0.18px] text-slate-550">
                Step into an ambiance that exudes warmth, elegance, and a touch
                of contemporary flair. The interior design of Pizza Hut Restro
                and Bar is a symphony of comfort and style, offering both
                intimate corners for private conversations and spacious settings
                for gatherings. Whether it&apos;s a romantic dinner, a family
                celebration, or a casual night out with friends, our space is
                designed to cater to various occasions.
              </p>
            </div>
            <div className="mb-[36px]">
              <h5 className="mb-3 text-lg font-bold md:mb-6 md:text-2xl">
                Exceptional Service:
              </h5>
              <p className="text-base md:text-lg leading-8 tracking-[0.18px] text-slate-550">
                At Pizza Hut Restro and Bar, every guest is a cherished friend.
                Our attentive and knowledgeable staff is committed to providing
                an exceptional dining experience from the moment you walk
                through our doors. We take pride in anticipating your needs and
                ensuring that your visit is nothing short of extraordinary.
              </p>
            </div>
            <div>
              <h5 className="mb-3 text-lg font-bold md:mb-6 md:text-2xl">
                Events and Special Occasions:
              </h5>
              <p className="text-base md:text-lg leading-8 tracking-[0.18px] text-slate-550">
                Beyond being a delightful dining destination, Pizza Hut Restro
                and Bar is also the perfect venue for your special events. From
                birthdays to anniversaries, corporate gatherings to romantic
                proposals, our team is here to assist you in crafting an event
                that will be remembered for years to come.
              </p>
            </div>
          </div>
        </div>
      </div>
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
