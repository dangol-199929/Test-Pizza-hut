import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { useGetCartsHooks } from "@/hooks/getCart.hooks";
import { useWishlists } from "@/hooks/wishlist.hooks";
import { ICartData, ICreateCartItem } from "@/interface/cart.interface";
import { ICartProduct } from "@/interface/product.interface";
import { ITag } from "@/interface/tag.interface";
import { addToCart } from "@/services/cart.service";
import { getProductsFromSlug } from "@/services/product.service";
import CardHeartIcon from "@/shared/icons/common/CardHeartIcon";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { useCart as useCartStore } from "@/store/cart";
import { useConfig as useConfigStores } from "@/store/config";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import ButtonLoader from "../btn-loading";
import SkeletonDescription from "../skeleton/description";
import SkeletonImage from "../skeleton/image";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useGetCartProductHooks } from "@/hooks/getCartProduct.hooks";

interface IProductModal {
  slug: string;
  // setProductModalId: (arg: string) => void
  setOpen: (arg: boolean) => void;
}

const ProductDetailModal = ({ slug, setOpen }: IProductModal) => {
  const { coupon } = useCartStore();
  const { configData } = useConfigStores();
  const token = getToken();
  const queryClient = useQueryClient();
  const [descriptionContent, setDescriptionContent] = useState<string>("");
  const [moreInfoContent, setMoreInfoContent] = useState<string>("");
  const [taxMessage, setTaxMessage] = useState<string>("");

  const [itemCartDetail, setItemCartDetail] = useState<ICartProduct>();
  const [value, setValue] = useState<number>(1);
  // const { updateCartLoading } = useCarts()
  //for swiper carousel
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const { cart, cartLoading } = useGetCartsHooks();
  const { cartProducts: cartList } = useGetCartProductHooks();
  const {
    data: productData,
    isLoading,
    error,
  } = useQuery(["getProductsFromSlug", slug], async () => {
    if (slug) {
      const response = await getProductsFromSlug(slug);
      const productId = response?.data?.id;
      return { response, productId };
    }
  });
  //For SKU
  const [selectedSizeId, setSelectedSizeId] = useState<number>(0);
  const unitPriceArray = productData?.response?.data?.variants || [];
  const filteredUnitPrice = selectedSizeId
    ? unitPriceArray.filter((sizeObj: any) => sizeObj.size === selectedSizeId)
    : unitPriceArray;

  //For checking if the selected size and the mapped pricec are equal to show the change in price
  const selectedPrice = productData?.response?.data?.variants?.find(
    (price: any) => price?.id === selectedSizeId
  );

  /**
   * Here the wepbImage is filtered according to unit_price_id or if the unit_price id is null,
   * Then it is sorted to show the image having id null in the last place of the loop.
   */
  const selectedImg = productData?.response?.data?.webpImages
    ? productData?.response?.data?.webpImages
        .filter(
          (img: any) =>
            selectedSizeId === img.unit_price_id || !img.unit_price_id
        )
        .sort((a: any, b: any) => (a.unit_price_id < b.unit_price_id ? 1 : -1))
    : productData?.response?.data?.images
        .filter(
          (img: any) =>
            selectedSizeId === img.unit_price_id || !img.unit_price_id
        )
        .sort((a: any, b: any) => (a.unit_price_id < b.unit_price_id ? 1 : -1));

  const updatedCart = cartList?.cartProducts?.find(
    (cartItem: any) => JSON.parse(cartItem?.selectedUnit?.id) === selectedSizeId
  )
    ? true
    : false;

  //checking stock for each product/sku element
  const stock: any = productData?.response?.data?.variants?.find(
    (price: any) => price?.id === selectedSizeId
  )?.stock;

  const selectedCartItems: ICartProduct | undefined =
    cartList?.cartProducts?.find(
      (cart: any) => JSON.parse(cart?.selectedUnit?.id) === selectedSizeId
    );

  const handleAddToCart = () => {
    const payload: ICreateCartItem = {
      note: "",
      variant_id: selectedSizeId,
      quantity: value,
    };
    mutation.mutate(payload);
  };

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      if (selectedCartItems && updatedCart) {
        showToast(TOAST_TYPES.success, "Product Updated Successfully");
      } else {
        showToast(TOAST_TYPES.success, "Item Added To Cart Successfully");
      }

      queryClient.invalidateQueries(["getCart"]);
      if (coupon) {
        queryClient.invalidateQueries(["addCoupon"]);
      }
      // setProductModalId('')
      setOpen(false);
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error?.response?.data?.errors[0]?.message);
    },
  });

  // const updateCartMutation = useMutation({
  //     mutationFn: updateCart,
  //     onSuccess: () => {
  //         showToast(TOAST_TYPES.success, 'Item Updated To Cart Successfully');
  //         queryClient.invalidateQueries(['getCart'])
  //         setProductModalId("")
  //     },
  //     onError: (error: any) => {
  //         showToast(TOAST_TYPES.error, error?.response?.data?.errors[0]?.message);
  //     }
  // })
  // //updateCart function
  // const updateCartHandler = () => {
  //     if (value <= stock) {
  //         const payload: IUpdateCartItem = {
  //             note: '',
  //             quantity: value,
  //             product_number: selectedCartItems?.id || itemCartDetail?.id || productData?.productId
  //         }
  //         updateCartMutation.mutate(payload)
  //     }
  // }
  const { addFavMutation, removeFavMutation, addLoading, removeLoading } =
    useWishlists(); //for adding products for wishlist ->hook
  //getFavlist items
  const { data: favList }: any = useQuery<any>(["wishlistProducts", token], {
    enabled: !!token,
  });

  /*
   ** Add product in favourite list
   */
  const addToFav = (id: number) => {
    addFavMutation.mutate(id);
  };

  /*
   ** Remove product from favourite list
   */
  const removeFromFav = (id: number) => {
    removeFavMutation.mutate(id);
  };

  /**
   * to check if the product is in fav list or not
   */
  const isFavGen = () => {
    if (favList && favList?.data?.length > 0) {
      const isfavResult = favList?.data?.some(
        (favItem: any) => favItem?.product_id === productData?.productId
      );
      return isfavResult;
    }
  };

  /**
   * To generate the fav id in order to implement remove from fav
   */
  const genFavId = () => {
    if (favList && favList?.data?.length > 0) {
      const favId = favList?.data.find(
        (favItem: any) => favItem.product_id === productData?.productId
      );
      return favId?.id || 0;
    }
  };
  const favId = genFavId(); //setting generated fav id.

  useEffect(() => {
    if (cart) {
      cartList?.cartProducts?.map((item: any) => {
        if (slug === item?.product?.slug) {
          setItemCartDetail(item);
        }
      });
    }
  }, [slug, cart]);

  useEffect(() => {
    if (productData) {
      setDescriptionContent(productData?.response?.data?.description || "");
      setMoreInfoContent(productData?.response?.data?.description || "");
      const message = productData?.response?.data?.taxable
        ? "Including Tax"
        : "Excluding Tax";
      setTaxMessage(message);
    }
  }, [productData]);

  useEffect(() => {
    if (productData) {
      setSelectedSizeId(productData?.response?.data?.variants[0]?.id);
    }
  }, [productData]);

  useEffect(() => {
    setValue(1);
  }, [selectedSizeId]);

  useEffect(() => {
    if (updatedCart) {
      setValue(selectedCartItems?.quantity!);
    } else {
      setValue(1);
    }
  }, [selectedCartItems, selectedSizeId]);

  /**
   * To display toast if stock limit reached
   */
  useEffect(() => {
    if (value === stock) {
      showToast(TOAST_TYPES.warning, "Stock limit reached");
    }
  }, [value]);

  return (
    <DialogHeader>
      <DialogTitle>
        {/* <div className='flex items-center justify-between'>
                    <h3 className="text-lg font-bold"></h3>
                    <button onClick={() => setProductModalId('')}><FaTimes /></button>
                </div> */}
      </DialogTitle>
      <DialogDescription>
        <div className="grid grid-cols-12 gap-0 md:gap-[35px]">
          <div className="col-span-12 md:col-span-5">
            {isLoading ? (
              <SkeletonImage />
            ) : productData?.response?.data?.variants.length > 1 &&
              selectedImg ? (
              <>
                <Swiper
                  spaceBetween={10}
                  thumbs={
                    thumbsSwiper
                      ? {
                          swiper:
                            thumbsSwiper && !thumbsSwiper.destroyed
                              ? thumbsSwiper
                              : null,
                        }
                      : undefined
                  }
                  modules={[Thumbs]}
                  className="mySwiper2"
                >
                  {selectedImg?.map((img: any, index: number) => (
                    <SwiperSlide key={index}>
                      <Image
                        alt="Product Image"
                        src={img?.imageName}
                        className="w-full m-auto"
                        width={330}
                        height={330}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  watchSlidesProgress={true}
                  modules={[Thumbs, Navigation]}
                  className="mt-3 mySwiper thumbSwiper"
                  navigation={productData?.response?.data?.images?.length > 3}
                >
                  {selectedImg?.map((img: any, index: number) => (
                    <SwiperSlide key={index}>
                      <Image
                        alt="Product Image"
                        className="m-auto cursor-pointer"
                        src={img?.imageName}
                        width={90}
                        height={90}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            ) : (
              <>
                <Swiper
                  spaceBetween={10}
                  thumbs={
                    thumbsSwiper
                      ? {
                          swiper:
                            thumbsSwiper && !thumbsSwiper.destroyed
                              ? thumbsSwiper
                              : null,
                        }
                      : undefined
                  }
                  modules={[Thumbs]}
                  className=" mySwiper2"
                >
                  {productData?.response?.data?.images?.map(
                    (img: any, index: number) => (
                      <SwiperSlide key={index}>
                        <Image
                          alt="Product Image"
                          src={img?.imageName}
                          width={330}
                          height={330}
                          className="w-full max-w-[200px] md:max-w-[330px] m-auto"
                        />
                      </SwiperSlide>
                    )
                  )}
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  watchSlidesProgress={true}
                  modules={[Thumbs, Navigation]}
                  className="mt-3 mySwiper thumbSwiper "
                  navigation={productData?.response?.data?.images?.length > 3}
                >
                  {filteredUnitPrice?.length > 1
                    ? filteredUnitPrice.map((sizeObj: any, index: number) => (
                        <SwiperSlide key={index}>
                          <Image
                            className="cursor-pointer"
                            alt="Product image"
                            src={sizeObj?.image?.imageName}
                            width={90}
                            height={90}
                          />
                        </SwiperSlide>
                      ))
                    : productData?.response?.data?.images?.map(
                        (img: any, index: number) => (
                          <SwiperSlide key={index}>
                            <Image
                              className="h-auto m-auto cursor-pointer"
                              alt="Product Image"
                              src={img?.imageName}
                              width={90}
                              height={90}
                            />
                          </SwiperSlide>
                        )
                      )}
                </Swiper>
              </>
            )}
          </div>
          <div className="col-span-12 md:col-span-7">
            {isLoading ? (
              <SkeletonDescription />
            ) : (
              <>
                <h2 className="mt-5 mb-6 text-2xl font-semibold break-words md:mt-0 text-slate-850 text-start">
                  {productData?.response?.data?.name}
                </h2>
                {configData?.data?.checkStock && (
                  <p className="mb-2 text-sm font-bold text-slate-850 text-start">
                    Availability:{" "}
                    {selectedPrice?.stock === 0 ? (
                      <span className="font-semibold text-red-250">
                        Out Of Stock
                      </span>
                    ) : (
                      <span className="font-semibold text-primary">
                        In Stock
                      </span>
                    )}
                  </p>
                )}
                <p className="flex items-center gap-3 mb-2 text-sm font-bold text -slate-850">
                  Category:
                  <Link
                    href={`/categories/${productData?.response?.data?.categorySlug}`}
                    aria-label="category-title"
                    className="mb-0 text-primary hover:text-orange-450"
                  >
                    <span className="font-normal">
                      {productData?.response?.data?.restaurantName}
                    </span>
                  </Link>
                </p>
                {productData?.response?.data?.tags.length > 0 && (
                  <p className="flex items-center gap-3 mb-2 text-sm font-bold text-slate-850">
                    Tags:
                    {productData?.response?.data?.tags.map(
                      (prev: ITag, index: number) => (
                        <>
                          <Link
                            href={`/tag?id=${prev?.slug}`}
                            aria-label="tag-title"
                            className="mb-0 capitalize text-primary hover:text-orange-450"
                            key={`tag-${index}`}
                          >
                            <span className="font-normal">{prev?.name}</span>
                            {index <
                              productData?.response?.data?.tags.length - 1 &&
                              ","}
                          </Link>
                        </>
                      )
                    )}
                  </p>
                )}
                <ul className="flex my-5">
                  {selectedPrice && selectedPrice?.hasOffer ? (
                    <>
                      <li className="mr-1 text-base text-primary">
                        {configData?.data?.currency}
                        <span className="ml-1">
                          {selectedPrice?.newPrice * value}
                        </span>
                      </li>

                      <li className="mr-1 text-base font-semibold line-through text-gray-1450">
                        {configData?.data?.currency}{" "}
                        <span>{selectedPrice?.oldPrice * value}</span>
                      </li>
                    </>
                  ) : (
                    <li className="mr-1 text-base font-bold text-primary">
                      {configData?.data?.currency}
                      <span className="ml-1">
                        {selectedPrice?.sellingPrice * value}
                      </span>
                    </li>
                  )}
                  <li className="font-semibold text-start text-normal text-primary ">
                    ( <span dangerouslySetInnerHTML={{ __html: taxMessage }} />)
                  </li>
                </ul>

                <p
                  className="text-sm font-normal leading-6 text-start"
                  dangerouslySetInnerHTML={{
                    __html: selectedPrice?.description,
                  }}
                />

                {unitPriceArray?.length > 1 && (
                  <div className="mt-3">
                    <p className="mb-3 text-lg font-bold text-slate-850">
                      Size
                    </p>
                    <Select
                      value={selectedSizeId}
                      onValueChange={(e: any) => setSelectedSizeId(e)}
                    >
                      <SelectTrigger className="h-auto p-2 border-primary w-fit">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="z-[999]">
                        {unitPriceArray?.map((size: any, index: number) => (
                          <SelectItem
                            key={index}
                            value={size?.id}
                            className="focus:bg-primary focus:text-white"
                          >
                            {size?.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="w-100 flex items-start md:flex-row gap-2 my-[30px]">
                  <div className="h-[48px] flex items-center border border-solid border-gray-950 overflow-hidden relative text-gray-250">
                    <button
                      onClick={() => {
                        setValue(value - 1);
                      }}
                      disabled={value === 1 ? true : false}
                      className="w-6 h-12 text-sm font-medium text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                    >
                      -
                    </button>
                    <Input
                      type="text"
                      name="qtybutton"
                      className="border-0 p-0 flex-grow w-[30px] text-sm text-center bg-transparent h-auto md:h-[48px] focus-visible:border-none focus-visible:outline focus:outline-none selection:bg-transparent"
                      readOnly
                      value={value}
                    />
                    <button
                      onClick={() => {
                        setValue(value + 1);
                      }}
                      disabled={value === stock ? true : false}
                      className="w-6 h-12 text-sm font-medium text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {itemCartDetail && updatedCart ? (
                      <Button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={
                          mutation.isLoading || selectedPrice?.stock === 0
                        }
                        className={`${
                          mutation.isLoading && "opacity-70 "
                        } disabled:cursor-not-allowed flex items-center gap-4 relative px-[30px] md:px-[55px] font-bold uppercase rounded-[30px] bg-accent text-white h-[48px] text-xs md:text-sm hover:bg-orange-250 hover:text-white`}
                      >
                        + Update To Cart
                        {mutation.isLoading && <ButtonLoader />}
                      </Button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={
                          mutation.isLoading || selectedPrice?.stock === 0
                        }
                        className={`${
                          mutation.isLoading && "opacity-70 "
                        } disabled:cursor-not-allowed flex items-center gap-4 relative px-[30px] md:px-[55px] font-bold uppercase rounded-[30px] bg-accent text-white h-[48px] text-sm hover:bg-orange-250 hover:text-white`}
                      >
                        + Add To Cart
                        {mutation.isLoading && <ButtonLoader />}
                      </button>
                    )}
                  </div>
                </div>
                {token &&
                  (isFavGen() ? (
                    <button
                      onClick={() => removeFromFav(productData?.productId)}
                      className="flex items-center gap-3 text-sm font-normal "
                    >
                      {removeLoading ? (
                        <ButtonLoader className="!border-primary" />
                      ) : (
                        <>
                          <CardHeartIcon className="stroke-[#E5002B] fill-[#E5002B]" />
                          Remove from wishlist
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => addToFav(productData?.productId)}
                      className="flex items-center gap-3 text-sm font-normal "
                    >
                      {addLoading ? (
                        <ButtonLoader className="!border-primary" />
                      ) : (
                        <>
                          <CardHeartIcon />
                          Add to wishlist
                        </>
                      )}
                    </button>
                  ))}
              </>
            )}
          </div>
        </div>
      </DialogDescription>
    </DialogHeader>
    // <>

    //     <input type="checkbox" id='productDetailModal' className="modal-toggle" defaultChecked />
    //     <div className="modal z-[100000]">
    //         <div className="w-full max-w-5xl rounded-lg lg:w-11/12 modal-box">
    //             <div className='flex items-center justify-between'>
    //                 <h3 className="text-lg font-bold"></h3>
    //                 <button onClick={() => setProductModalId('')}><FaTimes /></button>
    //             </div>

    //         </div>
    //     </div>
    // </>
  );
};

export default ProductDetailModal;
