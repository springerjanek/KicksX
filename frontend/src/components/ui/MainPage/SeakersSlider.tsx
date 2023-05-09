import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useGetProducts } from "hooks/product/useGetProducts";
import { ThreeDots } from "react-loader-spinner";

export const SneakersSlider = () => {
  const { isLoading, data } = useGetProducts();

  return (
    <>
      <Slider
        className="absolute sm:bottom-[40px]
          sm:w-full lg:w-8/12 2xl:w-7/12"
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
          data.map((product) => {
            const { id, name, thumbnail } = product;

            return (
              <div className="related-products text-xl" key={id}>
                <Link to={`/product/${id}`}>
                  <img
                    src={thumbnail}
                    alt="Product"
                    className="sm:w-26 sm:h-26 md:w-64 md:h-36"
                  />
                  <p>{name}</p>
                </Link>
              </div>
            );
          })}
      </Slider>
      {isLoading && (
        <ThreeDots
          height="80"
          width="100"
          radius="9"
          color="#ffffff"
          ariaLabel="three-dots-loading"
          wrapperClass="absolute sm:bottom-[150px] md:bottom-[200px] lg:bottom-[190px]"
          visible={true}
        />
      )}
    </>
  );
};
