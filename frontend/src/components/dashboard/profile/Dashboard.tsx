import React from "react";
import { useAppDispatch } from "redux/store";
import { logout } from "../../../redux/authSlice";
import { Link } from "react-router-dom";
import { useGetUserData } from "hooks/user/useGetUserData";
import { ThreeDots } from "react-loader-spinner";
import { DashboardNavbar } from "../../ui/Navbar/DashboardNavbar";
import { useGetUserAuth } from "hooks/user/useGetUserAuth,";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { uid } = useGetUserAuth();

  const { data } = useGetUserData(`/getUserData/${uid}`, "dashboardData");

  return (
    <>
      <div className="text-center mt-5 text-white">
        <Link to={"/"} className="absolute sm:right-3 md:right-auto md:left-6">
          <h2 className="text-2xl font-medium">KicksX</h2>
        </Link>
        <h2 className="text-2xl font-medium">DASHBOARD</h2>
        <div className="text-lg mt-5">
          {data ? (
            <>
              <p>
                Hello {data.shipping.name.length > 0 ? data.shipping.name : ""}{" "}
                😎
              </p>
              <p>
                {data.purchases.length - 1} Purchases {data.sales.length - 1}{" "}
                Sales
              </p>
            </>
          ) : (
            <div className="absolute left-1/2 ml-[-50px] top-7">
              <ThreeDots
                height="80"
                width="100"
                radius="9"
                color="#ffffff"
                ariaLabel="three-dots-loading"
                wrapperStyle={{ textAlign: "center" }}
                visible={true}
              />
            </div>
          )}
          <button
            onClick={() => dispatch(logout())}
            className="small-button w-24 m-3 mr-4"
          >
            Logout
          </button>
          <p>
            <Link to={"/forgot-password"}>Reset Your Password</Link>
          </p>

          <DashboardNavbar />
        </div>
      </div>
    </>
  );
};
