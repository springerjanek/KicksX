import React from "react";
import { SizesSellModal } from "./sell/SizesSellModal";
import { SizesBuyModal } from "./buy/SizesBuyModal";

export const SizesModal = ({
  type,
  data,
  setHighestBid,
  setLowestAsk,
  setProductDataToModal,
  setShowModal,
}: {
  type: string;
  data: ModifiedProductData;
  setHighestBid: React.Dispatch<React.SetStateAction<number>>;
  setLowestAsk: React.Dispatch<React.SetStateAction<number>>;
  setProductDataToModal: React.Dispatch<
    React.SetStateAction<[string, number, number]>
  >;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const modalHandler = ({
    size,
    highestBid,
    lowestAsk,
    bids,
    asks,
  }: {
    size: string;
    highestBid?: number;
    lowestAsk?: number;
    bids?: {
      size: string;
      bids: number[];
    }[];
    asks?: {
      size: string;
      asks: number[];
    }[];
  }) => {
    setShowModal(true);
    if (highestBid !== undefined) {
      setHighestBid(highestBid);
      const asksOfDesiredSize = asks!.find((x) => x.size === size)!;
      const asksAreEmpty = asksOfDesiredSize.asks.length === 0;
      if (!asksAreEmpty) {
        const lowestAsk = Math.min(...asksOfDesiredSize.asks);
        setProductDataToModal([size, highestBid, lowestAsk]);
        setLowestAsk(lowestAsk);
      } else {
        setProductDataToModal([size, highestBid, 0]);
        setLowestAsk(0);
      }
    }

    if (lowestAsk !== undefined) {
      setLowestAsk(lowestAsk);
      const bidsOfDesiredSize = bids!.find((x) => x.size === size)!;
      const bidsAreEmpty = bidsOfDesiredSize.bids.length === 0;
      if (!bidsAreEmpty) {
        const highestBid = Math.max(...bidsOfDesiredSize.bids);
        setProductDataToModal([size, highestBid, lowestAsk]);
        setHighestBid(highestBid);
      } else {
        setProductDataToModal([size, 0, lowestAsk]);
        setHighestBid(0);
      }
    }
  };

  return (
    <>
      <h1>Select Size</h1>
      <p className="mb-3">{type === "sell" ? "Highest Bids" : ""}</p>
      <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-2 mr-5">
        {type === "sell" && (
          <SizesSellModal data={data} modalHandler={modalHandler} />
        )}
        {type === "buy" && (
          <SizesBuyModal data={data} modalHandler={modalHandler} />
        )}
      </div>
    </>
  );
};
