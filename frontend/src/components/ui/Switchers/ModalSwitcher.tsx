import React from "react";

export const ModalSwitcher = (props: {
  onChange: () => void;
  checked: boolean;
  leftText: string;
  rightText: string;
}) => {
  return (
    <div className="switcher flex justify-center w-11/12 sm:ml-3 md:ml-5 text-white">
      <label className="inline-flex items-center p-2 rounded-md cursor-pointer">
        <input
          id="Toggle3"
          type="checkbox"
          className="hidden peer"
          onChange={props.onChange}
          checked={props.checked}
        />
        <span className="px-12 md:px-20 py-3 rounded-l-[20px] bg-[#010D50] peer-checked:bg-zinc-400">
          {props.leftText}
        </span>
        <span className="px-12 md:px-20 py-3 rounded-r-[20px] bg-zinc-400 peer-checked:bg-[#010D50]">
          {props.rightText}
        </span>
      </label>
    </div>
  );
};
