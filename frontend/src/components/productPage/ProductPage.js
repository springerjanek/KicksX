import React, { useState, useEffect, memo } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../ui/Navbar";
import RelatedProducts from "./RelatedProducts";
import LastSales from "./LastSales";
import MarketActivity from "./MarketActivity";
import { useGetProduct } from "../../api/product/product";
import { getLowestAskAndHighestBid } from "../../hooks/getLowestAskAndHighestBid";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const ProductPage = () => {
  const [lowestAsk, setLowestAsk] = useState(0);
  const [highestBid, setHighestBid] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showSales, setShowSales] = useState(false);
  const [showSizes, setShowSizes] = useState(false);

  const { id } = useParams();
  const { isLoading, data } = useGetProduct(`/${id}`);
  const productName = !isLoading ? data.name : "";
  const lastSales = !isLoading ? data.lastsales : [];

  useEffect(() => {
    const fetchData = async () => {
      const relatedProductsData = await axios("http://localhost:3001/");
      setRelatedProducts(relatedProductsData.data);
      setShowSales(false);
    };

    fetchData().catch((e) => console.error(e));
  }, [id]);

  useEffect(() => {
    if (!isLoading) {
      const setProductData = async () => {
        const lowestAskAndHighestBid = await getLowestAskAndHighestBid(data);
        setLowestAsk(lowestAskAndHighestBid[0]);
        setHighestBid(lowestAskAndHighestBid[1]);
      };
      setProductData();
    }
  }, [isLoading]);

  const showSizesHandler = () => {
    if (showSizes) {
      setShowSizes(false);
    } else {
      setShowSizes(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full mt-8 lg:mt-10 2xl:mt-16 md:ml-3 lg:ml-48 xl:ml-60 2xl:ml-96">
        {!isLoading &&
          [data].map((product) => {
            const { id, name, thumbnail, releasedate } = product;
            return (
              <div key={id} className="text-white">
                <h1 className="text-2xl font-bold sm:ml-2">{name}</h1>
                <div className="flex sm:flex-col md:flex-row md:mt-8 lg:mt-0">
                  <div className="flex flex-col md:w-1/2 lg:w-1/3">
                    <img src={thumbnail} alt="Product" />
                  </div>
                  <div className="flex flex-col xl:mt-5 2xl:mt-14 ml-2 sm:w-[95%] md:w-1/2 lg:w-1/3 2xl:w-1/4 xl:h-96 md:mr-5">
                    <div className="rounded border border-white border-solid h-3/5 mb-6 relative">
                      <button
                        className="w-11/12 m-4"
                        onClick={showSizesHandler}
                      >
                        <span className="flex rounded border border-solid p-1.5">
                          <p className="">Size:</p>
                          <div className="flex flex-1 gap-1 justify-end">
                            <p className="">All</p>
                            {!showSizes ? (
                              <ChevronDownIcon className="w-5 h-5 mt-0.5" />
                            ) : (
                              <ChevronUpIcon className="w-5 h-5 mt-0.5" />
                            )}
                          </div>
                        </span>
                      </button>
                      {showSizes && (
                        <div className="absolute w-full xl:h-4/6 -mt-4 bg-stone-900 grid grid-cols-3 lg:text-lg lg:font-medium">
                          <p className="col-span-3 text-center mt-1">
                            ALL ${lowestAsk}
                          </p>
                          {data.asksBySize.map((ask) => {
                            const { size, asks } = ask;
                            let lowestAsk = "--";
                            if (asks.length > 0) {
                              lowestAsk = Math.min(...asks);
                            }
                            return (
                              <div key={size} className="ml-5">
                                <p>
                                  {size} ${lowestAsk}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <div className="flex text-center">
                        <div className="rounded border  border-solid p-1.5 m-3 w-1/2">
                          <Link to={`/buy/${id}`} state={{ bid: true }}>
                            Place Bid
                          </Link>
                        </div>
                        <div className="rounded border border-solid p-1.5 m-3 w-1/2">
                          <Link to={`/buy/${id}`}>Buy For {lowestAsk}$</Link>
                        </div>
                      </div>
                      <p className="text-center 2xl:mt-4">
                        <Link to={`/sell/${id}`} className="text-green-500">
                          Sell for {highestBid}$ or Ask for More
                        </Link>
                      </p>
                    </div>
                    <MarketActivity
                      lastSales={lastSales}
                      showSales={() => setShowSales(true)}
                    />
                  </div>
                </div>
              </div>
            );
          })}

        <RelatedProducts
          productName={productName}
          relatedProducts={relatedProducts}
        />
      </div>
      <LastSales
        lastsales={lastSales}
        showSales={showSales}
        closeSales={() => setShowSales(false)}
      />
    </>
  );
};

export default memo(ProductPage);
