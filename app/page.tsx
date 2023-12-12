import React from "react";

import { Product, FooterBanner, HeroBanner } from "./components";
import { client } from "@/sanity/lib/client";
import { Product as ProductType } from "@/types/product";
import { Banner } from "@/types/banner";

interface HomeProps {
  products: ProductType[];
  bannerData: Banner[];
}

const Home = async () => {
  const { products, bannerData }: HomeProps = await getData();

  return (
    <>
      <HeroBanner heroBanner={bannerData.length ? bannerData[0] : undefined} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      {bannerData.length && <FooterBanner footerBanner={bannerData[0]} />}
    </>
  );
};

// Note: The getServerSideProps function is not compatible with app router.
// Instead of using getServerSideProps for data fetching, Next.js recommends the following pattern:

async function getData() {
  const productQuery = `*[_type == "product"]`;
  const products = await client.fetch(productQuery);

  const bannerQuery = `*[_type == "banner"]`;
  const bannerData = await client.fetch(bannerQuery);

  return {
    products,
    bannerData,
  };
}

export default Home;
