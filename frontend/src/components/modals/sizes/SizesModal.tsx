import React from "react";
import { SizesSellModal } from "../sell/SizesSellModal";
import { SizesBuyModal } from "../buy/SizesBuyModal";
import { modalHandler } from "./utils/modalHandler";

export const SizesModal = ({
  type,
  data,
  setHighestBid,
  setLowestAsk,
  setProductDataToModal,
  setShowSizesModal,
}: {
  type: string;
  data: ModifiedProductData;
  setHighestBid: React.Dispatch<React.SetStateAction<number>>;
  setLowestAsk: React.Dispatch<React.SetStateAction<number>>;
  setProductDataToModal: React.Dispatch<
    React.SetStateAction<{
      size: string;
      highestBid: number;
      lowestAsk: number;
    }>
  >;
  setShowSizesModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <h1>Select Size</h1>
      <p className="mb-3">{type === "sell" ? "Highest Bids" : ""}</p>
      <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-2 mr-5">
        {type === "sell" && (
          <SizesSellModal
            data={data}
            modalHandler={() =>
              modalHandler({
                setHighestBid: setHighestBid,
                setLowestAsk: setLowestAsk,
                setProductDataToModal: setProductDataToModal,
                setShowSizesModal: setShowSizesModal,
              })
            }
          />
        )}
        {type === "buy" && (
          <SizesBuyModal
            data={data}
            modalHandler={() =>
              modalHandler({
                setHighestBid: setHighestBid,
                setLowestAsk: setLowestAsk,
                setProductDataToModal: setProductDataToModal,
                setShowSizesModal: setShowSizesModal,
              })
            }
          />
        )}
      </div>
    </>
  );
};
