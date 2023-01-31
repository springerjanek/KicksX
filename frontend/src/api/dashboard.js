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
      queryClient.setQueryData(["userData"], data[1]);
      notify(data[0], "success");
    },
  });
};

export const useEditBid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (editPayload) =>
      axios
        .post("http://localhost:3001/editBid", editPayload)
        .then((response) => response.data),
    onSuccess: (data) => {
      queryClient.setQueryData(["userData"], data[1]);
      notify(data[0], "success");
    },
  });
};
