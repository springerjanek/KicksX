import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BanknotesIcon,
  UserCircleIcon,
  Cog8ToothIcon,
  ShoppingBagIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

export const DashboardNavbar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <div>
      <div className="sm:absolute top-5 left-2 md:hidden">
        <button onClick={() => setOpenMobileMenu(!openMobileMenu)}>
          <Bars3Icon className="w-8 h-8" />
        </button>
      </div>
      {openMobileMenu && (
        <div className="bg-og h-full w-full dash-nav absolute top-14 text-left gap-y-2 gap-x-0 text-2xl fadeIn">
          <ShoppingBagIcon className="w-5 h-5 mt-2" />
          <Link to={"/dashboard/buying"} className="">
            Buying
          </Link>

          <BanknotesIcon className="w-5 h-5 mt-[9px]" />
          <Link to={"/dashboard/selling"}>Selling</Link>
          <UserCircleIcon className="w-5 h-5 mt-[9px]" />
          <Link to={"/dashboard/profile"}>Profile</Link>
          <Cog8ToothIcon className="w-5 h-5 mt-[9px]" />
          <Link to={"/dashboard/settings"}>Settings</Link>
        </div>
      )}
      <div className="dash-nav sm:hidden md:grid absolute top-20 text-left gap-y-2 gap-x-0 text-2xl">
        <ShoppingBagIcon className="w-5 h-5 mt-2" />
        <Link to={"/dashboard/buying"} className="">
          Buying
        </Link>

        <BanknotesIcon className="w-5 h-5 mt-[9px]" />
        <Link to={"/dashboard/selling"}>Selling</Link>
        <UserCircleIcon className="w-5 h-5 mt-[9px]" />
        <Link to={"/dashboard/profile"}>Profile</Link>
        <Cog8ToothIcon className="w-5 h-5 mt-[9px]" />
        <Link to={"/dashboard/settings"}>Settings</Link>
      </div>
    </div>
  );
};
