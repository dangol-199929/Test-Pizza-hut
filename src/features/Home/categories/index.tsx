import CategoryCard from "@/shared/components/category-card";
import CategorySkeletonLoading from "@/shared/components/skeleton/category";
import Title from "@/shared/components/title";
import React, { useCallback, useMemo, useState } from "react";
import { Grid, Navigation } from "swiper";
import { Swiper, SwiperClass, SwiperSlide, useSwiper } from "swiper/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface IProps {
  loading: boolean;
  categories: any;
}
const Categories: React.FC<IProps> = ({ loading, categories }) => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [nextDisable, setNextDisable] = useState<boolean>(false);
  const [prevDisable, setPrevDisable] = useState<boolean>(false);

  //handling prev and next of swiper category
  const handlePrevious = useCallback(() => {
    setNextDisable(false);
    if (swiperRef) {
      swiperRef?.slidePrev();
    }
  }, [swiperRef]);
  // const handlePrevious = () => {
  //     swiper?.slidePrev()
  // }

  const handleNext = useCallback(() => {
    setPrevDisable(false);
    if (swiperRef) {
      swiperRef?.slideNext();
    }
  }, [swiperRef]);

  // const handleNext = () => {
  //     swiper?.slideNext()
  // }

  return (
    <section className="my-[60px] relative">
      <Title
        mb="20px"
        type="title-section"
        text="Explore Menu"
        // subTitle="We've got something for everyone"
      />
      {/* {categories?.length > 6 && (
        <div className="productSwiper-navigation">
          <button disabled={prevDisable} onClick={handlePrevious}>
            <FaChevronLeft />
          </button>
          <button disabled={nextDisable} onClick={handleNext}>
            <FaChevronRight />
          </button>
        </div>
      )} */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6]?.map((index: number) => (
            <CategorySkeletonLoading key={`categories-${index}`} />
          ))}
        </div>
      ) : (
        <Swiper
          slidesPerView={3.5} // Default to showing 3.5 cards for all sizes until specific breakpoints are reached
          grid={{
            rows: 1,
            fill: "row",
          }}
          pagination={false}
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
              slidesPerView: 2, // Shows 1 and a half card on very small screens
              grid: {
                rows: 1,
              },
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4, // Shows 3 and a half cards on medium screens
              grid: {
                rows: 1,
              },
              spaceBetween: 20,
            },
            1050: {
              slidesPerView: 5, // Shows 4 and a half cards on large screens
              grid: {
                rows: 1,
              },
              spaceBetween: 20,
            },
          }}
        >
          {categories?.map((item: any, index: number) => (
            <SwiperSlide className="" key={`categories-${index}`}>
              <CategoryCard
                key={`categories-${index}`}
                title={item?.name}
                totalProducts={item?.productCount}
                shopLink={`menu?active=${item?.id}`}
                image={
                  item?.webpBackgroundImage
                    ? item?.webpBackgroundImage
                    : item?.backgroundImage
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default Categories;
