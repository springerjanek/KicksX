import React from "react";
import { Link } from "react-router-dom";

export const NavbarProducts = ({
  matchingProducts,
  navbarSell,
}: {
  matchingProducts: Products;
  navbarSell?: boolean;
}) => {
  return (
    <div className="mt-10 fixed z-10 w-full h-full	overflow-y-auto search-products ">
      {matchingProducts.map((product) => {
        const { id, name, thumbnail } = product;

        return (
          <div key={id} className="text-white flex bg-og p-1">
            <Link
              to={navbarSell ? `/sell/${id}` : `/product/${id}`}
              className={`flex gap-5 items-center ml-8 md:ml-[140px] lg:ml-[200px] ${
                navbarSell
                  ? "xl:ml-[420px] 2xl:ml-[630px]"
                  : "xl:ml-[350px] 2xl:ml-[400px]"
              }`}
            >
              <img src={thumbnail} alt="Shoe" className="w-40 h-28" />
              <p className="w-[120px]"> {name}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
