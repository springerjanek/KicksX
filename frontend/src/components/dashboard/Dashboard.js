import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { Link } from "react-router-dom";
import { useGetQuery } from "../../hooks/useGetQuery";
import Navbar from "./DashboardNavbar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const uid = user.id;

  const { isLoading, data } = useGetQuery(
    `/getUserData/${uid}`,
    "dashboardData"
  );

  return (
    <>
      <div className="text-center mt-5 text-white">
        <h2 className="text-2xl font-medium">DASHBOARD</h2>
        <div className="text-lg relative mt-5 left-0 right-0">
          <p className="mb-5">YOUR UID: {uid}</p>0 Purchases 0 Sales YOUR NAME /
          EDIT
          <Link to={"/forgot-password"}>Reset Your Password</Link>
          <Navbar />
          <button onClick={() => dispatch(logout())} className="button">
            Logout
          </button>
        </div>
        {!isLoading && (
          <>
            <h1>ASKS:</h1>
            {data.asks.length > 1 &&
              data.asks.map((ask) => {
                const { id, name, price, size } = ask;
                const condition = id.length > 0;
                return (
                  <div key={id}>
                    {condition && (
                      <>
                        <h1>
                          {name} {size}, ${price}
                        </h1>
                      </>
                    )}
                  </div>
                );
              })}
            <h1>PURCHASES:</h1>
            {data.purchases.length > 1 &&
              data.purchases.map((purchase) => {
                const { id, name, price, size } = purchase;
                const condition = id.length > 0;
                return (
                  <div key={id}>
                    {condition && (
                      <>
                        <h1>
                          {name} {size}, ${price}
                        </h1>
                      </>
                    )}
                  </div>
                );
              })}
            <h1> SALES:</h1>
            {data.sales.length > 1 &&
              data.sales.map((sale) => {
                const { id, name, price, size } = sale;
                const condition = id.length > 0;
                return (
                  <div key={id}>
                    {condition && (
                      <>
                        <h1>
                          {name} {size}, ${price}
                        </h1>
                      </>
                    )}
                  </div>
                );
              })}
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
