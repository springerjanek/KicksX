import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BanknotesIcon, HomeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const UserInfoSummary = (props) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shippingText, setShippingText] = useState("Set Your Shipping!");
  const [paymentText, setPaymentText] = useState("Set Your Payment!");
  const [payoutText, setPayoutText] = useState("Set Your Payout!");
  const navigate = useNavigate();

  const { user, isLoggedInTemporary } = useSelector((state) => state.auth);
  const isLoggedInPersisted = user.isLoggedInPersisted;
  const isLoggedTemporary = isLoggedInTemporary;
  const isLoggedCondition =
    isLoggedInPersisted === "true" || isLoggedTemporary === "true";
  const uid = user.id;

  useEffect(() => {
    const fetchData = async () => {
      const userData = await axios.get(
        `http://localhost:3001/getUserData/${uid}`
      );

      console.log("FETCHING...");

      setUserData(userData.data);
      setLoading(false);
    };
    if (isLoggedCondition === true && userData !== []) {
      fetchData().catch((e) => console.error(e));
    } else {
      setUserData([]);
    }
  }, [uid]);

  const modalForBuying = isLoggedCondition && props.type === "buying";
  const modalForSelling = isLoggedCondition && props.type === "selling";

  const userHaveShipping = !loading && userData.shipping.street.length > 0;
  const userHavePayment = !loading && userData.payment.type.length > 0;
  const userHavePayout = !loading && userData.payout.type.length > 0;
  const userHavePaymentAndShipping = userHavePayment && userHaveShipping;

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
      setShippingText(userData.shipping.street);
    }
    if (userHavePayment) {
      setPaymentText(userData.payment.type);
    }
    if (userHavePayment && userHaveShipping) {
      props.enableButton();
    } else {
      props.disableButton();
    }
  }, [userData]);

  useEffect(() => {
    if (userHavePayout) {
      setPayoutText("Payout Method: Active");
      props.enableButton();
    } else {
      props.disableButton();
    }
  }, [userData]);

  useEffect(() => {
    getUserData();
  }, [shippingText, paymentText, payoutText]);

  const editHandler = () => {
    navigate("/settings");
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
            <HomeIcon className="h-5 ml-6 mt-[3px]" />
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

export default UserInfoSummary;
