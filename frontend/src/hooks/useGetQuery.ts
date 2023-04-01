import { useQuery } from "react-query";
import axios from "axios";

const BASE_URL = "https://kicksxbackend.onrender.com";

export const useGetQuery = (path: string, key: string) => {
  const { isLoading, data } = useQuery({
    queryKey: [key],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL + path}`);
        return response.data;
      } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        return message;
      }
    },
  });

  return { isLoading, data };
};
