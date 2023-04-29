import React from "react";
import { Navbar } from "./Navbar";

export const Main = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col text-center justify-center items-center text-[35px] h-1/2">
        <h1>KICKSX</h1>

        <p>A revolutionizing shoe selling platform.</p>
      </div>
    </>
  );
};
