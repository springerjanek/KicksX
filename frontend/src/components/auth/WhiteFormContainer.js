import React from "react";
import { Link } from "react-router-dom";
import { FiGithub } from "react-icons/fi";

const WhiteFormContainer = (props) => {
  return (
    <>
      <div className="sm:mt-10 md:mt-36 p-8 flex items-center justify-center">
        <div className="relative rounded p-5 bg-white h-102 p-10 sm:w-full md:w-2/3 lg:w-1/2 2xl:w-1/4">
          <h2 className="text-blue-600 text-2xl font-bold mb-5">
            {props.heading}
          </h2>
          <form onSubmit={props.onSubmit}>
            <p className="mb-1 text-gray-500">{props.smallText}</p>
            <input
              className="block bg-gray-200 outline-none p-2 w-full text-black"
              type={props.inputType}
              name={props.inputName}
              value={props.inputValue}
              onChange={props.onInputChange}
              autoComplete="username"
            />
            {props.smallTextTwo && (
              <p className="mt-2 mb-1 text-gray-500">{props.smallTextTwo}</p>
            )}
            {props.inputTypeTwo && (
              <input
                className="bg-gray-200 outline-none p-2 w-full mb-5 text-black"
                type={props.inputTypeTwo}
                value={props.inputValueTwo}
                onChange={props.onInputChangeTwo}
                autoComplete="current-password"
              />
            )}
            {props.rememberMe && (
              <label className="text-gray-500">
                <input
                  type="checkbox"
                  onChange={props.rememberOnChange}
                  className="mr-2"
                />
                Remember Me
              </label>
            )}
            <button
              type="submit"
              className="block mt-8 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full"
            >
              {props.buttonText}
            </button>
          </form>
          {props.buttonTextTwo && (
            <button
              className="block mt-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full"
              onClick={props.buttonTwoOnClick}
            >
              {props.buttonTextTwo} <FiGithub className="inline ml-1" />
            </button>
          )}
          {props.linkText && (
            <>
              <div className="text-center">
                <br></br>
                <Link
                  className={"text-gray-600  whitespace-nowrap"}
                  to={props.linkRedirect}
                >
                  {props.linkText}
                </Link>
              </div>
            </>
          )}
          {props.linkTextTwo && (
            <>
              <div className="text-center">
                <Link
                  className="text-gray-600 whitespace-nowrap"
                  to={props.linkTwoRedirect}
                >
                  {props.linkTextTwo}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WhiteFormContainer;
