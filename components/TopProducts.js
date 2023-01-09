import React from "react";
import Image from "next/image";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Link from "next/link";

const TopProducts = ({ products }) => {
  const rightSlide = (e) => {
    const slider = e.target.parentElement;
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const leftSlide = (e) => {
    const slider = e.target.parentElement;
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const textFormat = (title, text) => {
    if (title === "title") {
      return text.slice(0, 10) + "...";
    } else {
      return text.slice(0, 50) + "...";
    }
  };

  const elementProducts = products.map((product, key) => {
    return (
      <Link href={`/product?id=${product.id}`} key={key}>
        <div className="w-48 mt-5  mr-1 cursor-pointer hover:opacity-50 duration-500">
          <div className="w-40 h-40 relative ">
            <Image
              fill
              className="object-contain"
              src={product.image}
              alt={product.title}
              priority
              sizes="width:160px, height:160px"
            />
          </div>
          <div className="text-center">
            <h1 className="font-bold text-[#FD8A8A]">
              {textFormat("title", product.title)}
            </h1>
            <h2 className="text-xs">
              {textFormat("description", product.description)}
            </h2>
            <h2 className="text-green-800 font-bold">${product.price}</h2>
            <button></button>
          </div>
        </div>
      </Link>
    );
  });
  return (
    <div className="relative group">
      <div className="p-5 uppercase font-bold text-white bg-[#FD8A8A] flex items-center space-x-4">
        <h1 className="">Top Products For You</h1>
        <WhatshotRoundedIcon />
      </div>
      <div className="flex space-x-5 h-fit items-center overflow-x-hidden scroll-smooth bg-white">
        {elementProducts}

        <ChevronLeftRoundedIcon
          onClick={(e) => leftSlide(e)}
          className="absolute top-1/2 left-0 cursor-pointer bg-white rounded-3xl"
          fontSize="large"
        />

        <ChevronRightRoundedIcon
          onClick={(e) => rightSlide(e)}
          className="absolute top-1/2 right-0 bg-white cursor-pointer rounded-3xl"
          fontSize="large"
        />
      </div>
    </div>
  );
};

export default TopProducts;
