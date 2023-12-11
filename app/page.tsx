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

// The getServerSideProps function is not supported at the app/page level.
// Additionally, the sanity client also renders at the server side.

async function getData() {
  const productQuery = `*[_type == "product"]`;
  const products = await client.fetch(
    productQuery,
    {},
    { next: { revalidate: 3600 } }
  );

  const bannerQuery = `*[_type == "banner"]`;
  const bannerData = await client.fetch(
    bannerQuery,
    {},
    { next: { revalidate: 3600 } }
  );

  return {
    products,
    bannerData,
  };
}

export default Home;
