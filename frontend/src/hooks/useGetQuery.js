import { useQuery } from "react-query";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const useGetQuery = (path, key) => {
  const { isLoading, data } = useQuery({
    queryKey: [key],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL + path}`);
        return response.data;
      } catch (error) {
        return error.response;
      }
    },
  });

  return { isLoading, data };
};
