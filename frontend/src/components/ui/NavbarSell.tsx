import React, { useState, useEffect } from "react";
import { useGetProducts } from "hooks/useGetProducts";
import { Link } from "react-router-dom";

const NavbarSell = () => {
  const [input, setInput] = useState("");
  const [products, setProducts] = useState<Products | undefined>([]);
  const [displayProducts, setDisplayProducts] = useState(false);

  const { isLoading, data } = useGetProducts();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const search = () => {
    const matches: Product[] = [];
    const rest: Product[] = [];

    if (!isLoading && typeof data !== "string") {
      data!.forEach((product) => {
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
    <div className="text-center mt-6 w-full">
      <h1>Choose a product</h1>
      <p>Find the product you're looking for</p>
      <input
        type="text"
        placeholder={`${
          isLoading
            ? "Please wait a minute for backend to load ;)"
            : "Search for sneaker"
        }`}
        value={input}
        onChange={handleSearch}
        className="sm:w-2/3 xl:w-1/3 h-10 p-2 mt-1 rounded text-black text-lg "
        disabled={isLoading ? true : false}
      />
      <div className="mt-5">
        {displayProducts && (
          <>
            <div className="mt-10 fixed z-10 w-full h-full search-products overflow-y-scroll  ">
              {products!.map((product) => {
                const { id, name, thumbnail } = product;

                return (
                  <div key={id} className="text-white bg-og p-1">
                    <Link
                      to={`/sell/${id}`}
                      className="flex gap-5 items-center ml-8 md:ml-[140px] lg:ml-[200px] xl:ml-[420px] 2xl:ml-[630px]"
                    >
                      <img src={thumbnail} alt="Shoe" className="w-40 h-28" />
                      <p className="w-[120px]"> {name}</p>
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