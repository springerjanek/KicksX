import React from "react";
import { Switcher } from "components/ui/Switcher";
import { Fees } from "components/completeBuySell/Fees";

export const SellActionsBox = ({
  askPrice,
  switchHandler,
  switchToSellNow,
  smartText,
  setAskPrice,
}: {
  askPrice: number;
  switchHandler: () => void;
  switchToSellNow: boolean;
  smartText: string;
  setAskPrice: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedInput = parseInt(e.target.value.replace(/\D/g, ""));

    const checkIfInputIsValidNumber = () => {
      if (!Number.isNaN(parsedInput)) {
        return true;
      } else {
        setAskPrice(0);
      }
    };

    if (checkIfInputIsValidNumber()) {
      setAskPrice(parsedInput);
    }
  };

  return (
    <div className="bg-white rounded">
      <Switcher
        onChange={switchHandler}
        checked={switchToSellNow && true}
        leftText={"Place Ask"}
        rightText={"Sell Now"}
      />

      <input
        type="text"
        value={askPrice}
        placeholder="Enter Ask"
        onChange={inputHandler}
        className="mt-10 outline outline-offset-2 outline-1 w-11/12 py-1 pl-1"
        disabled={switchToSellNow && true}
      />
      <p className="mt-2">{smartText}</p>

      <Fees type="selling" price={askPrice} />
    </div>
  );
};
