import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { SizeDropdown } from "./SizeDropdown";
import { Link } from "react-router-dom";

export const ActionBox = ({
  productId,
  data,
}: {
  productId: string;
  data: ProductData;
}) => {
  const [showSizes, setShowSizes] = useState(false);

  const showSizesHandler = () => {
    setShowSizes(!showSizes);
  };

  return (
    <div className="rounded border border-white border-solid h-3/5 mb-6 relative">
      <button className="w-11/12 m-4" onClick={showSizesHandler}>
        <span className="flex rounded border border-solid p-1.5">
          <p className="">Size:</p>
          <div className="flex flex-1 gap-1 justify-end">
            <p className="">All</p>
            {!showSizes ? (
              <ChevronDownIcon className="w-5 h-5 mt-0.5" />
            ) : (
              <ChevronUpIcon className="w-5 h-5 mt-0.5" />
            )}
          </div>
        </span>
      </button>
      {showSizes && <SizeDropdown data={data} productId={productId} />}
      <div className="flex text-center">
        <div className="rounded border  border-solid p-1.5 m-3 w-1/2">
          <Link to={`/buy/${productId}`} state={{ bid: true }}>
            Place Bid
          </Link>
        </div>
        <div className="rounded border border-solid p-1.5 m-3 w-1/2">
          <Link to={`/buy/${productId}`}>Buy For {data.lowestAsk}$</Link>
        </div>
      </div>
      <p className="text-center 2xl:mt-4">
        <Link to={`/sell/${productId}`} className="text-green-500">
          Sell for {data.highestBid}$ or Ask for More
        </Link>
      </p>
    </div>
  );
};
