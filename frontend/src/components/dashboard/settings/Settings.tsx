import React from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useGetSettingsData } from "api/dashboard/settings/settings";
import { SettingsPayout } from "./SettingsPayout";
import { DashboardNavbar } from "../../ui/Navbar/DashboardNavbar";
import { SettingsPayment } from "./SettingsPayment";
import { useGetUserAuth } from "hooks/user/useGetUserAuth,";

export const Settings = () => {
  const navigate = useNavigate();

  const { uid } = useGetUserAuth();

  const { isLoading, data } = useGetSettingsData(`/getUserData/${uid}`);

  const userShipping = data?.shipping;
  const userPayout = data?.payout;
  const userPayment = data?.payment;

  const shippingHandler = () => {
    navigate("/dashboard/settings/shipping");
  };

  return (
    <>
      <Link
        to={"/"}
        className="mt-5 absolute sm:right-0.5 md:right-auto md:left-6"
      >
        <h2 className="text-2xl font-medium">KicksX</h2>
      </Link>
      {!isLoading ? (
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

          <SettingsPayout userPayout={userPayout!} />
          <SettingsPayment userPayment={userPayment!} />
        </div>
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
