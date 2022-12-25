import React from "react";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const Navbar = () => {
  return (
    <nav className="bg-[#86C8BC]">
      <div className="flex p-3 items-center  justify-between lg:w-5/6 lg:mx-auto lg:py-3 lg:px-0">
        <h1 className="text-white  md:text-lg cursor-pointer">
          Sarcia's Store
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-white rounded-sm p-1">
            <SearchRoundedIcon sx={{ color: "#86C8BC", cursor: "pointer" }} />
            <input type="text" className="outline-none ml-1" />
          </div>
          <div className="">
            <ShoppingCartRoundedIcon
              sx={{ color: "white", cursor: "pointer" }}
            />
          </div>
          <div className="md:hidden">
            <AccountCircleRoundedIcon
              sx={{ color: "white", cursor: "pointer" }}
            />
          </div>
          <h2 className="hidden md:block font-serif text-white hover:opacity-50 transition cursor-pointer  ">
            Login
          </h2>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
