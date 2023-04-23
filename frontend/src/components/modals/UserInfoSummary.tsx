import React, { useEffect, useState } from "react";
import { useAppSelector } from "redux/store";
import { BanknotesIcon, HomeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useGetUserData } from "hooks/useGetUserData";

export const UserInfoSummary = (props: {
  type: string;
  disableButton: () => void;
  enableButton: () => void;
  getUserSummary: {
    (payout: string): void;
    (shipping: string, payment: string): void;
  };
}) => {
  const [shippingText, setShippingText] = useState("Set Your Shipping!");
  const [paymentText, setPaymentText] = useState("Set Your Payment!");
  const [payoutText, setPayoutText] = useState("Set Your Payout!");
  const navigate = useNavigate();

  const { user, isLoggedInTemporary } = useAppSelector((state) => state.auth);
  const isLoggedInPersisted = user.isLoggedInPersisted;
  const isLoggedTemporary = isLoggedInTemporary;
  const isLoggedCondition =
    isLoggedInPersisted === "true" || isLoggedTemporary === "true";
  const uid = user.id;

  const { isLoading, data } = useGetUserData(
    `/getUserData/${uid}`,
    "dashboardData"
  );

  const modalForBuying = isLoggedCondition && props.type === "buying";
  const modalForSelling = isLoggedCondition && props.type === "selling";

  const userHaveShipping = !isLoading && data!.shipping.street.length > 0;
  const userHavePayment = !isLoading && data!.payment.type.length > 0;
  const userHavePayout = !isLoading && data!.payout.type.length > 0;

  const getUserData = () => {
    if (props.type === "buying") {
      props.getUserSummary(shippingText, paymentText);
    }
    if (props.type === "selling") {
      props.getUserSummary(payoutText);
    }
  };

  useEffect(() => {
    if (userHaveShipping) {
      setShippingText(data!.shipping.street);
    }
    if (userHavePayment) {
      setPaymentText(data!.payment.type);
    }
    if (userHavePayment && userHaveShipping) {
      props.enableButton();
    } else {
      props.disableButton();
    }
  }, [userHavePayment, userHaveShipping]);

  useEffect(() => {
    if (userHavePayout) {
      setPayoutText("Payout Method: Active");
      props.enableButton();
    } else {
      props.disableButton();
    }
  }, [userHavePayout]);

  useEffect(() => {
    getUserData();
  }, [shippingText, paymentText, payoutText]);

  const editHandler = () => {
    navigate("/dashboard/settings");
  };

  return (
    <>
      {modalForBuying && (
        <>
          <div className="p-4 flex gap-2">
            <BanknotesIcon className="h-5 ml-6 mt-[3px]" />
            {paymentText}
            <button
              onClick={editHandler}
              className="ml-auto mr-7 underline underline-offset-4 decoration-[2px] font-bold"
            >
              EDIT
            </button>
          </div>

          <div className="w-11/12 bg-black h-px ml-9"></div>
          <div className="p-4 flex gap-2">
            <HomeIcon className="h-5 ml-6 mt-[3px] mb-4" />
            {shippingText}
            <button
              onClick={editHandler}
              className="ml-auto mr-7 underline underline-offset-4 decoration-[2px] font-bold"
            >
              EDIT
            </button>
          </div>
        </>
      )}
      {modalForSelling && (
        <>
          <div className="bg-white rounded mt-10 p-4 ">
            <div className="p-4 flex gap-2">
              <BanknotesIcon className="h-5 ml-6 mt-[3px]" />
              {payoutText}
              <button
                onClick={editHandler}
                className="ml-auto underline underline-offset-4 decoration-[2px] font-bold"
              >
                EDIT
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
