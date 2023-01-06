import React, { useState, useEffect, memo, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import RelatedProducts from "./RelatedProducts";
import { getLowestAskAndHighestBid } from "../hooks/getLowestAskAndHighestBid";

const ProductPage = () => {
  const [lowestAsk, setLowestAsk] = useState(0);
  const [highestBid, setHighestBid] = useState(0);
  const [product, setProduct] = useState([]);
  const [productName, setProductName] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productStatus, setProductStatus] = useState("loading");
  const [relatedProductStatus, setRelatedProductStatus] = useState("loading");

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
    }
  }, [product]);

  return (
    <>
      <Navbar />
      <div className="absolute inset-x-1/4	mt-16">
        {product.length > 0 &&
          product.map((product) => {
            const { id, name, thumbnail, releasedate } = product;
            return (
              <div key={id} className="text-white">
                <h1 className="text-2xl font-bold">{name}</h1>
                <div className="flex mt-10">
                  <div className="flex flex-col">
                    <img src={thumbnail} alt="Product" />
                    {releasedate}
                  </div>
                  <div className="flex flex-col ml-10">
                    <div className="rounded border border-white border-solid h-full w-96">
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
                      <p className="text-center mb-3 mt-2">
                        <Link to={`/sell/${id}`} className="text-green-500">
                          {" "}
                          Sell for {highestBid}$ or Ask for More
                        </Link>
                      </p>
                    </div>
                    <div className="">Last Sale:</div>
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
    </>
  );
};

export default memo(ProductPage);
