import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export const AuthFormField = ({
  name,
  register,
}: {
  name: string;
  register: UseFormRegisterReturn<string>;
}) => {
  return (
    <>
      <p className="mb-1 text-gray-500">{name}</p>
      <input
        className="block bg-gray-200 outline-none p-2 w-full text-black"
        type={name === "PASSWORD" ? "password" : "text"}
        autoComplete="username"
        {...register}
      />
    </>
  );
};
