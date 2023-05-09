import React from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { notify } from "../../../hooks/notify/useNotify";
import { useNavigate } from "react-router-dom";
import { useGetProductByName } from "hooks/product/useGetProductByName";
import { CompleteSaleActionBox } from "./CompleteSaleActionBox";
import { useGetUserAuth } from "hooks/user/useGetUserAuth,";

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
  productData: { name: string; size: string };
  isSwitchedToSellNow: boolean;
  closeCompleteSale: () => void;
}) => {
  const { uid } = useGetUserAuth();

  const navigate = useNavigate();

  const { data } = useGetProductByName(`/?name=${productData.name}`, "sell");

  const thumbnail = data && data.thumbnail;

  const salePayload = {
    uid: uid,
    id: uuidv4(),
    date: new Date(),
    name: productData.name,
    price: salePrice,
    size: productData.size,
    thumbnail: thumbnail,
  };

  const askPayload = {
    uid: uid,
    id: uuidv4(),
    name: productData.name,
    price: askPrice,
    size: productData.size,
    thumbnail: thumbnail,
  };

  const confirmSaleHandler = () => {
    axios
      .post(`${process.env.REACT_APP_REQUEST_URL}/sell`, salePayload)
      .then((response) => notify(response.data, "success"))
      .catch((err) => console.warn(err));
    navigate("/dashboard/selling");
  };

  const confirmAskHandler = () => {
    axios
      .post(`${process.env.REACT_APP_REQUEST_URL}/ask`, askPayload)
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
