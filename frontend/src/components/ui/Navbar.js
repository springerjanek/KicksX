import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

  function search() {
    const matches = [];
    const rest = [];
    products.forEach((product) => {
      const formattedProductTitle = product.name.toLowerCase();
      formattedProductTitle.includes(input.toLowerCase())
        ? matches.push(product)
        : rest.push(product);
    });
    matches.push(...rest);
    setProducts(matches);
  }

  useEffect(() => {
    search();
    if (input.length === 0) {
      setDisplayProducts(false);
      console.log("input is empty");
    } else {
      setDisplayProducts(true);
    }
  }, [input]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:3001");
      const json = await data.json();
      console.log(json);
      setProducts(json);
    };

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    setInput("");
  }, [location]);

  const closeMobileInput = () => {
    setShowMobileInput(false);
    setInput("");
  };

  return (
    <>
      <div className="flex sm:justify-end  md:justify-center md:gap-x-5 2xl:gap-x-20 mt-5 text-white text-xl">
        <div className="sm:m-auto md:m-0">
          <h2 className="mt-2 md:ml-0">PerkeX</h2>
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
              onClick={() => navigate("/dashboard")}
            />
          )}
        </div>
        <h3 className="mt-2 sm:hidden md:block">Sell</h3>
        {isLoggedCondition ? (
          <Link to={"/dashboard/profile"}>
            <h3 className="mt-2 sm:hidden md:block">Dashboard</h3>
          </Link>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="sm:hidden md:block"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="sm:hidden md:block"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
      <div className="mt-5">
        {displayProducts &&
          products.map((product) => {
            const { id, name } = product;

            return (
              <div key={id} className="text-white">
                <Link to={`/product/${id}`}>{name}</Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Navbar;
