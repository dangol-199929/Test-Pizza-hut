import MainLayout from "@/shared/main-layout";
import { NextPageWithLayout } from "../_app";
import { getSearchResults } from "@/services/search.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Card from "@/shared/components/card";
import EmptyPage from "@/components/emptyPage";
import { useState } from "react";
import Breadcrumb from "@/shared/components/breadcrumb";
import Head from "next/head";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import SortingDropdown from "@/shared/components/sorting-dropdown";
import SkeletonLoadingCard from "@/shared/components/skeleton/products";
import Pagination from "@/shared/components/pagination";
import { config } from "../../../config";
import axios from "axios";
import { ICartData } from "@/interface/cart.interface";
import { useGetCartProductHooks } from "@/hooks/getCartProduct.hooks";

const SearchPage: NextPageWithLayout = () => {
  const router = useRouter();
  const token = getToken();
  const { type, keyword } = router.query;
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedPriceValue, setSelectedPriceValue] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [productModalId, setProductModalId] = useState<string>("");

  const { cartProducts: cart } = useGetCartProductHooks();

  const { data: searchData, isLoading } = useQuery(
    [
      "searchResults",
      type?.toString() || "",
      keyword?.toString() || "",
      selectedValue,
      pageNumber,
      selectedPriceValue,
    ],
    () =>
      getSearchResults(
        type?.toString() || "",
        keyword?.toString() || "",
        pageNumber,
        selectedValue,
        selectedPriceValue
      )
  );

  const { data: favList }: any = useQuery<any>(["wishlistProducts", token], {
    enabled: !!token,
  });

  /**
   * Updates the search data and shows all items as well as fav products as well
   */
  const updatedData = searchData?.data?.map((item: any) => ({
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

  const handleSortingChange = (value: string) => {
    if (value === "asc" || value === "desc") {
      setSelectedValue(value);
      setSelectedPriceValue("");
    } else if (value === "low" || value === "high") {
      setSelectedPriceValue(value);
      setSelectedValue("");
    }
  };

  /**
   * For page num change
   */
  const handlePageChange = (value: number) => {
    setPageNumber(value);
  };

  return (
    <div>
      <Head>
        <title>Search | {keyword}</title>
      </Head>
      {searchData?.data.length === 0 ? (
        <div className="my-[60px]">
          <EmptyPage type={type} />
        </div>
      ) : (
        <>
          <Breadcrumb title="Search" />
          <div className="offer-page">
            <div className="container">
              {/* Show the product data */}
              {type === "product" && (
                <div>
                  <div className="top-bar flex items-center justify-between bg-slate-150 mt-[60px] my-[20px] p-[10px]">
                    <div className="products-count">
                      <p className="text-sm font-normal text-gray-750">
                        There are{" "}
                        {keyword === ""
                          ? searchData?.meta?.pagination?.total
                          : searchData?.data?.length}{" "}
                        products
                      </p>
                    </div>
                    <div className="flex items-center sorting">
                      <p className="pr-3 text-sm font-normal text-gray-750">
                        Sort By:
                      </p>
                      <SortingDropdown sortChange={handleSortingChange} />
                    </div>
                  </div>
                  <section className="my-[60px]">
                    {isLoading ? (
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
                        {[1, 2, 3, 4, 5].map((index) => (
                          <SkeletonLoadingCard key={`app-skeleton-${index}`} />
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {updatedData.map((product: any) => (
                          <Card
                            setProductModalId={setProductModalId}
                            product={product}
                            cartItem={cart?.cartProducts?.find(
                              (item) => item?.product?.id === product?.id
                            )}
                            key={`app-cat-products-${product?.id}`}
                          />
                        ))}
                      </div>
                    )}
                  </section>
                </div>
              )}
            </div>
            {searchData?.meta?.pagination?.total > 15 && (
              <Pagination
                currentPage={searchData?.meta?.pagination?.current_page}
                totalPages={searchData?.meta?.pagination?.total_pages}
                pageChange={handlePageChange}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
SearchPage.getLayout = (page) => {
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
