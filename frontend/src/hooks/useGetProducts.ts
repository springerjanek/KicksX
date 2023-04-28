import { useQuery } from "react-query";
import axios from "axios";

export const useGetProducts = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    refetchOnWindowFocus: false,
    staleTime: 1000 * 3600,
    queryFn: async () => {
      const response = await axios.get("http://localhost:3001/");
      const result: Products = response.data;
      return result;
    },
  });

  return { isLoading, data };
};
