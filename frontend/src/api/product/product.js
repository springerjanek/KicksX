import { useQuery } from "react-query";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const useGetProduct = (path) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["product"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL + path}`);
      const data = response.data[0];

      const setdefault = (obj, key, fallback) => {
        if (!(key in obj)) {
          obj[key] = fallback;
        }
        return obj[key];
      };

      const ask_by_size = {};
      const bid_by_size = {};
      for (const ask of data.asks) {
        setdefault(ask_by_size, ask.size, []).push(ask.price);
      }
      for (const bid of data.bids) {
        setdefault(bid_by_size, bid.size, []).push(bid.price);
      }
      let asksBySize = data.sizes.map((size) => ({
        size,
        asks: ask_by_size[size] !== undefined ? ask_by_size[size] : [],
      }));

      let bidsBySize = data.sizes.map((size) => ({
        size,
        bids: bid_by_size[size] !== undefined ? bid_by_size[size] : [],
      }));

      return { ...data, asksBySize: asksBySize, bidsBySize: bidsBySize };
    },
  });
  return { isLoading, data };
};
