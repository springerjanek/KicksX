import React from "react";
import Slider from "react-slick";

export const BannerSlider = () => {
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
    <Slider
      className="sm:w-11/12  lg:w-11/12 2xl:w-8/12 mt-10"
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
              <source srcSet={image.url} media="(min-width: 650px)"></source>
              <img src={image.mobileUrl} />
            </picture>
          </div>
        );
      })}
    </Slider>
  );
};
