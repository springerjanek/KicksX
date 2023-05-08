import React, { useEffect, useState } from "react";

export const useBuyModalActions = ({
  lowestAsk,
  highestBid,
  userSummary,
  userIsLoggedIn,
}: {
  lowestAsk: number;
  highestBid: number;
  userSummary: { shipping: string; payment: string };
  userIsLoggedIn: boolean;
}) => {
  const [bidPrice, setBidPrice] = useState(highestBid);
  const [smartText, setSmartText] = useState("You are not the highest Bid");
  const [switchToPlaceBid, setSwitchToPlaceBid] = useState(true);
  const [disableButton, setDisableButton] = useState(false);

  const userHaveShippingAndPayment =
    userSummary.payment !== "Set Your Payment!" &&
    userSummary.shipping !== "Set Your Shipping!";

  useEffect(() => {
    if (highestBid !== 0) {
      if (bidPrice <= highestBid) {
        setSmartText("You are not the highest bid");
      }
      if (bidPrice > highestBid) {
        setSmartText("You are about to be the highest bidder");
      }
      if (userHaveShippingAndPayment || !userIsLoggedIn) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    }

    if (bidPrice === 0 && switchToPlaceBid) {
      setSmartText("Please enter your bid (Minimum bid is 1$)");
      setDisableButton(true);
    }
    if (highestBid === 0 && bidPrice !== 0) {
      setSmartText("You are about to be the highest bidder");
      if (userHaveShippingAndPayment || !userIsLoggedIn) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    }
    if (lowestAsk === 0 && !switchToPlaceBid) {
      setSmartText("NO ASKS TO BUY FROM AVAILABLE");
      setDisableButton(true);
    }

    if (lowestAsk !== 0 && !switchToPlaceBid) {
      setBidPrice(lowestAsk);
    }
    if (bidPrice >= lowestAsk && lowestAsk !== 0) {
      setDisableButton(true);
    }
    let timeout = setTimeout(() => {
      if (lowestAsk !== 0 && bidPrice !== 0 && bidPrice >= lowestAsk) {
        setSmartText("You are about to purchase this item for the lowest ask");
        setSwitchToPlaceBid(false);
        setBidPrice(lowestAsk);
        if (userHaveShippingAndPayment || !userIsLoggedIn) {
          setDisableButton(false);
        } else {
          setDisableButton(true);
        }
      }
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [bidPrice, switchToPlaceBid, userHaveShippingAndPayment]);

  return {
    bidPrice,
    disableButton,
    switchToPlaceBid,
    setSwitchToPlaceBid,
    setBidPrice,
    setDisableButton,
    smartText,
  };
};
