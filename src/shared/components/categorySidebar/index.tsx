import Link from "next/link";
import { useRouter } from "next/router";

import { useGetCategoriesHooks } from "@/hooks/geCategory.hooks";

import {
  AccordionContent,
  AccordionItem,
  AccordionPlus,
  AccordionTrigger,
} from "../ui/accordion-plus";

const CategorySidebar = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { categories, categoriesLoading } = useGetCategoriesHooks();

  return (
    <AccordionPlus type="single" collapsible className="w-full pl-4">
      {categories?.data?.map((item: any, index: number) => (
        <div key={`categories-${index}`} className="pb-2">
          {item.subCategories.length > 0 ? (
            <AccordionItem value={`item-${index}`} className="border-0">
              <AccordionTrigger className="py-1 text-sm border-b-none hover:no-underline border-b-primary">
                <Link
                  className={` text-gray-550 font-semibold text-[15px] leading-[22px] transition-all delay-100 duration-300 hover:text-primary capitalize ${
                    item?.slug == slug && "text-primary"
                  }`}
                  href={`/categories/${item?.slug}`}
                >
                  {item?.slug}
                </Link>
              </AccordionTrigger>
              <AccordionContent className="category-accordion-content">
                {item?.subCategories?.map((subItem: any, index: number) => (
                  <div className="py-2 pl-4" key={index}>
                    <Link
                      href={`/categories/${subItem?.slug}`}
                      className={` text-gray-550 font-semibold text-sm leading-[22px] transition-all delay-100 duration-300 hover:text-primary capitalize ${
                        subItem?.slug == slug && "text-primary"
                      }`}
                    >
                      {subItem?.name}
                    </Link>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ) : (
            <Link
              href={`/categories/${item?.slug}`}
              aria-label={`categories-${index}`}
              className={`block text-gray-550 font-semibold text-[15px] leading-[22px] transition-all delay-100 duration-300 hover:text-primary pb-2 capitalize ${
                item?.slug == slug && "text-primary"
              }`}
            >
              {item?.name}
            </Link>
          )}
        </div>
      ))}
    </AccordionPlus>
  );
};

export default CategorySidebar;
