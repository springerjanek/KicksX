import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./ui/Navbar";

const Main = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center text-[35px] h-1/2">
        <h1>KICKSX</h1>

        <p>A revolutionizing shoe selling platform.</p>
      </div>
    </>
  );
};

export default Main;
