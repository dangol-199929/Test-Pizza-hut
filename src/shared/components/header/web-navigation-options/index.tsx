import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { INavCategories } from "@/interface/home.interface";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";

interface IOptionProps {
  categories: INavCategories[];
}

const WebNavigationOptions = ({ categories }: IOptionProps) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const changeRoute = (link: string) => {
    router.push(link);
    setDropdownOpen(false);
  };
  return (
    <div
      className={` pt-4 pb-2 category-shadow md:sticky top-0 md:z-70 z-10 bg-white `}
    >
      <div className="container flex items-center justify-center">
        <NavigationMenu className="block w-full max-w-full md:flex md:max-w-max md:flex-grow-1">
          <NavigationMenuList className="block md:flex">
            <NavigationMenuItem className="hidden w-full md:block">
              <NavigationMenu className="justify-center gap-10 ">
                <NavigationMenuList className="gap-9">
                  <NavigationMenuItem
                    onClick={() => router.push("/")}
                    className={`!bg-white text-sm border-0 cursor-pointer hover:text-primary text-gray-550 font-bold capitalize ${
                      router?.pathname === "/" && "text-primary"
                    }`}
                  >
                    Home
                  </NavigationMenuItem>

                  {categories &&
                    categories?.slice(0, 5).map((option) => (
                      <React.Fragment key={option?.id}>
                        {option?.subCategories.length > 0 ? (
                          <NavigationMenuItem>
                            <NavigationMenu className="m-0">
                              <NavigationMenuList className="m-0">
                                <NavigationMenuTrigger
                                  onClick={() =>
                                    router.push(`/categories/${option?.slug}`)
                                  }
                                  className={`font-bold gap-1 p-0 bg-transparent items-center border-0 cursor-pointer text-gray-550 hover:bg-transparent hover:text-primary`}
                                >
                                  {option?.name}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="min-w-[250px]">
                                  {option?.subCategories.map(
                                    (subItem, index) => (
                                      <NavigationMenuLink
                                        className="py-1"
                                        key={index}
                                      >
                                        <Link
                                          href={`/categories/${subItem?.slug}`}
                                          className="py-2.5 block border-b w-full px-5 hover:!pl-7 focus:!bg-transparent text-sm hover:text-primary transition-all"
                                        >
                                          {subItem?.name}
                                        </Link>
                                      </NavigationMenuLink>
                                    )
                                  )}
                                </NavigationMenuContent>
                              </NavigationMenuList>
                            </NavigationMenu>
                          </NavigationMenuItem>
                        ) : (
                          <NavigationMenuItem
                            onClick={() =>
                              router.push(`/categories/${option?.slug}`)
                            }
                            className={`!bg-white border-0 text-sm cursor-pointer text-gray-550 hover:text-primary font-bold capitalize ${
                              router?.asPath ===
                                `/categories/${option?.slug}` && "text-primary"
                            }`}
                          >
                            {option?.name}
                          </NavigationMenuItem>
                        )}
                      </React.Fragment>
                    ))}
                  {categories && categories?.length > 5 && (
                    <NavigationMenuItem>
                      <NavigationMenu className="m-0">
                        <NavigationMenuList className="m-0">
                          <NavigationMenuTrigger
                            className={`font-bold gap-1 p-0 bg-transparent items-center border-0 cursor-pointer text-gray-550 hover:bg-transparent hover:text-primary ${
                              (router?.pathname ===
                                "/page/plant-consultation" ||
                                router?.pathname === "/page/gift-a-plant") &&
                              "text-primary"
                            }`}
                          >
                            See More
                          </NavigationMenuTrigger>
                          <NavigationMenuContent className="min-w-[250px]">
                            {categories
                              ?.slice(5, categories?.length)
                              .map((option, index) => (
                                <NavigationMenuLink
                                  className="py-1"
                                  key={index}
                                >
                                  <Link
                                    href={`/categories/${option?.slug}`}
                                    className="py-2.5 block border-b w-full px-5 hover:!pl-7 focus:!bg-transparent text-sm hover:text-primary transition-all"
                                  >
                                    {option?.name}
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                          </NavigationMenuContent>
                        </NavigationMenuList>
                      </NavigationMenu>
                    </NavigationMenuItem>
                  )}

                  {/* <NavigationMenuItem onClick={() => router.push("/page/our-outlets")} className={`!bg-white border-0 text-sm cursor-pointer text-gray-550 hover:text-primary font-bold uppercase ${router?.pathname === '/page/our-outlets' && 'text-primary'}`}>
                                        Outlet
                                    </NavigationMenuItem> */}

                  {/* About Us*/}
                  {/* <NavigationMenuItem >
                                        <NavigationMenu className="m-0">
                                            <NavigationMenuList>
                                                <NavigationMenuTrigger className={`${aboutPageUrls.includes(router?.pathname) && '!text-primary'} font-bold bg-transparent border-0 cursor-pointer btn text-gray-550 hover:bg-transparent hover:text-primary`}>
                                                    About Us
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent className="min-w-[250px]">
                                                    <NavigationMenuLink className="py-1">
                                                        <Link
                                                            href="/page/who-we-are"
                                                            className={`${router?.pathname === '/page/who-we-are' && 'text-primary'} py-2.5 block border-b w-full px-5 hover:!pl-7 focus:!bg-transparent text-sm hover:text-primary transition-all`}
                                                        >
                                                            Who We Are
                                                        </Link>
                                                    </NavigationMenuLink>
                                                    <NavigationMenuLink className="py-1">
                                                        <Link
                                                            href="/page/about-us"
                                                            className={`${router?.pathname === '/page/about-us' && 'text-primary'} py-2.5 block border-b w-full px-5 hover:!pl-7 focus:!bg-transparent text-sm hover:text-primary transition-all`}
                                                        >
                                                            Our Story
                                                        </Link>
                                                    </NavigationMenuLink>
                                                    <NavigationMenuLink className="py-1">
                                                        <Link
                                                            href="/page/our-values"
                                                            className={`${router?.pathname === '/page/our-values' && 'text-primary'} py-2.5 block border-b w-full px-5 hover:!pl-7 focus:!bg-transparent text-sm hover:text-primary transition-all`}
                                                        >
                                                            Values That Make Us
                                                        </Link>
                                                    </NavigationMenuLink>
                                                    <NavigationMenuLink className="py-1">
                                                        <Link
                                                            href="/page/working-at-i-am-the-gardener"
                                                            className={`${router?.pathname === '/page/working-at-i-am-the-gardener' && 'text-primary'} py-2.5 block border-b w-full px-5 hover:!pl-7 focus:!bg-transparent text-sm hover:text-primary transition-all`}
                                                        >
                                                            Working At I Am The Gardner
                                                        </Link>
                                                    </NavigationMenuLink>
                                                    <NavigationMenuLink className="py-1">
                                                        <Link
                                                            href="/page/csr-projects"
                                                            className={`${router?.pathname === '/page/csr-projects' && 'text-primary'} py-2.5 block border-b w-full px-5 hover:!pl-7 focus:!bg-transparent text-sm hover:text-primary transition-all`}
                                                        >
                                                            Our CSR Project
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </NavigationMenuContent>
                                            </NavigationMenuList>
                                        </NavigationMenu>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem onClick={() => router.push("/blogs")} className={`!bg-white border-0 text-sm cursor-pointer text-gray-550 hover:text-primary font-bold uppercase ${router?.pathname.includes('/blogs') && 'text-primary'}`}>
                                        Blogs
                                    </NavigationMenuItem> */}
                </NavigationMenuList>
              </NavigationMenu>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default WebNavigationOptions;
