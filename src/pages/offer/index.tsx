import React, { useState } from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import Card from "@/shared/components/card";
import { useQuery } from "@tanstack/react-query";
import { getOffers } from "@/services/offer.service";
import Breadcrumb from "@/shared/components/breadcrumb";
import Head from "next/head";
import Pagination from "@/shared/components/pagination";
import SortingDropdown from "@/shared/components/sorting-dropdown";
import SkeletonLoadingCard from "@/shared/components/skeleton/products";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import EmptyOffer from "@/shared/components/empty-content/empty-offer";
import { config } from "../../../config";
import axios from "axios";
import { ICartData } from "@/interface/cart.interface";
import { useGetCartProductHooks } from "@/hooks/getCartProduct.hooks";

const Offer: NextPageWithLayout = () => {
  const token = getToken();
  const [query, setQuery] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedPriceValue, setSelectedPriceValue] = useState<string>("");
  const [productModalId, setProductModalId] = useState<string>("");

  const offer = true;

  const {
    data: offers,
    isLoading,
    error,
  } = useQuery(
    ["getOffers", query, pageNumber, offer, selectedValue, selectedPriceValue],
    () => getOffers(query, pageNumber, offer, selectedValue, selectedPriceValue)
  );

  const { data: favList }: any = useQuery<any>(["wishlistProducts", token], {
    enabled: !!token,
  });
  const { cartProducts: cart } = useGetCartProductHooks();

  /**
   * Updates the search data and shows all items as well as fav products as well
   */
  const updatedData = offers?.data?.map((item: any) => ({
    ...item,
    isFav:
      favList && favList?.data?.length > 0
        ? favList?.data?.some(
            (favItem: any) => favItem?.product_id === item?.id
          )
        : false,
    favId:
      favList && favList.data.length > 0
        ? favList?.data.find((favItem: any) => favItem.product_id === item.id)
            ?.id
        : 0,
  }));

  const handlePageChange = (value: number) => {
    setPageNumber(value);
  };

  //Fetch Product Data
  const handleSortingChange = (value: string) => {
    if (value === "asc" || value === "desc") {
      setSelectedValue(value);
      setSelectedPriceValue("");
    } else if (value === "low" || value === "high") {
      setSelectedPriceValue(value);
      setSelectedValue("");
    }
  };
  return (
    <>
      <Head>
        <title>Offers</title>
      </Head>
      {offers?.data?.length === 0 ? (
        <EmptyOffer />
      ) : (
        <>
          <Breadcrumb title="Offer" />

          <div className="offer-page">
            <div className="container">
              <section className="my-[60px]">
                <div>
                  {/* <div className="flex flex-col sm:flex-row px-[30px] py-[10px] mb-[30px] bg-slate-150">
                    <div className="flex-1 flex items-center mb-4 sm:mb-0 gap-[15px]">
                      <p className="text-gray-750 text-sm leading-[20px]">
                        There Are {offers?.data?.length} Products.
                      </p>
                    </div>
                    <div className="flex items-center gap-[10px]">
                      <p className="text-gray-750 text-sm leading-[20px] p-2">
                        Sort By:
                      </p>
                      <SortingDropdown sortChange={handleSortingChange} />
                    </div>
                  </div> */}
                  {isLoading ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {[1, 2, 3, 4, 5].map((index) => (
                        <SkeletonLoadingCard key={`app-skeleton-${index}`} />
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {updatedData?.map((product: any) => (
                          <Card
                            setProductModalId={setProductModalId}
                            product={product}
                            key={`app-cat-products-${product?.id}`}
                            cartItem={cart?.cartProducts?.find(
                              (item) => item?.product?.id === product?.id
                            )}
                          />
                        ))}
                      </div>
                      {offers?.meta?.pagination?.total > 15 && (
                        <Pagination
                          totalPages={offers?.meta?.pagination?.total_pages}
                          currentPage={offers?.meta?.pagination?.current_page}
                          pageChange={handlePageChange}
                        />
                      )}
                    </>
                  )}
                </div>
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Offer;
Offer.getLayout = (page) => {
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
