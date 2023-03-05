import React from "react";
import { useGetRelatedProducts } from "../../api/product/relatedProducts";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const RelatedProducts = (props) => {
  const originalProductName = props.productName;
  const splittedString = originalProductName.split(" ");
  const filterOne = splittedString[0];
  const filterTwo = splittedString[1];
  const combinedFilter = filterOne.concat(" ", filterTwo);

  const { isLoading, data } = useGetRelatedProducts(
    originalProductName,
    combinedFilter
  );

  return (
    <>
      <h1 className="font-bold text-lg text-white">Related Products</h1>
      <Slider
        className="sm:w-full lg:w-8/12 2xl:w-7/12"
        autoplay={false}
        slidesToShow={4}
        slidesToScroll={4}
        infinite={true}
      >
        {!isLoading &&
          data.map((relatedProduct) => {
            const { id, name, thumbnail, lowestAsk } = relatedProduct;

            return (
              <div className="ml-7 related-products" key={id}>
                <Link to={`/product/${id}`}>
                  <img src={thumbnail} alt="Product" className="w-64 h-36" />
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
