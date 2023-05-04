import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../../hooks/useNotify";
import { useAppSelector } from "redux/store";
import { EditShippingForm } from "./EditShippingForm";

export const EditShipping = () => {
  const { user } = useAppSelector((state) => state.auth);
  const uid = user.id;
  const navigate = useNavigate();

  const formHandler = (data: EditShippingForm) => {
    axios
      .post("http://localhost:3001/shipping", {
        uid: uid,
        name: data.name,
        surname: data.surname,
        street: data.address,
        street_number: data.streetNumber,
        city: data.city,
        zip: data.zipcode,
        country: data.country.label,
        phone: data.phone,
      })
      .then((response) => {
        notify(response.data, "success");
        navigate("/dashboard/settings");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const backToSettingsHandler = () => {
    navigate("/dashboard/settings");
  };

  return (
    <>
      <div className="text-center mt-10 2xl:w-1/3 ml-auto mr-auto">
        <h1 className="text-2xl">Shipping</h1>
        <p className="text-xl ">Please provide your shipping info</p>
        <EditShippingForm
          formHandler={formHandler}
          backToSettingsHandler={backToSettingsHandler}
        />
      </div>
    </>
  );
};
