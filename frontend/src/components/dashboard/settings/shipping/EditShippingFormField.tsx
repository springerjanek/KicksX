import React, { useMemo } from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import Select from "react-select";
import countryList from "react-select-country-list";

export const EditShippingFormField = ({
  register,
  id,
  placeholder,
  control,
}: {
  register: UseFormRegister<EditShippingForm>;
  id:
    | "address"
    | "name"
    | "surname"
    | "streetNumber"
    | "city"
    | "zipcode"
    | "country"
    | "phone"
    | "country.label";
  placeholder: string;
  control?: Control<EditShippingForm, any>;
}) => {
  const options = useMemo(() => countryList().getData(), []);

  return (
    <>
      {id === "country" ? (
        <>
          <label htmlFor={id} className="block text-white">
            Country
          </label>
          <Controller
            name={id}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                onChange={(e) => field.onChange(e)}
                styles={{
                  control: (styles) => ({ ...styles, width: "375px" }),
                }}
                id={id}
                options={options}
              />
            )}
          />
        </>
      ) : (
        <>
          <label htmlFor={id} className="block text-white">
            {placeholder}
          </label>
          <input
            id={id}
            {...register(id)}
            placeholder={placeholder}
            className="p-2 border border-solid border-inherit w-full"
          ></input>
        </>
      )}
    </>
  );
};
