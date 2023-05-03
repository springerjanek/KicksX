import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProduct } from "api/product/product";
import { SizesModal } from "../SizesModal";
import { SellActionsModal } from "./SellActionsModal";

export const SellModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [productDataToModal, setProductDataToModal] = useState<
    [string, number, number]
  >(["", 0, 0]);
  const [highestBid, setHighestBid] = useState(0);
  const [lowestAsk, setLowestAsk] = useState(0);

  const { id } = useParams();

  const { isLoading, data } = useGetProduct(`/${id}`, id!);

  useEffect(() => {
    if (data) {
      setHighestBid(data.highestBid);
      setLowestAsk(data.lowestAsk);
    }
  }, [isLoading]);

  const changeLowestAskAndBid = () => {
    if (data) {
      setLowestAsk(data.lowestAsk);
      setHighestBid(data.highestBid);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    changeLowestAskAndBid();
  };

  return (
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
                closeModal={closeModal}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
