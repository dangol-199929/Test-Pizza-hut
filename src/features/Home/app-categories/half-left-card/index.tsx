import { IProduct } from '@/interface/product.interface'
import Title from '@/shared/components/title'
import SearchIcon from '@/shared/icons/common/SearchIcon'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Grid } from 'swiper'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { useConfig as useConfigStores } from '@/store/config';


export interface IProps {
    updatedData: any
}
const HalfLeftCard = ({ updatedData }: IProps) => {
    const [nextDisable, setNextDisable] = useState<boolean>(false)
    const [prevDisable, setPrevDisable] = useState<boolean>(false)
    const [swiperRef, setSwiperRef] = useState<SwiperClass>();
    const { configData } = useConfigStores();
    //handling prev and next of swiper category
    const handlePrevious = useCallback(() => {
        setNextDisable(false)
        if (swiperRef) {
            swiperRef?.slidePrev();
        }
    }, [swiperRef]);

    const handleNext = useCallback(() => {
        setPrevDisable(false)
        if (swiperRef) {
            swiperRef?.slideNext();
        }
    }, [swiperRef]);

    return (
        <div className="relative py-[60px]" style={{ backgroundImage: `url(${updatedData?.icon})` }}  >
            <div className='container'>
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-12 lg:col-span-6'>
                    </div>
                    <div className='col-span-12 lg:col-span-6'>
                        <div className="relative flex items-center justify-between ">
                            <Title type="title-section" className='text-white text-2xl capitalize font-semibold mb-[15px]' text={updatedData?.title} />
                            {
                                updatedData?.product?.length > 0 && (
                                    <div className='!static productSwiper-navigation mb-[45px]'>
                                        <button
                                            className='bg-white'
                                            disabled={prevDisable}
                                            onClick={handlePrevious}
                                        >
                                            <FaChevronLeft />
                                        </button>
                                        <button
                                            className='bg-white'
                                            disabled={nextDisable}
                                            onClick={handleNext}
                                        >
                                            <FaChevronRight />
                                        </button>
                                    </div>
                                )
                            }

                        </div>
                        <Swiper
                            slidesPerView={5}
                            grid={{
                                rows: 2,
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
                                        rows: 2
                                    },
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 2,
                                    grid: {
                                        rows: 2
                                    },
                                    spaceBetween: 20,
                                },
                                1050: {
                                    slidesPerView: 2,
                                    grid: {
                                        rows: 2
                                    },
                                    spaceBetween: 20,
                                }
                            }}
                        >
                            {updatedData?.product?.map((product: IProduct, index: number) => (
                                <SwiperSlide key={`half-left-${product.id}`}>
                                    <div className='half-left-card'>
                                        <div className='relative half-left-card__image'>
                                            <Link href={`/products/${product?.slug}`}>
                                                <Image
                                                    className='half-left-card__image--img'
                                                    src={product?.images[0]?.imageName}
                                                    alt='Left Image'
                                                    width={216}
                                                    height={270}
                                                    quality={100}
                                                    style={{
                                                        height: 'auto',
                                                        width: 'auto',
                                                    }}
                                                />
                                            </Link>

                                            <div className='half-left-card__image--view'>
                                                <Link
                                                    href={`/products/${product?.slug}`}
                                                    className="flex items-center justify-center"
                                                >
                                                    <SearchIcon className="max-w-[15px] h-auto" />
                                                </Link>
                                            </div>
                                            {
                                                product?.variants[0]?.hasOffer &&
                                                <p className="absolute left-0 px-2 leading-[18px] text-[10px] font-medium text-white rounded-md bottom-2 bg-red-250">Offer</p>
                                            }
                                        </div>
                                        <div className='half-left-card__desc'>
                                            <Link href={`/categories/${product?.categorySlug}`}
                                                className='block mb-2 text-xs font-normal uppercase text-gray-450 leading-1'
                                            >{
                                                    product?.restaurantName}
                                            </Link>
                                            {/* <div className='lg:tooltip tooltip-bottom' data-tip={product?.title}> */}
                                            <Link
                                                href={`/products/${product?.slug}`}
                                                className='half-left-card__desc--title'
                                            >
                                                {product?.name}
                                            </Link>
                                            {/* </div> */}
                                            {product?.variants[0]?.hasOffer ? (
                                                <>
                                                    <div className="flex flex-col">
                                                        <p className="flex-grow-0 mr-2 text-sm text-primary">
                                                            {configData?.data?.currency}{product?.variants[0]?.newPrice}
                                                        </p>
                                                        <p className="flex-grow-0 mr-2 text-xs font-semibold line-through text-gray-1450">
                                                            {configData?.data?.currency}
                                                            {product?.variants[0]?.oldPrice}
                                                        </p>
                                                    </div>
                                                </>
                                            ) : (
                                                <p className="text-sm font-semibold text-primary">
                                                    {configData?.data?.currency} {product?.variants[0]?.sellingPrice}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default HalfLeftCard