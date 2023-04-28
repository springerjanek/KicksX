import { useQuery, useQueryClient } from "react-query";
import { getLowestAskAndHighestBid } from "hooks/getLowestAskAndHighestBid";

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
      if (data) {
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
