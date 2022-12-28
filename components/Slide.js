import React, { useEffect, useState } from "react";
import banners from "../public/assets/banners";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import CircleIcon from "@mui/icons-material/Circle";
const Slide = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const slideTimer = setTimeout(() => {
      if (slideIndex === banners.length - 1) {
        setSlideIndex(0);
      } else {
        setSlideIndex((prevValue) => prevValue + 1);
      }
    }, 5000);
    return () => clearTimeout(slideTimer);
  }, [slideIndex]);

  const rightSlide = () => {
    if (slideIndex === banners.length - 1) setSlideIndex(0);
    else setSlideIndex(slideIndex + 1);
  };

  const leftSlide = () => {
    if (slideIndex === 0) setSlideIndex(banners.length - 1);
    else setSlideIndex(slideIndex - 1);
  };
  return (
    <div className="h-96 relative group">
      <div
        style={{ backgroundImage: `url(${banners[slideIndex].img})` }}
        className="h-full bg-center bg-contain duration-500"
      ></div>
      <ArrowCircleLeftRoundedIcon
        onClick={() => leftSlide()}
        fontSize="large"
        className="text-white hidden group-hover:block cursor-pointer absolute bottom-1/2 ml-1"
      />
      <ArrowCircleRightRoundedIcon
        onClick={() => rightSlide()}
        color="white"
        fontSize="large"
        className="text-white hidden group-hover:block cursor-pointer absolute bottom-1/2 right-0 mr-1"
      />
      <div className="absolute bottom-2 left-[39%] sm:left-[44%] lg:left-[47%] space-x-2">
        <CircleIcon
          onClick={() => setSlideIndex(0)}
          fontSize="small"
          className={`text-white cursor-pointer ${
            slideIndex + 1 === 1 ? "opacity-50" : "opacity-100"
          }`}
        />
        <CircleIcon
          onClick={() => setSlideIndex(1)}
          fontSize="small"
          className={`text-white cursor-pointer ${
            slideIndex + 1 === 2 ? "opacity-50" : "opacity-100"
          }`}
        />
        <CircleIcon
          onClick={() => setSlideIndex(2)}
          fontSize="small"
          className={`text-white cursor-pointer ${
            slideIndex + 1 === 3 ? "opacity-50" : "opacity-100"
          }`}
        />
      </div>
    </div>
  );
};

export default Slide;
