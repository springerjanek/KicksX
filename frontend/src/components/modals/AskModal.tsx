import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CompleteSale from "../completeBuySell/CompleteSale";
import Switcher from "../ui/Switcher";
import Fees from "../completeBuySell/Fees";
import UserInfoSummary from "./UserInfoSummary";

const AskModal = (props: {
  product: string;
  productData: [string, number | string, number | string];
  turnOffModal: () => void;
}) => {
  const productData = props.productData;
  const size = productData[0];

  const highestBid = productData[1];
  const lowestAsk = productData[2];

  const [askPrice, setAskPrice] = useState(lowestAsk);
  const [smartText, setSmartText] = useState("Please enter your ask!");
  const [switchToSellNow, setSwitchToSellNow] = useState(false);
  const [userSummary, setUserSummary] = useState("");
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const askPriceIsNumber = typeof askPrice === "number" && askPrice > 0;
  const lowestAskIsNumber = typeof lowestAsk === "number";
  const highestBidIsNumber = typeof highestBid === "number";
  console.log(lowestAsk);

  useEffect(() => {
    if (!askPriceIsNumber) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
    if (lowestAskIsNumber) {
      if (askPriceIsNumber && askPrice >= lowestAsk) {
        setSmartText("You are not the lowest ask");
      }
      if (askPriceIsNumber && askPrice < lowestAsk) {
        setSmartText("You are the lowest ask");
      }
    }

    if (!switchToSellNow && askPrice === "") {
      setSmartText("Please enter your ask");
    }

    if (lowestAsk === "" && askPriceIsNumber) {
      console.log("Siema");
      setSmartText("You are the lowest ask");
    }

    if (askPrice === 0) {
      setSmartText("Minimum ask is 1$");
      setDisableButton(true);
    }
    if (!highestBidIsNumber && switchToSellNow) {
      setSmartText("NO BIDS AVAILABLE");
      setDisableButton(true);
    }
    if (!switchToSellNow && askPrice === highestBid) {
      setAskPrice("");
      setSmartText("Please enter your ask!");
    }
    if (typeof highestBid === "number" && switchToSellNow) {
      setAskPrice(highestBid);
    }
    if (askPrice <= highestBid) {
      setDisableButton(true);
    }
    let timeout = setTimeout(() => {
      if (typeof askPrice === "number" && typeof highestBid === "number") {
        if (askPrice <= highestBid) {
          setSmartText("You're about to sell at the highest bid price");
          setSwitchToSellNow(true);
          setAskPrice(highestBid);
          setDisableButton(false);
        }
      }
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [askPrice, switchToSellNow]);

  const { user, isLoggedInTemporary } = useSelector(
    (state: reduxAuth) => state.auth
  );
  const isLoggedInPersisted = user.isLoggedInPersisted;
  const isLoggedTemporary = isLoggedInTemporary;
  const isLoggedCondition =
    isLoggedInPersisted === "true" || isLoggedTemporary === "true";
  console.log("ASK PRICE", askPrice);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setAskPrice(parseInt(e.target.value.replace(/\D/g, "")));
    } else {
      setAskPrice(0);
    }
  };

  const switchHandler = () => {
    setSwitchToSellNow(!switchToSellNow);
  };

  const askHandler = () => {
    if (isLoggedCondition && switchToSellNow === false) {
      setShowSaleModal(true);
    } else if (isLoggedCondition && switchToSellNow === true) {
      setShowSaleModal(true);
    } else {
      navigate("/login");
    }
  };

  const closeCompleteSale = () => {
    setShowSaleModal(false);
  };

  const disableButtonHandler = () => {
    setDisableButton(true);
  };

  const enableButtonHandler = () => {
    if (typeof askPrice === "number" && askPrice > 0) {
      setDisableButton(false);
    }
  };

  const getUserSummary = (payout: string) => {
    setUserSummary(payout);
  };
  return (
    <>
      {!showSaleModal ? (
        <div className="text-center mr-10 text-black">
          <div className="flex bg-white rounded mb-5 px-5 py-3 justify-between">
            SIZE: {size}
            <button onClick={props.turnOffModal} className="">
              EDIT
            </button>
          </div>
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
          {isLoggedCondition && (
            <UserInfoSummary
              type="selling"
              disableButton={disableButtonHandler}
              enableButton={enableButtonHandler}
              getUserSummary={(payout) => getUserSummary(payout)}
            />
          )}
          <div className="flex justify-between sm:mt-14 lg:mt-18">
            <button
              onClick={() => navigate(`/product/${id}`)}
              className="button"
            >
              Back
            </button>
            <button
              onClick={askHandler}
              disabled={disableButton}
              className="button disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {!switchToSellNow ? "Review Ask" : "Review Sale"}
            </button>
          </div>
        </div>
      ) : (
        <CompleteSale
          price={highestBid}
          askPrice={askPrice}
          userSummary={userSummary}
          productData={[props.product, size]}
          isSwitchedToSellNow={switchToSellNow}
          closeCompleteSale={closeCompleteSale}
        />
      )}
    </>
  );
};

export default AskModal;
