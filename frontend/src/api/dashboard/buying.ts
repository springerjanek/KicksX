import { useMutation, useQuery, useQueryClient } from "react-query";
import { getLowestAskAndHighestBid } from "hooks/getLowestAskAndHighestBid";
import { notify } from "hooks/notify";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const useGetBids = (path: string) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["userBids"],
    refetchOnWindowFocus: false,

    queryFn: async () => {
      const res = await axios.get<UserData>(`${BASE_URL + path}`);
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
      return { userBids: result, userData: res.data };
    },
  });

  return { isLoading, data, error };
};

export const useDeleteBid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: DeleteBid) => {
      const data: QueryBidsData | undefined =
        queryClient.getQueryData("userBids");

      const updatedBids = data!.userBids.filter((x) => x.id !== payload.id);
      const response = await axios.post(
        "http://localhost:3001/deleteBid",
        payload
      );
      return { message: response.data, updatedBids: updatedBids };
    },

    onSuccess: (data) => {
      queryClient.setQueryData<QueryBidsData>(["userBids"], (oldData) => ({
        userBids: data.updatedBids,
        userData: oldData!.userData,
      }));
      notify(data.message, "success");
    },
  });
};
