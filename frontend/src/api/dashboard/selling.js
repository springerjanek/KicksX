import { useMutation, useQuery, useQueryClient } from "react-query";
import { getLowestAskAndHighestBid } from "../../hooks/getLowestAskAndHighestBid";
import { notify } from "../../hooks/notify";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const useGetAsks = (path) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["userAsks"],
    refetchOnWindowFocus: false,

    queryFn: async () => {
      const res = await axios.get(`${BASE_URL + path}`);
      console.log(res.data);
      const result = await Promise.all(
        res.data.asks.map(async (ask) => {
          if (ask.price !== null) {
            const data = await getLowestAskAndHighestBid(ask.name);

            const lowestAsk = data[0];
            const highestBid = data[1];

            return { ...ask, lowestAsk: lowestAsk, highestBid: highestBid };
          }
          return ask;
        })
      );
      return [result, res.data];
    },
  });

  return { isLoading, data };
};

export const useDeleteAsk = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const data = queryClient.getQueryData("userAsks");
      const updatedAsks = data[0].filter((x) => x.id !== payload.id);
      const response = await axios.post(
        "http://localhost:3001/deleteAsk",
        payload
      );
      return [response.data, updatedAsks];
    },

    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(["userAsks"], (oldData) => [
        data[1],
        oldData[1],
      ]);
      notify(data[0], "success");
    },
  });
};
