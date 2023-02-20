import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { getLowestAskAndHighestBid } from "../../hooks/getLowestAskAndHighestBid";
import { CSSTransition } from "react-transition-group";

const RelatedProducts = (props) => {
  const [relatedProductsFormatted, setRelatedProductsFormatted] = useState([]);
  const originalProductName = props.productName;
  const splittedString = originalProductName.split(" ");
  const filterOne = splittedString[0];
  const filterTwo = splittedString[1];
  const combinedFilter = filterOne.concat(" ", filterTwo);

  const relatedProducts = props.relatedProducts;
  useEffect(() => {
    const formatRelatedProducts = async () => {
      console.log(originalProductName);
      if (relatedProducts.length > 0 && relatedProducts) {
        const result = await Promise.all(
          relatedProducts
            .filter(
              (product) =>
                product.name.includes(combinedFilter) &&
                product.name !== originalProductName
            )
            .map(async (relatedProduct) => {
              const { id, name, thumbnail } = relatedProduct;
              const data = await getLowestAskAndHighestBid(relatedProduct);

              let lowestAsk = data[0];
              return { id, name, thumbnail, lowestAsk };
            })
        );

        setRelatedProductsFormatted(result);
      }
    };
    formatRelatedProducts();
  }, [originalProductName]);

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
        {relatedProductsFormatted.length > 0 &&
          relatedProductsFormatted.map((relatedProduct) => {
            const { id, name, thumbnail, lowestAsk } = relatedProduct;

            return (
              <div className="ml-7 related-products" key={id}>
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
