import React from "react";
import Image from "next/image";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
const TopProducts = ({ products }) => {
  const rightSlide = (e) => {
    const slider = e.target.parentElement;
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const leftSlide = (e) => {
    const slider = e.target.parentElement;
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const textFormat = (size, text) => {
    if (size < 20) {
      return text.slice(0, 10) + "...";
    } else {
      return text.slice(0, 50) + "...";
    }
  };

  const elementProducts = products.map((product) => {
    return (
      <div className="w-48 mt-5  mr-1 cursor-pointer hover:opacity-50 duration-500">
        <div className="w-48 h-48 relative ">
          <Image
            fill
            className="object-contain"
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="text-center">
          <h1 className="font-bold text-[#FD8A8A]">
            {textFormat(10, product.title)}
          </h1>
          <h2 className="text-xs">
            {textFormat(product.description.length, product.description)}
          </h2>
          <h2 className="text-green-800 font-bold">${product.price}</h2>
          <button></button>
        </div>
      </div>
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
