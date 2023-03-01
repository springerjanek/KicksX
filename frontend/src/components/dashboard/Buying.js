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
      <div className=" md:ml-56 lg:ml-96">
        <div className="flex gap-20 text-xl mt-20 mb-5">
          <button onClick={() => setShowHistory(false)}>Current Bids</button>
          <button onClick={() => setShowHistory(true)}>History</button>
        </div>
        <div className="flex gap-10 text-xl mb-2">
          <p>Item</p>
          {!showHistory ? (
            <>
              <p className="ml-52">Bid Price </p>
              <p>Highest Bid </p>
              <p>Lowest Ask</p>
            </>
          ) : (
            <p className="ml-52">Purchase Price</p>
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
                        <img src={thumbnail} className="w-24 h-20" />
                        <div className="flex flex-col">
                          <p> {name}</p>
                          <p> Size: {size}</p>
                        </div>
                        <p>${price}</p>
                        <div className="flex ml-[60px] gap-x-[110px]">
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
