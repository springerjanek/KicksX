import React from "react";

export const Fees = (props: { type: string; price: string | number }) => {
  const price = props.price;
  if (typeof price === "number") {
    const transactionFee = ((9.5 / 100) * price).toFixed(2);
    const proccesingFee = ((3 / 100) * price).toFixed(2);
    const shippingFee = 10;

    const totalSellingPrice = (
      price -
      parseInt(transactionFee) -
      parseInt(proccesingFee) -
      shippingFee
    ).toFixed(2);

    const totalBuyingPrice = (
      price +
      parseFloat(proccesingFee) +
      shippingFee
    ).toFixed(2);
    return (
      <>
        <div className="text-lg">
          {props.type === "selling" && (
            <>
              <div className="w-11/12 bg-black h-px sm:ml-3 md:ml-9"></div>
              <div className="flex justify-between sm:ml-3 md:ml-9 mr-14 py-2">
                <p>Transaction Fee (9,5%)</p> -${transactionFee}
              </div>
              <div className="w-11/12 bg-black h-px sm:ml-3 md:ml-9"></div>
              <div className="flex justify-between sm:ml-3 md:ml-9 mr-14 py-2">
                <p>Payment Proc. (3%)</p>-${proccesingFee}
              </div>
              <div className="w-11/12 bg-black h-px sm:ml-3 md:ml-9"></div>
              <div className="flex justify-between sm:ml-3 md:ml-9 mr-14 py-2">
                <p>Shipping</p>-${shippingFee}
              </div>
              <div className="w-11/12 bg-black h-px sm:ml-3 md:ml-9"></div>
              <div className="flex justify-between sm:ml-3 md:ml-9 mr-14 py-3">
                <p>Total</p>${totalSellingPrice}
              </div>
            </>
          )}
          {props.type === "buying" && (
            <>
              <div className="w-11/12 bg-black h-px sm:ml-3 md:ml-9"></div>
              <div className="flex justify-between sm:ml-3 md:ml-9 mr-14 py-2">
                <p>Processing Fee</p>${proccesingFee}
              </div>
              <div className="w-11/12 bg-black h-px sm:ml-3 md:ml-9"></div>
              <div className="flex justify-between sm:ml-3 md:ml-9 mr-14 py-2">
                <p>Shipping</p>${shippingFee}
              </div>
              <div className="w-11/12 bg-black h-px sm:ml-3 md:ml-9"></div>
              <div className="flex justify-between sm:ml-3 md:ml-9 mr-14 py-3">
                <p>Total</p>${totalBuyingPrice}
              </div>
            </>
          )}
        </div>
      </>
    );
  } else {
    return <></>;
  }
};
