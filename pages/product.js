import React from "react";
import Image from "next/image";
import { useState } from "react";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

export async function getServerSideProps(context) {
  const query = context.query;
  const response = await fetch(`https://fakestoreapi.com/products/${query.id}`);
  const data = await response.json();

  return { props: { data } };
}
export default function product({ data }) {
  const [number, setNumber] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();
  const cookie = hasCookie("token");

  const add = () => {
    setNumber(number + 1);
  };

  const minus = () => {
    if (number != 1) setNumber(number - 1);
  };

  return (
    <div className="h-fit lg:h-screen lg:w-5/6 lg:mx-auto bg-white lg:flex justify-center">
      <div className="lg:w-11/12 lg:h-full p-5 space-y-4 lg:flex items-center justify-between">
        <div className=" relative w-full lg:w-9/12 lg:h-96 h-72  ">
          <Image priority src={data.image} fill className="object-contain" />
        </div>
        <div className="space-y-4 lg:max-w-xl lg:ml-6">
          <h1 className="font-bold text-lg text-[#FD8A8A] lg:text-3xl">
            {data.title}
          </h1>
          <h1 className="text-3xl text-green-600 font-bold">${data.price}</h1>
          <p>{data.description}</p>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-orange-500 uppercase">
              rating {data.rating.rate}K
            </h2>
            <h2 className="font-bold text-yellow-400 uppercase">
              {data.rating.count}K Sold
            </h2>
          </div>
          <div className="space-y-1">
            <h1 className="text-gray-600">Quantity</h1>
            <div className="flex items-center justify-between border-2 h-10">
              <AddRoundedIcon
                className="cursor-pointer border-r-2 h-full w-8 text-gray-800"
                onClick={() => add()}
              />
              <h1>{number}</h1>
              <RemoveRoundedIcon
                className="cursor-pointer text-gray-800 border-l-2 h-full w-8"
                onClick={() => minus()}
              />
            </div>
          </div>

          <button
            onClick={() => {
              if (cookie) {
                dispatch(addToCart({ quantity: number, ...data }));
                setNumber(1);
              } else {
                router.push(`/login?id=${data.id}`);
              }
            }}
            className="bg-[#9EA1D4] w-full rounded flex items-center p-3 justify-center space-x-2 uppercase font-bold hover:opacity-25 duration-500"
          >
            <h1 className="text-white">Add to cart </h1>
            <ShoppingCartRoundedIcon className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
