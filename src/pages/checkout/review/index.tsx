import MainLayout from "@/shared/main-layout";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { OrderSuccess, OrderFailure } from "@/shared/lib/image-config";
import Image from "next/image";
import { config } from "../../../../config";
import axios from "axios";

const Review = () => {
  const router = useRouter();
  const { success } = router.query;
  return (
    <>
      <div className="pb-[80px]">
        <div className="container">
          {success === "true" ? (
            <div>
              {/* Order Success */}
              <div className="max-w-[520px] mx-auto text-center mt-[20px]">
                <Image
                  alt="Order success Img"
                  width={200}
                  height={200}
                  className="mx-auto"
                  src={OrderSuccess}
                />
                <div>
                  <h2 className="font-medium my-[30px] mb-[19px] text-[26px]">
                    Order Has Been Placed Successfully
                  </h2>
                  <p className="text-black text-[18px]">
                    Thank you for using Pizza Hut. Your request has been
                    successfully placed.
                  </p>
                </div>
                <div className="mt-[35px]">
                  <Link
                    href="/"
                    className="bg-primary text-white inline-block font-bold tracking-wide leading-none py-[13px] px-[22px] text-center uppercase rounded-full hover:bg-slate-850 hover:text-base-100"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Order Fail */}
              <div className="max-w-[520px] mx-auto text-center mt-[20px]">
                <Image
                  alt="Fail image"
                  width={200}
                  height={200}
                  className="mx-auto"
                  src={OrderFailure}
                />
                <div>
                  <h2 className="font-medium my-[30px] mb-[19px] text-[26px]">
                    {" "}
                    Payment Failed{" "}
                  </h2>
                  <p className="text-black text-[18px]">
                    Your order has been placed but payment has been failed due
                    to some error. Please contact Pizza Hut for more details.
                  </p>
                </div>
                <div className="mt-[35px]">
                  <Link
                    href="/"
                    className="bg-primary text-white inline-block font-bold tracking-wide leading-none py-[13px] px-[22px] text-center uppercase rounded-full hover:bg-slate-850 hover:text-base-100"
                  >
                    BACK TO HOMEPAGE
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Review;
Review.getLayout = (page: any) => {
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
