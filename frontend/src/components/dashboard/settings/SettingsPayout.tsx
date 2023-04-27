import React, { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "redux/store";
import { useSelectPayout } from "api/dashboard/settings/payout";

export const SettingsPayout = ({
  userPayout,
}: {
  userPayout: { type: string };
}) => {
  const [editPayout, setEditPayout] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const { mutate: selectPayout } = useSelectPayout();

  const uid = user.id;

  const payoutHandler = () => {
    setEditPayout(true);
  };

  const selectPayoutHandler = (uid: string, payout: { type: string }) => {
    selectPayout({ uid: uid, payout: payout });
    setEditPayout(false);
  };

  return (
    <>
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
                  onClick={() => selectPayoutHandler(uid, { type: "PAYPAL" })}
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
    </>
  );
};
