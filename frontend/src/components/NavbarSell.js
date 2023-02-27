import React, { useState, useEffect } from "react";
import { useGetQuery } from "../hooks/useGetQuery";
import { Link } from "react-router-dom";

const NavbarSell = () => {
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState(false);

  const { isLoading, data } = useGetQuery("/", "navbarSell");

  const handleSearch = (event) => {
    setInput(event.target.value);
  };

  console.log(data);

  const search = () => {
    const matches = [];
    const rest = [];
    if (!isLoading) {
      data.forEach((product) => {
        const formattedProductTitle = product.name.toLowerCase();
        formattedProductTitle.includes(input.toLowerCase())
          ? matches.push(product)
          : rest.push(product);
      });
      matches.push(...rest);
      setProducts(matches);
    }
  };

  useEffect(() => {
    search();
    if (input.length === 0) {
      setDisplayProducts(false);
    } else {
      setDisplayProducts(true);
    }
  }, [input]);

  return (
    <div className="text-center mt-10 w-full">
      <h1>Choose a product</h1>
      <p>Find the product you're looking for</p>
      <input
        type="text"
        placeholder="Search for sneaker"
        value={input}
        onChange={handleSearch}
        className="w-1/3 h-10 p-2 mt-1 rounded text-black text-lg "
      />
      <div className="mt-5">
        {displayProducts && (
          <>
            <div className="mt-10 fixed z-10 w-full search-products h-full overflow-y-scroll  ">
              {products.map((product) => {
                const { id, name, thumbnail } = product;
                const splittedName = name.split(" ");
                const first =
                  splittedName[0] === "NIKE"
                    ? splittedName[0] +
                      " " +
                      splittedName[1] +
                      " " +
                      splittedName[2]
                    : splittedName[0] + " " + splittedName[1];
                const second =
                  splittedName[3] && splittedName[3] !== "GS"
                    ? splittedName[3] + " " + splittedName[4]
                    : splittedName[2];
                const third = splittedName[3] === "GS" && " " + splittedName[3];
                const fourth = splittedName[5] && " " + splittedName[5];

                return (
                  <div key={id} className="text-white bg-og p-1">
                    <Link
                      to={`/sell/${id}`}
                      className="flex gap-5 items-center ml-[630px]"
                    >
                      <img src={thumbnail} className="w-40 h-28" />

                      {first}
                      <br></br>
                      {second}
                      {third}
                      {fourth}
                    </Link>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavbarSell;
