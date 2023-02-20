import React from "react";

const Switcher = (props) => {
  return (
    <div className="switcher flex justify-center w-11/12 sm:ml-3 md:ml-5">
      <label className="inline-flex items-center p-2 rounded-md cursor-pointer dark:text-gray-800">
        <input
          id="Toggle3"
          type="checkbox"
          className="hidden peer"
          onChange={props.onChange}
          checked={props.checked}
        />
        <span className="px-12 md:px-20 py-3 rounded-l-[20px] bg-green-700 peer-checked:bg-gray-300">
          {props.leftText}
        </span>
        <span className="px-12 md:px-20 py-3 rounded-r-[20px] bg-gray-300 peer-checked:bg-green-700">
          {props.rightText}
        </span>
      </label>
    </div>
  );
};

export default Switcher;
