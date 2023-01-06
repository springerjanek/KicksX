import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const uid = user.id;

  useEffect(() => {
    console.log("triggering use effect");
    const fetchData = async () => {
      const userData = await axios.get(
        `http://localhost:3001/getUserData/${uid}`
      );

      console.log("FETCHING...");

      setUserData(userData.data);
      setLoading(false);
    };
    if (userData !== []) {
      fetchData().catch((e) => console.error(e));
    } else {
      setUserData([]);
    }
  }, [uid]);

  return (
    <>
      <div className="text-center mt-5 text-white">
        <h2 className="text-2xl font-medium">DASHBOARD</h2>
        <div className="text-lg relative mt-5 left-0 right-0">
          <p className="mb-5">YOUR UID: {uid}</p>
          <button
            onClick={() => dispatch(logout())}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2"
          >
            Logout
          </button>
        </div>
        {!loading && (
          <>
            <h1>BIDS:</h1>
            {userData.bids.length > 1 &&
              userData.bids.map((bid) => {
                const { id, name, price, size } = bid;
                const condition = id.length > 0;
                return (
                  <>
                    <div key={id}>
                      {condition && (
                        <>
                          <h1>
                            {name} {size}, ${price}
                          </h1>
                        </>
                      )}
                    </div>
                  </>
                );
              })}
            <h1>ASKS:</h1>
            {userData.asks.length > 1 !== "" &&
              userData.asks.map((ask) => {
                const { id, name, price, size } = ask;
                const condition = id.length > 0;
                return (
                  <>
                    <div key={id}>
                      {condition && (
                        <>
                          <h1>
                            {name} {size}, ${price}
                          </h1>
                        </>
                      )}
                    </div>
                  </>
                );
              })}
            <h1>PURCHASES:</h1>
            {userData.purchases.length > 1 !== "" &&
              userData.purchases.map((purchase) => {
                const { id, name, price, size } = purchase;
                const condition = id.length > 0;
                return (
                  <>
                    <div key={id}>
                      {condition && (
                        <>
                          <h1>
                            {name} {size}, ${price}
                          </h1>
                        </>
                      )}
                    </div>
                  </>
                );
              })}
            <h1> SALES:</h1>
            {userData.sales.length > 1 !== "" &&
              userData.sales.map((sale) => {
                const { id, name, price, size } = sale;
                console.log(sale);
                const condition = id.length > 0;
                return (
                  <>
                    <div key={id}>
                      {condition && (
                        <>
                          <h1>
                            {name} {size}, ${price}
                          </h1>
                        </>
                      )}
                    </div>
                  </>
                );
              })}
          </>
        )}
        <Link to={"/settings"}>GENERAL SETTINGS</Link>
      </div>
    </>
  );
};

export default Dashboard;
