import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { notify } from "hooks/notify/useNotify";

export const useSelectPayout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { uid: string; payout: { type: string } }) => {
      const data: SettingsData | undefined =
        queryClient.getQueryData("settingsData");

      const response = await axios.post(
        `${process.env.REACT_APP_REQUEST_URL}/payout`,
        {
          uid: payload.uid,
          payout: payload.payout.type,
        }
      );

      return { ...data, payout: payload.payout, message: response.data };
    },

    onSuccess: (data) => {
      queryClient.setQueryData<SettingsData>(["settingsData"], (oldData) => ({
        ...oldData!,
        payout: data!.payout,
      }));
      notify(data.message, "success");
    },
  });
};
