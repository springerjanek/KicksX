import React, { useState, useEffect } from "react";
import { Fees } from "./Fees";
import { FinalChecks } from "./FinalChecks";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "redux/store";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { notify } from "../../hooks/notify";
import { useNavigate } from "react-router-dom";
import { useGetProductByName } from "hooks/useGetProductByName";

export const CompleteSale = (props: {
  price: number | string;
  askPrice: number | string;
  userSummary: string;
  productData: string[];
  isSwitchedToSellNow: boolean;
  closeCompleteSale: () => void;
}) => {
  const [thumbnail, setThumbnail] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const { user } = useAppSelector((state) => state.auth);

  const uid = user.id;

  const navigate = useNavigate();

  const payout = props.userSummary;

  const isSwitchedToSellNow = props.isSwitchedToSellNow;
  const sellPrice = props.price;
  const askPrice = props.askPrice;
  const name = props.productData[0];
  const size = props.productData[1];

  const enableButtonHandler = () => {
    setDisableButton(false);
  };

  const disableButtonHandler = () => {
    setDisableButton(true);
  };

  const { data, isLoading } = useGetProductByName(`/?name=${name}`, "sell");

  useEffect(() => {
    if (!isLoading) {
      setThumbnail(data!.thumbnail);
    }
  }, [isLoading]);

  const salePayload = {
    uid: uid,
    id: uuidv4(),
    date: new Date(),
    name: name,
    price: sellPrice,
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
        <>
          <h1 className="text-2xl">Review Sale</h1>
          <p className="text-xl">Please confirm your Sale details below</p>
          <div className="bg-white rounded text-black mt-5 mr-10 h-[300px]">
            <div className="flex justify-between ml-9 mr-14 py-2 text-lg">
              <p className="mt-10">Your Sale Price</p>
              <p className="mt-10">${sellPrice}</p>
            </div>
            <Fees type="selling" price={sellPrice} />
          </div>
          <div className="bg-white rounded mt-10 p-4 text-black mr-10">
            <div className="p-2 flex gap-2">
              <BanknotesIcon className="h-5 ml-6 mt-[3px]" />
              {payout}
            </div>
          </div>
          <FinalChecks
            type="selling"
            enableButton={enableButtonHandler}
            disableButton={disableButtonHandler}
          />

          <div className="flex justify-between mt-5">
            <button
              onClick={props.closeCompleteSale}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2"
            >
              Back
            </button>
            <button
              onClick={confirmSaleHandler}
              disabled={disableButton}
              className="mr-14 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2
            disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Confirm Sale
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl">Review Ask</h1>
          <p className="text-xl">Please confirm your Ask details below</p>
          <div className="bg-white rounded text-black mt-5 mr-10 h-[300px]">
            <div className="flex justify-between ml-9 mr-14 py-2 text-lg">
              <p className="mt-10">Your Ask</p>
              <p className="mt-10">${askPrice}</p>
            </div>
            <Fees type="selling" price={askPrice} />
          </div>

          <div className="bg-white rounded mt-10 p-4 text-black mr-10">
            <div className="p-2 flex gap-2">
              <BanknotesIcon className="h-5 ml-6 mt-[3px]" />
              {payout}
            </div>
          </div>
          <FinalChecks
            type="selling"
            enableButton={enableButtonHandler}
            disableButton={disableButtonHandler}
          />

          <div className="flex justify-between mt-10">
            <button onClick={props.closeCompleteSale} className="button">
              Back
            </button>
            <button
              onClick={confirmAskHandler}
              disabled={disableButton}
              className="button mr-10
            disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Confirm Ask
            </button>
          </div>
        </>
      )}
    </>
  );
};
