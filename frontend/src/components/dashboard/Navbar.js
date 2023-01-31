import React from "react";
import { Link } from "react-router-dom";
import {
  BanknotesIcon,
  UserCircleIcon,
  Cog8ToothIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <div className="absolute grid grid-cols-2 top-20 text-left gap-2 w-max text-2xl mt-36">
      <ShoppingBagIcon className="w-5 h-5 mt-2" />
      <Link to={"/dashboard/buying"}>Buying</Link>
      <BanknotesIcon className="w-5 h-5 mt-[9px]" />
      <Link to={"/dashboard/selling"}>Selling</Link>
      <UserCircleIcon className="w-5 h-5 mt-[9px]" />
      <Link to={"/dashboard/profile"}>Profile</Link>
      <Cog8ToothIcon className="w-5 h-5 mt-[9px]" />
      <Link to={"/dashboard/settings"}>Settings</Link>
    </div>
  );
};

export default Navbar;
