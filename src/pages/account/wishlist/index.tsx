import { useGetCartProductHooks } from "@/hooks/getCartProduct.hooks";
import { getWishlists } from "@/services/wishlist.service";
import AccountSidebarLayout from "@/shared/account-sidebar-layout";
import Card from "@/shared/components/card";
import Pagination from "@/shared/components/pagination";
import SkeletonLoadingCard from "@/shared/components/skeleton/products";
import MainLayout from "@/shared/main-layout";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useState } from "react";

const Wishlist = () => {
  const token = getToken();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [productModalId, setProductModalId] = useState<string>("");
  const { cartProducts: cart } = useGetCartProductHooks();

  const perPage = 15;
  const { data: wishlist, isLoading } = useQuery(
    ["getWishlists", pageNumber, perPage],
    () =>
      getWishlists(pageNumber, perPage).then((response) => {
        return response;
      })
  );
  const { data: favList }: any = useQuery<any>(["wishlistProducts", token], {
    enabled: !!token,
  });
  const updatedData = wishlist?.data?.map((item: any) => ({
    ...item,
    product: {
      ...item.product,
      isFav:
        favList && favList?.data?.length > 0
          ? favList?.data?.some(
              (favItem: any) => favItem?.product_id === item?.product?.id
            )
          : false,
      favId:
        favList && favList.data.length > 0
          ? favList?.data.find(
              (favItem: any) => favItem.product_id === item?.product?.id
            )?.id
          : 0,
    },
  }));
  const handlePageChange = (value: number) => {
    setPageNumber(value);
  };
  return (
    <>
      <Head>
        <title>Pizza Hut | Favorites</title>
      </Head>
      <h5 className="py-4 text-3xl font-black">Favorites</h5>
      <div className="">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3">
            {[1, 2, 3, 4, 5].map((index) => (
              <SkeletonLoadingCard key={`app-skeleton-${index}`} />
            ))}
          </div>
        ) : (
          <>
            <div>
              <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3">
                {updatedData?.map((favProduct: any, index: any) => (
                  <Card
                    setProductModalId={setProductModalId}
                    product={favProduct?.product}
                    key={`app-cat-products-${favProduct?.id}`}
                    cartItem={cart?.cartProducts?.find(
                      (item) => item?.product?.id === favProduct?.product?.id
                    )}
                  />
                ))}
              </div>
              {wishlist?.meta?.pagination?.total > 15 && (
                <Pagination
                  currentPage={wishlist?.meta?.pagination?.current_page}
                  pageChange={handlePageChange}
                  totalPages={wishlist?.meta?.pagination?.total_pages}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Wishlist;

Wishlist.getLayout = (page: any) => {
  const configData = page?.props;
  return (
    <MainLayout configData={configData}>
      <AccountSidebarLayout>{page}</AccountSidebarLayout>
    </MainLayout>
  );
};
