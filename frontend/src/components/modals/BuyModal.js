import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Switcher from "../ui/Switcher";
import CompleteBuy from "../completeBuySell/CompleteBuy";
import UserInfoSummary from "./UserInfoSummary";

const BuyModal = (props) => {
  const productData = props.productData;
  const highestBid = productData[1];
  const [bidPrice, setBidPrice] = useState(highestBid);
  const [smartText, setSmartText] = useState("You are not the highest Bid");
  const [switchToPlaceBid, setSwitchToPlaceBid] = useState(false);
  const [userSummary, setUserSummary] = useState({
    shipping: "",
    payment: "",
  });
  const [showCompletePage, setShowCompletePage] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (bidPrice < highestBid) {
      setSmartText("You are not the highest bid");
      setDisableButton(false);
    }
    if (bidPrice > highestBid) {
      setSmartText("You are about to be the highest bidder");
      setDisableButton(false);
    }
    if (bidPrice === highestBid) {
      setSmartText(
        "You are about to match the highest Bid. Their Bid will be accepted before yours"
      );
      setDisableButton(false);
    }
    if (bidPrice === 0 && switchToPlaceBid) {
      setSmartText("Minimum bid is 1$");
      setDisableButton(true);
    }
    if (bidPrice >= lowestAsk) {
      setSwitchToPlaceBid(false);
      setBidPrice(0);
    }
    if (!switchToPlaceBid && lowestAsk.length == 2) {
      setDisableButton(true);
    }
  }, [bidPrice, switchToPlaceBid]);

  useEffect(() => {
    if (props.isFromPlaceBid) {
      setSwitchToPlaceBid(true);
    }
  }, [props.isFromPlaceBid]);
  console.log(switchToPlaceBid);

  const { user, isLoggedInTemporary } = useSelector((state) => state.auth);
  const uid = user.id;
  const isLoggedInPersisted = user.isLoggedInPersisted;
  const isLoggedTemporary = isLoggedInTemporary;
  const isLoggedCondition =
    isLoggedInPersisted === "true" || isLoggedTemporary === "true";

  const size = productData[0];
  const lowestAsk = productData[2];

  const switchHandler = () => {
    setSwitchToPlaceBid(!switchToPlaceBid);
  };

  const buyHandler = () => {
    if (isLoggedCondition) {
      setShowCompletePage(true);
    } else {
      navigate("/login");
    }
  };

  const closeCompleteBuy = () => {
    setShowCompletePage(false);
    setDisableButton(false);
  };

  const disableButtonHandler = () => {
    setDisableButton(true);
  };

  const enableButtonHandler = () => {
    if (lowestAsk !== "--") {
      setDisableButton(false);
    }
  };

  const getUserSummary = (shipping, payment) => {
    setUserSummary({ shipping: shipping, payment: payment });
  };

  return (
    <>
      {!showCompletePage ? (
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
              checked={!switchToPlaceBid}
              leftText={"Place Bid"}
              rightText={"Buy Now"}
            />

            {!switchToPlaceBid && (
              <>
                <h1 className="text-2xl mt-2">${lowestAsk}</h1>
                <p>
                  {lowestAsk.length == 2
                    ? "No asks available"
                    : "You are about to purchase this product at the lowest Ask price"}
                </p>
                <div className="flex justify-between ml-9 mr-14 mt-2 py-2">
                  <p>Item Price</p> ${lowestAsk}
                </div>
                <p className="text-left text-sm ml-9">
                  Final price will be calculated at checkout
                </p>
                <div className="w-11/12 bg-black h-px ml-9 mt-16"></div>
              </>
            )}

            {switchToPlaceBid && (
              <>
                <input
                  type="text"
                  value={bidPrice}
                  onChange={(e) =>
                    setBidPrice(Math.floor(e.target.value.replace(/\D/g, "")))
                  }
                  className="mt-10 outline outline-offset-2 outline-1 w-11/12 py-1"
                  disabled={!switchToPlaceBid && true}
                />
                <p className="mt-2">{smartText}</p>

                <div className="w-11/12 bg-black h-px ml-9 mt-14"></div>
                <div className="flex justify-between ml-9 mr-14 py-3">
                  <p>Item Price</p>${bidPrice}
                </div>
              </>
            )}
            {isLoggedCondition && (
              <UserInfoSummary
                type="buying"
                disableButton={disableButtonHandler}
                enableButton={enableButtonHandler}
                getUserSummary={(shipping, payment) =>
                  getUserSummary(shipping, payment)
                }
              />
            )}
          </div>

          <div className="flex justify-between mt-24">
            <button
              onClick={() => navigate(`/product/${id}`)}
              className="button"
            >
              Back
            </button>
            <button
              onClick={buyHandler}
              disabled={disableButton}
              className="button
            disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {!switchToPlaceBid ? "Review Order" : "Review Bid"}
            </button>
          </div>
        </div>
      ) : (
        <CompleteBuy
          price={lowestAsk}
          bidPrice={bidPrice}
          isSwitchedToPlaceBid={switchToPlaceBid}
          userSummary={userSummary}
          productData={[props.product, size]}
          closeCompleteBuy={closeCompleteBuy}
        />
      )}
    </>
  );
};

export default BuyModal;
