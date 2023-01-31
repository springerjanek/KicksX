import { useQuery } from "react-query";
import axios from "axios";

export const useFetch2 = (url) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["userData"],
    queryFn: () => fetch(url).then((res) => res.json()),
  });

  return { isLoading, data };
};
