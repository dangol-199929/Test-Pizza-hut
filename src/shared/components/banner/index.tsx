import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import BannerSkeletonLoader from "../skeleton/banner";
import { useRouter } from "next/router";
import { useGetWebHome } from "@/hooks/webhome.hooks";

const Banner = () => {
  const router = useRouter();
  const { homeData, isInitialLoading } = useGetWebHome();

  const handleOpenNewTab = (value: any, type: string) => {
    if (type === "Website") {
      window.open(value, "_blank");
    } else if (type === "Category") {
      router.push(`/categories/${value}`);
    } else if (type === "Product") {
      router.push(`/products/${value}`);
    } else {
      null;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mx-4">
      {isInitialLoading ? (
        <BannerSkeletonLoader />
      ) : (
        <>
          {homeData && homeData?.data && homeData?.data?.banners && (
            <Swiper
              loop={true}
              className="mySwiper"
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              centeredSlides={true}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination, EffectFade]}
              effect="fade"
            >
              {homeData?.data?.banners.map((prev, index) => (
                <SwiperSlide
                  key={`banner-images-${index}`}
                  onClick={() =>
                    handleOpenNewTab(`${prev.slug}`, prev?.linkType)
                  }
                >
                  <Image
                    src={
                      prev?.webpBannerImage
                        ? prev?.webpBannerImage
                        : prev.bannerImage
                    }
                    alt={prev.linkType}
                    width={1408}
                    height={597}
                    className="rounded-lg"
                    priority
                    quality={100}
                    style={{ height: "auto", width: "100%" }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </>
      )}
    </div>
  );
};

export default Banner;
