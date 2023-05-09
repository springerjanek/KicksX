import React, { useState } from "react";
import { useGetAsks } from "../../../api/dashboard/selling";
import { DashboardNavbar } from "../../ui/Navbar/DashboardNavbar";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Asks } from "./Asks";
import { SaleHistory } from "./SaleHistory";
import { useGetUserAuth } from "hooks/user/useGetUserAuth,";

export const Selling = () => {
  const [showHistory, setShowHistory] = useState(false);

  const { uid } = useGetUserAuth();

  const { data } = useGetAsks(`/getUserData/${uid}`);

  return (
    <>
      <Link
        to={"/"}
        className="mt-5 absolute sm:right-5 md:right-auto md:left-6"
      >
        <h2 className="text-2xl font-medium">KicksX</h2>
      </Link>
      <div className="sm:ml-5 md:ml-48 lg:ml-56 xl:ml-96">
        <div className="flex gap-20 text-xl mt-20 mb-5">
          <button onClick={() => setShowHistory(false)}>Current Asks</button>
          <button onClick={() => setShowHistory(true)}>History</button>
        </div>
        {data ? (
          <>
            <div className="flex gap-2 md:gap-[18px] xl:gap-[16px] text-xl mb-2">
              <p>Item</p>
              {!showHistory ? (
                <>
                  <p className="sm:w-16 md:w-20 xl:w-24 ml-20 md:ml-[180px] xl:ml-[290px]">
                    Ask Price
                  </p>
                  <p className="sm:w-24 md:w-32">Highest Bid </p>
                  <p className="sm:w-20 md:w-32">Lowest Ask</p>
                </>
              ) : (
                <p className="ml-56 md:ml-[305px]">Sell Price</p>
              )}
            </div>

            {!showHistory ? (
              <Asks userAsks={data?.userAsks} uid={uid} />
            ) : (
              <SaleHistory userData={data?.userData} />
            )}
          </>
        ) : (
          <ThreeDots
            height="80"
            width="100"
            radius="9"
            color="#ffffff"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ textAlign: "center" }}
            visible={true}
          />
        )}
      </div>
      <DashboardNavbar />
    </>
  );
};
