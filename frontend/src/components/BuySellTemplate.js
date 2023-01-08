import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import AskModal from "./AskModal";
import BuyModal from "./BuyModal";
import { getLowestAskAndHighestBid } from "../hooks/getLowestAskAndHighestBid";

const BuySellTemplate = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [productDataToModal, setProductDataToModal] = useState([]);
  const [asks, setAsks] = useState([]);
  const [bids, setBids] = useState([]);
  const [highestBid, setHighestBid] = useState("--");
  const [lowestAsk, setLowestAsk] = useState("--");

  const { id } = useParams();
  const { data } = useFetch(`http://localhost:3001/${id}`);

  useEffect(() => {
    if (data) {
      const setdefault = (obj, key, fallback) => {
        if (!(key in obj)) {
          obj[key] = fallback;
        }
        return obj[key];
      };

      const ask_by_size = {};
      const bid_by_size = {};
      for (const ask of data[0].asks) {
        setdefault(ask_by_size, ask.size, []).push(ask.price);
      }
      for (const bid of data[0].bids) {
        setdefault(bid_by_size, bid.size, []).push(bid.price);
      }
      let asks = data[0].sizes.map((size) => ({
        size,
        asks: ask_by_size[size] !== undefined ? ask_by_size[size] : [],
      }));

      let bids = data[0].sizes.map((size) => ({
        size,
        bids: bid_by_size[size] !== undefined ? bid_by_size[size] : [],
      }));
      setAsks(asks);
      setBids(bids);
    }
  }, [data]);

  useEffect(() => {
    if (bids) {
      changeLowestAskAndBid();
    }
  }, [bids]);

  const changeLowestAskAndBid = () => {
    if (data) {
      const dataFromFunction = getLowestAskAndHighestBid(data[0]);
      setLowestAsk(dataFromFunction[0]);

      setHighestBid(dataFromFunction[1]);
    }
  };

  const askModalHandler = (size, highestBid, asks) => {
    setShowModal(true);
    setHighestBid(highestBid);
    const asksOfDesiredSize = asks.find((x) => x.size === size);
    const lowestAsk = Math.min(...asksOfDesiredSize.asks);
    console.log("YS", asksOfDesiredSize);
    console.log(lowestAsk);
    if (lowestAsk === 0) {
      setLowestAsk("--");
    } else if (lowestAsk === Infinity) {
      setLowestAsk("--");
    } else {
      setLowestAsk(lowestAsk);
    }

    setProductDataToModal([size, highestBid, lowestAsk]);
  };

  const buyModalHandler = (size, lowestAsk, bids) => {
    setShowModal(true);
    setLowestAsk(lowestAsk);
    const bidsOfDesiredSize = bids.find((x) => x.size === size);
    const highestBid = Math.max(bidsOfDesiredSize.bids);
    console.log(highestBid);
    if (highestBid === 0) {
      setHighestBid("--");
    } else {
      setHighestBid(highestBid);
    }

    setProductDataToModal([size, highestBid, lowestAsk]);
  };

  const turnOffModal = () => {
    setShowModal(false);
    changeLowestAskAndBid();
  };

  return (
    <>
      <div className="flex mt-10 text-white">
        <div className="w-1/2 text-center">
          {data &&
            data.map((product) => {
              const { id, name, thumbnail } = product;
              return (
                <div key={id} className="">
                  <h1>{name}</h1>
                  <div className="flex gap-2 justify-center mb-10">
                    <p className="">Highest Bid: ${highestBid}</p>
                    <p>Lowest Ask: ${lowestAsk}</p>
                  </div>
                  <img src={thumbnail} alt="Product" className="m-auto" />
                </div>
              );
            })}
        </div>
        <div className="ml-10 w-1/2">
          {!showModal && (
            <>
              <h1>Select Size</h1>
              <p className="mb-3">
                {props.template === "sell" && "Highest Bids"}
              </p>
              <div className="flex flex-wrap gap-2 m-0">
                {props.template === "sell" &&
                  bids.map((bid) => {
                    const { size, bids } = bid;
                    let highestBid = "--";

                    if (bids.length > 0) {
                      highestBid = Math.max(...bids);
                    }
                    console.log(highestBid);

                    return (
                      <div
                        key={size}
                        onClick={() => askModalHandler(size, highestBid, asks)}
                        className="text-center w-[calc(25%_-_2rem)] mb-1 rounded border border-white border-solid p-5 cursor-pointer"
                      >
                        {size}
                        <br></br>${highestBid}
                      </div>
                    );
                  })}

                {props.template === "buy" &&
                  asks.map((ask) => {
                    const { size, asks } = ask;
                    let lowestAsk = "--";
                    if (asks.length > 0) {
                      lowestAsk = Math.min(...asks);
                    }
                    return (
                      <div
                        key={size}
                        onClick={() => buyModalHandler(size, lowestAsk, bids)}
                        className="text-center w-[calc(25%_-_2rem)] mb-1 rounded border border-white border-solid p-5 cursor-pointer"
                      >
                        {size}
                        <br></br>${lowestAsk}
                      </div>
                    );
                  })}
              </div>
            </>
          )}
          {showModal && (
            <>
              {props.template === "sell" && (
                <AskModal
                  product={data[0].name}
                  productData={productDataToModal}
                  turnOffModal={turnOffModal}
                />
              )}
              {props.template === "buy" && (
                <BuyModal
                  product={data[0].name}
                  productData={productDataToModal}
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

export default BuySellTemplate;
