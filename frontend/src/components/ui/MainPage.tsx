import React from "react";
import { useGetProducts } from "hooks/useGetProducts";
import { Navbar } from "./Navbar/Navbar";
import Slider from "react-slick";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

export const MainPage = () => {
  const { isLoading, data } = useGetProducts();

  const images = [
    {
      id: 1,
      url: "https://i.imgur.com/uxt25SJ.png",
      mobileUrl: "https://i.imgur.com/GlDaLGu.png",
    },
    {
      id: 2,
      url: "https://i.imgur.com/MIZXJ7Y.png",
      mobileUrl: "https://i.imgur.com/JF3SUPM.png",
    },
    {
      id: 3,
      url: "https://i.imgur.com/yhoiSZK.png",
      mobileUrl: "https://i.imgur.com/q2Q1GNK.png",
    },
    {
      id: 4,
      url: "https://i.imgur.com/6VE7ps6.png",
      mobileUrl: "https://i.imgur.com/YXybT2d.png",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-col text-center justify-center items-center text-[35px] h-1/2">
        <Slider
          className="sm:w-11/12  lg:w-11/12 2xl:w-8/12 lg: mt-10"
          autoplay={true}
          slidesToShow={1}
          slidesToScroll={1}
          infinite={true}
        >
          {images.map((image) => {
            return (
              <div
                className="related-products font-bold text-xl md:p-10"
                key={image.id}
              >
                <picture>
                  <source
                    srcSet={image.url}
                    media="(min-width: 650px)"
                  ></source>
                  <img src={image.mobileUrl} />
                </picture>
              </div>
            );
          })}
        </Slider>

        <h2 className="absolute sm:bottom-[230px] md:bottom-[320px]">
          Trending Sneakers
        </h2>
        <Slider
          className="absolute sm:bottom-[40px] md:bottom-[100px]
          
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
          <div className="">
            <ThreeDots
              height="80"
              width="100"
              radius="9"
              color="#ffffff"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        )}
      </div>
    </>
  );
};
