import React from "react";
import { useDeleteAsk } from "api/dashboard/selling";
import { MinusCircleIcon } from "@heroicons/react/24/outline";

export const Asks = ({
  userAsks,
  uid,
}: {
  userAsks: UserAsks;
  uid: string;
}) => {
  const { mutate: deleteAsk } = useDeleteAsk();
  return (
    <>
      {userAsks.length > 1 ? (
        userAsks.map((ask) => {
          const {
            id,
            name,
            price,
            size,

            thumbnail,
          } = ask;

          return (
            <div key={id} className="flex gap-4 ">
              {id.length > 0 && (
                <>
                  <div className="flex sm:flex-col md:flex-row gap-2">
                    <img src={thumbnail} className="w-24 h-20 md:-mt-0" />
                    <div className="flex flex-col sm:w-[120px] xl:w-fit">
                      <p> {name}</p>
                      <p> Size: {size}</p>
                    </div>
                  </div>
                  <div className="xl:absolute left-[730px] flex">
                    <p className="w-10">${price}</p>
                    <div className="flex ml-6 md:ml-16 lg:ml-[65px] xl:ml-[75px] sm:gap-16 md:gap-x-[100px] lg:gap-x-[98px]">
                      <p className="w-10">
                        ${"highestBid" in ask && ask.highestBid}
                      </p>
                      <p className="w-10">
                        ${"lowestAsk" in ask && ask.lowestAsk}
                      </p>
                    </div>
                    <MinusCircleIcon
                      onClick={() =>
                        deleteAsk({
                          uid: uid,
                          id: id,
                          name: name,
                          price: price,
                          size: size,
                          thumbnail: thumbnail,
                        })
                      }
                      className="h-5 w-5 cursor-pointer mt-1 xl:absolute left-[380px]"
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
