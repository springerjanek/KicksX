import { useMutation, useQuery, useQueryClient } from "react-query";
import { getLowestAskAndHighestBid } from "../../hooks/getLowestAskAndHighestBid";
import { notify } from "../../hooks/notify";
import axios from "axios";

const BASE_URL = "https://kicksxbackend.onrender.com";

export const useGetAsks = (path: string) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["userAsks"],
    refetchOnWindowFocus: false,

    queryFn: async () => {
      const res = await axios.get<UserData>(`${BASE_URL + path}`);
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
      return { userAsks: result, userData: res.data };
    },
  });
  return { isLoading, data };
};

export const useDeleteAsk = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: DeleteAsk) => {
      const data: QueryAsksData | undefined =
        queryClient.getQueryData("userAsks");
      const updatedAsks = data!.userAsks.filter((x) => x.id !== payload.id);
      const response = await axios.post(
        "https://kicksxbackend.onrender.com/deleteAsk",
        payload
      );
      return { message: response.data, updatedAsks: updatedAsks };
    },

    onSuccess: (data) => {
      queryClient.setQueryData<QueryAsksData>(["userAsks"], (oldData) => ({
        userAsks: data.updatedAsks,
        userData: oldData!.userData,
      }));
      notify(data.message, "success");
    },
  });
};
