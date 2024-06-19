import { getCategoriesList } from "@/services/home.service";
import { useQuery } from "@tanstack/react-query";

export const useGetCategoriesHooks = () => {
  const { data: categories, isLoading: categoriesLoading }: any = useQuery({
    queryKey: ["getCategoriesList"],
    queryFn: getCategoriesList,
  });
  return { categories, categoriesLoading };
};
