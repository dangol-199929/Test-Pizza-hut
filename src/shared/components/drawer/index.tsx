import { deleteCookie } from "cookies-next";
import { Menu } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineLogout } from "react-icons/ai";
import { BiUser } from "react-icons/bi";

import { ICartData, ICartItem } from "@/interface/cart.interface";
import { INavCategories, IWareHouse } from "@/interface/home.interface";
import { logout } from "@/services/auth.service";
import { flushCart } from "@/services/cart.service";
import { getAllWishlistProducts } from "@/services/wishlist.service";
import { LocalKeys } from "@/shared/enum";
import CaretDownIcon from "@/shared/icons/common/CaretDownIcon";
import LocationIcon from "@/shared/icons/common/LocationIcon";
import SearchIcon from "@/shared/icons/common/SearchIcon";
import TagIcon from "@/shared/icons/common/TagIcon";
import UserIcon from "@/shared/icons/common/UserIcon";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import { getWareId } from "@/shared/utils/local-storage-utils";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { useConfig as useConfigStore } from "@/store/config";
import { useWareHouse as useWareHouseStore } from "@/store/warehouse";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import ConfirmationModal from "../confirmation-modal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

interface IOptionProps {
  categories: INavCategories[];
  cart: ICartItem | any;
}

const Drawer = ({ categories, cart }: IOptionProps) => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const token = getToken();
  const router = useRouter();

  const { configData } = useConfigStore();
  const { warehouseId, setWareHouseId } = useWareHouseStore();

  const [searchValue, setSearchValue] = useState<string>("");
  const { pathname } = router;
  const { data: favouriteList, isInitialLoading: loadingFavourite } = useQuery({
    queryKey: ["wishlistProducts", token],
    queryFn: () => getAllWishlistProducts(token),
    enabled: !!token,
    retry: false,
  });

  const changeRoute = (route: string) => {
    router.push(route);
    setOpenDrawer(false);
  };

  const handleInputChange = (event: any) => {
    // setDropdownOpen(true)
    setSearchValue(event.target.value);
  };

  const triggerSearch = (event: any) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const query = {
      type: "product",
      keyword: searchValue,
    };
    // setDropdownOpen(false)
    const queryString = new URLSearchParams(query).toString();
    setOpenDrawer(false);
    router.push(`/search?${queryString}`);
  };

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setShowModal(false);
      setOpenDrawer(false);
      router.push("/");
      deleteCookie("token");
      deleteCookie("isLoggedIn");
      queryClient.invalidateQueries(["getCart"]);

      showToast(TOAST_TYPES.success, "Logged out successfully");
    },
  });

  const logoutHandler = () => {
    mutation.mutate();
  };

  //setting input value to empty when page changed
  useEffect(() => {
    if (!pathname.includes("/search")) {
      setSearchValue("");
    }
  }, [pathname]);

  const [warehouseChange, setWarehouseChange] = useState<boolean>(false);
  const [warehouseName, setWarehouseName] = useState<string>("");
  const [showWarehouseAlertModal, setShowWarehouseAlertModal] =
    useState<boolean>(false);

  //setting warehouse accordning to selected id from localStorage
  const warehouse = configData?.data?.warehouses?.find(
    (item: IWareHouse) =>
      (item?.id).toString() === localStorage?.getItem(LocalKeys.WAREHOUSE_ID)!
  );

  /**
   * When the warehouse is changed
   */
  const { data: cartFlush } = useQuery<ICartData>(
    ["getCartFlush", warehouseChange],
    flushCart,
    {
      enabled: warehouseChange,
    }
  );

  /**
   * Change dropdown function
   */
  const changeWarehouse = (warehouse: IWareHouse) => {
    const id: any = warehouse?.id;
    const name: string = warehouse?.name;
    setWareHouseId(id);
    setWarehouseName(name);
    if (cart && cart?.numberOfCartProducts > 0) {
      setOpenDrawer(false);
      setShowWarehouseAlertModal(true);
    } else {
      setWarehouseChange(true);
      setOpenDrawer(false);
      localStorage.setItem(LocalKeys.WAREHOUSE_ID, id);
      queryClient.invalidateQueries(["getCart"]);

      queryClient.invalidateQueries(["getHomeData"]);
      queryClient.invalidateQueries(["getNavCategories"]);
      queryClient.invalidateQueries(["getCategoriesList"]);
      if (token) {
        queryClient.invalidateQueries(["wishlistProducts"]);
      }
      router.push("/");
    }
  };

  /**
   * Warehouse change confirm btn function
   */
  const handleWarehouseChange = () => {
    setShowWarehouseAlertModal(false);
    setWarehouseChange(true);
    setWareHouseId(warehouseId);
    setWarehouseName(warehouseName);
    localStorage.setItem(LocalKeys.WAREHOUSE_ID, warehouseId);
    queryClient.invalidateQueries(["getCart"]);

    queryClient.invalidateQueries(["getHomeData"]);
    queryClient.invalidateQueries(["getNavCategories"]);
    queryClient.invalidateQueries(["getCategoriesList"]);
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
    }
  }, [cart]);

  return (
    <div className="flex md:hidden">
      <Sheet open={openDrawer} onOpenChange={setOpenDrawer}>
        <SheetTrigger asChild={true} onClick={() => setOpenDrawer(true)}>
          <Menu />
        </SheetTrigger>

        <SheetContent side={"left"} className="w-64 p-4 side-drawer">
          <p className="flex items-center gap-2 px-4 py-2 mb-3 text-sm text-white rounded-md bg-primary">
            <LocationIcon />
            City:{" "}
            {configData?.data?.warehouses &&
            configData?.data?.warehouses?.length > 1 ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={` m-1 cursor-pointer min-w-[80px] whitespace-nowrap focus:outline-none text-white text-xs font-medium flex gap-1 items-center`}
                >
                  <span className="capitalize">{warehouseName}</span>
                  <CaretDownIcon className="max-w-[10px] h-auto" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="rounded-sm min-w-[110px] p-0"
                >
                  {configData?.data?.warehouses?.map((warehouse: any) => (
                    <DropdownMenuItem
                      key={warehouse?.id}
                      className={`cursor-pointer rounded-none py-2.5 capitalize text-black hover:!bg-[#f5faff] hover:!text-black ${
                        warehouseName === warehouse?.name
                          ? "bg-[#ebf5ff] font-semibold"
                          : "!bg-transparent font-normal"
                      }`}
                      onClick={() => changeWarehouse(warehouse)}
                    >
                      <span>{warehouse?.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <p>{configData?.data?.warehouses[0]?.name}</p>
            )}
          </p>
          <div className="p-0 border border-primary rounded-full !bg-white mb-3 w-full flex items-center justify-between">
            <Input
              placeholder="Search"
              className=" py-0 m-0 pe-0 !bg-transparent max-w-[10.5rem] border-0 h-[30px] flex-grow-1"
              value={searchValue}
              onChange={handleInputChange}
              onKeyDown={triggerSearch}
            />
            <Button className="p-2 px-4 rounded-l-none rounded-r-full -me-[1px]">
              <SearchIcon
                className="max-h-[0.9rem] max-w-[0.9rem]"
                onClick={handleSearch}
              />
            </Button>
          </div>

          <div className="max-h-[calc(100vh-88px)] overflow-y-scroll pb-[40px]">
            <div className="!bg-transparent block p-1">
              <Button
                variant="ghost"
                onClick={() => changeRoute("/")}
                className="w-full rounded-none text-start h-auto block font-normal border-b border-b-primary text-sm leading-[25px] p-1"
                aria-label="home"
              >
                Home
              </Button>
              <Accordion type="single" collapsible className="w-full">
                {categories &&
                  categories?.map((option) => (
                    <React.Fragment key={option?.id}>
                      {option?.subCategories.length > 0 ? (
                        <AccordionItem
                          value={`item-${option?.id}`}
                          className="border-0"
                        >
                          <AccordionTrigger className="p-1 text-sm border-b hover:no-underline border-b-primary">
                            <p
                              className="font-normal "
                              onClick={() =>
                                changeRoute(`/categories/${option?.slug}`)
                              }
                            >
                              {option?.name}
                            </p>
                          </AccordionTrigger>
                          <AccordionContent className="drawer-accordion-content">
                            {option?.subCategories.map((subItem, index) => (
                              <p
                                key={index}
                                className="p-1 text-sm font-normal border-b border-b-primary"
                              >
                                <Button
                                  className="h-auto p-0 font-normal"
                                  variant={"ghost"}
                                  onClick={() =>
                                    changeRoute(`/categories/${subItem?.slug}`)
                                  }
                                  aria-label="plant-consultant"
                                >
                                  {subItem?.name}
                                </Button>
                              </p>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <Button
                          variant="ghost"
                          onClick={() =>
                            changeRoute(`/categories/${option?.slug}`)
                          }
                          className="block w-full rounded-none text-start h-auto font-normal  leading-[25px] text-sm border-b border-b-primary p-1"
                          aria-label="our outlets"
                        >
                          {option?.name}
                        </Button>
                      )}
                    </React.Fragment>
                  ))}
              </Accordion>
              <div className="mt-6">
                <p className="mb-2 text-base font-bold">My Account</p>

                {token ? (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => changeRoute("/account/profile")}
                      className="flex justify-start h-auto mb-2 leading-[33px] gap-3 p-0 text-base font-normal capitalize text-start"
                    >
                      <BiUser />
                      View Profile
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => changeRoute("/wishlist")}
                      className="flex justify-start leading-[33px]  mb-2 gap-3 p-0 text-base font-normal capitalize btn btn-ghost text-start"
                      aria-label="wishlist"
                    >
                      <AiOutlineHeart />
                      Wishlist (
                      {favouriteList ? favouriteList?.data?.length : 0})
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-3 mb-2">
                    <UserIcon className="text-black" />
                    <div className="flex items-center gap-1 leading-[33px]">
                      <Button
                        variant="ghost"
                        onClick={() => changeRoute("/login")}
                        className="flex gap-1 p-0 text-base font-normal capitalize btn btn-ghost text-start"
                        aria-label="login"
                      >
                        Login
                      </Button>
                      <span>/</span>
                      <Button
                        variant="ghost"
                        onClick={() => changeRoute("/register")}
                        className="flex gap-1 p-0 text-base font-normal capitalize btn btn-ghost text-start"
                        aria-label="sign-up"
                      >
                        Sign Up
                      </Button>
                    </div>
                  </div>
                )}

                <Button
                  variant="ghost"
                  onClick={() => changeRoute("/offer")}
                  className="flex  mb-2 justify-start leading-[33px] gap-3 p-0 text-base font-normal capitalize btn btn-ghost text-start"
                  aria-label="offer"
                >
                  <TagIcon />
                  Offer
                </Button>
                <Dialog open={showModal} onOpenChange={setShowModal}>
                  {token && (
                    <DialogTrigger>
                      <Button
                        variant="ghost"
                        className="flex justify-start leading-[33px] gap-3 p-0 text-base font-normal capitalize btn btn-ghost text-start"
                      >
                        {/* <TagIcon className="text-black" /> */}
                        <AiOutlineLogout />
                        Logout
                      </Button>
                    </DialogTrigger>
                  )}
                  <DialogContent>
                    <ConfirmationModal
                      confirmHeading="Are you sure you want to logout?"
                      modalType="logout_modal"
                      btnName="Logout"
                      showModal={showModal}
                      btnFunction={logoutHandler}
                      cancelFuntion={() => setShowModal(false)}
                      isLoading={mutation.isLoading}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Warehouse Alert Modal */}
      <Dialog
        open={showWarehouseAlertModal}
        onOpenChange={handleWarehouseCancel}
      >
        <DialogContent className="modal-content">
          <ConfirmationModal
            confirmHeading="Changing warehouse will clear your data.Do you want to continue?"
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
    </div>
  );
};

export default Drawer;
