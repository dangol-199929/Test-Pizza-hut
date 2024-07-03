import { ICartData } from "@/interface/cart.interface";
import { IProduct } from "@/interface/product.interface";
import Card from "@/shared/components/card";
import SkeletonLoadingCard from "@/shared/components/skeleton/products";
import Title from "@/shared/components/title";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Grid } from "swiper";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

export interface IRelatedProducts {
  relatedProducts: IProduct[];
  relatedProductsLoading: boolean;
  favList: any;
  cart: ICartData | undefined;
}

const RelatedProducts = ({
  relatedProducts,
  favList,
  relatedProductsLoading,
  cart,
}: IRelatedProducts) => {
  const [productModalId, setProductModalId] = useState<string>("");

  //For swiper
  const [nextDisable, setNextDisable] = useState<boolean>(false);
  const [prevDisable, setPrevDisable] = useState<boolean>(false);
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();

  //handling prev and next of swiper category
  const handlePrevious = useCallback(() => {
    setNextDisable(false);
    if (swiperRef) {
      swiperRef?.slidePrev();
    }
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    setPrevDisable(false);
    if (swiperRef) {
      swiperRef?.slideNext();
    }
  }, [swiperRef]);

  /**
   * Updates the search data and shows all items as well as fav products as well
   */
  const updatedData = relatedProducts?.map((item: any) => ({
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

  return (
    <section className="mt-6 max-w-full bg-white rounded-xl p-6">
      <div className="!p-0">
        <div className="flex items-center justify-between">
          <Title type="title-section" text="You May Like" />
          {/* {relatedProducts?.length > 5 && (
            <div className="!static productSwiper-navigation mb-[45px]">
              <button disabled={prevDisable} onClick={handlePrevious}>
                <FaChevronLeft />
              </button>
              <button disabled={nextDisable} onClick={handleNext}>
                <FaChevronRight />
              </button>
            </div>
          )} */}
        </div>
        {relatedProductsLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((index) => (
              <SkeletonLoadingCard key={`app-skeleton-${index}`} />
            ))}
          </div>
        ) : (
          relatedProducts && (
            <Swiper
              slidesPerView={5}
              grid={{
                rows: 1,
                fill: "row",
              }}
              pagination={false}
              spaceBetween={20}
              modules={[Grid]}
              className="productSwiper"
              onSwiper={setSwiperRef}
              onBeforeInit={() => setPrevDisable(true)}
              onReachBeginning={() => setPrevDisable(true)}
              onReachEnd={() => setNextDisable(true)}
              onSlideChange={() => {
                // Enable/disable buttons based on the current slide index
                if (swiperRef) {
                  const isAtBeginning = swiperRef.isBeginning;
                  const isAtEnd = swiperRef.isEnd;

                  setPrevDisable(isAtBeginning);
                  setNextDisable(isAtEnd);
                }
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  grid: {
                    rows: 1,
                    fill: "row",
                  },
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  grid: {
                    rows: 1,
                    fill: "row",
                  },
                  spaceBetween: 20,
                },
                1050: {
                  slidesPerView: 2.5,
                  grid: {
                    rows: 1,
                    fill: "row",
                  },
                  spaceBetween: 20,
                },
              }}
            >
              {updatedData?.map((product: any, index: any) => (
                <SwiperSlide key={`related-products-${product?.id}`}>
                  <Card
                    setProductModalId={setProductModalId}
                    product={product}
                    key={`app-cat-products-${product?.id}`}
                    cartItem={cart?.cartProducts?.find(
                      (item) => item?.product?.id === product?.id
                    )}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )
        )}
      </div>
    </section>
  );
};

export default RelatedProducts;
