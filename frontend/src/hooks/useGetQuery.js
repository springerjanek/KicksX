import { useQuery } from "react-query";
import axios from "axios";
import { getLowestAskAndHighestBid } from "./getLowestAskAndHighestBid";

const BASE_URL = "http://localhost:3001";

export const useGetQuery = (path, key) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [key],
    refetchOnWindowFocus: false,
    queryFn: () =>
      axios.get(`${BASE_URL + path}`).then((response) => response.data),
  });

  return { isLoading, data };
};

export const useGetBids = (path) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["userBids"],
    refetchOnWindowFocus: false,

    queryFn: async () => {
      const res = await axios.get(`${BASE_URL + path}`);

      const result = Promise.all(
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
      const xd = await result;

      return [xd, res.data];
    },
  });

  return { isLoading, data };
};
