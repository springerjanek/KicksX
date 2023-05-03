import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useGetProduct } from "api/product/product";
import { SizesModal } from "../SizesModal";
import { BuyActionsModal } from "./BuyActionsModal";

export const BuyModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [productDataToModal, setProductDataToModal] = useState<
    [string, number, number]
  >(["", 0, 0]);
  const [highestBid, setHighestBid] = useState(0);
  const [lowestAsk, setLowestAsk] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const locationState = location.state as LocationState;
  const isFromPlaceBid = locationState && locationState.bid;
  const userVisitedFromSizeDropdown =
    locationState && locationState.bids !== undefined;

  const { data } = useGetProduct(`/${id}`, id!);

  useEffect(() => {
    if (data) {
      setHighestBid(data.highestBid);
      setLowestAsk(data.lowestAsk);
    }
  }, [data]);

  useEffect(() => {
    if (userVisitedFromSizeDropdown) {
      setHighestBid(highestBidFromLocation!);
      setLowestAsk(locationState.lowestAsk!);
    }
  }, [userVisitedFromSizeDropdown]);

  const bidsOfDesiredSizeFromLocation =
    locationState && locationState.bids
      ? locationState.bids.find((x) => x.size === locationState.size)
      : 0;
  const highestBidFromLocation =
    bidsOfDesiredSizeFromLocation &&
    Math.max(...bidsOfDesiredSizeFromLocation.bids);

  const changeLowestAskAndBid = () => {
    if (data) {
      setLowestAsk(data.lowestAsk);
      setHighestBid(data.highestBid);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (locationState && locationState.bids !== undefined) {
      navigate(`../buy/${id}`, { replace: true });
    }
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
              {userVisitedFromSizeDropdown ? (
                <BuyActionsModal
                  product={data.name}
                  productData={[
                    locationState.size!,
                    locationState.lowestAsk!,
                    highestBidFromLocation!,
                  ]}
                  isFromPlaceBid={
                    isFromPlaceBid !== undefined ? isFromPlaceBid : false
                  }
                  closeModal={closeModal}
                />
              ) : (
                <>
                  {!showModal ? (
                    <SizesModal
                      type="buy"
                      data={data}
                      setHighestBid={setHighestBid}
                      setLowestAsk={setLowestAsk}
                      setProductDataToModal={setProductDataToModal}
                      setShowModal={setShowModal}
                    />
                  ) : (
                    <BuyActionsModal
                      product={data.name}
                      productData={productDataToModal}
                      isFromPlaceBid={
                        isFromPlaceBid !== undefined ? isFromPlaceBid : false
                      }
                      closeModal={closeModal}
                    />
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
