import { deleteCookie, getCookie } from "cookies-next";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { setAuthorizationHeader } from "@/axios/axiosInstance";
import { useGetCategoriesHooks } from "@/hooks/geCategory.hooks";
import { useGetCartsHooks } from "@/hooks/getCart.hooks";
import { useDebounce } from "@/hooks/useDebounce.hooks";
import { IConfig } from "@/interface/config.interface";
import { IWareHouse } from "@/interface/home.interface";
import { logout } from "@/services/auth.service";
import { flushCart } from "@/services/cart.service";
import { getConfig } from "@/services/home.service";
import { getProfile } from "@/services/profile.service";
import { getSuggestionResults } from "@/services/search.service";
import CartDropdown from "@/shared/components/cartDropdown";
import ConfirmationModal from "@/shared/components/confirmation-modal";
import Drawer from "@/shared/components/drawer";
import { Badge } from "@/shared/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { LocalKeys } from "@/shared/enum";
import HeartIcon from "@/shared/icons/common/HeartIcon";
import LocationPinIcon from "@/shared/icons/common/LocationPinIcon";
import OfferIcon from "@/shared/icons/common/OfferIcon";
import UserIcon from "@/shared/icons/common/UserIcon";
import { Logo } from "@/shared/lib/image-config";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import { getWareId } from "@/shared/utils/local-storage-utils";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { useCart as useCartStore } from "@/store/cart";
import { useConfig as useConfigStores } from "@/store/config";
import { useProfile as useProfileStore } from "@/store/profile";
import { useWareHouse as useWareHouseStore } from "@/store/warehouse";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import SearchComponent from "./search-bar";

