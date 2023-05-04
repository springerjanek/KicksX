import React, { useState } from "react";
import { useAppSelector } from "redux/store";
import { useParams, useNavigate } from "react-router-dom";
import { CompleteSale } from "../../completeBuySell/sell/CompleteSale";
import { UserInfoSummary } from "../UserInfoSummary";
import { useSellModalActions } from "api/modals/sellActions";
import { SellActionsBox } from "./SellActionsBox";

export const SellActionsModal = ({
  product,
  productData,
  closeModal,
}: {
  product: string;
  productData: [string, number, number];
  closeModal: () => void;
}) => {
  const size = productData[0];
  const highestBid = productData[1];
  const lowestAsk = productData[2];

  const [userSummary, setUserSummary] = useState("Set Your Payout!");
  const [showCompleteSalePage, setShowCompleteSalePage] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { user, isLoggedInTemporary } = useAppSelector((state) => state.auth);
  const isLoggedInPersisted = user.isLoggedInPersisted;
  const isLoggedTemporary = isLoggedInTemporary;
  const isLoggedCondition =
    isLoggedInPersisted === "true" || isLoggedTemporary === "true";

  const {
    askPrice,
    smartText,
    setAskPrice,
    disableButton,
    switchToSellNow,
    setSwitchToSellNow,
  } = useSellModalActions({
    lowestAsk: lowestAsk,
    highestBid: highestBid,
    userSummary: userSummary,
    userIsLoggedIn: isLoggedCondition,
  });

  const switchHandler = () => {
    setSwitchToSellNow(!switchToSellNow);
  };

  const openCompletePage = () => {
    if (isLoggedCondition) {
      setShowCompleteSalePage(true);
    } else {
      navigate("/login");
    }
  };

  const closeCompleteSale = () => {
    setShowCompleteSalePage(false);
  };

  const getUserSummary = (payout: string) => {
    setUserSummary(payout);
  };
  return (
    <>
      {!showCompleteSalePage ? (
        <div className="text-center mr-10 text-black">
          <div className="flex bg-white rounded mb-5 px-5 py-3 justify-between">
            SIZE: {size}
            <button onClick={closeModal} className="">
              EDIT
            </button>
          </div>
          <SellActionsBox
            askPrice={askPrice}
            switchHandler={switchHandler}
            switchToSellNow={switchToSellNow}
            smartText={smartText}
            setAskPrice={setAskPrice}
          />
          {isLoggedCondition && (
            <UserInfoSummary
              type="selling"
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
              onClick={openCompletePage}
              disabled={disableButton}
              className="button disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {!switchToSellNow ? "Review Ask" : "Review Sale"}
            </button>
          </div>
        </div>
      ) : (
        <CompleteSale
          salePrice={highestBid}
          askPrice={askPrice}
          payout={userSummary}
          productData={[product, size]}
          isSwitchedToSellNow={switchToSellNow}
          closeCompleteSale={closeCompleteSale}
        />
      )}
    </>
  );
};
