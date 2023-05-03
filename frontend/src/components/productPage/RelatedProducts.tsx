import React from "react";
import { useGetRelatedProducts } from "../../api/product/relatedProducts";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export const RelatedProducts = (props: { productName: string }) => {
  const filter = props.productName.split(" ", 2).join(" ");
  const { data } = useGetRelatedProducts(props.productName, filter);

  return (
    <>
      <h1 className="font-bold text-lg text-white">Related Products</h1>
      <Slider
        className="sm:w-full lg:w-8/12 2xl:w-7/12"
        autoplay={false}
        slidesToShow={4}
        slidesToScroll={4}
        responsive={[
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
        ]}
        infinite={true}
      >
        {data &&
          data.map((relatedProduct) => {
            const { id, name, thumbnail, lowestAsk } = relatedProduct;

            return (
              <div className="ml-1 related-products" key={id}>
                <Link to={`/product/${id}`}>
                  <img
                    src={thumbnail}
                    alt="Product"
                    className="sm:w-26 sm:h-26 md:w-64 md:h-36"
                  />
                  <p>{name}</p>

                  <p>Lowest Ask</p>
                  <p> {lowestAsk}$</p>
                </Link>
              </div>
            );
          })}
      </Slider>
    </>
  );
};
