import React, { useState } from "react";
import { useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useGetSettingsData } from "api/dashboard/settings/settings";
import { useSelectPayout } from "api/dashboard/settings/payout";
import { useSelectPayment } from "api/dashboard/settings/payment";
import { DashboardNavbar } from "./DashboardNavbar";

export const Settings = () => {
  const [editPayout, setEditPayout] = useState(false);
  const [editPayment, setEditPayment] = useState(false);

  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const uid = user.id;

  const { isLoading, data } = useGetSettingsData(`/getUserData/${uid}`);

  const { mutate: selectPayout } = useSelectPayout();
  const { mutate: selectPayment } = useSelectPayment();

  const userShipping = data?.shipping;
  const userPayout = data?.payout;
  const userPayment = data?.payment;

  const shippingHandler = () => {
    navigate("/dashboard/settings/shipping");
  };

  const payoutHandler = () => {
    setEditPayout(true);
  };

  const paymentHandler = () => {
    setEditPayment(true);
  };

  const selectPayoutHandler = (uid: string, payout: { type: string }) => {
    selectPayout({ uid: uid, payout: payout });
    setEditPayout(false);
  };

  const selectPaymentHandler = (uid: string, payment: { type: string }) => {
    selectPayment({ uid: uid, payment: payment });
    setEditPayment(false);
  };
  return (
    <>
      <Link
        to={"/"}
        className="mt-5 absolute sm:right-5 md:right-auto md:left-6"
      >
        <h2 className="text-2xl font-medium">KicksX</h2>
      </Link>
      {!isLoading ? (
        <>
          <div className="text-center text-xl">
            <h1 className="text-2xl font-bold mt-5">GENERAL SETTINGS</h1>
            <div className="flex justify-center items-center gap-2">
              <h2 className=" mt-5 mb-2">SHIPPING INFO</h2>
              <button onClick={shippingHandler}>
                <PencilSquareIcon className="w-6 h-6 mt-3" />
              </button>
            </div>
            {userShipping!.street.length > 0 && (
              <>
                <div className="block">
                  <p>Name: {userShipping!.name}</p>
                  <p>Street: {userShipping!.street}</p>
                  <p>Street Number: {userShipping!.street_number}</p>
                  <p>City: {userShipping!.city}</p>
                  <p>Zip Code: {userShipping!.zip}</p>
                  <p>Country: {userShipping!.country}</p>
                  <p>Phone: {userShipping!.phone}</p>
                </div>
              </>
            )}

            <div className="flex justify-center mt-16 mb-1 gap-2">
              <h2>PAYOUT DETAILS</h2>
              <button onClick={payoutHandler}>
                <PencilSquareIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="block">
              {editPayout ? (
                <>
                  <div className="flex justify-center gap-2">
                    <div
                      className={`border border-2	rounded ${
                        userPayout!.type === "PAYPAL" && "bg-white"
                      }`}
                    >
                      <img
                        src="https://logos-world.net/wp-content/uploads/2020/07/PayPal-Logo.png"
                        className="w-26 h-16"
                        onClick={() =>
                          selectPayoutHandler(uid, { type: "PAYPAL" })
                        }
                        alt="Paypal"
                      />
                    </div>
                    <div
                      className={`border border-2	rounded ${
                        userPayout!.type === "CC" && "bg-white"
                      }`}
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                        className="w-26 h-10 mt-2 mr-1 "
                        onClick={() => selectPayoutHandler(uid, { type: "CC" })}
                        alt="Credit Card"
                      />
                    </div>
                  </div>
                  <button className="mr-2" onClick={() => setEditPayout(false)}>
                    BACK
                  </button>
                </>
              ) : (
                <>
                  {userPayout!.type === "PAYPAL" && (
                    <img
                      src="https://logos-world.net/wp-content/uploads/2020/07/PayPal-Logo.png"
                      className="w-24 h-14 ml-auto mr-auto"
                      alt="Paypal"
                    />
                  )}
                  {userPayout!.type === "CC" && (
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                      className="w-24 ml-auto mr-auto"
                      alt="Credit Card"
                    />
                  )}
                  {userPayout!.type === "" && <p>Set your payout!</p>}
                </>
              )}
            </div>

            <div className="flex justify-center mt-16 mb-1 gap-2">
              <h2>PAYMENT DETAILS</h2>
              <button onClick={paymentHandler}>
                <PencilSquareIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="block">
              {editPayment ? (
                <>
                  <div className="flex justify-center gap-2">
                    <div
                      className={`border border-2	rounded ${
                        userPayment!.type === "PAYPAL" && "bg-white"
                      }`}
                    >
                      <img
                        src="https://logos-world.net/wp-content/uploads/2020/07/PayPal-Logo.png"
                        className="w-26 h-16"
                        onClick={() =>
                          selectPaymentHandler(uid, { type: "PAYPAL" })
                        }
                        alt="Paypal"
                      />
                    </div>
                    <div
                      className={`border border-2	rounded ${
                        userPayment!.type === "CC" && "bg-white"
                      }`}
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                        className="w-26 h-10 mt-2 mr-1 "
                        onClick={() =>
                          selectPaymentHandler(uid, { type: "CC" })
                        }
                        alt="Credit Card"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setEditPayment(false)}
                    className="mr-2"
                  >
                    BACK
                  </button>
                </>
              ) : (
                <>
                  {userPayment!.type === "PAYPAL" && (
                    <img
                      src="https://logos-world.net/wp-content/uploads/2020/07/PayPal-Logo.png"
                      className="w-24 h-14 ml-auto mr-auto"
                      alt="Paypal"
                    />
                  )}
                  {userPayment!.type === "CC" && (
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                      className="w-24 ml-auto mr-auto"
                      alt="Credit Card"
                    />
                  )}
                  {userPayment!.type === "" && <p>Set your payment!</p>}
                </>
              )}
            </div>
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
            visible={true}
          />
        </div>
      )}
      <DashboardNavbar />
    </>
  );
};
