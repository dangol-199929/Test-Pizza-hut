import { useQuery } from "@tanstack/react-query";
import { getHomeData } from "@/services/home.service";
import { IHome } from "@/interface/home.interface";

export const useGetWebHome = () => {
  const { data: homeData, isInitialLoading } = useQuery<IHome>({
    queryKey: ["getHomeData"],
    queryFn: () => getHomeData(),
    enabled: true,
  });
  return { homeData, isInitialLoading };
};
