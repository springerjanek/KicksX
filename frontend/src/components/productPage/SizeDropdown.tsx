import React from "react";
import { Link } from "react-router-dom";

export const SizeDropdown = ({
  data,
  productId,
}: {
  data: ProductData;
  productId: string;
}) => {
  return (
    <div className="absolute w-full xl:h-4/6 -mt-4 bg-stone-900 grid grid-cols-3 lg:text-lg lg:font-medium fadeIn">
      <p className="col-span-3 text-center mt-1">ALL ${data.lowestAsk}</p>
      {data.asksBySize.map((ask) => {
        const { size, asks } = ask;
        const lowestAsk = asks.length > 0 ? Math.min(...asks) : "--";

        return (
          <div key={size} className="ml-5">
            <Link
              to={`/buy/${productId}?size=${size}`}
              state={{
                size: size,
                lowestAsk: lowestAsk,
                bids: data!.bidsBySize,
              }}
            >
              {size} ${lowestAsk}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
