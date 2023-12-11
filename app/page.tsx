import React from "react";

import { Product, FooterBanner, HeroBanner } from "./components";
import { client } from "@/sanity/lib/client";
import { Product as ProductType } from "@/types/product";
import { Banner } from "@/types/banner";

interface HomeProps {
  products: ProductType[];
  bannerData: Banner;
}

const Home = async () => {
  const { products, bannerData }: HomeProps = await getData();

  return (
    <>
      <HeroBanner />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => product.name)}
      </div>
      <FooterBanner />
    </>
  );
};

//getServerSideProps not support at app/page level
async function getData() {
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);

  const bannerQuery = `*[_type == "banner"]`;
  const bannerData = await client.fetch(bannerQuery);

  return {
    products,
    bannerData,
  };
}

export default Home;
