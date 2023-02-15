import React, { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notify } from "../../hooks/notify";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import DashboardNavbar from "./DashboardNavbar";

const Settings = () => {
  const [userData, setUserData] = useState([]);
  const [userInfo, setUserInfo] = useState([
    {
      shipping: {
        name: "",
        surname: "",
        street: "",
        street_number: "",
        city: "",
        zip: "",
        country: {},
        phone: "",
      },
      payout: {
        type: "",
      },
      payment: {
        type: "",
      },
    },
  ]);
  const [editPayout, setEditPayout] = useState(false);
  const [selectPayout, setSelectPayout] = useState("");
  const [editPayment, setEditPayment] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const uid = user.id;

  const userShipping = userInfo[0].shipping;
  const userPayout = userInfo[0]?.payout;
  const userPayment = userInfo[0]?.payment;

  const checkForUserInfo = (userData) => {
    if (userData.shipping.street.length > 0) {
      setUserInfo((prev) =>
        prev.map((info) => {
          return {
            ...info,
            shipping: userData.shipping,
          };
        })
      );
    }
    if (userData.payout.type.length > 0) {
      setUserInfo((prev) =>
        prev.map((info) => {
          return { ...info, payout: userData.payout };
        })
      );
    }
    if (userData.payment.type.length > 0) {
      setUserInfo((prev) =>
        prev.map((info) => {
          return { ...info, payment: userData.payment };
        })
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3001/getUserData/${uid}`
      );
      const userData = response.data;
      setUserData(userData);
      if (userData) {
        checkForUserInfo(userData);
      }
    };
    if (userData !== []) {
      fetchData().catch((e) => console.error(e));
    } else {
      setUserData([]);
    }
  }, [uid]);

  const shippingHandler = () => {
    navigate("/dashboard/settings/shipping");
  };

  const payoutHandler = () => {
    setEditPayout(true);
  };

  const paymentHandler = () => {
    setEditPayment(true);
  };

  const editPayoutHandler = () => {
    axios.post("http://localhost:3001/payout", {
      uid: uid,
      payout: userPayout.type,
    });
    setEditPayout(false);
  };

  const editPaymentHandler = () => {
    axios.post("http://localhost:3001/payment", {
      uid: uid,
      payment: userPayment.type,
    });
    setEditPayment(false);
  };
  return (
    <>
      {!loading ? (
        <>
          <div className="text-center">
            <h1 className="text-2xl">GENERAL SETTINGS</h1>
            <div className="flex justify-center gap-">
              <h2>SHIPPING INFO</h2>

              <button onClick={shippingHandler}>EDIT</button>
            </div>
            {userShipping.street.length > 0 &&
              (console.log(userShipping),
              (
                <>
                  <div className="block">
                    <p>Name: {userShipping.name}</p>
                    <p>Street: {userShipping.street}</p>
                    <p>Street Number: {userShipping.street_number}</p>
                    <p>Zip Code: {userShipping.zip}</p>
                    <p>Country: {userShipping.country}</p>
                    <p>Phone: {userShipping.phone}</p>
                  </div>
                </>
              ))}
            <div className="flex justify-center mt-16 mb-1">
              <h2>PAYOUT DETAILS</h2>
              <button onClick={payoutHandler}>EDIT</button>
            </div>
            {userPayout.type.length > 0 && (
              <>
                <div className="block">
                  {editPayout ? (
                    <>
                      <div className="flex justify-center gap-2">
                        <div
                          className={`border border-2	rounded ${
                            userPayout.type === "PAYPAL" && "bg-white"
                          }`}
                        >
                          <img
                            src="https://logos-world.net/wp-content/uploads/2020/07/PayPal-Logo.png"
                            className="w-26 h-16"
                            onClick={() =>
                              setUserInfo((prev) =>
                                prev.map((info) => {
                                  return {
                                    ...info,
                                    payout: { type: "PAYPAL" },
                                  };
                                })
                              )
                            }
                          />
                        </div>
                        <div
                          className={`border border-2	rounded ${
                            userPayout.type === "CC" && "bg-white"
                          }`}
                        >
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                            className="w-26 h-10 mt-2 mr-1 "
                            onClick={() =>
                              setUserInfo((prev) =>
                                prev.map((info) => {
                                  return {
                                    ...info,
                                    payout: { type: "CC" },
                                  };
                                })
                              )
                            }
                          />
                        </div>
                      </div>
                      <button>BACK</button>
                      <button onClick={editPayoutHandler}>SAVE</button>
                    </>
                  ) : (
                    <>
                      {userPayout.type === "PAYPAL" ? (
                        <>
                          <img
                            src="https://logos-world.net/wp-content/uploads/2020/07/PayPal-Logo.png"
                            className="w-24 h-14 ml-auto mr-auto"
                          />
                        </>
                      ) : (
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                          className="w-24 ml-auto mr-auto"
                        />
                      )}
                    </>
                  )}
                </div>
              </>
            )}
            <div className="flex justify-center mt-16 mb-1">
              <h2>PAYMENT DETAILS</h2>
              <button onClick={paymentHandler}>EDIT</button>
            </div>
            {userPayment.type.length > 0 && (
              <>
                <div className="block">
                  {editPayment ? (
                    <>
                      <div className="flex justify-center gap-2">
                        <div
                          className={`border border-2	rounded ${
                            userPayment.type === "PAYPAL" && "bg-white"
                          }`}
                        >
                          <img
                            src="https://logos-world.net/wp-content/uploads/2020/07/PayPal-Logo.png"
                            className="w-26 h-16"
                            onClick={() =>
                              setUserInfo((prev) =>
                                prev.map((info) => {
                                  return {
                                    ...info,
                                    payment: { type: "PAYPAL" },
                                  };
                                })
                              )
                            }
                          />
                        </div>
                        <div
                          className={`border border-2	rounded ${
                            userPayment.type === "CC" && "bg-white"
                          }`}
                        >
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                            className="w-26 h-10 mt-2 mr-1 "
                            onClick={() =>
                              setUserInfo((prev) =>
                                prev.map((info) => {
                                  return {
                                    ...info,
                                    payment: { type: "CC" },
                                  };
                                })
                              )
                            }
                          />
                        </div>
                      </div>
                      <button>BACK</button>
                      <button onClick={editPaymentHandler}>SAVE</button>
                    </>
                  ) : (
                    <>
                      {userPayment.type === "PAYPAL" ? (
                        <>
                          <img
                            src="https://logos-world.net/wp-content/uploads/2020/07/PayPal-Logo.png"
                            className="w-24 h-14 ml-auto mr-auto"
                          />
                        </>
                      ) : (
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                          className="w-24 ml-auto mr-auto"
                        />
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="absolute left-1/2 ml-[-50px]">
          <ThreeDots
            height="80"
            width="100"
            radius="9"
            color="#ffffff"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ textAlign: "center" }}
            wrapperClassName=""
            visible={true}
          />
        </div>
      )}
      <DashboardNavbar />
    </>
  );
};

export default memo(Settings);