const Header = () => {
  const router = useRouter();
  const { pathname } = router;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const token = getToken();
  const loggedIn = getCookie("isLoggedIn");
  const queryClient = useQueryClient();

  const { configData } = useConfigStores();
  const { coupon, setCoupon, setCouponData } = useCartStore();
  const { warehouseId, setWareHouseId } = useWareHouseStore();
  const { profileData, setProfileData } = useProfileStore();

  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("product");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [logIn, setLogIn] = useState<boolean>(false);

  const [warehouseChange, setWarehouseChange] = useState<boolean>(false);
  const [warehouseName, setWarehouseName] = useState<string>("");
  const [showWarehouseAlertModal, setShowWarehouseAlertModal] =
    useState<boolean>(false);

  const debounceSearch = useDebounce(searchValue, 300); //Pass search value here and then this variable to the dependency below
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const { cart, cartLoading } = useGetCartsHooks();
  const { categoriesV2, categoriesV2Loading } = useGetCategoriesHooks();

  const { data: config } = useQuery<IConfig>({
    queryKey: ["getConfig"],
    queryFn: getConfig,
  });

  // const { data: navCategories } = useQuery<INavCategoryMain>({
  //   queryKey: ["getNavCategories"],
  //   queryFn: getNavCategories,
  // });

  const { data: profile } = useQuery({
    queryKey: ["getProfile", token],
    queryFn: getProfile,
    enabled: !!token,
    onSuccess: (data) => {
      setProfileData(data?.data);
    },
    onError: async (error: any) => {
      const errors = error?.response?.data?.error;
      if (
        errors?.code === 401 &&
        errors?.detail === "Unauthenticated" &&
        errors?.title === "Unauthenticated"
      ) {
        deleteCookie("token");
        deleteCookie("isLoggedIn");
        deleteCookie("cart_number");
        deleteCookie("cart_id");
        queryClient.invalidateQueries(["getCart"]);

        await setAuthorizationHeader();
        showToast(
          TOAST_TYPES.error,
          "Your session has expired. Please login again to continue."
        );
        router.push("/");
      }
    },
  });

  const { data: favouriteList }: any = useQuery(["wishlistProducts", token], {
    enabled: !!token,
  });

  //setting warehouse accordning to selected id from localStorage
  const warehouse = config?.data?.warehouses?.find(
    (item: IWareHouse) =>
      (item?.id).toString() === localStorage?.getItem(LocalKeys.WAREHOUSE_ID)!
  );

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      deleteCookie("token");
      deleteCookie("isLoggedIn");
      deleteCookie("cart_number");
      deleteCookie("cart_id");
      await setAuthorizationHeader();
      queryClient.invalidateQueries(["getCart"]);

      showToast(TOAST_TYPES.success, "Logged out successfully");
      router.push("/");
      setShowModal(false);
    },
  });

  const logoutHandler = () => {
    logoutMutation.mutate();
    router.push("/");
  };

  //suggestion
  const {
    data: suggestData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["suggest", selectedType || "", debounceSearch],
    () => getSuggestionResults(selectedType || "", searchValue || ""),
    {
      enabled: searchValue?.length > 0 ? true : false,
    }
  );

  const handleLoadMore = () => {
    fetchNextPage();
  };

  const handleScroll = (event: any) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    const scrolledToBottom = scrollHeight - scrollTop === clientHeight;

    if (scrolledToBottom && hasNextPage && !isFetchingNextPage) {
      handleLoadMore();
    }
  };

  const handleTypeChange = (text: string) => {
    setSelectedType(text);
  };

  const handleInputChange = (event: any) => {
    setDropdownOpen(true);
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    const query = {
      type: selectedType,
      keyword: searchValue,
    };
    setDropdownOpen(false);
    const queryString = new URLSearchParams(query).toString();
    router.push(`/search?${queryString}`);
  };
  /**
   * When user searches in the search bar and preses enter, hit handle searchfunction
   */
  const triggerSearch = (event: any) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const redirectDetailPage = (title: string) => {
    const query = {
      type: selectedType,
      keyword: title,
    };
    setSearchValue(title);
    setDropdownOpen(false);
    const queryString = new URLSearchParams(query).toString();
    router.push(`/search?${queryString}`);
  };

  /**
   * When the warehouse is changed
   */
  // const { data: cartFlush } = useQuery<ICartData>(
  //   ["getCartFlush", warehouseChange],
  //   flushCart,
  //   {
  //     enabled: warehouseChange,
  //   }
  // );

  /**
   * Change dropdown function
   */
  const changeWarehouse = async (warehouse: IWareHouse) => {
    const id: any = warehouse?.id;
    const name: string = warehouse?.name;
    await setWareHouseId(id);
    await setWarehouseName(name);
    if (cart && cart?.numberOfCartProducts > 0) {
      setShowWarehouseAlertModal(true);
      queryClient.invalidateQueries(["getCartProducts"]);
    } else {
      queryClient.invalidateQueries(["getCartProducts"]);
      setWarehouseChange(true);
      localStorage.setItem(LocalKeys.WAREHOUSE_ID, id);
      queryClient.invalidateQueries(["getCart"]);
      queryClient.invalidateQueries(["getHomeData"]);
      queryClient.invalidateQueries(["getNavCategories"]);
      queryClient.invalidateQueries(["getCategoriesV2"]);
      if (token) {
        queryClient.invalidateQueries(["wishlistProducts"]);
      }
      router.push("/");
    }
    await flushCart();
  };

  /**
   * Warehouse change confirm btn function
   */
  const handleWarehouseChange = () => {
    setWarehouseChange(true);
    setWareHouseId(warehouseId);
    setWarehouseName(warehouseName);
    localStorage.setItem(LocalKeys.WAREHOUSE_ID, warehouseId);
    setShowWarehouseAlertModal(false);
    queryClient.invalidateQueries(["getCart"]);

    queryClient.invalidateQueries(["getHomeData"]);
    queryClient.invalidateQueries(["getNavCategories"]);
    queryClient.invalidateQueries(["getCategoriesV2"]);
    if (token) {
      queryClient.invalidateQueries(["wishlistProducts"]);
    }
    router.push("/");
  };

  /**
   * Warehouse modal cancel function
   */
  const handleWarehouseCancel = () => {
    const name: string | any = warehouse?.name;
    const id: string | any = getWareId();
    setWareHouseId(id);
    setWarehouseName(name);
    setShowWarehouseAlertModal(false);
  };

  /* Handle Key press event for search dropdown selector */
  const handleKeyPress = (e: any) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (selectedSuggestionIndex > 0) {
        setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (selectedSuggestionIndex < suggestData?.pages[0]?.data.length - 1) {
        setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
      }
    } else if (e.key === "Enter") {
      setSelectedSuggestionIndex(-1);
      if (selectedSuggestionIndex >= 0) {
        const selectedSuggestion =
          suggestData?.pages[0]?.data[selectedSuggestionIndex];
        redirectDetailPage(selectedSuggestion?.title);
      } else {
        triggerSearch(e);
      }
    }
  };

  // useEffect(() => {
  //   if (config) {
  //     setConfigData(config);
  //   }
  // }, [config]);

  //setting input value to empty when page changed
  useEffect(() => {
    if (!pathname.includes("/search")) {
      setSearchValue("");
    }
  }, [pathname]);

  useEffect(() => {
    if ((window && localStorage && localStorage.getItem("coupon")) || coupon) {
      setCoupon((localStorage.getItem("coupon") as string) || coupon);
    }
  }, [coupon]);
  // }, [window, localStorage, coupon])

  useEffect(() => {
    if (loggedIn !== undefined) {
      setLogIn(true);
    } else {
      setLogIn(false);
    }
  }, [loggedIn]);

  /**
   * Setting warehouse name
   */
  useEffect(() => {
    if (warehouse) {
      setWarehouseName(warehouse?.name);
    }
  }, [warehouse]);

  /**
   * If cart has no product then change the boolean value of warehouseChange to false
   */
  useEffect(() => {
    if (cart && cart?.numberOfCartProducts === 0 && warehouseChange) {
      setWarehouseChange(false);
      queryClient.invalidateQueries(["getCart"]);

      queryClient.invalidateQueries(["getHomeData"]);
      queryClient.invalidateQueries(["getNavCategories"]);
      queryClient.invalidateQueries(["getCategoriesV2"]);
      router?.push("/");
    }
  }, [cart, warehouseChange]);

  return (
    <>
      {/* Warehouse Alert Modal */}
      <>
        <Dialog
          open={showWarehouseAlertModal}
          onOpenChange={handleWarehouseCancel}
        >
          <DialogContent className="modal-content">
            <ConfirmationModal
              confirmHeading="Changing warehouse will clear your data. Do you want to continue?"
              modalType="delete_account_modal"
              btnName="Confirm"
              cancelBtnName="Cancel"
              showModal={showWarehouseAlertModal}
              btnFunction={() => handleWarehouseChange()}
              cancelFuntion={handleWarehouseCancel}
              isLoading={false}
            />
          </DialogContent>
        </Dialog>
      </>

      <div className="px-2 py-3 md:p-2 md:py-3  bg-white sticky  top-[0px] md:z-10 z-[40] ">
        <div className="container flex items-center justify-between w-full gap-3 xl:gap-8 max-h-12 sm:max-h-24">
          <div className="flex items-center">
            {/* Logo */}
            <Link
              href={"/"}
              aria-label="home_blank"
              className="overflow-visible relative h-[50px] w-[115px] z-20"
            >
              {/*  eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  configData?.pageData?.headerlogo
                    ? configData?.pageData?.headerlogo
                    : Logo
                }
                alt="Logo"
                className="h-[115px] min-w-[115px]  w-[115px] absolute -top-[10px] left-0 object-cover overflow-visible object-left"
              />
            </Link>
            {/* Navigation */}
            <nav className="hidden md:flex space-x-4 gap-2 xl:gap-4 ml-6">
              <Link href="/">
                <p className="text-base font-medium hover:text-primary">Home</p>
              </Link>
              <Link
                href={`${
                  categoriesV2Loading
                    ? ""
                    : `/menu?active=${categoriesV2?.data[0]?.id}`
                } `}
              >
                <p className="text-base font-medium hover:text-primary">
                  Pizza
                </p>
              </Link>
              <Link href="/offer">
                <div className="flex items-center space-x-1 hover:text-primary">
                  <OfferIcon className="w-6 h-6 me-2" />
                  <p className="text-base font-medium">Offer</p>
                </div>
              </Link>
              <div>
                <CartDropdown />
              </div>
            </nav>
          </div>

          {/* Search */}
          <SearchComponent />

          <div className="hidden md:flex items-center space-x-4 ">
            {/* Location */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center space-x-1 cursor-pointer hover:text-primary transition-all">
                  <LocationPinIcon className="w-5 h-5 me-2" />
                  <p className="text-lg font-medium">{warehouseName}</p>
                  <ChevronDown strokeWidth={1.5} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {config?.data?.warehouses &&
                config?.data?.warehouses.length > 1 ? (
                  configData?.data?.warehouses?.map((warehouse: any) => (
                    <DropdownMenuItem
                      key={warehouse?.id}
                      onClick={() => changeWarehouse(warehouse)}
                      className={`cursor-pointer capitalize py-2.5 text-black hover:!bg-[#f5faff] hover:!text-black ${
                        warehouseName === warehouse?.name
                          ? "bg-[#ebf5ff] font-semibold"
                          : "!bg-transparent font-normal"
                      }`}
                    >
                      {warehouse?.name}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem className={`bg-[#ebf5ff] font-semibold`}>
                    {warehouse?.name}
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Sign Up */}
            <div className="cursor-pointer">
              {token && profile ? (
                <Dialog open={showModal} onOpenChange={setShowModal}>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className=" text-lg font-medium flex transition-all items-center gap-2  cursor-pointer py-1 m-1 px-0 capitalize bg-transparent border-0 hover:text-primary  focus:border-0 focus:outline-none focus-visible:border-0 focus-visible:outline-none">
                      <UserIcon />
                      {profile?.data?.firstName}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="p-0 min-w-[150px]"
                    >
                      <DropdownMenuItem
                        onClick={() => router.push("/account/profile")}
                        className="mx-5 text-xs text-gray-850 transition-all cursor-pointer focus:bg-none focus:text-primary py-3 px-0 text-center font-semibold border-b hover:transform hover:scale-[1.05] hover:!px-0 focus:!bg-transparent"
                      >
                        My Account
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push("/checkout")}
                        className="mx-5 text-xs text-gray-850 transition-all cursor-pointer focus:bg-none focus:text-primary py-3 px-0 text-center font-semibold border-b hover:transform hover:scale-[1.05] hover:!px-0 focus:!bg-transparent"
                      >
                        Checkout
                      </DropdownMenuItem>
                      <DialogTrigger>
                        <DropdownMenuItem className="!border-b-0  transition-all font-semibold text-xs text-gray-850 cursor-pointer focus:bg-none focus:text-primary py-3 px-0 text-center hover:transform hover:scale-[1.05] hover:!px-0 mx-5">
                          Logout
                        </DropdownMenuItem>
                      </DialogTrigger>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DialogContent>
                    <ConfirmationModal
                      confirmHeading="Are you sure you want to logout?"
                      modalType="logout_modal"
                      btnName="Logout"
                      showModal={showModal}
                      btnFunction={logoutHandler}
                      cancelFuntion={() => setShowModal(false)}
                      isLoading={logoutMutation.isLoading}
                    />
                  </DialogContent>
                </Dialog>
              ) : (
                <div className="flex items-center  justify-center gap-1">
                  <Link
                    href={"/login"}
                    className={`flex justify-start items-center gap-1
                   capitalize text-base font-medium h-auto min-h-fit p-0 
                   hover:text-primary transition-all  whitespace-nowrap`}
                  >
                    <UserIcon className="hover:text-primary me-1" />
                    Log In
                  </Link>
                  /
                  <Link
                    href={"/register"}
                    className={`flex justify-start items-center gap-1
                    capitalize text-base font-medium h-auto min-h-fit p-0 
                    hover:text-primary transition-all  whitespace-nowrap`}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
          <Drawer cart={cart} categories={categoriesV2?.data!} />

          {/* Offer & Cart */}
          <div className="items-center gap-3 hidden items-center">
            <Link
              href="/offer"
              className="items-center transition-all hover:text-primary text-sm !bg-white !border-0 text-gray-550 gap-1 font-bold hidden md:flex"
              aria-label="header-offer"
            >
              <OfferIcon />
              OFFER
            </Link>
            {token && profile && (
              <Link
                href="/wishlist"
                aria-label="header-wishlist"
                className="relative hidden w-[40px] h-[40px] rounded-full bg-gray-1250 md:flex items-center justify-center"
              >
                <HeartIcon className="max-w-[20px] text-gray-550" />
                <Badge variant="dark">
                  {favouriteList ? favouriteList.data?.length : 0}
                </Badge>
              </Link>
            )}
            Cart
            <CartDropdown />
            md:drawer
          </div>
        </div>
      </div>

      {/* Category header */}
      {/* <WebNavigationOptions categories={navCategories?.data!} /> */}
    </>
  );
};

export default Header;
