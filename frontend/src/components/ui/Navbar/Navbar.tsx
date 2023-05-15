import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGetProducts } from "hooks/product/useGetProducts";
import { search } from "api/navbar/search";
import { NavbarProducts } from "./NavbarProducts";
import { NavbarInput } from "./NavbarInput";
import { useGetUserAuth } from "hooks/user/useGetUserAuth,";

export const Navbar = () => {
  const [input, setInput] = useState("");
  const [matchingProducts, setMatchingProducts] = useState<Products>([]);
  const [displayProducts, setDisplayProducts] = useState(false);

  const { isLoading, data } = useGetProducts();

  const { isLoggedCondition } = useGetUserAuth();

  const location = useLocation();

  useEffect(() => {
    if (data) {
      const matchingProducts = search(data, input);
      setMatchingProducts(matchingProducts);
    }
    setDisplayProducts(!(input.trim().length === 0));
  }, [input]);

  useEffect(() => {
    setInput("");
  }, [location]);

  return (
    <>
      <div className="flex sm:justify-end  md:justify-center md:gap-x-5 2xl:gap-x-20 mt-5 text-white text-xl">
        <div className="sm:m-auto sm:ml-10 md:m-0">
          <Link to={"/"}>
            <h2 className=" mt-2 md:ml-0">KicksX</h2>
          </Link>
        </div>
        <NavbarInput
          isLoading={isLoading}
          input={input}
          setInput={setInput}
          isLoggedCondition={isLoggedCondition}
        />
        <Link to={"/sell"}>
          <h3 className="mt-2 sm:hidden md:block">Sell</h3>
        </Link>

        {isLoggedCondition ? (
          <Link to={"/dashboard/profile"}>
            <h3 className="mt-2 sm:hidden md:block">Dashboard</h3>
          </Link>
        ) : (
          <>
            <Link to={"/login"}>
              <h3 className="mt-2 sm:hidden md:block">Log In</h3>
            </Link>
            <Link to={"/register"}>
              <h3 className="mt-2 sm:hidden md:block">Sign Up</h3>
            </Link>
          </>
        )}
      </div>
      {displayProducts && (
        <NavbarProducts matchingProducts={matchingProducts} />
      )}
    </>
  );
};
