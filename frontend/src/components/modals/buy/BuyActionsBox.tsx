import { Fees } from "components/completeBuySell/Fees";
import { Switcher } from "components/ui/Switcher";
import React from "react";

export const BuyActionsBox = ({
  bidPrice,
  switchHandler,
  switchToPlaceBid,
  smartText,
  setBidPrice,
}: {
  bidPrice: number;
  switchHandler: () => void;
  switchToPlaceBid: boolean;
  smartText: string;
  setBidPrice: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedInput = parseInt(e.target.value.replace(/\D/g, ""));

    const checkIfInputIsValidNumber = () => {
      if (!Number.isNaN(parsedInput)) {
        return true;
      } else {
        setBidPrice(0);
      }
    };

    if (checkIfInputIsValidNumber()) {
      setBidPrice(parsedInput);
    }
  };

  return (
    <div className="bg-white rounded">
      <Switcher
        onChange={switchHandler}
        checked={!switchToPlaceBid}
        leftText={"Place Bid"}
        rightText={"Buy Now"}
      />

      <input
        type="text"
        value={bidPrice}
        placeholder="Enter Bid"
        onChange={inputHandler}
        className="mt-10 outline outline-offset-2 outline-1 w-11/12 py-1 pl-1"
        disabled={!switchToPlaceBid && true}
      />
      <p className="mt-2">{smartText}</p>

      <Fees type="buying" price={bidPrice} />
    </div>
  );
};
