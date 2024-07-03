import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { getCookie } from "cookies-next";

import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import { logout } from "@/services/auth.service";
import { getConfig, getNavCategories } from "@/services/home.service";
import { getProfile } from "@/services/profile.service";
import { getSuggestionResults } from "@/services/search.service";
import { useDebounce } from "@/hooks/useDebounce.hooks";
import { useCart as useCartStore } from "@/store/cart";
import { useConfig as useConfigStores } from "@/store/config";
import { useWareHouse as useWareHouseStore } from "@/store/warehouse";
import { INavCategoryMain } from "@/interface/home.interface";
import { IConfig } from "@/interface/config.interface";
import { useGetCartsHooks } from "./getCart.hooks";

export const useHeaderLogic = () => {
  const router = useRouter();
  const { pathname } = router;
  const token = getToken();
  const loggedIn = getCookie("isLoggedIn");
  const queryClient = useQueryClient();

  const { setConfigData, configData } = useConfigStores();
  const { coupon, setCoupon } = useCartStore();
  const { warehouseId, setWareHouseId } = useWareHouseStore();

  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("product");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [warehouseChange, setWarehouseChange] = useState<boolean>(false);
  const [warehouseName, setWarehouseName] = useState<string>("");
  const [showWarehouseAlertModal, setShowWarehouseAlertModal] =
    useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const debounceSearch = useDebounce(searchValue, 300);

  // Define all your queries and mutations here
  const { cart, cartLoading } = useGetCartsHooks();
  const { data: config } = useQuery<IConfig>(["getConfig"], getConfig);

  const { data: navCategories } = useQuery<INavCategoryMain>(
    ["getNavCategories"],
    getNavCategories
  );
  const { data: profile } = useQuery(["getProfile", token], getProfile, {
    enabled: !!token,
    onError: (error: any) => handleProfileError(error),
  });
  const logoutMutation = useMutation(logout, {
    onSuccess: () => handleLogoutSuccess(),
  });
  const {
    data: suggestData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["suggest", selectedType, debounceSearch],
    () => getSuggestionResults(selectedType, searchValue),
    { enabled: !!searchValue }
  );

  // Define all your handlers and effects here
  const handleProfileError = (error: any) => {
    // Error handling logic
  };

  const handleLogoutSuccess = () => {
    // Logout success logic
  };

  useEffect(() => {
    // Any effects related to the component
  }, [config, pathname, coupon]);

  return {
    searchValue,
    setSearchValue,
    selectedType,
    setSelectedType,
    showModal,
    setShowModal,
    warehouseChange,
    setWarehouseChange,
    warehouseName,
    setWarehouseName,
    showWarehouseAlertModal,
    setShowWarehouseAlertModal,
    dropdownOpen,
    setDropdownOpen,
    selectedSuggestionIndex,
    setSelectedSuggestionIndex,
    cart,
    config,
    navCategories,
    profile,
    suggestData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    logoutMutation,
  };
};
