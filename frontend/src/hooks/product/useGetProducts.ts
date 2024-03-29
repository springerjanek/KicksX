import { useQuery } from "react-query";
import axios from "axios";

export const useGetProducts = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await axios.get(`${process.env.REACT_APP_REQUEST_URL}/`);
      const result: Products = response.data;
      return result;
    },
  });

  return { isLoading, data };
};
