import React from "react";
import Image from "next/image";
import Slide from "../components/Slide";
import Link from "next/link";

export async function getServerSideProps(context) {
  const query = context.query;
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${query.q}`
  );
  const data = await response.json();
  return {
    props: { data, query }, // will be passed to the page component as props
  };
}

export default function category({ data, query }) {
  const textFormat = (title, text) => {
    if (title === "title") {
      return text.slice(0, 20) + "...";
    } else {
      return text.slice(0, 80) + "...";
    }
  };

  const itemElements = data.map((item, key) => {
    return (
      <Link key={key} href={`/product?id=${item.id}`}>
        <div className="text-left max-w-xs shadow-md rounded p-4 bg-white cursor-pointer hover:opacity-40 duration-500">
          <div className="relative h-36 w-36 mx-auto">
            <Image
              priority
              src={item.image}
              alt={item.title}
              fill
              className="object-contain"
              sizes="width:144px, height:144px"
            />
          </div>
          <div className="space-y-3">
            <h1 className="font-bold text-[#FD8A8A]">
              {textFormat("title", item.title)}
            </h1>
            <p>{textFormat("description", item.description)}</p>
            <h2 className="text-green-600 font-bold">${item.price}</h2>
            <div className="flex items-center justify-between">
              <h2 className="uppercase text-orange-500">
                rate {item.rating.rate}
              </h2>
              <h2 className="uppercase text-yellow-600 font-bold">
                {item.rating.count}K sold
              </h2>
            </div>
          </div>
        </div>
      </Link>
    );
  });
  return (
    <div className="lg:w-5/6 lg:mx-auto h-fit ">
      <Slide />
      <h1 className=" bg-[#FD8A8A] uppercase text-2xl font-bold text-center lg:text-left text-white p-5">
        {query.q}
      </h1>
      <div className="flex flex-wrap justify-center gap-5 py-5">
        {itemElements}
      </div>
    </div>
  );
}
