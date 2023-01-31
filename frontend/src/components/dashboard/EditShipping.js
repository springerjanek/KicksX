import axios from "axios";
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";
import { notify } from "../../hooks/notify";

const EditShipping = () => {
  const { user } = useSelector((state) => state.auth);
  const uid = user.id;
  const [userShipping, setUserShipping] = useState({
    uid: uid,
    name: "",
    surname: "",
    street: "",
    street_number: "",
    city: "",
    zip: "",
    country: "",
    phone: "",
  });
  const options = useMemo(() => countryList().getData(), []);
  const navigate = useNavigate();

  const formHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/shipping", userShipping)
      .then((response) => {
        notify(response.data);
        navigate("/settings");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const backToSettingsHandler = () => {
    navigate("/settings");
  };

  return (
    <>
      <div className="text-center mt-10 w-max ml-auto mr-auto">
        <h1 className="text-2xl">Shipping</h1>
        <p className="text-lg">Please provide your shipping info</p>
        <div className="text-left">
          <h2 className="text-xl mt-8">Shipping Info</h2>
          <form className="text-black" onSubmit={formHandler}>
            <label htmlFor="name" className="block text-white">
              First Name
            </label>
            <input
              type="text"
              id="name"
              value={userShipping.name}
              onChange={(e) =>
                setUserShipping({ ...userShipping, name: e.target.value })
              }
              required
              placeholder="Name"
              className="p-2 border border-solid border-inherit w-full"
            ></input>
            <label htmlFor="surname" className="block text-white">
              Last Name
            </label>
            <input
              type="text"
              id="surname"
              value={userShipping.surname}
              onChange={(e) =>
                setUserShipping({ ...userShipping, surname: e.target.value })
              }
              required
              placeholder="Name"
              className="p-2 border border-solid border-inherit w-full"
            ></input>
            <label htmlFor="country" className="block text-white">
              Country
            </label>
            <Select
              styles={{
                control: (styles) => ({ ...styles, width: "500px" }),
              }}
              id="country"
              options={options}
              value={userShipping.country}
              onChange={(e) => setUserShipping({ ...userShipping, country: e })}
            />
            <label htmlFor="address" className="block text-white">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={userShipping.street}
              onChange={(e) =>
                setUserShipping({ ...userShipping, street: e.target.value })
              }
              required
              placeholder="Street Address"
              className="p-2 border border-solid border-inherit w-full"
            ></input>
            <label htmlFor="streetNumber" className="block text-white">
              Street Number
            </label>
            <input
              type="text"
              id="streetNumber"
              value={userShipping.street_number}
              onChange={(e) =>
                setUserShipping({
                  ...userShipping,
                  street_number: e.target.value,
                })
              }
              required
              placeholder="Street Number"
              className="p-2 border border-solid border-inherit w-full"
            ></input>
            <label htmlFor="city" className="block text-white">
              City
            </label>
            <input
              type="text"
              id="city"
              value={userShipping.city}
              onChange={(e) =>
                setUserShipping({ ...userShipping, city: e.target.value })
              }
              required
              placeholder="City"
              className="p-2 border border-solid border-inherit w-full"
            ></input>
            <label htmlFor="zipcode" className="block text-white">
              Postal Code
            </label>
            <input
              type="text"
              id="zipcode"
              value={userShipping.zip}
              onChange={(e) =>
                setUserShipping({ ...userShipping, zip: e.target.value })
              }
              required
              placeholder="Postal Code"
              className="p-2 border border-solid border-inherit w-full"
            ></input>
            <label htmlFor="phone" className="block text-white">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              value={userShipping.phone}
              onChange={(e) =>
                setUserShipping({ ...userShipping, phone: e.target.value })
              }
              required
              placeholder="Phone"
              className="p-2 border border-solid border-inherit w-full"
            ></input>
            <div className="flex justify-between">
              <button
                onClick={backToSettingsHandler}
                className="text-white text-center"
                type="button"
              >
                BACK
              </button>
              <button type="submit" className="text-white text-center">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditShipping;
