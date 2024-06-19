import { useCallback, useEffect, useRef, useState } from "react";
import { useGetCartProductHooks } from "@/hooks/getCartProduct.hooks";
import { getProductByPizza } from "@/services/product.service";
import SkeletonLoadingCard from "@/shared/components/skeleton/products";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Card from "@/shared/components/card";

const CategoryPizza = () => {
  const router: any = useRouter();
  const { data: pizzaProducts, isLoading: pizzaLoading } = useQuery(
    ["getProductByPizza"],
    async () => {
      const response = await getProductByPizza();
      return response?.data?.data;
    }
  );
  const { cartProducts, cartProductsLoading } = useGetCartProductHooks();
  const [productModalId, setProductModalId] = useState<any>();
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const navHighlighter = useCallback(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    let scrollY = window.pageYOffset;

    sections?.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 130;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        window.document
          ?.querySelector(`[id='${sectionId}']`)
          ?.classList.add("active");
        if (sectionId !== router.query.active) {
          router.query.active = sectionId; // Set the active section ID in router.query
          router.push(router, undefined, { shallow: true });
        }
      } else {
        window.document
          ?.querySelector(`[id='${sectionId}']`)
          ?.classList.remove("active");
      }
    });
  }, [router]);

  useEffect(() => {
    window.addEventListener("scroll", navHighlighter);
    return () => {
      window.removeEventListener("scroll", navHighlighter);
    };
  }, [navHighlighter]);

  return (
    <div className="col-span-12 md:col-span-9">
      <div className="card-listing">
        {pizzaLoading ? (
          <SkeletonLoadingCard />
        ) : (
          pizzaProducts?.map((category: any) => (
            <section
              ref={(el) =>
                (categoryRefs.current[category.id] = el as HTMLDivElement)
              }
              id={`${category.id}`}
              key={category.id}
              className={`category-section ${
                router.query.active === category.id ? "active" : ""
              }`}
            >
              <h3 className="w-80 text-zinc-800 text-3xl font-bold white leading-10 mb-6">
                {category.name}
              </h3>
              <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 xxs:grid-cols-2 lg:grid-cols-3 mb-4">
                {category.products.map((product: any) => (
                  <Card
                    setProductModalId={setProductModalId}
                    product={product}
                    key={product.id}
                    cartItem={cartProducts?.cartProducts?.find(
                      (item) => item?.product?.id === product?.id
                    )}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPizza;
