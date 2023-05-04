import React from "react";
import { useDeleteBid } from "api/dashboard/buying";
import { MinusCircleIcon } from "@heroicons/react/24/outline";

export const Bids = ({
  userBids,
  uid,
}: {
  userBids: UserBids;
  uid: string;
}) => {
  const { mutate: deleteBid } = useDeleteBid();

  return (
    <>
      {userBids.length > 1 ? (
        userBids.map((bid) => {
          const { id, name, price, size, thumbnail } = bid;

          return (
            <div key={id} className="flex gap-4">
              {id.length > 0 && (
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
                      onClick={() =>
                        deleteBid({
                          uid: uid,
                          id: id,
                          name: name,
                          price: price,
                          size: size,
                          thumbnail: thumbnail,
                        })
                      }
                      className="xl:absolute left-80 h-5 w-5 cursor-pointer mt-1"
                    />
                  </div>
                </>
              )}
            </div>
          );
        })
      ) : (
        <p>--</p>
      )}
    </>
  );
};
