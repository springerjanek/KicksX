import React from "react";

export const SizesSellModal = ({
  data,
  modalHandler,
}: {
  data: ModifiedProductData;
  modalHandler: ({
    size,
    highestBid,
    lowestAsk,
    bids,
    asks,
  }: {
    size: string;
    highestBid?: number | undefined;
    lowestAsk?: number | undefined;
    bids?:
      | {
          size: string;
          bids: number[];
        }[]
      | undefined;
    asks?:
      | {
          size: string;
          asks: number[];
        }[];
  }) => void;
}) => {
  return (
    <>
      {data.bidsBySize.map((bid) => {
        const { size, bids } = bid;
        const highestBid = bids.length > 0 ? Math.max(...bids) : 0;

        return (
          <div
            key={size}
            onClick={() =>
              modalHandler({
                size: size,
                highestBid: highestBid,
                asks: data.asksBySize,
              })
            }
            className="text-center mb-1 rounded border border-white border-solid p-4 cursor-pointer"
          >
            {size}
            <br></br>${highestBid !== 0 ? highestBid : "--"}
          </div>
        );
      })}
    </>
  );
};
