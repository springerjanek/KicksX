import { useQuery, useQueryClient } from "react-query";
import { getLowestAskAndHighestBid } from "hooks/getLowestAskAndHighestBid";
import axios from "axios";

export const useGetRelatedProducts = (
  originalProductName: string,
  combinedFilter: string
) => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["relatedProducts"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const data: Products | undefined = queryClient.getQueryData("products");

      if (data !== undefined) {
        const result = await Promise.all(
          data
            .filter(
              (product) =>
                product.name.includes(combinedFilter) &&
                product.name !== originalProductName
            )
            .map(async (relatedProduct) => {
              const { id, name, thumbnail } = relatedProduct;
              const data = await getLowestAskAndHighestBid(relatedProduct);

              let lowestAsk = data[0];
              return { id, name, thumbnail, lowestAsk };
            })
        );
        return result;
      } else {
        const response = await axios.get(
          `${process.env.REACT_APP_REQUEST_URL}/`
        );
        const data: Products = response.data;
        const result = await Promise.all(
          data
            .filter(
              (product) =>
                product.name.includes(combinedFilter) &&
                product.name !== originalProductName
            )
            .map(async (relatedProduct) => {
              const { id, name, thumbnail } = relatedProduct;
              const data = await getLowestAskAndHighestBid(relatedProduct);

              let lowestAsk = data[0];
              return { id, name, thumbnail, lowestAsk };
            })
        );
        return result;
      }
    },
  });
  return { isLoading, data };
};
