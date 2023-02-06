import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDeleteBid, useEditBid } from "../../api/dashboard";
import { useGetBids } from "../../hooks/useGetQuery";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import Navbar from "./Navbar";
import { getLowestAskAndHighestBid } from "../../hooks/getLowestAskAndHighestBid";

const Buying = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [lowestAsk, setLowestAsk] = useState(0);

  const { user } = useSelector((state) => state.auth);
  const uid = user.id;

  const { isLoading, data } = useGetBids(`/getUserData/${uid}`);
  useEffect(() => {
    if (!isLoading) {
      console.log("GOWNO");
    }
  }, [isLoading]);
  console.log(isLoading);
  const { mutate: deleteBid } = useDeleteBid();

  return (
    <>
      <div className="ml-96">
        <div className="flex gap-20 text-xl mt-20 mb-5">
          <button onClick={() => setShowHistory(false)}>Current Bids</button>
          <button onClick={() => setShowHistory(true)}>History</button>
        </div>
        <div className="flex gap-10 text-xl mb-2">
          <p>Item</p>
          <p>Bid Price </p>
          <p>Highest Bid </p>
          <p>Lowest Ask</p>
        </div>
        {!showHistory ? (
          <>
            {!isLoading && data.length > 1 ? (
              (console.log(data),
              data.map((bid) => {
                console.log(bid);
                const { id, name, price, size, highestBid, lowestAsk } = bid;
                const deletePayload = {
                  uid: uid,
                  id: id,
                  name: name,
                  price: price,
                  size: size,
                };
                console.log(id);
                const condition = id.length > 0;
                return (
                  <div key={id} className="flex gap-4">
                    {condition && (
                      <>
                        {name}
                        <br></br>
                        Size: {size}
                        <p>${price}</p>
                        <p>${highestBid}</p>
                        <p>${lowestAsk}</p>
                        <MinusCircleIcon
                          onClick={() => deleteBid(deletePayload)}
                          className="h-5 w-5 cursor-pointer mt-1"
                        />
                      </>
                    )}
                  </div>
                );
              }))
            ) : (
              <h1>--</h1>
            )}
          </>
        ) : (
          <>
            {!isLoading && data.purchases.length > 1 ? (
              data.purchases.map((purchase) => {
                const { id, name, price, size } = purchase;
                const condition = id.length > 0;
                return (
                  <div key={id}>
                    {condition && (
                      <>
                        <h1>
                          {name} {size}, ${price}
                        </h1>
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
      <Navbar />
    </>
  );
};

export default Buying;
