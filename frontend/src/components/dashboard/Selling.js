import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAsks, useDeleteAsk } from "../../api/dashboard/selling";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import DashboardNavbar from "./DashboardNavbar";
import { ThreeDots } from "react-loader-spinner";

const Selling = () => {
  const [showHistory, setShowHistory] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const uid = user.id;

  const { isLoading, data } = useGetAsks(`/getUserData/${uid}`);
  useEffect(() => {
    if (!isLoading) {
    }
  }, [isLoading]);
  const { mutate: deleteAsk } = useDeleteAsk();

  console.log(data);

  return (
    <>
      <div className="sm:ml-5 md:ml-48 lg:ml-56 xl:ml-96">
        <div className="flex gap-20 text-xl mt-20 mb-5">
          <button onClick={() => setShowHistory(false)}>Current Asks</button>
          <button onClick={() => setShowHistory(true)}>History</button>
        </div>
        <div className="flex gap-1 md:gap-8 text-xl mb-2">
          <p>Item</p>
          {!showHistory ? (
            <>
              <p className="ml-20 md:ml-[137px] xl:ml-56">Ask Price </p>
              <p>Highest Bid </p>
              <p>Lowest Ask</p>
            </>
          ) : (
            <p className="ml-48 md:ml-[215px]">Sell Price</p>
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
            wrapperClassName=""
            visible={true}
          />
        )}
        {!showHistory ? (
          <>
            {!isLoading &&
              data[0].length > 1 &&
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
                          onClick={() => deleteAsk(deletePayload)}
                          className="h-5 w-5 cursor-pointer mt-1"
                        />
                      </>
                    )}
                  </div>
                );
              })}
            {!isLoading && data[0].length === 1 && <p>--</p>}
          </>
        ) : (
          <>
            {!isLoading &&
              data[1].sales.length &&
              data[1].sales.map((sale) => {
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
              })}
            {!isLoading && data[1].length === 1 && <p>--</p>}
          </>
        )}
      </div>
      <DashboardNavbar />
    </>
  );
};

export default Selling;
