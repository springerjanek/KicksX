import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CompleteSale } from "../completeSale/CompleteSale";
import { UserInfoSummary } from "../misc/UserInfoSummary";
import { useSellModalActions } from "api/modals/sellActions";
import { SellActionsBox } from "./SellActionsBox";
import { useGetUserAuth } from "hooks/user/useGetUserAuth,";

export const SellActionsModal = ({
  productName,
  productData,
  closeModal,
}: {
  productName: string;
  productData: {
    size: string;
    highestBid: number;
    lowestAsk: number;
  };
  closeModal: () => void;
}) => {
  const [userSummary, setUserSummary] = useState("Set Your Payout!");
  const [showCompleteSalePage, setShowCompleteSalePage] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoggedCondition } = useGetUserAuth();

  const {
    askPrice,
    smartText,
    setAskPrice,
    disableButton,
    switchToSellNow,
    setSwitchToSellNow,
  } = useSellModalActions({
    lowestAsk: productData.lowestAsk,
    highestBid: productData.highestBid,
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
            SIZE: {productData.size}
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
          salePrice={productData.highestBid}
          askPrice={askPrice}
          payout={userSummary}
          productData={{ name: productName, size: productData.size }}
          isSwitchedToSellNow={switchToSellNow}
          closeCompleteSale={closeCompleteSale}
        />
      )}
    </>
  );
};
