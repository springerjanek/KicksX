import React, { useState, useEffect, memo, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import RelatedProducts from "./RelatedProducts";
import { getLowestAskAndHighestBid } from "../hooks/getLowestAskAndHighestBid";
import {
  ArrowTrendingUpIcon,
  ArrowLongDownIcon,
  XMarkIcon,
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
    };

    fetchData().catch((e) => console.error(e));
  }, [id]);

  useEffect(() => {
    if (product.length > 0) {
      setProductName(product[0].name);
      const lowestAskAndHighestBid = getLowestAskAndHighestBid(product[0]);
      setLowestAsk(lowestAskAndHighestBid[0]);
      setHighestBid(lowestAskAndHighestBid[1]);
      setLastSales(product[0].lastsales);
    }
    if (showSales) {
      console.log("TEST");
    }
  }, [product, showSales]);

  return (
    <>
      <Navbar />
      <div className="absolute inset-x-1/4 mt-16">
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
                <h1 className="text-2xl font-bold">{name}</h1>
                <div className="flex mt-10">
                  <div className="flex flex-col">
                    <img src={thumbnail} alt="Product" />
                    {releasedate}
                  </div>
                  <div className="flex flex-col ml-10">
                    <div className="rounded border border-white border-solid h-full w-96 h-1/2 mb-6">
                      <div className="rounded border border-solid p-1.5 m-3">
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
                      <p className="text-center mt-2">
                        <Link to={`/sell/${id}`} className="text-green-500">
                          Sell for {highestBid}$ or Ask for More
                        </Link>
                      </p>
                    </div>
                    <div className="flex flex-wrap">
                      {lastsales.length > 0 ? (
                        <>
                          <p className="text-lg">
                            Last Sale: {lastSale.price}$
                          </p>
                          <button
                            onClick={() => setShowSales(true)}
                            className="small-button w-1/2"
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
        <div className="w-full mt-8 bg-black h-px"></div>
        <RelatedProducts
          productName={productName}
          relatedProducts={relatedProducts}
        />
      </div>
      <div
        className={`${
          showSales ? "slide-animation block" : "slide-out hidden"
        } bg-white h-full w-1/5 z-1 text-black absolute top-0 right-0`}
      >
        <div className="flex justify-between mt-3">
          <h1 className="mr-10 text-2xl ml-4">All Sales</h1>
          <XMarkIcon
            onClick={() => setShowSales(false)}
            className="w-6 h-6 mr-2 mt-1 cursor-pointer	"
          />
        </div>

        <p className="text-xl ml-4">
          The data below is global and does not include applicable fees
          calculated at checkout.
        </p>
        <div className="grid grid-cols-3 mt-4 ml-7 text-lg">
          <h2 className="">Date</h2>
          <h2 className="">Size</h2>
          <h2 className="">Sale Price</h2>

          {lastsales.map((sale) => {
            const { id, size, price } = sale;
            return (
              <>
                <div className="">Jan 12, 2023</div>
                <div className=""> {size}</div>
                <div className=""> {price}</div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default memo(ProductPage);
