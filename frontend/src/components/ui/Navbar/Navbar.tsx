import React, { useState, useEffect } from "react";
import { useAppSelector } from "redux/store";
import { Link, useLocation } from "react-router-dom";
import { useGetProducts } from "hooks/useGetProducts";
import { search } from "api/navbar/search";
import { NavbarProducts } from "./NavbarProducts";
import { NavbarInput } from "./NavbarInput";

export const Navbar = () => {
  const [input, setInput] = useState("");
  const [matchingProducts, setMatchingProducts] = useState<
    Products | undefined
  >([]);
  const [displayProducts, setDisplayProducts] = useState(false);

  const { isLoading, data } = useGetProducts();

  const { user, isLoggedInTemporary } = useAppSelector((state) => state.auth);
  const isLoggedInPersisted = user.isLoggedInPersisted;
  const isLoggedTemporary = isLoggedInTemporary;
  const isLoggedCondition =
    isLoggedInPersisted === "true" || isLoggedTemporary === "true";

  const location = useLocation();

  useEffect(() => {
    if (data) {
      const matchingProducts = search(data, input);
      setMatchingProducts(matchingProducts);
    }
    if (input.length === 0) {
      setDisplayProducts(false);
    } else {
      setDisplayProducts(true);
    }
  }, [input]);

  useEffect(() => {
    setInput("");
  }, [location]);

  return (
    <>
      <div className="flex sm:justify-end  md:justify-center md:gap-x-5 2xl:gap-x-20 mt-5 text-white text-xl">
        <div className="sm:m-auto sm:ml-10 md:m-0">
          <Link to={"/"} role="navigation">
            <h2 className=" mt-2 md:ml-0">KicksX</h2>
          </Link>
        </div>
        <NavbarInput
          isLoading={isLoading}
          input={input}
          setInput={setInput}
          isLoggedCondition={isLoggedCondition}
        />
        <Link to={"/sell"} role="navigation">
          <h3 className="mt-2 sm:hidden md:block">Sell</h3>
        </Link>

        {isLoggedCondition ? (
          <Link to={"/dashboard/profile"} role="navigation">
            <h3 className="mt-2 sm:hidden md:block">Dashboard</h3>
          </Link>
        ) : (
          <>
            <Link to={"/login"} role="navigation">
              <h3 className="mt-2 sm:hidden md:block">Log In</h3>
            </Link>
            <Link to={"/register"} role="navigation">
              <h3 className="mt-2 sm:hidden md:block">Sign Up</h3>
            </Link>
          </>
        )}
      </div>
      {displayProducts && (
        <NavbarProducts matchingProducts={matchingProducts!} />
      )}
    </>
  );
};
