import React from "react";
import { useForm } from "react-hook-form";
import { EditShippingFormField } from "../EditShippingFormField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const EditShippingForm = ({
  formHandler,
  backToSettingsHandler,
}: {
  formHandler: (data: EditShippingForm) => void;
  backToSettingsHandler: () => void;
}) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .matches(/^[A-Za-z]+$/i, "Name can only contain english characters"),
    surname: Yup.string()
      .required("Last Name is required")
      .matches(/^[A-Za-z]+$/i, "Last Name can only contain english characters"),
    country: Yup.object()
      .shape({ label: Yup.string().required("Country is required") })
      .required("Country is required"),
    address: Yup.string().required("Street Address is required"),
    streetNumber: Yup.string().required("Street Number is required"),
    city: Yup.string().required("City is required"),
    zipcode: Yup.string().required("Postal Code is required"),
    phone: Yup.string().required("Phone is required"),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditShippingForm>({ resolver: yupResolver(validationSchema) });

  console.log(errors);

  return (
    <div className="text-left p-5">
      <h2 className="text-xl mt-8 mb-1">Shipping Info</h2>
      <form className="text-black" onSubmit={handleSubmit(formHandler)}>
        <EditShippingFormField
          register={register}
          id={"name"}
          placeholder={"First Name"}
        />
        {errors?.name?.message && (
          <p className="text-red-700 mt-1">{errors.name.message}</p>
        )}
        <EditShippingFormField
          register={register}
          id={"surname"}
          placeholder={"Last Name"}
        />
        {errors?.surname?.message && (
          <p className="text-red-700 mt-1">{errors.surname.message}</p>
        )}
        <EditShippingFormField
          register={register}
          id={"country"}
          placeholder={"country"}
          control={control}
        />
        {errors?.country?.label?.message && (
          <p className="text-red-700 mt-1">{errors.country.label.message}</p>
        )}
        <EditShippingFormField
          register={register}
          id={"address"}
          placeholder={"Street Address"}
        />
        {errors?.address?.message && (
          <p className="text-red-700 mt-1">{errors.address.message}</p>
        )}
        <EditShippingFormField
          register={register}
          id={"streetNumber"}
          placeholder={"Street Number"}
        />
        {errors?.streetNumber?.message && (
          <p className="text-red-700 mt-1">{errors.streetNumber.message}</p>
        )}
        <EditShippingFormField
          register={register}
          id={"city"}
          placeholder={"City"}
        />
        {errors?.city?.message && (
          <p className="text-red-700 mt-1">{errors.city.message}</p>
        )}
        <EditShippingFormField
          register={register}
          id={"zipcode"}
          placeholder={"Postal Code"}
        />
        {errors?.zipcode?.message && (
          <p className="text-red-700 mt-1">{errors.zipcode.message}</p>
        )}
        <EditShippingFormField
          register={register}
          id={"phone"}
          placeholder={"Phone Number"}
        />
        {errors?.phone?.message && (
          <p className="text-red-700 mt-1">{errors.phone.message}</p>
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
  );
};
