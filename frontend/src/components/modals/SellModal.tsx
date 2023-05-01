import React, { useEffect, useState } from "react";
import { useGetProduct } from "api/product/product";
import { useParams } from "react-router-dom";
import { SellActionsModal } from "./SellActionsModal";
import { SizesModal } from "./SizesModal";

export const SellModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [productDataToModal, setProductDataToModal] = useState<
    [string, number, number]
  >(["", 0, 0]);
  const [highestBid, setHighestBid] = useState(0);
  const [lowestAsk, setLowestAsk] = useState(0);

  const { id } = useParams();
  // BUY MODAL ->>> const location = useLocation();

  // const locationState = location.state as LocationState;

  // const isFromPlaceBid = locationState && locationState.bid;

  const { isLoading, data } = useGetProduct(`/${id}`, id!);

  useEffect(() => {
    if (data) {
      setHighestBid(data.highestBid);
      setLowestAsk(data.lowestAsk);
    }
  }, [isLoading]);

  // MOVE TO BuyModal ->>>> useEffect(() => {
  //   if (locationState && locationState.bids !== undefined) {
  //     buyModalHandler(
  //       locationState.size!,
  //       locationState.lowestAsk!,
  //       locationState.bids
  //     );
  //   }
  // }, [locationState]);

  const changeLowestAskAndBid = async () => {
    if (data) {
      setLowestAsk(data.lowestAsk);
      setHighestBid(data.highestBid);
    }
  };

  const turnOffModal = () => {
    setShowModal(false);
    // MOVE TO BUY MODAL ->>> if (locationState && locationState.bids !== undefined) {
    //   navigate(`../buy/${id}`, { replace: true });
    // }
    changeLowestAskAndBid();
  };

  return (
    <>
      <div
        className={`flex mt-10 text-white ${
          showModal && "sm:flex-col lg:flex-row"
        }`}
      >
        {data && (
          <>
            <div
              className={`w-1/2 text-center ${
                !showModal ? "sm:hidden lg:block" : "sm:ml-auto sm:mr-auto"
              }`}
            >
              <h1>{data.name}</h1>
              <div className="flex gap-2 justify-center mb-2 lg:mb-10">
                <p className="">
                  Highest Bid: ${highestBid === 0 ? "--" : highestBid}
                </p>
                <p>Lowest Ask: ${lowestAsk === 0 ? "--" : lowestAsk}</p>
              </div>
              <img
                src={data.thumbnail}
                alt="Product"
                className="m-auto sm:h-48 lg:h-full"
              />
            </div>

            <div className="ml-5 lg:ml-10 sm:w-full  lg:w-1/2">
              {!showModal ? (
                <SizesModal
                  type="sell"
                  data={data}
                  setHighestBid={setHighestBid}
                  setLowestAsk={setLowestAsk}
                  setProductDataToModal={setProductDataToModal}
                  setShowModal={setShowModal}
                />
              ) : (
                <SellActionsModal
                  product={data.name}
                  productData={productDataToModal}
                  turnOffModal={turnOffModal}
                />
              )}
            </div>
            {/*  BUY MODAL - >>> 
                <BuyModal
                  product={data!.name}
                  productData={productDataToModal!}
                  isFromPlaceBid={
                    isFromPlaceBid !== undefined ? isFromPlaceBid : false
                  }
                  turnOffModal={turnOffModal}
                />
               */}
          </>
        )}
      </div>
    </>
  );
};
