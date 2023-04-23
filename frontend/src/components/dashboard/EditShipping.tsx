import axios from "axios";
import React, { useMemo } from "react";
import { useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";
import { notify } from "../../hooks/notify";
import { useForm, Controller } from "react-hook-form";

export const EditShipping = () => {
  const { user } = useAppSelector((state) => state.auth);
  const uid = user.id;
  const options = useMemo(() => countryList().getData(), []);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditShippingForm>();
  const navigate = useNavigate();

  const formHandler = (data: EditShippingForm) => {
    axios
      .post("https://kicksxbackend.onrender.com/shipping", {
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
        <div className="text-left p-5">
          <h2 className="text-xl mt-8 mb-1">Shipping Info</h2>
          <form className="text-black" onSubmit={handleSubmit(formHandler)}>
            <label htmlFor="name" className="block text-white">
              First Name
            </label>
            <input
              id="name"
              {...register("name", {
                minLength: 1,
                pattern: /^[A-Za-z]+$/i,
              })}
              required
              placeholder="First Name"
              className="p-2 border border-solid border-inherit w-full"
            ></input>
            {errors?.name?.type === "minLength" &&
              notify("First name must contain more than 1 character", "error")}
            <label htmlFor="surname" className="block text-white">
              Last Name
            </label>
            <input
              type="text"
              id="surname"
              {...register("surname", {
                minLength: 1,
                pattern: /^[A-Za-z]+$/i,
              })}
              required
              placeholder="Last Name"
              className="p-2 border border-solid border-inherit w-full"
            ></input>
            {errors?.surname?.type === "minLength" &&
              notify("Last name must contain more than 1 character", "error")}
            <label htmlFor="country" className="block text-white">
              Country
            </label>
            <Controller
              name="country"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  onChange={(e) => field.onChange(e)}
                  styles={{
                    control: (styles) => ({ ...styles, width: "375px" }),
                  }}
                  id="country"
                  options={options}
                />
              )}
            />
            {errors?.country?.type === "required" &&
              notify("You must choose your country", "error")}
            <label htmlFor="address" className="block text-white">
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address", {
                minLength: 3,
              })}
              required
              placeholder="Street Address"
              className="p-2 border border-solid border-inherit w-full"
            ></input>
            {errors?.address?.type === "minLength" &&
              notify(
                "Street Address must contain more than 3 characters",
                "error"
              )}
            <label htmlFor="streetNumber" className="block text-white">
              Street Number
            </label>
            <input
              type="text"
              id="streetNumber"
              {...register("streetNumber", {
                maxLength: 20,
              })}
              required
              placeholder="Street Number"
              className="p-2 border border-solid border-inherit w-full"
            ></input>
            {errors?.streetNumber?.type === "maxLength" &&
              notify(
                "Street Number can not contain more than 20 characters",
                "error"
              )}
            <label htmlFor="city" className="block text-white">
              City
            </label>
            <input
              type="text"
              id="city"
              {...register("city", {
                minLength: 1,
              })}
              required
              placeholder="City"
              className="p-2 border border-solid border-inherit w-full"
            ></input>
            {errors?.city?.type === "minLength" &&
              notify("City must contain more than 1 character", "error")}
            <label htmlFor="zipcode" className="block text-white">
              Postal Code
            </label>
            <input
              type="text"
              id="zipcode"
              {...register("zipcode", {
                minLength: 1,
              })}
              required
              placeholder="Postal Code"
              className="p-2 border border-solid border-inherit w-full"
            ></input>
            {errors?.zipcode?.type === "minLength" &&
              notify("Postal code must contain more than 1 character", "error")}
            <label htmlFor="phone" className="block text-white">
              Phone Number
            </label>
            <input
              type="number"
              id="phone"
              {...register("phone", {
                minLength: 3,
              })}
              required
              placeholder="Phone"
              className="p-2 border border-solid border-inherit w-full"
            ></input>
            {errors?.phone?.type === "minLength" &&
              notify(
                "Phone number must contain more than 3 characters",
                "error"
              )}
            <div className="flex justify-between mt-4">
              <button
                onClick={backToSettingsHandler}
                className="text-white text-center small-button p-5"
                type="button"
              >
                BACK
              </button>
              <button
                type="submit"
                className="text-white text-center small-button p-5"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
