import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState(false);

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

  return (
    <>
      <div className="flex justify-center gap-10 gap-x-20 mt-5 text-white">
        <h2 className="mt-2 font-2xl">PerkeX</h2>
        <input
          type="text"
          placeholder="Search for sneaker"
          value={input}
          onChange={handleSearch}
          className="w-1/2 h-10 p-2 rounded text-black"
        />
        <h3 className="mt-2">Sell</h3>
        {isLoggedCondition ? (
          <Link to={"/dashboard"}>
            <h3 className="mt-2">Dashboard</h3>
          </Link>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Sign Up</button>
          </>
        )}
      </div>
      <div>
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
