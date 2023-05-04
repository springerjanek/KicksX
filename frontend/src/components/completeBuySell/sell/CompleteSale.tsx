import React from "react";
import { Fees } from "../Fees";
import { FinalChecks } from "../FinalChecks";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "redux/store";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { notify } from "../../../hooks/useNotify";
import { useNavigate } from "react-router-dom";
import { useGetProductByName } from "hooks/useGetProductByName";
import { CompleteSaleActionBox } from "./CompleteSaleActionBox";

export const CompleteSale = ({
  salePrice,
  askPrice,
  payout,
  productData,
  isSwitchedToSellNow,
  closeCompleteSale,
}: {
  salePrice: number;
  askPrice: number;
  payout: string;
  productData: string[];
  isSwitchedToSellNow: boolean;
  closeCompleteSale: () => void;
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const uid = user.id;

  const navigate = useNavigate();

  const name = productData[0];
  const size = productData[1];

  const { data } = useGetProductByName(`/?name=${name}`, "sell");

  const thumbnail = data && data.thumbnail;

  const salePayload = {
    uid: uid,
    id: uuidv4(),
    date: new Date(),
    name: name,
    price: salePrice,
    size: size,
    thumbnail: thumbnail,
  };

  const askPayload = {
    uid: uid,
    id: uuidv4(),
    name: name,
    price: askPrice,
    size: size,
    thumbnail: thumbnail,
  };

  const confirmSaleHandler = () => {
    axios
      .post("https://kicksxbackend.onrender.com/sell", salePayload)
      .then((response) => notify(response.data, "success"))
      .catch((err) => console.warn(err));
    navigate("/dashboard/selling");
  };

  const confirmAskHandler = () => {
    axios
      .post("https://kicksxbackend.onrender.com/ask", askPayload)
      .then((response) => notify(response.data, "success"))
      .catch((err) => console.warn(err));
    navigate("/dashboard/selling");
  };

  return (
    <>
      {isSwitchedToSellNow ? (
        <CompleteSaleActionBox
          type="sell"
          price={salePrice}
          payout={payout}
          closeCompleteSale={closeCompleteSale}
          completeHandler={confirmSaleHandler}
        />
      ) : (
        <CompleteSaleActionBox
          type="ask"
          price={askPrice}
          payout={payout}
          closeCompleteSale={closeCompleteSale}
          completeHandler={confirmAskHandler}
        />
      )}
    </>
  );
};
