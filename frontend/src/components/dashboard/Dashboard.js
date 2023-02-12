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

  console.log(data.purchases);

  const numOfPurchases = data.purchases.length - 1;
  const numOfSales = data.sales.length - 1;
  const userName = data.shipping.name.length > 0 ? data.shipping.name : "";

  return (
    <>
      <div className="text-center mt-5 text-white">
        <h2 className="text-2xl font-medium">DASHBOARD</h2>
        <div className="text-lg relative mt-5 left-0 right-0">
          <p className="mb-5">YOUR UID: {uid}</p>

          {!isLoading ? (
            <p>
              Hello {userName} 😎<br></br> {numOfPurchases} Purchases{" "}
              {numOfSales} Sales
            </p>
          ) : (
            ""
          )}
          <Link to={"/forgot-password"}>Reset Your Password</Link>
          <Navbar />
          <button onClick={() => dispatch(logout())} className="button">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
