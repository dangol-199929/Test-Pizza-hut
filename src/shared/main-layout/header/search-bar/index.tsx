import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useInfiniteQuery } from "@tanstack/react-query";
import SearchIcon from "@/shared/icons/common/SearchIcon";
import Image from "next/image";
import { Input } from "@/shared/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce.hooks";
import { getSuggestionResults } from "@/services/search.service";

const SearchComponent: React.FC = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("product");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const debounceSearch = useDebounce(searchValue, 300);

  const {
    data: suggestData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["suggest", selectedType, debounceSearch],
    () => getSuggestionResults(selectedType, searchValue),
    {
      enabled: searchValue.length > 0,
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
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
        handleSearch();
      }
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

  return (
    <div className="border-[1px] border-[#E4E4E4] rounded-[16px] h-[48px] hidden md:flex items-center justify-between gap-1 w-[60%] px-4">
      <SearchIcon className="text-gray-400" />
      <div className="relative w-full">
        <div className="flex items-center justify-between gap-1">
          <input
            type="text"
            placeholder="Search your favourite Pizza"
            className="ps-2 border-none text-base text-slate-850 placeholder:text-gray-400 text-base focus-visible:outline-none focus-visible:ring-offset-transparent focus:border-none focus:outline-0 w-full !shadow-none !outline-none"
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
        </div>
        {dropdownOpen &&
          searchValue.length > 0 &&
          suggestData?.pages[0]?.data.length > 0 && (
            <div>
              <ul
                className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded top-full max-h-[335px] overflow-y-auto"
                onScroll={handleScroll}
              >
                {suggestData &&
                  suggestData.pages?.map((group: any, index: number) => (
                    <React.Fragment key={index}>
                      {group?.data?.map((prev: any, _i: number) => (
                        <li
                          key={_i}
                          className={`p-2 cursor-pointer text-sm hover:bg-gray-100 ${
                            _i === selectedSuggestionIndex ? "bg-gray-1500" : ""
                          }`}
                          onClick={() => redirectDetailPage(prev?.title)}
                        >
                          <div className="flex items-center">
                            <Image
                              src={prev?.image}
                              width={30}
                              height={20}
                              alt={`image-${_i}`}
                              className="object-contain aspect-square"
                            />
                            <span className="ps-2">{prev.title}</span>
                          </div>
                        </li>
                      ))}
                    </React.Fragment>
                  ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
};

export default SearchComponent;
