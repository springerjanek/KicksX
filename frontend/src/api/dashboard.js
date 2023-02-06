import { useMutation, useQueryClient } from "react-query";
import { notify } from "../hooks/notify";
import axios from "axios";

export const useDeleteBid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      axios
        .post("http://localhost:3001/deleteBid", payload)
        .then((response) => response.data),
    onSuccess: (data) => {
      queryClient.setQueryData(["userBids"], data[1]);
      notify(data[0], "success");
    },
  });
};
