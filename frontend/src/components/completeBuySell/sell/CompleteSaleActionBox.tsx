import React, { useState } from "react";
import { Fees } from "../Fees";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { FinalChecks } from "../FinalChecks";

export const CompleteSaleActionBox = ({
  type,
  price,
  payout,
  closeCompleteSale,
  completeHandler,
}: {
  type: string;
  price: number;
  payout: string;
  closeCompleteSale: () => void;
  completeHandler: () => void;
}) => {
  const [disableButton, setDisableButton] = useState(true);

  const enableButtonHandler = () => {
    setDisableButton(false);
  };

  const disableButtonHandler = () => {
    setDisableButton(true);
  };
  return (
    <>
      <h1 className="text-2xl">
        {type === "sell" ? "Review Sale" : "Review Ask"}
      </h1>
      <p className="text-xl">
        {type === "sell"
          ? "Please confirm your sale details below"
          : "Please confirm your ask details below"}
      </p>
      <div className="bg-white rounded text-black mt-5 mr-10 h-[300px]">
        <div className="flex justify-between ml-9 mr-14 py-2 text-lg">
          <p className="mt-10">
            {" "}
            {type === "sell" ? "Your sale price" : "Your ask price"}
          </p>
          <p className="mt-10">${price}</p>
        </div>
        <Fees type="selling" price={price} />
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
        <button onClick={closeCompleteSale} className="button">
          Back
        </button>
        <button
          onClick={completeHandler}
          disabled={disableButton}
          className="mr-14 button
            disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {type === "sell" ? "CONFIRM SALE" : "CONFIRM ASK"}
        </button>
      </div>
    </>
  );
};
