import React from "react";
import { Link } from "react-router-dom";
import { FiGithub } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { AuthFormField } from "../AuthFormField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const AuthForm = ({
  formType,
  formHandler,
  githubHandler,
}: {
  formType: string;
  formHandler: (data: AuthForm) => void;
  githubHandler: () => void;
}) => {
  const isLoginForm = formType === "login";

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: { remember: false },
  });

  return (
    <div className="sm:mt-10 md:mt-36 p-8 flex items-center justify-center">
      <div className="relative rounded p-5 bg-white h-102 p-10 sm:w-full md:w-2/3 lg:w-1/2 2xl:w-1/4">
        <h2 className="text-blue-600 text-2xl font-bold mb-5">
          {isLoginForm ? "LOG IN" : "SIGN UP"}
        </h2>
        <form onSubmit={handleSubmit(formHandler)}>
          <AuthFormField name="E-MAIL" register={register("email")} />
          <p className="text-red-700 mt-1">{errors.email?.message}</p>
          <AuthFormField name="PASSWORD" register={register("password")} />
          {isLoginForm && (
            <label className="text-gray-500">
              <input
                type="checkbox"
                {...register("remember")}
                className="mr-2"
              />
              Remember Me
            </label>
          )}
          <button
            type="submit"
            className="block mt-8 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full"
          >
            {isLoginForm ? "LOG IN" : "SIGN UP"}
          </button>
        </form>

        <button
          className="block mt-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full"
          onClick={githubHandler}
        >
          {isLoginForm ? "LOG IN WITH GITHUB" : "SIGN UP WITH GITHUB"}
          <FiGithub className="inline ml-1" />
        </button>
        <div className="text-center mt-5">
          <Link
            className="text-gray-600  whitespace-nowrap"
            to={isLoginForm ? "/register" : "/login"}
          >
            <p>
              {isLoginForm
                ? "New User? Click here"
                : "Already signed up? Click here"}
            </p>
          </Link>

          <Link
            className="text-gray-600 whitespace-nowrap"
            to={"/forgot-password"}
          >
            <p> Forgot Your Password? Click here</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
