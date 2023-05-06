import React, { useEffect, useState } from "react";
import { useBuyModalActions } from "api/modals/buyActions";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "redux/store";
import { CompleteBuy } from "components/completeBuySell/buy/CompleteBuy";
import { UserInfoSummary } from "../UserInfoSummary";
import { BuyActionsBox } from "./BuyActionsBox";

export const BuyActionsModal = ({
  product,
  productData,
  isFromPlaceBid,
  closeModal,
}: {
  product: string;
  productData: [string, number, number];
  isFromPlaceBid: boolean;
  closeModal: () => void;
}) => {
  const size = productData[0];
  const highestBid = productData[1];
  const lowestAsk = productData[2];

  const [userSummary, setUserSummary] = useState({
    shipping: "Set Your Shipping!",
    payment: "Set Your Payment!",
  });
  const [showCompleteBuyPage, setShowCompleteBuyPage] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { user, isLoggedInTemporary } = useAppSelector((state) => state.auth);
  const isLoggedInPersisted = user.isLoggedInPersisted;
  const isLoggedTemporary = isLoggedInTemporary;
  const isLoggedCondition =
    isLoggedInPersisted === "true" || isLoggedTemporary === "true";

  useEffect(() => {
    if (isFromPlaceBid) {
      setSwitchToPlaceBid(true);
    } else {
      setSwitchToPlaceBid(false);
    }
  }, [isFromPlaceBid]);

  const {
    bidPrice,
    disableButton,
    switchToPlaceBid,
    setSwitchToPlaceBid,
    setBidPrice,
    smartText,
  } = useBuyModalActions({
    lowestAsk: lowestAsk,
    highestBid: highestBid,
    userSummary: userSummary,
    userIsLoggedIn: isLoggedCondition,
  });

  const switchHandler = () => {
    setSwitchToPlaceBid(!switchToPlaceBid);
  };

  const openCompletePage = () => {
    if (isLoggedCondition) {
      setShowCompleteBuyPage(true);
    } else {
      navigate("/login");
    }
  };

  const closeCompleteBuy = () => {
    setShowCompleteBuyPage(false);
  };

  const getUserSummary = (payout_or_shipping: string, payment?: string) => {
    if (payment !== undefined) {
      const shipping = payout_or_shipping;
      setUserSummary({ shipping: shipping, payment: payment });
    }
  };

  return (
    <>
      {!showCompleteBuyPage ? (
        <div className="text-center mr-10 text-black">
          <div className="flex bg-white rounded mb-5 px-5 py-3 justify-between">
            SIZE: {size}
            <button onClick={closeModal}>EDIT</button>
          </div>
          <BuyActionsBox
            bidPrice={bidPrice}
            switchHandler={switchHandler}
            switchToPlaceBid={switchToPlaceBid}
            smartText={smartText}
            setBidPrice={setBidPrice}
          />
          {isLoggedCondition && (
            <UserInfoSummary
              type="buying"
              getUserSummary={(payout_or_shipping: string, payment?: string) =>
                getUserSummary(payout_or_shipping, payment)
              }
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
              {switchToPlaceBid ? "Review Bid" : "Review Buy"}
            </button>
          </div>
        </div>
      ) : (
        <CompleteBuy
          purchasePrice={lowestAsk}
          bidPrice={bidPrice}
          userSummary={userSummary}
          productData={[product, size]}
          isSwitchedToPlaceBid={switchToPlaceBid}
          closeCompleteBuy={closeCompleteBuy}
        />
      )}
    </>
  );
};
