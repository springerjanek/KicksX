import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const LastSales = (props: {
  lastsales: {
    id: string;
    size: string;
    price: number;
    date: string;
  }[];
  showSales: boolean;
  closeSales: () => void;
}) => {
  return (
    <>
      {props.showSales && (
        <div
          className={`${
            props.showSales ? "slide-animation block" : "hidden"
          } bg-light-blue layer-blur w-full xl:w-1/5 z-10 top-0 right-0 h-full fixed overflow-y-auto`}
        >
          <div className="flex justify-between mt-3">
            <h1 className="mr-10 text-2xl ml-4">All Sales</h1>
            <XMarkIcon
              onClick={props.closeSales}
              className="w-6 h-6 mr-2 mt-1 cursor-pointer	"
            />
          </div>

          <p className="text-xl ml-4">
            The data below is global and does not include applicable fees
            calculated at checkout.
          </p>
          <div className="grid grid-cols-3 mt-4 ml-5 text-xl gap-x-5 ">
            <h2>Date</h2>
            <h2>Size</h2>
            <h2>Sale Price</h2>

            {props.lastsales.map((sale) => {
              const { id, size, price, date } = sale;

              return (
                <>
                  {props.lastsales.length > 0 ? (
                    <>
                      <div>{date.slice(0, 10)}</div>
                      <div> {size}</div>
                      <div> {price}</div>
                    </>
                  ) : (
                    <>
                      <div>--</div>
                      <div>--</div>
                      <div>--</div>
                    </>
                  )}
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
