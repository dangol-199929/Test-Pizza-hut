import "react-range-slider-input/dist/style.css";

import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";

import PizzaCategorySidebar from "@/features/Category/category-sidebar";
import CategoryPizza from "@/features/Category/catogory-pizza";
import { NextPageWithLayout } from "@/pages/_app";
import Breadcrumb from "@/shared/components/breadcrumb";
import MainLayout from "@/shared/main-layout";
import { config } from "../../../config";

const CategoryDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Head>
        <title>{slug || "Menu"}</title>
      </Head>
      <Breadcrumb title={"PIZZA HUT MENU"} />
      <div className="my-[40px] ">
        <div className="container grid grid-cols-12 md:gap-[30px]">
          <PizzaCategorySidebar />
          <CategoryPizza />
        </div>
      </div>
    </>
  );
};

export default CategoryDetail;

CategoryDetail.getLayout = (page) => {
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
