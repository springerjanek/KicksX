import { useMutation, useQuery, useQueryClient } from "react-query";
import { getLowestAskAndHighestBid } from "../../hooks/getLowestAskAndHighestBid";
import { notify } from "../../hooks/notify";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const useGetBids = (path) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["userBids"],
    refetchOnWindowFocus: false,

    queryFn: async () => {
      const res = await axios.get(`${BASE_URL + path}`);
      const result = await Promise.all(
        res.data.bids.map(async (bid) => {
          if (bid.price !== null) {
            const data = await getLowestAskAndHighestBid(bid.name);

            const lowestAsk = data[0];
            const highestBid = data[1];

            return { ...bid, lowestAsk: lowestAsk, highestBid: highestBid };
          }
          return bid;
        })
      );
      return [result, res.data];
    },
  });

  return { isLoading, data };
};

export const useDeleteBid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const data = queryClient.getQueryData("userBids");
      const updatedBids = data[0].filter((x) => x.id !== payload.id);
      const response = await axios.post(
        "http://localhost:3001/deleteBid",
        payload
      );
      return [response.data, updatedBids];
    },

    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(["userBids"], (oldData) => [
        data[1],
        oldData[1],
      ]);
      notify(data[0], "success");
    },
  });
};
