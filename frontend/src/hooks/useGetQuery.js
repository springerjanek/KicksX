import { useQuery } from "react-query";
import axios from "axios";

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
