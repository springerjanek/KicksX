import React, { useState, useEffect, memo, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import RelatedProducts from "./RelatedProducts";
import LastSales from "./LastSales";
import { getLowestAskAndHighestBid } from "../hooks/getLowestAskAndHighestBid";
import {
  ArrowTrendingUpIcon,
  ArrowLongDownIcon,
} from "@heroicons/react/24/outline";

const ProductPage = () => {
  const [lowestAsk, setLowestAsk] = useState(0);
  const [highestBid, setHighestBid] = useState(0);
  const [product, setProduct] = useState([]);
  const [productName, setProductName] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [lastsales, setLastSales] = useState([]);
  const [showSales, setShowSales] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const productData = await axios(`http://localhost:3001/${id}`);
      const relatedProductsData = await axios("http://localhost:3001/");
      setProduct(productData.data);
      setRelatedProducts(relatedProductsData.data);
      setShowSales(false);
    };

    fetchData().catch((e) => console.error(e));
  }, [id]);

  useEffect(() => {
    if (product.length > 0) {
      console.log("siema");
      setProductName(product[0].name);
      const lowestAskAndHighestBid = getLowestAskAndHighestBid(product[0]);
      setLowestAsk(lowestAskAndHighestBid[0]);
      setHighestBid(lowestAskAndHighestBid[1]);
      setLastSales(product[0].lastsales);
    }
  }, [product]);

  return (
    <>
      <Navbar />
      <div className="w-full mt-8 lg:mt-10 2xl:mt-16 md:ml-3 lg:ml-48 xl:ml-60 2xl:ml-96">
        {product.length > 0 &&
          product.map((product) => {
            const { id, name, thumbnail, releasedate, lastsales } = product;

            const lastSale = lastsales[lastsales.length - 1];
            const saleBeforeLastSale = lastsales[lastsales.length - 2];
            const lastSalePriceHigherThanSaleBefore =
              lastSale.price > saleBeforeLastSale.price;
            const raisedSalePriceDifferencePercent =
              (lastSale.price - saleBeforeLastSale.price) /
              saleBeforeLastSale.price;
            const reducedSalePriceDifferencePercent =
              (saleBeforeLastSale.price - lastSale.price) /
              saleBeforeLastSale.price;
            return (
              <div key={id} className="text-white">
                <h1 className="text-2xl font-bold sm:ml-2">{name}</h1>
                <div className="flex sm:flex-col md:flex-row md:mt-8 lg:mt-0">
                  <div className="flex flex-col md:w-1/2 lg:w-1/3">
                    <img src={thumbnail} alt="Product" />
                  </div>
                  <div className="flex flex-col xl:mt-5 2xl:mt-14 ml-2 sm:w-[95%] md:w-1/2 lg:w-1/3 2xl:w-1/4 xl:h-96 md:mr-5">
                    <div className="rounded border border-white border-solid h-3/5 mb-6">
                      <div className="rounded border border-solid p-1.5 m-4">
                        <p className="">Size:</p>
                      </div>
                      <div className="flex text-center">
                        <div className="rounded border  border-solid p-1.5 m-3 w-1/2">
                          <p>Place Bid</p>
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
                    <div className="grid grid-cols-2 justify-between">
                      {lastsales.length > 0 ? (
                        <>
                          <p className="text-lg">
                            Last Sale: {lastSale.price}$
                          </p>
                          <button
                            onClick={() => setShowSales(true)}
                            className="small-button"
                          >
                            View Sales
                          </button>

                          {lastSalePriceHigherThanSaleBefore ? (
                            <div className="flex gap-1 text-green-600 text-lg">
                              <ArrowTrendingUpIcon className="w-8 h-10" />
                              <p className="mt-1">
                                ${lastSale.price - saleBeforeLastSale.price}
                              </p>
                              <p className="mt-1">
                                (%
                                {Math.round(
                                  raisedSalePriceDifferencePercent * 1000
                                ) / 10}
                                )
                              </p>
                            </div>
                          ) : (
                            <div className="flex gap-1 text-red-600 text-lg">
                              <ArrowLongDownIcon className="w-8 h-10" />
                              <p className="mt-1">
                                -${saleBeforeLastSale.price - lastSale.price}
                              </p>
                              <p className="mt-1">
                                (-%
                                {Math.round(
                                  reducedSalePriceDifferencePercent * 1000
                                ) / 10}
                                )
                              </p>
                            </div>
                          )}
                        </>
                      ) : (
                        "--"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <div className="black-line"></div>
        <RelatedProducts
          productName={productName}
          relatedProducts={relatedProducts}
        />
      </div>
      <LastSales
        lastsales={lastsales}
        showSales={showSales}
        closeSales={() => setShowSales(false)}
      />
    </>
  );
};

export default memo(ProductPage);
