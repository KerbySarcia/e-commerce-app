import React from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
export default function signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        setCookie("token", user.accessToken);

        router.push("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <div className="h-screen bg-white flex justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full px-5 py-20 space-y-5 max-w-md"
      >
        <h1 className="text-xl text-center font-bold text-blue-900">
          Sign Up Form
        </h1>
        {errors?.email?.type === "required" && (
          <p className="text-red-600 bg-pink-100 p-1 rounded w-fit">
            Please input your email
          </p>
        )}
        <div className="flex flex-col">
          <label>Email</label>
          <input
            className="border-2 outline-blue-500 p-1"
            type="email"
            {...register("email", { required: true })}
          />
        </div>
        {errors?.password?.type === "required" && (
          <p className="text-red-600 bg-pink-100 p-1 rounded w-fit">
            Please input your password
          </p>
        )}
        {errors?.password?.type === "minLength" && (
          <p className="text-red-600 bg-pink-100 p-1 rounded w-fit">
            Your password is not that long
          </p>
        )}
        <div className="flex flex-col">
          <label>Password</label>
          <input
            className="border-2 outline-blue-500 p-1"
            type="password"
            {...register("password", { required: true, minLength: 10 })}
          />
        </div>
        <button
          className="bg-blue-800 rounded-full text-white font-bold py-1 hover:opacity-50 transition"
          type="submit"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
