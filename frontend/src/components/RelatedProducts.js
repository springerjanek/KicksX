import React, { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { getLowestAskAndHighestBid } from "../hooks/getLowestAskAndHighestBid";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/outline";

const RelatedProducts = (props) => {
  const originalProductName = props.productName;
  const splittedString = originalProductName.split(" ");
  const filterOne = splittedString[0];
  const filterTwo = splittedString[1];
  const combinedFilter = filterOne.concat(" ", filterTwo);

  const relatedProducts = props.relatedProducts;

  const arrows = {
    prevArrow: <ArrowLeftCircleIcon className="h-7 w-7" />,
    nextArrow: <ArrowRightCircleIcon className="h-7 w-7" />,
  };

  return (
    <>
      <h1 className="font-bold text-lg text-white">Related Products</h1>
      <Slider
        className="sm:w-full lg:w-8/12 2xl:w-7/12"
        autoplay={false}
        slidesToShow={3}
        slidesToScroll={3}
        infinite={true}
      >
        {relatedProducts.length > 0 &&
          relatedProducts
            .filter(
              (product) =>
                product.name.includes(combinedFilter) &&
                product.name !== originalProductName
            )
            .map((relatedProduct) => {
              const { id, name, thumbnail } = relatedProduct;
              const data = getLowestAskAndHighestBid(relatedProduct);
              console.log(data);

              let lowestAsk = data[0];
              console.log(lowestAsk);
              console.log("TEST");

              return (
                <div className="ml-7" key={id}>
                  <Link to={`/product/${id}`}>
                    <img src={thumbnail} alt="Product" className="w-80 h-36" />
                    {name}
                    <br></br>
                    Lowest Ask<br></br>
                    {lowestAsk}$
                  </Link>
                </div>
              );
            })}
      </Slider>
      <div className="black-line"></div>
    </>
  );
};

export default RelatedProducts;
