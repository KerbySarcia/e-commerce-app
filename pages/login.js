import React, { useState } from "react";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function login() {
  const [noFound, setNoFound] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setCookie("token", user.accessToken);
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        if (errorMessage.includes("user-not-found")) {
          setNoFound(true);
        } else if (errorMessage.includes("wrong-password")) {
          setWrongPassword(true);
        }
      });
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full h-fit p-5 bg-white  flex flex-col justify-center items-center space-y-5 max-w-lg sm:rounded-md">
        <ShoppingBagRoundedIcon className="text-5xl text-[#ADA2FF]" />
        <h1 className="text-3xl font-bold text-[#ADA2FF]">E-Commerce App</h1>
        <div className="flex items-center text-[#FF8787] font-bold">
          <p>Don't Play With Fire, Play With Ecommerce.</p>
          <LocalFireDepartmentRoundedIcon />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
          {noFound && (
            <p className="text-red-600 bg-pink-100 p-1 rounded w-fit">
              Account not Found
            </p>
          )}
          {errors?.email?.type === "required" && (
            <p className="text-red-500 bg-pink-100 p-1 rounded w-fit">
              Please input your email
            </p>
          )}
          <div className="w-full border-2 flex items-center">
            <MailOutlineRoundedIcon
              className={`border-r-2 h-full w-10 transition duration-500 text-[#6C00FF]`}
            />

            <input
              {...register("email", { required: true })}
              className=" w-full outline-none p-2"
              type="email"
              name="email"
            />
          </div>
          {wrongPassword && (
            <p className="text-red-600 bg-pink-100 p-1 rounded w-fit">
              Wrong password
            </p>
          )}
          {errors?.password?.type === "required" && (
            <p className="text-red-500 bg-pink-100 p-1 rounded w-fit">
              Please input your password
            </p>
          )}
          <div className="w-full border-2 flex items-center">
            <HttpsRoundedIcon
              className={`border-r-2 h-full w-10 transition duration-500 text-[#6C00FF]`}
            />

            <input
              {...register("password", { required: true })}
              className=" w-full outline-none p-2"
              type="password"
              name="password"
            />
          </div>
          <button
            type="submit"
            className="bg-[#6C00FF] border-2 border-[#6C00FF] hover:bg-white hover:text-[#6C00FF] duration-500 text-white w-full p-2 rounded"
          >
            Login
          </button>
        </form>
        <Link href={"/signup"} className="w-full">
          <button className="bg-[#6C00FF] border-2 border-[#6C00FF] hover:bg-white hover:text-[#6C00FF] duration-500 text-white w-full p-2 rounded">
            Sign Up
          </button>
        </Link>
        <button
          onClick={() => {
            signInWithPopup(auth, provider)
              .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                  GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
                setCookie("token", token);
                if (router.query.id) {
                  router.push(`/product?id=${router.query.id}`);
                } else {
                  router.push("/");
                }
              })
              .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                  GoogleAuthProvider.credentialFromError(error);
                // ...
              });
          }}
          className="bg-[#6C00FF] border-2 border-[#6C00FF] hover:bg-white hover:text-[#6C00FF] duration-500 text-white w-full p-2 rounded"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
