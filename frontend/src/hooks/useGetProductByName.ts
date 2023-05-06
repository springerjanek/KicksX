import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_REQUEST_URL;

export const useGetProductByName = (path: string, key: string) => {
  const queryClient = useQueryClient();
  const productsData: Products | undefined =
    queryClient.getQueryData("products");
  const { isLoading, data } = useQuery({
    queryKey: [key],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (productsData !== undefined) {
        const productName = path.split("=")[1];
        const desiredProduct = productsData.filter(
          (product) => product.name === productName
        );
        return desiredProduct[0];
      } else {
        const response = await axios.get(`${BASE_URL + path}`);
        const result: Product = response.data[0];
        return result;
      }
    },
  });

  return { isLoading, data };
};
