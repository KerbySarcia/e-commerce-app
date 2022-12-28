import React from "react";
import Image from "next/image";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Link from "next/link";

const Categories = () => {
  return (
    <div className="h-fit">
      <div className="bg-[#FFD4B2] text-white flex items-center">
        <h1 className="text-center md:text-left uppercase font-bold p-5 ">
          Categories
        </h1>
        <LocalMallIcon />
      </div>

      <div className="grid grid-rows-2 grid-flow-col">
        <Link href="/category?q=jewelery">
          <div className="h-48 md:h-72 relative cursor-pointer group">
            <Image
              src={
                "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              }
              priority
              fill
              className="object-cover"
            />
            <div className="h-full bg-black absolute w-full opacity-20 group-hover:opacity-50 duration-500"></div>
            <h1 className="absolute w-full text-center top-[46%] text-2xl uppercase font-bold text-white ">
              Jewelry
            </h1>
          </div>
        </Link>
        <Link href={"/category?q=electronics"}>
          <div className="h-48 md:h-72 relative cursor-pointer group">
            <Image
              src={
                "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              }
              priority
              fill
              className="object-cover"
            />
            <div className="h-full bg-black absolute w-full opacity-20 group-hover:opacity-50 duration-500"></div>
            <h1 className="absolute w-full text-center top-[46%] text-2xl uppercase font-bold text-white ">
              Electronics
            </h1>
          </div>
        </Link>
        <Link href={"/category?q=men's clothing"}>
          <div className="h-48 md:h-72 relative cursor-pointer group">
            <Image
              src={
                "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWVucyUyMGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
              }
              priority
              fill
              className="object-cover"
            />
            <div className="h-full bg-black absolute w-full opacity-20 group-hover:opacity-50 duration-500"></div>
            <h1 className="absolute w-full text-center top-[46%] text-2xl uppercase font-bold text-white ">
              Men's Clothing
            </h1>
          </div>
        </Link>
        <Link href={"/category?q=women's clothing"}>
          <div className="h-48 md:h-72 relative cursor-pointer group">
            <Image
              src={
                "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fFdvbWVuJ3MlMjBDbG90aGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
              }
              priority
              fill
              className="object-cover"
            />
            <div className="h-full bg-black absolute w-full opacity-20 group-hover:opacity-50 duration-500"></div>
            <h1 className="absolute w-full text-center top-[46%] text-2xl uppercase font-bold text-white ">
              Women's Clothing
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
