import React, { useState, useEffect } from "react";
import { useGetProducts } from "hooks/useGetProducts";
import { search } from "api/navbar/search";
import { NavbarProducts } from "./NavbarProducts";
import { NavbarInput } from "./NavbarInput";

export const NavbarSell = () => {
  const [input, setInput] = useState("");
  const [matchingProducts, setMatchingProducts] = useState<
    Products | undefined
  >([]);
  const [displayProducts, setDisplayProducts] = useState(false);

  const { isLoading, data } = useGetProducts();

  useEffect(() => {
    if (!isLoading) {
      const matchingProducts = search(data!, input);
      setMatchingProducts(matchingProducts);
    }
    if (input.length === 0) {
      setDisplayProducts(false);
    } else {
      setDisplayProducts(true);
    }
  }, [input]);

  return (
    <div className="text-center mt-6 w-full">
      <h1>Choose a product</h1>
      <p>Find the product you're looking for</p>
      <NavbarInput
        isLoading={isLoading}
        input={input}
        setInput={setInput}
        navbarSell={true}
      />
      {displayProducts && (
        <NavbarProducts
          matchingProducts={matchingProducts!}
          navbarSell={true}
        />
      )}
    </div>
  );
};
