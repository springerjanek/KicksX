import React from "react";
import { Navbar } from "../Navbar/Navbar";
import { BannerSlider } from "./BannerSlider";
import { SneakersSlider } from "./SeakersSlider";

export const MainPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col text-center justify-center items-center text-[35px] h-1/2">
        <BannerSlider />

        <h2 className="absolute sm:bottom-[230px] md:bottom-[270px] lg:bottom-[240px]">
          Trending Sneakers
        </h2>
        <SneakersSlider />
      </div>
    </>
  );
};
