import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetBids, useDeleteBid } from "../../api/dashboard/buying";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import DashboardNavbar from "./DashboardNavbar";

const Buying = () => {
  const [showHistory, setShowHistory] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const uid = user.id;

  const { isLoading, data } = useGetBids(`/getUserData/${uid}`);
  useEffect(() => {
    if (!isLoading) {
      console.log(data);
    }
  }, [isLoading]);
  const { mutate: deleteBid } = useDeleteBid();

  return (
    <>
      <div className="sm:ml-5 md:ml-48 lg:ml-56 xl:ml-96">
        <div className="flex gap-20 text-xl mt-20 mb-5">
          <button onClick={() => setShowHistory(false)}>Current Bids</button>
          <button onClick={() => setShowHistory(true)}>History</button>
        </div>
        <div className="flex gap-1 md:gap-8 text-xl mb-2">
          <p>Item</p>
          {!showHistory ? (
            <>
              <p className="ml-20 md:ml-[137px] xl:ml-56">Bid Price </p>
              <p>Highest Bid </p>
              <p>Lowest Ask</p>
            </>
          ) : (
            <p className="ml-48 md:ml-[215px]">Purchase Price</p>
          )}
        </div>
        {!showHistory ? (
          <>
            {!isLoading && data[0].length > 1 ? (
              data[0].map((bid) => {
                const {
                  id,
                  name,
                  price,
                  size,
                  highestBid,
                  lowestAsk,
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
                          <img
                            src={thumbnail}
                            className="w-24 h-20 sm:-mt-8 md:-mt-0"
                          />
                          <div className="flex flex-col sm:w-24 md:w-20 xl:w-fit">
                            <p> {name}</p>
                            <p> Size: {size}</p>
                          </div>
                        </div>
                        <p className="sm:ml-3 ml-0">${price}</p>
                        <div className="flex ml-8 md:ml-16 lg:ml-[65px] xl:ml-[75px] sm:gap-16 md:gap-x-[100px] lg:gap-x-[98px]">
                          <p>${highestBid}</p>
                          <p>${lowestAsk}</p>
                        </div>
                        <MinusCircleIcon
                          onClick={() => deleteBid(deletePayload)}
                          className="h-5 w-5 cursor-pointer mt-1"
                        />
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              <h1>--</h1>
            )}
          </>
        ) : (
          <>
            {!isLoading && data[1].purchases.length > 1 ? (
              data[1].purchases.map((purchase) => {
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
              })
            ) : (
              <h1>--</h1>
            )}
          </>
        )}
      </div>
      <DashboardNavbar />
    </>
  );
};

export default Buying;
