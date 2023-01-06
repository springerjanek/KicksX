import React from "react";
import { Slide } from "react-slideshow-image";
import { Link } from "react-router-dom";
import { getLowestAskAndHighestBid } from "../hooks/getLowestAskAndHighestBid";

const RelatedProducts = (props) => {
  const originalProductName = props.productName;
  const splittedString = originalProductName.split(" ");
  const filterOne = splittedString[0];
  const filterTwo = splittedString[1];
  const combinedFilter = filterOne.concat(" ", filterTwo);

  const relatedProducts = props.relatedProducts;
  return (
    <>
      <h1 className="font-bold text-lg text-white">Related Products</h1>

      <Slide autoplay={false}>
        <div className="flex gap-4">
          {relatedProducts.length > 0 &&
            relatedProducts
              .filter((product) => product.name.includes(combinedFilter))
              .map((relatedProduct) => {
                const { id, name, thumbnail } = relatedProduct;
                const data = getLowestAskAndHighestBid(relatedProduct);

                let lowestAsk = data[0];

                const productIsNotTheSameAsOriginal =
                  name !== originalProductName;

                return (
                  <div key={id}>
                    {productIsNotTheSameAsOriginal && (
                      <div className="text-white">
                        <Link to={`/product/${id}`}>
                          <img
                            src={thumbnail}
                            alt="Product"
                            className="w-96 h-36"
                          />
                          {name}
                          <br></br>
                          Lowest Ask<br></br>
                          {lowestAsk}$
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
        </div>
      </Slide>

      <div className="w-full mt-8 bg-black h-px"></div>
    </>
  );
};

export default RelatedProducts;
