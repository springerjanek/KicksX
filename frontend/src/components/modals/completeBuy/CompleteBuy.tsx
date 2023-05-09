import React from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { notify } from "../../../hooks/notify/useNotify";
import { useNavigate } from "react-router-dom";
import { useGetProductByName } from "hooks/product/useGetProductByName";
import { CompleteBuyActionBox } from "./CompleteBuyActionBox";
import { useGetUserAuth } from "hooks/user/useGetUserAuth,";

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
  productData: { name: string; size: string };
  closeCompleteBuy: () => void;
}) => {
  const { uid } = useGetUserAuth();

  const navigate = useNavigate();

  const { data } = useGetProductByName(`/?name=${productData.name}`, "buy");

  const thumbnail = data && data.thumbnail;

  const purchasePayload = {
    uid: uid,
    id: uuidv4(),
    date: new Date(),
    name: productData.name,
    price: purchasePrice,
    size: productData.size,
    thumbnail: thumbnail,
  };

  const bidPayload = {
    uid: uid,
    id: uuidv4(),
    name: productData.name,
    price: bidPrice,
    size: productData.size,
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
