import React, { useState, useEffect } from "react";
import Fees from "./Fees";
import FinalChecks from "./FinalChecks";
import { BanknotesIcon, HomeIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { notify } from "../../hooks/notify";
import { useNavigate } from "react-router-dom";
import { useGetQuery } from "../../hooks/useGetQuery";

const CompleteBuy = (props) => {
  const [thumbnail, setThumbnail] = useState("");
  const price = props.price;
  const isSwitchedToPlaceBid = props.isSwitchedToPlaceBid;
  const userSummary = props.userSummary;

  const bidPrice = props.bidPrice;
  const name = props.productData[0];
  const size = props.productData[1];

  const { user } = useSelector((state) => state.auth);

  const uid = user.id;

  const navigate = useNavigate();

  const { data, isLoading } = useGetQuery(`/?name=${name}`, "buy");

  useEffect(() => {
    if (!isLoading) {
      setThumbnail(data[0].thumbnail);
    }
  }, [isLoading]);

  const buyPayload = {
    uid: uid,
    id: uuidv4(),
    date: new Date(),
    name: name,
    price: price,
    size: size,
    thumbnail: thumbnail,
  };

  const bidPayload = {
    uid: uid,
    id: uuidv4(),
    name: name,
    price: bidPrice,
    size: size,
    thumbnail: thumbnail,
  };

  const completeBuyHandler = () => {
    axios
      .post("https://kicksx.onrender.com/buy", buyPayload)
      .then((response) => notify(response.data, "success"))
      .catch((err) => console.warn(err));
    navigate("/dashboard/buying");
  };

  const completeBidHandler = () => {
    axios
      .post("https://kicksx.onrender.com/bid", bidPayload)
      .then((response) => notify(response.data, "success"))
      .catch((err) => console.warn(err));
    navigate("/dashboard/buying");
  };

  return (
    <>
      {isSwitchedToPlaceBid ? (
        <>
          <h1 className="text-2xl">Review Bid</h1>
          <h2 className="text-xl">Please confirm your Bid details below</h2>
          <div className="bg-white rounded text-black mt-5 mr-10 h-[250px]">
            <div className="flex justify-between ml-9 mr-14 py-2 text-lg">
              <p className="mt-10">Your Bid</p>
              <p className="mt-10">${bidPrice}</p>
            </div>
            <Fees type="buying" price={bidPrice} />
          </div>
          <div className="bg-white text-black rounded mr-10">
            <div className="flex mt-10 p-3 gap-2">
              <BanknotesIcon className="h-5 ml-2 mt-[3px]" />
              <p className="basis-1/2">{userSummary.payment}</p>
            </div>
            <div className="flex p-3 gap-2">
              <HomeIcon className="h-5 ml-2 mt-[3px]" />
              <p>{userSummary.shipping}</p>
            </div>
          </div>

          <FinalChecks
            type="buying"
            enableButton={() => {}}
            disableButton={() => {}}
          />

          <div className="flex justify-between mt-7">
            <button onClick={props.closeCompleteBuy} className="button">
              BACK
            </button>
            <button onClick={completeBidHandler} className="mr-10 button">
              PLACE BID
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl">Review Order</h1>
          <p className="text-xl">Please confirm your purchase details below</p>
          <div className="bg-white rounded text-black mt-5 mr-10 h-[260px]">
            <div className="flex justify-between sm:ml-3 md:ml-9 mr-14 py-2 text-lg">
              <p className="mt-10">Your Purchase Price</p>
              <p className="mt-10">${price}</p>
            </div>
            <Fees type="buying" price={price} />
          </div>
          <div className="bg-white text-black rounded mr-10">
            <div className="flex mt-10 p-3 gap-2">
              <BanknotesIcon className="h-5 ml-2 mt-[3px] " />
              <p className="">{userSummary.payment}</p>
            </div>
            <div className="flex p-3 gap-2">
              <HomeIcon className="h-5 ml-2 mt-[3px]" />
              <p className="">{userSummary.shipping}</p>
            </div>
          </div>
          <FinalChecks
            type="buying"
            enableButton={() => {}}
            disableButton={() => {}}
          />
          <div className="flex justify-between">
            <button onClick={props.closeCompleteBuy} className=" button">
              BACK
            </button>
            <button onClick={completeBuyHandler} className="mr-14 button">
              PLACE ORDER
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default CompleteBuy;
