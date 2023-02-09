import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAsks, useDeleteAsk } from "../../api/dashboard/selling";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import DashboardNavbar from "./DashboardNavbar";

const Selling = () => {
  const [showHistory, setShowHistory] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const uid = user.id;

  const { isLoading, data } = useGetAsks(`/getUserData/${uid}`);
  useEffect(() => {
    if (!isLoading) {
      console.log(data);
    }
  }, [isLoading]);
  const { mutate: deleteAsk } = useDeleteAsk();

  return (
    <>
      <div className="ml-96">
        <div className="flex gap-20 text-xl mt-20 mb-5">
          <button onClick={() => setShowHistory(false)}>Current Asks</button>
          <button onClick={() => setShowHistory(true)}>History</button>
        </div>
        <div className="flex gap-10 text-xl mb-2">
          <p>Item</p>
          {!showHistory ? (
            <>
              <p className="ml-52">Ask Price </p>
              <p>Highest Bid </p>
              <p>Lowest Ask</p>
            </>
          ) : (
            <p className="ml-52">Sell Price</p>
          )}
        </div>
        {!showHistory ? (
          <>
            {!isLoading && data[0].length > 1 ? (
              data[0].map((ask) => {
                const {
                  id,
                  name,
                  price,
                  size,
                  highestBid,
                  lowestAsk,
                  thumbnail,
                } = ask;
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
                        <p>${highestBid}</p>
                        <p>${lowestAsk}</p>
                        <MinusCircleIcon
                          onClick={() => deleteAsk(deletePayload)}
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
            {!isLoading && data[1].sales.length > 1 ? (
              data[1].sales.map((sale) => {
                console.log(sale);
                const { id, name, price, size, thumbnail } = sale;
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

export default Selling;
