import { ImageMagnifier, Product } from "@/app/components";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { Product as ProductType } from "@/types/product";
import React from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

interface ProductDetailsProps {
  product: ProductType;
  products: ProductType[];
}

interface ProductDetailsParams {
  params: {
    slug: string;
  };
}

const ProductDetails = async ({ params: { slug } }: ProductDetailsParams) => {
  const { product, products }: ProductDetailsProps = await getData(slug);
  const { image, name, details, price } = product;

  let index = 0;

  return (
    <div>
      <div className="product-detail-container">
        <ImageMagnifier image={image} />
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick="">
                <AiOutlineMinus />
              </span>
              <span className="num" onClick="">
                0
              </span>
              <span className="plus" onClick="">
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick="">
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick="">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const productQuery = `*[_type == "product"]`;

  const product = await client.fetch(query);
  const products = await client.fetch(productQuery);

  return {
    product,
    products,
  };
}

export default ProductDetails;
