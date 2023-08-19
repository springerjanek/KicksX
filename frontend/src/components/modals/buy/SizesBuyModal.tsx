import React from "react";

export const SizesBuyModal = ({
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
        }[]
      | undefined;
  }) => void;
}) => {
  return (
    <>
      {data.asksBySize.map((ask) => {
        const { size, asks } = ask;
        const lowestAsk = asks.length > 0 ? Math.min(...asks) : 0;

        return (
          <div
            key={size}
            onClick={() =>
              modalHandler({
                size: size,
                lowestAsk: lowestAsk,
                bids: data.bidsBySize,
              })
            }
            className="text-center mb-1 rounded border border-white border-solid p-4 cursor-pointer"
          >
            <p> {size}</p>
            <p>${lowestAsk !== 0 ? lowestAsk : "--"}</p>
          </div>
        );
      })}
    </>
  );
};
