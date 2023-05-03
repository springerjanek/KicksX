import { useEffect, useState } from "react";

export const useSellModalActions = ({
  lowestAsk,
  highestBid,
  userSummary,
  userIsLoggedIn,
}: {
  lowestAsk: number;
  highestBid: number;
  userSummary: string;
  userIsLoggedIn: boolean;
}) => {
  const [askPrice, setAskPrice] = useState(lowestAsk);
  const [smartText, setSmartText] = useState("Please enter your ask!");
  const [disableButton, setDisableButton] = useState(false);
  const [switchToSellNow, setSwitchToSellNow] = useState(false);

  const userHavePayout = userSummary !== "Set Your Payout!";

  useEffect(() => {
    if (lowestAsk !== 0) {
      if (askPrice >= lowestAsk) {
        setSmartText("You are not the lowest ask");
      }
      if (askPrice < lowestAsk) {
        setSmartText("You are the lowest ask");
      }
      if (userHavePayout) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    }

    if (!switchToSellNow && askPrice === 0) {
      setSmartText("Please enter your ask (Minimum ask is 1$)");
      setDisableButton(true);
    }

    if (lowestAsk === 0 && askPrice !== 0) {
      setSmartText("You are the lowest ask");
      if (userHavePayout) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    }
    if (highestBid === 0 && switchToSellNow) {
      setSmartText("NO BIDS AVAILABLE");
      setDisableButton(true);
    }
    if (highestBid !== 0 && switchToSellNow) {
      setAskPrice(highestBid);
    }
    if (askPrice <= highestBid) {
      setDisableButton(true);
    }
    let timeout = setTimeout(() => {
      if (highestBid !== 0 && askPrice !== 0 && askPrice <= highestBid) {
        setSmartText("You're about to sell at the highest bid price");
        setSwitchToSellNow(true);
        setAskPrice(highestBid);
        if (userHavePayout) {
          setDisableButton(false);
        } else {
          setDisableButton(true);
        }
      }
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [askPrice, switchToSellNow]);

  return {
    askPrice,
    disableButton,
    switchToSellNow,
    setSwitchToSellNow,
    setAskPrice,
    setDisableButton,
    smartText,
  };
};
