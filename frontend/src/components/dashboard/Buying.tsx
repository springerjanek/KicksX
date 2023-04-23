import React, { useState } from "react";
import { useAppSelector } from "redux/store";
import { useGetBids, useDeleteBid } from "../../api/dashboard/buying";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import DashboardNavbar from "./DashboardNavbar";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Buying = () => {
  const [showHistory, setShowHistory] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const uid = user.id;

  const { isLoading, data } = useGetBids(`/getUserData/${uid}`);

  const { mutate: deleteBid } = useDeleteBid();

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
          <button onClick={() => setShowHistory(false)}>Current Bids</button>
          <button onClick={() => setShowHistory(true)}>History</button>
        </div>
        <div className="flex gap-4 md:gap-[18px] xl:gap-[16px] text-xl mb-2">
          <p>Item</p>
          {!showHistory ? (
            <>
              <p className="sm:w-16 md:w-20 xl:w-24 ml-20 md:ml-[180px] xl:ml-[268px]">
                Bid Price
              </p>
              <p className="sm:w-24 md:w-32">Highest Bid </p>
              <p className="sm:w-24 md:w-32">Lowest Ask</p>
            </>
          ) : (
            <p className="ml-48 md:ml-[215px]">Purchase Price</p>
          )}
        </div>
        {isLoading && (
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
        {!showHistory ? (
          <>
            {!isLoading &&
              data!.userBids.length > 1 &&
              data!.userBids.map((bid) => {
                const {
                  id,
                  name,
                  price,
                  size,

                  thumbnail,
                } = bid;
                const deletePayload = {
                  uid: uid,
                  id: id,
                  name: name,
                  price: price,
                  size: size,
                  thumbnail: thumbnail,
                };
                const condition = id.length > 0;

                return (
                  <div key={id} className="flex gap-4">
                    {condition && (
                      <>
                        <div className="flex sm:flex-col md:flex-row gap-2">
                          <img src={thumbnail} className="w-24 h-20 md:-mt-0" />
                          <div className="flex flex-col sm:w-[120px] xl:w-fit">
                            <p> {name}</p>
                            <p> Size: {size}</p>
                          </div>
                        </div>
                        <div className="xl:absolute left-[712px] flex">
                          <p className="w-10">${price}</p>
                          <div className="flex ml-10 md:ml-16 lg:ml-[65px] xl:ml-[75px] sm:gap-16 md:gap-x-[100px] lg:gap-x-[98px]">
                            <p className="w-10">
                              ${"highestBid" in bid && bid.highestBid}
                            </p>
                            <p className="w-10">
                              ${"lowestAsk" in bid && bid.lowestAsk}
                            </p>
                          </div>
                          <MinusCircleIcon
                            onClick={() => deleteBid(deletePayload)}
                            className="xl:absolute left-80 h-5 w-5 cursor-pointer mt-1"
                          />
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            {!isLoading && data!.userBids.length === 1 && <p>--</p>}
          </>
        ) : (
          <>
            {!isLoading &&
              data!.userData.purchases.length &&
              data!.userData.purchases.map((purchase) => {
                const { id, name, price, size, thumbnail } = purchase;
                const condition = id.length > 0;
                return (
                  <div key={id} className="flex gap-4">
                    {condition && (
                      <>
                        <img src={thumbnail} className="w-24 h-20" />
                        <div className="flex flex-col">
                          <p> {name}</p>

                          <p> Size: {size}</p>
                        </div>
                        <p>${price}</p>
                      </>
                    )}
                  </div>
                );
              })}
            {!isLoading && data!.userData.purchases.length === 1 && <p>--</p>}
          </>
        )}
      </div>
      <DashboardNavbar />
    </>
  );
};

export default Buying;
