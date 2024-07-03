import { useRouter } from "next/router";

import { useGetCategoriesHooks } from "@/hooks/geCategory.hooks";

const PizzaCategorySidebar = () => {
  const router = useRouter();
  const { active } = router.query;

  const { categoriesV2, categoriesV2Loading } = useGetCategoriesHooks();
  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleCategoryClick = async (id: string) => {
    const section = document.getElementById(id as string);
    const offset = 115; // Adjust this value to set the gap at the top
    const topPosition =
      (section?.getBoundingClientRect().top ?? 0) + window.pageYOffset - offset;
    await window.scrollTo({ top: topPosition, behavior: "smooth" });
    await wait(1000);
    await router.push(`/menu?active=${id}`, undefined, { shallow: true });
  };

  return (
    <div className="order-last col-span-12 md:order-first md:col-span-3 right-sidebar">
      <nav className="fixed top-[72px] left-0 w-full bg-primary z-20 block md:hidden whitespace-nowrap overflow-auto">
        <div className="container ">
          <div className="flex justify-between items-center ms-[120px]">
            {categoriesV2?.data?.map((item: any, index: number) => (
              <button
                key={`categories-${index}`}
                onClick={() => handleCategoryClick(item.id)}
                className={` p-3  ${active === String(item?.id) ? "" : ""}`}
              >
                <span
                  className={`grow shrink basis-0 text-sm text-start font-medium !text-white underline-offset-2 hover:underline ${
                    active === String(item?.id) ? "underline" : ""
                  }`}
                >
                  {item?.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>
      <div className="w-full max-w-xs mr-auto sticky top-[120px] left-0 hidden md:block">
        <div className="w-full h-14 pl-6 pr-4 py-4 bg-white rounded-tl-xl rounded-tr-xl border border-gray-200 justify-start items-center gap-2.5 inline-flex">
          <div className="grow shrink basis-0 text-zinc-800 text-lg font-bold uppercase relative">
            <div className="w-[3px] h-full bg-primary absolute top-0 -left-6"></div>
            Explore Menu
          </div>
        </div>
        <div className="w-full h-96 flex-col justify-start items-start inline-flex rounded-b-xl">
          {categoriesV2?.data?.map((item: any, index: number) => (
            <button
              key={`categories-${index}`}
              onClick={() => handleCategoryClick(item.id)}
              className={`w-full pl-4 pr-4 py-3 border border-gray-200 flex justify-start items-center gap-2.5 ${
                active === String(item?.id) ? "bg-pink-100" : "bg-white"
              } ${
                index === categoriesV2.data.length - 1
                  ? "rounded-bl-xl rounded-br-xl"
                  : ""
              }`}
            >
              <span
                className={`grow shrink basis-0 text-sm text-start font-medium ${
                  active === String(item?.id) ? "text-red-600" : "text-zinc-600"
                }`}
              >
                {item?.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PizzaCategorySidebar;
