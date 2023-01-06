import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CompleteSale from "./CompleteSale";
import Switcher from "./Switcher";
import Fees from "./Fees";
import UserInfoSummary from "./UserInfoSummary";

const AskModal = (props) => {
  const productData = props.productData;
  const size = productData[0];

  const highestBid = productData[1];
  const lowestAsk = productData[2];

  let defaultAskPrice = 1;
  if (highestBid !== "--") {
    defaultAskPrice = highestBid;
  }
  const [askPrice, setAskPrice] = useState(defaultAskPrice);
  const [smartText, setSmartText] = useState(
    "You are about to sell at the highest bid price"
  );
  const [switchToSellNow, setSwitchToSellNow] = useState(false);
  const [userSummary, setUserSummary] = useState("");
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  console.log(lowestAsk);
  useEffect(() => {
    if (switchToSellNow && highestBid === "--") {
      setSmartText("NO BIDS AVAILABLE");
      setDisableButton(true);
    }
    if (askPrice < lowestAsk && lowestAsk !== 0) {
      setSmartText("You are about to be the lowest Ask");
      setDisableButton(false);
    }
    if (askPrice >= lowestAsk && lowestAsk !== 0) {
      console.log("SIEMA");
      setSmartText("You are not the lowest ask");
      setDisableButton(false);
    }
    if (askPrice === highestBid) {
      console.log("SIEMA");
      setSmartText("You are about to sell at the highest bid price");
      setDisableButton(false);
    }
    if (lowestAsk === 0 && askPrice >= 1) {
      setSmartText("You are about to be the lowest Ask");
      setDisableButton(false);
    }
    if (askPrice < highestBid) {
      setDisableButton(true);
    }
    if (askPrice === 0) {
      setSmartText("Minimum ask is 1$");
      setDisableButton(true);
    }
    let timeout = setTimeout(() => {
      if (askPrice < highestBid) {
        setSwitchToSellNow(true);
        setAskPrice(highestBid);
      }
    }, [4000]);
    return () => {
      clearTimeout(timeout);
    };
  }, [askPrice, switchToSellNow]);

  const { user, isLoggedInTemporary } = useSelector((state) => state.auth);
  const isLoggedInPersisted = user.isLoggedInPersisted;
  const isLoggedTemporary = isLoggedInTemporary;
  const isLoggedCondition =
    isLoggedInPersisted === "true" || isLoggedTemporary === "true";

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
    if (askPrice > 0) {
      setDisableButton(false);
    }
  };

  const getUserSummary = (payout) => {
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
              onChange={(e) =>
                setAskPrice(Math.floor(e.target.value.replace(/\D/g, "")))
              }
              className="mt-10 outline outline-offset-2 outline-1 w-11/12 py-1"
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
          <div className="flex justify-between mt-24">
            <button
              onClick={() => navigate(`/product/${id}`)}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2"
            >
              Back
            </button>
            <button
              onClick={askHandler}
              disabled={disableButton}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2
            disabled:cursor-not-allowed disabled:bg-gray-300"
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
