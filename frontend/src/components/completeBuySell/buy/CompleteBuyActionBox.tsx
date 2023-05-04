import React from "react";
import { Fees } from "../Fees";
import { BanknotesIcon, HomeIcon } from "@heroicons/react/24/outline";
import { FinalChecks } from "../FinalChecks";

export const CompleteBuyActionBox = ({
  type,
  price,
  userSummary,
  closeCompleteBuy,
  completeHandler,
}: {
  type: string;
  price: number;
  userSummary: {
    shipping: string;
    payment: string;
  };
  closeCompleteBuy: () => void;
  completeHandler: () => void;
}) => {
  return (
    <>
      <h1 className="text-2xl">
        {type === "bid" ? "Review Bid" : "Review Order"}
      </h1>
      <h2 className="text-xl">
        {type === "bid"
          ? "Please confirm your bid details below"
          : "Please confirm your purchase details below"}
      </h2>
      <div className="bg-white rounded text-black mt-5 mr-10 h-[250px]">
        <div className="flex justify-between ml-9 mr-14 py-2 text-lg">
          <p className="mt-10">
            {type === "bid" ? "Your Bid" : "Your Purchase Price"}
          </p>
          <p className="mt-10">${price}</p>
        </div>
        <Fees type="buying" price={price} />
      </div>
      <div className="bg-white text-black rounded mr-10">
        <div className="flex mt-10 p-3 gap-2">
          <BanknotesIcon className="h-5 ml-2 mt-[3px]" />
          <p className="basis-1/2">{userSummary.payment}</p>
        </div>
        <div className="flex p-3 gap-2">
          <HomeIcon className="h-5 ml-2 mt-[3px]" />
          <p>{userSummary.shipping}</p>
        </div>
      </div>

      <FinalChecks
        type="buying"
        enableButton={() => {}}
        disableButton={() => {}}
      />

      <div className="flex justify-between mt-7">
        <button onClick={closeCompleteBuy} className="button">
          BACK
        </button>
        <button onClick={completeHandler} className="mr-10 button">
          {type === "bid" ? "PLACE BID" : "PLACE ORDER"}
        </button>
      </div>
    </>
  );
};
