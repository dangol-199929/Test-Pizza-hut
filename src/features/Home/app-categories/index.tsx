import React, { useCallback, useState } from "react";
import { Grid } from "swiper";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import { useGetCartProductHooks } from "@/hooks/getCartProduct.hooks";
import { IAppCategories } from "@/interface/home.interface";
import Card from "@/shared/components/card";
import HomeTitle from "@/shared/components/home-title";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import { useQuery } from "@tanstack/react-query";

import HalfLeftCard from "./half-left-card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface IProps {
  prev: IAppCategories;
}

const AppCategories: React.FC<IProps> = ({ prev }) => {
  const token = getToken();
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [nextDisable, setNextDisable] = useState<boolean>(false);
  const [prevDisable, setPrevDisable] = useState<boolean>(false);
  const [productModalId, setProductModalId] = useState<string>("");

  const { cartProducts: cart } = useGetCartProductHooks();
  const { data: favList }: any = useQuery<any>(["wishlistProducts", token], {
    enabled: !!token,
  });

  const updatedData = prev?.product?.map((item) => ({
    ...item,
    isFav:
      favList && favList.data.length > 0
        ? favList?.data.some((favItem: any) => favItem.product_id === item.id)
        : false,
    favId:
      favList && favList.data.length > 0
        ? favList?.data.find((favItem: any) => favItem.product_id === item.id)
            ?.id
        : 0,
  }));

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

  let content: any;
  if (prev?.product) {
    if (prev?.type === "half left") {
      content = <HalfLeftCard updatedData={prev} />;
    } else {
      content = (
        <div className="container">
          <section className="mb-[60px]">
            <div className="relative flex items-center justify-center">
              <HomeTitle font="font" type="title-section" text={prev?.title} />
            </div>
            <div className="flex justify-end items-center -mt-6 mb-4 z-20 relative">
              {prev?.product?.length > 4 && (
                <div className="!static productSwiper-navigation">
                  <button disabled={prevDisable} onClick={handlePrevious}>
                    <FaChevronLeft />
                  </button>
                  <button disabled={nextDisable} onClick={handleNext}>
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </div>
            <>
              <Swiper
                slidesPerView={5}
                grid={{
                  rows:
                    prev?.type === "product horizontal" ||
                    prev?.type === "product vertical"
                      ? 1
                      : 2,
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
                      rows:
                        prev?.type === "product horizontal" ||
                        prev?.type === "product vertical"
                          ? 1
                          : 2,
                    },
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    grid: {
                      rows:
                        prev?.type === "product horizontal" ||
                        prev?.type === "product vertical"
                          ? 1
                          : 2,
                    },
                    spaceBetween: 20,
                  },
                  1050: {
                    slidesPerView: 4,
                    grid: {
                      rows:
                        prev?.type === "product horizontal" ||
                        prev?.type === "product vertical"
                          ? 1
                          : 2,
                    },
                    spaceBetween: 20,
                  },
                }}
              >
                {updatedData?.map((product, index) => (
                  <SwiperSlide key={`app-categories-${product?.id}`}>
                    <Card
                      product={product}
                      key={product?.id}
                      cartItem={cart?.cartProducts?.find(
                        (item) => item?.product?.id === product?.id
                      )}
                      setProductModalId={setProductModalId}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          </section>
        </div>
      );
    }
  }
  return <>{content}</>;
};

export default AppCategories;
