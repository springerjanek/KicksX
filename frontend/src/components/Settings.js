import React, { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notify } from "../hooks/notify";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

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

  const country = userInfo[0].shipping.country.label;

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
      console.log("1: ", userInfo);
    }
    if (userData.payout.type.length > 0) {
      setUserInfo((prev) =>
        prev.map((info) => {
          return { ...info, payout: userData.payout };
        })
      );
      console.log("2: ", userInfo);
    }
    if (userData.payment.type.length > 0) {
      setUserInfo((prev) =>
        prev.map((info) => {
          return { ...info, payment: userData.payment };
        })
      );
      console.log("3: ", userInfo);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3001/getUserData/${uid}`
      );
      console.log("FETCHING...");
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
    navigate("/settings/shipping");
  };

  const payoutHandler = () => {
    setEditPayout(true);
  };

  const paymentHandler = () => {
    setEditPayment(true);
  };

  const editPayoutHandler = () => {
    console.log(userInfo[0].payout.type);
    axios.post("http://localhost:3001/payout", {
      uid: uid,
      payout: userInfo[0].payout.type,
    });
    setEditPayout(false);
  };

  const editPaymentHandler = () => {
    axios.post("http://localhost:3001/payment", {
      uid: uid,
      payment: userInfo[0].payment.type,
    });
    setEditPayment(false);
  };

  console.log(userInfo);
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
            {userInfo[0].shipping.street.length > 0 && (
              <>
                <div className="block">
                  <p>Name: {userInfo[0].shipping.name}</p>
                  <p>Street: {userInfo[0].shipping.street}</p>
                  <p>Street Number: {userInfo[0].shipping.street_number}</p>
                  <p>Zip Code: {userInfo[0].shipping.zip}</p>
                  <p>Country: {country}</p>
                  <p>Phone: {userInfo[0].shipping.phone}</p>
                </div>
              </>
            )}
            <div className="flex justify-center mt-16 mb-1">
              <h2>PAYOUT DETAILS</h2>
              <button onClick={payoutHandler}>EDIT</button>
            </div>
            {userInfo[0].payout.type.length > 0 && (
              <>
                <div className="block">
                  {editPayout ? (
                    <>
                      <div className="flex justify-center gap-2">
                        <div
                          className={`border border-2	rounded ${
                            userInfo[0].payout.type === "PAYPAL" && "bg-white"
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
                            userInfo[0].payout.type === "CC" && "bg-white"
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
                      {userInfo[0].payout.type === "PAYPAL" ? (
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
            {userInfo[0].payment.type.length > 0 && (
              <>
                <div className="block">
                  {editPayment ? (
                    <>
                      <div className="flex justify-center gap-2">
                        <div
                          className={`border border-2	rounded ${
                            userInfo[0].payment.type === "PAYPAL" && "bg-white"
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
                            userInfo[0].payment.type === "CC" && "bg-white"
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
                      {userInfo[0].payment.type === "PAYPAL" ? (
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
    </>
  );
};

export default memo(Settings);
