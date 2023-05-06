import React from "react";
import { useAppSelector } from "redux/store";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { notify } from "../../../hooks/useNotify";
import { useNavigate } from "react-router-dom";
import { useGetProductByName } from "hooks/useGetProductByName";
import { CompleteBuyActionBox } from "./CompleteBuyActionBox";

export const CompleteBuy = ({
  purchasePrice,
  bidPrice,
  isSwitchedToPlaceBid,
  userSummary,
  productData,
  closeCompleteBuy,
}: {
  purchasePrice: number;
  bidPrice: number;
  isSwitchedToPlaceBid: boolean;
  userSummary: { shipping: string; payment: string };
  productData: string[];
  closeCompleteBuy: () => void;
}) => {
  const name = productData[0];
  const size = productData[1];

  const { user } = useAppSelector((state) => state.auth);

  const uid = user.id;

  const navigate = useNavigate();

  const { data } = useGetProductByName(`/?name=${name}`, "buy");

  const thumbnail = data && data.thumbnail;

  const purchasePayload = {
    uid: uid,
    id: uuidv4(),
    date: new Date(),
    name: name,
    price: purchasePrice,
    size: size,
    thumbnail: thumbnail,
  };

  const bidPayload = {
    uid: uid,
    id: uuidv4(),
    name: name,
    price: bidPrice,
    size: size,
    thumbnail: thumbnail,
  };

  const completePurchaseHandler = () => {
    axios
      .post(`${process.env.REACT_APP_REQUEST_URL}/buy`, purchasePayload)
      .then((response) => notify(response.data, "success"))
      .catch((err) => console.warn(err));
    navigate("/dashboard/buying");
  };

  const completeBidHandler = () => {
    axios
      .post(`${process.env.REACT_APP_REQUEST_URL}/bid`, bidPayload)
      .then((response) => notify(response.data, "success"))
      .catch((err) => console.warn(err));
    navigate("/dashboard/buying");
  };

  return (
    <>
      {isSwitchedToPlaceBid ? (
        <CompleteBuyActionBox
          type="bid"
          price={bidPrice}
          userSummary={userSummary}
          closeCompleteBuy={closeCompleteBuy}
          completeHandler={completeBidHandler}
        />
      ) : (
        <CompleteBuyActionBox
          type="purchase"
          price={purchasePrice}
          userSummary={userSummary}
          closeCompleteBuy={closeCompleteBuy}
          completeHandler={completePurchaseHandler}
        />
      )}
    </>
  );
};
