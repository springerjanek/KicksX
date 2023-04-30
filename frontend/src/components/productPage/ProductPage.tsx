import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../ui/Navbar/Navbar";
import { RelatedProducts } from "./RelatedProducts";
import { LastSales } from "./LastSales";
import { MarketActivity } from "./MarketActivity";
import { useGetProduct } from "../../api/product/product";
import { ActionBox } from "./ActionBox";

export const ProductPage = () => {
  const [showSales, setShowSales] = useState(false);

  const { id } = useParams();
  const { data } = useGetProduct(`/${id}`, id!);

  return (
    <>
      <Navbar />
      <div className="w-full mt-8 lg:mt-10 2xl:mt-16 md:ml-3 lg:ml-48 xl:ml-60 2xl:ml-96">
        {data && (
          <div key={id} className="text-white">
            <h1 className="text-2xl font-bold sm:ml-2">{data.name}</h1>
            <div className="flex sm:flex-col md:flex-row md:mt-8 lg:mt-0">
              <div className="flex flex-col md:w-1/2 lg:w-1/3">
                <img src={data.thumbnail} alt="Product" />
              </div>
              <div className="flex flex-col xl:mt-5 2xl:mt-14 ml-2 sm:w-[95%] md:w-1/2 lg:w-1/3 2xl:w-1/4 xl:h-96 md:mr-5">
                <ActionBox productId={id!} data={data} />
                <MarketActivity
                  lastSales={data.lastsales}
                  showSales={() => setShowSales(true)}
                />
                <LastSales
                  lastsales={data.lastsales}
                  showSales={showSales}
                  closeSales={() => setShowSales(false)}
                />
              </div>
            </div>
            <RelatedProducts productName={data.name} />
          </div>
        )}
      </div>
    </>
  );
};
