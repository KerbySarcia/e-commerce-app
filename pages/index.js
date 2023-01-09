import Head from "next/head";
import { useState } from "react";
import Categories from "../components/Categories";
import Slide from "../components/Slide";
import TopProducts from "../components/TopProducts";
import { auth } from "../firebase";

export async function getStaticProps(context) {
  const response = await fetch("https://fakestoreapi.com/products?limit=10");
  const data = await response.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Sarcia's Store</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <div className="lg:w-5/6 lg:mx-auto">
          <Slide />
          <TopProducts products={data} />
          <Categories />
        </div>
      </main>
    </>
  );
}
