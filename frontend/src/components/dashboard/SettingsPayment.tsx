import React, { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "redux/store";
import { useSelectPayment } from "api/dashboard/settings/payment";

export const SettingsPayment = ({
  userPayment,
}: {
  userPayment: { type: string };
}) => {
  const [editPayment, setEditPayment] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const { mutate: selectPayment } = useSelectPayment();

  const uid = user.id;

  const paymentHandler = () => {
    setEditPayment(true);
  };

  const selectPaymentHandler = (uid: string, payment: { type: string }) => {
    selectPayment({ uid: uid, payment: payment });
    setEditPayment(false);
  };

  return (
    <>
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
                  onClick={() => selectPaymentHandler(uid, { type: "PAYPAL" })}
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
                  onClick={() => selectPaymentHandler(uid, { type: "CC" })}
                  alt="Credit Card"
                />
              </div>
            </div>
            <button onClick={() => setEditPayment(false)} className="mr-2">
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
    </>
  );
};
