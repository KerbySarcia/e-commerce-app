import React from "react";
import Image from "next/image";
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
  const textFormat = (size, text) => {
    if (size < 20) {
      return text.slice(0, 30) + "...";
    } else {
      return text.slice(0, 50) + "...";
    }
  };

  const itemElements = data.map((item) => {
    return (
      <div className="text-left max-w-xs shadow-md rounded p-4 bg-white cursor-pointer hover:opacity-40 duration-500">
        <div className="relative h-36 w-36 mx-auto">
          <Image priority src={item.image} fill className="object-contain" />
        </div>
        <div className="space-y-3">
          <h1 className="font-bold text-[#FD8A8A]">
            {textFormat(10, item.title)}
          </h1>
          <p>{textFormat(60, item.description)}</p>
          <h2 className="text-green-600">${item.price}</h2>
          <div className="flex items-center justify-between">
            <h2 className="uppercase text-orange-500">
              rate {item.rating.rate}
            </h2>
            <h2 className="uppercase text-yellow-600">
              {item.rating.count} sold
            </h2>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="lg:w-5/6 lg:mx-auto h-fit ">
      <h1 className="uppercase text-2xl font-bold text-center text-[#FD8A8A]">
        {query.q}
      </h1>
      <div className="flex flex-wrap justify-center gap-4 p-5">
        {itemElements}
      </div>
    </div>
  );
}
