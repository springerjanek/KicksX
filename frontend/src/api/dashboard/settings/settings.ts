import { useQuery } from "react-query";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_REQUEST_URL;

export const useGetSettingsData = (path: string) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["settingsData"],
    refetchOnWindowFocus: false,

    queryFn: async () => {
      const response = await axios.get<UserData>(`${BASE_URL + path}`);
      const userData = response.data;

      let result = {
        shipping: {
          name: "",
          surname: "",
          street: "",
          street_number: "",
          city: "",
          zip: "",
          country: "",
          phone: "",
        },
        payout: {
          type: "",
        },
        payment: {
          type: "",
        },
      };

      if (userData.shipping.street.length > 0) {
        result.shipping = userData.shipping;
      }
      if (userData.payout.type.length > 0) {
        result.payout = userData.payout;
      }
      if (userData.payment.type.length > 0) {
        result.payment = userData.payment;
      }
      return result;
    },
  });
  return { isLoading, data };
};
