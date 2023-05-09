import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const PasswordActionsForm = ({
  formType,
  actionHandler,
}: {
  formType: string;
  actionHandler: (data: PasswordActionsForm) => void;
}) => {
  const isResettingPage = formType === "resetting";

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <div className="sm:mt-10 md:mt-36 p-8 flex items-center justify-center">
      <div className="relative rounded p-5 bg-white h-102 p-10 sm:w-full md:w-2/3 lg:w-1/2 2xl:w-1/4">
        <h2 className="text-blue-600 text-2xl font-bold mb-5">
          {isResettingPage ? "INPUT NEW PASSWORD" : "INPUT YOUR E-MAIL"}
        </h2>
        <form onSubmit={handleSubmit(actionHandler)}>
          <p className="mb-1 text-gray-500">
            {isResettingPage ? "PASSWORD" : "E-MAIL"}
          </p>
          {isResettingPage ? (
            <>
              <input
                className="block bg-gray-200 outline-none p-2 w-full text-black"
                type="password"
                {...register("password")}
                autoComplete="username"
              />
              <p className="text-red-700 mt-1">{errors.password?.message}</p>
            </>
          ) : (
            <>
              <input
                className="block bg-gray-200 outline-none p-2 w-full text-black"
                type="text"
                {...register("email")}
                autoComplete="username"
              />
              <p className="text-red-700 mt-1">{errors.email?.message}</p>
            </>
          )}
          <button
            type="submit"
            className="block mt-8 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full"
          >
            RESET PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
};
