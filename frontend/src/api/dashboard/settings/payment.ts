import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { notify } from "hooks/notify";

export const useSelectPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { uid: string; payment: { type: string } }) => {
      const data: SettingsData | undefined =
        queryClient.getQueryData("settingsData");

      const response = await axios.post("http://localhost:3001/payment", {
        uid: payload.uid,
        payment: payload.payment.type,
      });

      return { ...data, payment: payload.payment, message: response.data };
    },

    onSuccess: (data) => {
      queryClient.setQueryData<SettingsData>(["settingsData"], (oldData) => ({
        ...oldData!,
        payment: data!.payment,
      }));
      notify(data.message, "success");
    },
  });
};
