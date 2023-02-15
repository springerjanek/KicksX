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
        <div className="text-lg mt-5 left-0 right-0">
          {!isLoading ? (
            <p>
              Hello {data.shipping.name.length > 0 ? data.shipping.name : ""} 😎{" "}
              <br></br>
              <button
                onClick={() => dispatch(logout())}
                className="small-button w-24 m-3 mr-4"
              >
                Logout
              </button>
              <br></br> {data.purchases.length - 1} Purchases{" "}
              {data.sales.length - 1} Sales
            </p>
          ) : (
            ""
          )}
          <Link to={"/forgot-password"}>Reset Your Password</Link>

          <Navbar />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
