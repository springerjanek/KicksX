import React, { useEffect, useState } from "react";

const FinalChecks = (props) => {
  const [firstCheckboxChecked, setFirstCheckboxChecked] = useState(false);
  const [secondCheckboxChecked, setSecondCheckboxChecked] = useState(false);

  useEffect(() => {
    if (firstCheckboxChecked && secondCheckboxChecked) {
      props.enableButton();
    } else {
      props.disableButton();
    }
  }, [firstCheckboxChecked, secondCheckboxChecked]);

  return (
    <>
      {props.type === "selling" && (
        <>
          <div className="bg-white text-black mr-10 rounded">
            <h1 className="text-lg mt-10 p-2">Final Checks</h1>
            <div className="ml-8 mt-1">
              <input
                type="checkbox"
                id="new_sneakers"
                onChange={() => setFirstCheckboxChecked(!firstCheckboxChecked)}
                className="h-5 w-5 accent-black	align-middle relative bottom-[1px]"
              />
              <label htmlFor="new_sneakers" className="ml-1">
                My sneakers are new, unworn with the original, undamaged box.
              </label>
              <br></br>
              <input
                type="checkbox"
                id="shipping"
                onChange={() =>
                  setSecondCheckboxChecked(!secondCheckboxChecked)
                }
                className="h-5 w-5 accent-black	align-middle relative bottom-[1px]"
              />
              <label htmlFor="shipping" className="ml-1 inline-flex mb-5">
                I will ship within 2 business days of sale to avoid penalties.
              </label>
            </div>
          </div>
        </>
      )}
      {props.type === "buying" && (
        <>
          <div className="ml-1 mt-7 mb-6">
            <input
              type="checkbox"
              id="new_sneakers"
              checked={true}
              readOnly={true}
              className="h-5 w-5 accent-white	align-middle relative bottom-[1px]"
            />
            <label htmlFor="new_sneakers" className="ml-1.5">
              New & Unworn
            </label>
            <br></br>
            <input
              type="checkbox"
              id="box"
              checked={true}
              readOnly={true}
              className="h-5 w-5 accent-white	align-middle relative bottom-[1px]"
            />
            <label htmlFor="box" className="ml-1.5">
              In Original Box
            </label>
            <br></br>
            <input
              type="checkbox"
              id="verified"
              checked={true}
              readOnly={true}
              className="h-5 w-5 accent-white	align-middle relative bottom-[2px]	"
            />
            <label htmlFor="verified" className="ml-1.5">
              PerkeX Verified
            </label>
          </div>
        </>
      )}
    </>
  );
};

export default FinalChecks;
