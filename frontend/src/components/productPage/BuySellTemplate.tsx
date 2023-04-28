import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { AskModal } from "../modals/AskModal";
import { BuyModal } from "../modals/BuyModal";
import { useGetProduct } from "../../api/product/product";

export const BuySellTemplate = (props: { template: string }) => {
  const [showModal, setShowModal] = useState(false);
  const [productDataToModal, setProductDataToModal] = useState<
    [string, number | string, number | string] | undefined
  >();
  const [highestBid, setHighestBid] = useState<string | number>("--");
  const [lowestAsk, setLowestAsk] = useState<string | number>("--");

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const locationState = location.state as LocationState;

  const isFromPlaceBid = locationState && locationState.bid;

  const { isLoading, data } = useGetProduct(`/${id}`, id!);

  useEffect(() => {
    if (!isLoading) {
      setHighestBid(data!.highestBid);
      setLowestAsk(data!.lowestAsk);
    }
  }, [isLoading]);

  useEffect(() => {
    if (locationState && locationState.bids !== undefined) {
      buyModalHandler(
        locationState.size!,
        locationState.lowestAsk!,
        locationState.bids
      );
    }
  }, [locationState]);

  const askModalHandler = (
    size: string,
    highestBid: string | number,
    asks: {
      size: string;
      asks: number[];
    }[]
  ) => {
    setShowModal(true);
    setHighestBid(highestBid);
    const asksOfDesiredSize = asks.find((x) => x.size === size)!;
    const asksAreEmpty = asksOfDesiredSize.asks.length === 0;
    if (!asksAreEmpty) {
      const lowestAsk = Math.min(...asksOfDesiredSize.asks);
      setProductDataToModal([size, highestBid, lowestAsk]);
      setLowestAsk(lowestAsk);
    } else {
      setProductDataToModal([size, highestBid, ""]);
      setLowestAsk("--");
    }
  };

  const buyModalHandler = (
    size: string,
    lowestAsk: string | number,
    bids: {
      size: string;
      bids: number[];
    }[]
  ) => {
    setShowModal(true);
    setLowestAsk(lowestAsk);
    const bidsOfDesiredSize = bids.find((x) => x.size === size)!;
    const bidsAreEmpty = bidsOfDesiredSize.bids.length === 0;
    if (!bidsAreEmpty) {
      const highestBid = Math.max(...bidsOfDesiredSize.bids);
      setProductDataToModal([size, highestBid, lowestAsk]);
    } else {
      setProductDataToModal([size, "", lowestAsk]);
      setHighestBid("--");
    }
  };

  const changeLowestAskAndBid = async () => {
    if (data) {
      setLowestAsk(data!.lowestAsk);
      setHighestBid(data!.highestBid);
    }
  };

  const turnOffModal = () => {
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
        <div
          className={`w-1/2 text-center ${
            !showModal ? "sm:hidden lg:block" : "sm:ml-auto sm:mr-auto"
          }`}
        >
          {!isLoading && (
            <div key={data!.id}>
              <h1>{data!.name}</h1>
              <div className="flex gap-2 justify-center mb-2 lg:mb-10">
                <p className="">Highest Bid: ${highestBid}</p>
                <p>Lowest Ask: ${lowestAsk}</p>
              </div>
              <img
                src={data!.thumbnail}
                alt="Product"
                className="m-auto sm:h-48 lg:h-full"
              />
            </div>
          )}
        </div>
        <div className="ml-5 lg:ml-10 sm:w-full  lg:w-1/2">
          {!showModal && (
            <>
              <h1>Select Size</h1>
              <p className="mb-3">
                {props.template === "sell" && "Highest Bids"}
              </p>
              <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-2 mr-5">
                {props.template === "sell" && !isLoading
                  ? data!.bidsBySize.map((bid) => {
                      const { size, bids } = bid;
                      let highestBid: string | number = "--";

                      if (bids.length > 0) {
                        highestBid = Math.max(...bids);
                      }

                      return (
                        <div
                          key={size}
                          onClick={() =>
                            askModalHandler(size, highestBid, data!.asksBySize)
                          }
                          className="text-center mb-1 rounded border border-white border-solid p-4 cursor-pointer"
                        >
                          {size}
                          <br></br>${highestBid}
                        </div>
                      );
                    })
                  : ""}

                {props.template === "buy" && !isLoading
                  ? data!.asksBySize.map((ask) => {
                      const { size, asks } = ask;
                      let lowestAsk: string | number = "--";
                      if (asks.length > 0) {
                        lowestAsk = Math.min(...asks);
                      }
                      return (
                        <div
                          key={size}
                          onClick={() =>
                            buyModalHandler(size, lowestAsk, data!.bidsBySize)
                          }
                          className="text-center mb-1 rounded border border-white border-solid p-4 cursor-pointer"
                        >
                          {size}
                          <br></br>${lowestAsk}
                        </div>
                      );
                    })
                  : ""}
              </div>
            </>
          )}
          {showModal && (
            <>
              {props.template === "sell" && (
                <AskModal
                  product={data!.name}
                  productData={productDataToModal!}
                  turnOffModal={turnOffModal}
                />
              )}
              {props.template === "buy" && (
                <BuyModal
                  product={data!.name}
                  productData={productDataToModal!}
                  isFromPlaceBid={
                    isFromPlaceBid !== undefined ? isFromPlaceBid : false
                  }
                  turnOffModal={turnOffModal}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
