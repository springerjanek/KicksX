import React from "react";
import {
  ArrowTrendingUpIcon,
  ArrowLongDownIcon,
} from "@heroicons/react/24/outline";

export const MarketActivity = ({
  lastSales,
  showSales,
}: {
  lastSales: {
    id: string;
    size: string;
    price: number;
    date: string;
  }[];
  showSales: () => void;
}) => {
  const lastSale = lastSales[lastSales.length - 1];
  const saleBeforeLastSale = lastSales[lastSales.length - 2];
  const isLastSalePriceHigherThanPreviousSale =
    lastSale.price > saleBeforeLastSale.price;
  const raisedSalePriceDifferencePercent =
    (lastSale.price - saleBeforeLastSale.price) / saleBeforeLastSale.price;
  const reducedSalePriceDifferencePercent =
    (saleBeforeLastSale.price - lastSale.price) / saleBeforeLastSale.price;

  return (
    <div className="grid grid-cols-2 justify-between">
      {lastSales.length > 0 ? (
        <>
          <p className="text-lg">Last Sale: {lastSale.price}$</p>
          <button onClick={showSales} className="small-button">
            View Sales
          </button>

          {isLastSalePriceHigherThanPreviousSale ? (
            <div className="flex gap-1 text-green-600 text-lg">
              <ArrowTrendingUpIcon className="w-8 h-10" />
              <p className="mt-1">
                ${lastSale.price - saleBeforeLastSale.price}
              </p>
              <p className="mt-1">
                (%
                {Math.round(raisedSalePriceDifferencePercent * 1000) / 10})
              </p>
            </div>
          ) : (
            <div className="flex gap-1 text-red-600 text-lg">
              <ArrowLongDownIcon className="w-8 h-10" />
              <p className="mt-1">
                -${saleBeforeLastSale.price - lastSale.price}
              </p>
              <p className="mt-1">
                (-%
                {Math.round(reducedSalePriceDifferencePercent * 1000) / 10})
              </p>
            </div>
          )}
        </>
      ) : (
        "--"
      )}
    </div>
  );
};
