import { getCategoriesV2 } from "@/services/home.service";
import { useQuery } from "@tanstack/react-query";

export const useGetCategoriesHooks = () => {
  const { data: categoriesV2, isLoading: categoriesV2Loading }: any = useQuery({
    queryKey: ["getCategoriesV2"],
    queryFn: getCategoriesV2,
  });
  return { categoriesV2, categoriesV2Loading };
};
