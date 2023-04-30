import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const NavbarInput = ({
  isLoading,
  input,
  setInput,
  isLoggedCondition,
  navbarSell,
}: {
  isLoading: boolean;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  isLoggedCondition?: boolean;
  navbarSell?: boolean;
}) => {
  const [showMobileInput, setShowMobileInput] = useState(false);
  const navigate = useNavigate();

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
      <input
        type="text"
        placeholder={`${
          isLoading
            ? "Please wait a minute for backend to load ;)"
            : "Search for sneaker"
        }`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={` ${
          navbarSell
            ? "sm:w-2/3 xl:w-1/3 h-10 p-2 mt-1 rounded text-black text-lg"
            : `w-1/2 h-10 p-2 rounded text-black text-lg  ${
                showMobileInput
                  ? "sm:block absolute left-9 w-[320px]"
                  : "sm:hidden"
              }  md:block`
        }`}
        disabled={isLoading}
      />

      {navbarSell === undefined && (
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
      )}
    </>
  );
};
