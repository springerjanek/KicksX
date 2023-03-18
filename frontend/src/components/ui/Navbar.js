import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetQuery } from "../../hooks/useGetQuery";
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState(false);
  const [showMobileInput, setShowMobileInput] = useState(false);

  const { isLoading, data } = useGetQuery("/", "navbar");

  const { user, isLoggedInTemporary } = useSelector((state) => state.auth);
  const isLoggedInPersisted = user.isLoggedInPersisted;
  const isLoggedTemporary = isLoggedInTemporary;
  const isLoggedCondition =
    isLoggedInPersisted === "true" || isLoggedTemporary === "true";

  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setInput(event.target.value);
  };

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

  useEffect(() => {
    setInput("");
  }, [location]);

  const closeMobileInput = () => {
    setShowMobileInput(false);
    setInput("");
  };

  const handleMobileDashboard = () => {
    if (isLoggedCondition) {
      navigate("/dashboard/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="flex sm:justify-end  md:justify-center md:gap-x-5 2xl:gap-x-20 mt-5 text-white text-xl">
        <div className="sm:m-auto sm:ml-10 md:m-0">
          <Link to={"/"}>
            <h2 className=" mt-2 md:ml-0">KicksX</h2>
          </Link>
        </div>

        <input
          type="text"
          placeholder="Search for sneaker"
          value={input}
          onChange={handleSearch}
          className={`w-1/2 h-10 p-2 rounded text-black text-lg  ${
            showMobileInput ? "sm:block absolute left-9 w-[320px]" : "sm:hidden"
          }  md:block`}
        />

        <div className="flex mt-2 mr-2 gap-2 md:hidden">
          <MagnifyingGlassIcon
            className="h-5 w-5"
            onClick={() => setShowMobileInput(true)}
          />
          {showMobileInput ? (
            <XCircleIcon onClick={closeMobileInput} className="w-5 h-5" />
          ) : (
            <UserCircleIcon
              className="h-5 w-5"
              onClick={handleMobileDashboard}
            />
          )}
        </div>
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
        <>
          <div className="mt-10 fixed z-10 w-full h-full	 overflow-y-scroll search-products ">
            {products.map((product) => {
              const { id, name, thumbnail } = product;

              return (
                <div key={id} className="text-white flex bg-og p-1">
                  <Link
                    to={`/product/${id}`}
                    className="flex gap-5 items-center ml-8 md:ml-[140px] lg:ml-[200px] xl:ml-[350px] 2xl:ml-[400px]"
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
    </>
  );
};

export default Navbar;
