import React, { useEffect, useState } from "react";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { deleteToCart } from "../features/cart/cartSlice";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [user, setUser] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser(user);
      } else {
        setUser();
      }
    });
  }, []);

  const cartElements =
    cart.length != 0
      ? cart.map((item) => {
          return (
            <div
              key={item.id}
              className="border-b-2 flex items-center justify-evenly py-5"
            >
              <Image src={item.image} height={60} width={60} onBlur />
              <div className="font-bold">
                <h1>{item.title.slice(0, 30) + "..."}</h1>
                <h2>
                  ${item.price} x {item.quantity}
                </h2>
                <h2 className="text-green-600 text-lg">
                  ${item.price * item.quantity}
                </h2>
              </div>
              <DeleteRoundedIcon
                onClick={() => dispatch(deleteToCart({ id: item.id }))}
                className="cursor-pointer hover:text-red-500 transition duration-500"
              />
            </div>
          );
        })
      : "Your Cart is Empty";

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser();
        setUserModal(false);
        deleteCookie("token", {
          path: "/",
          domain: "localhost",
        });
        router.push("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <nav className="bg-[#86C8BC]">
      <div className="flex p-3 items-center  justify-between lg:w-5/6 lg:mx-auto lg:py-3 lg:px-0">
        <Link href={"/"}>
          <h1 className="text-white  md:text-lg cursor-pointer">
            <StorefrontRoundedIcon fontSize="large" />
          </h1>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="md:relative ">
            <div className="relative">
              {cart.length > 0 && user && (
                <span
                  onClick={() => setCartOpen((value) => !value)}
                  className="bg-orange-500 cursor-pointer text-white rounded-full font-bold absolute h-5 w-5 flex justify-center items-center bottom-3 left-3"
                >
                  {cart.length}
                </span>
              )}
              <ShoppingCartRoundedIcon
                onClick={() => setCartOpen((value) => !value)}
                sx={{ color: "white", cursor: "pointer" }}
              />
            </div>
            <div
              className={` ${
                !cartOpen && "hidden"
              } absolute z-10 rounded-sm shadow-md bg-white w-full top-16 md:w-96 right-0 md:top-11 max-h-96 overflow-auto`}
            >
              <h1 className="p-3 border-b-2">Cart</h1>
              {user ? (
                <p className="p-3 text-center text-gray-600">{cartElements}</p>
              ) : (
                <p className="p-3 text-center text-gray-600">
                  You need to Sign in
                </p>
              )}
            </div>
          </div>
          {user ? (
            <div className="relative">
              <img
                src={
                  user.photoURL
                    ? user.photoURL
                    : "https://media.istockphoto.com/id/1433039224/photo/blue-user-3d-icon-person-profile-concept-isolated-on-white-background-with-social-member.jpg?s=612x612&w=0&k=20&c=nrJ6RZ8Ft4vHECnRjBGBK_9XJ7f_lsi3dJjj_uAlkT8="
                }
                className="w-8 rounded-full cursor-pointer"
                alt="user-profile"
                onClick={() => setUserModal((prevValue) => !prevValue)}
              />
              <div
                className={` ${
                  userModal ? "block" : "hidden"
                } absolute z-10 w-40 bg-white right-0 top-9 rounded`}
              >
                <button
                  onClick={signOutUser}
                  className="text-center w-full text-gray-600 p-1 shadow-md rounded-sm"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <Link href={"/login"}>
              <div className="md:hidden">
                <AccountCircleRoundedIcon
                  sx={{ color: "white", cursor: "pointer" }}
                />
              </div>
              <h2 className="hidden md:block font-serif text-white hover:opacity-50 transition cursor-pointer  ">
                Login
              </h2>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
