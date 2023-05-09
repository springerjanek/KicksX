import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../../hooks/notify/useNotify";
import { EditShippingForm } from "./EditShippingForm";
import { useGetUserAuth } from "hooks/user/useGetUserAuth,";

export const EditShipping = () => {
  const { uid } = useGetUserAuth();

  const navigate = useNavigate();

  const formHandler = (data: EditShippingForm) => {
    axios
      .post(`${process.env.REACT_APP_REQUEST_URL}/shipping`, {
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
