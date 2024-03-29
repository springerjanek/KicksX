import { useQuery } from "react-query";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_REQUEST_URL;

export const useGetUserData = (path: string, key: string) => {
  const { isLoading, data } = useQuery({
    queryKey: [key],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL + path}`);
      const result: UserData = response.data;
      return result;
    },
  });

  return { isLoading, data };
};
