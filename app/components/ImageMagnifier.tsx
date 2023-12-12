"use client";

import { urlForImage } from "@/sanity/lib/image";
import React, { useState } from "react";
import { Image } from "sanity";

interface ImageMagnifierProps {
  image: Image[];
}

const ImageMagnifier = ({ image }: ImageMagnifierProps) => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="image-container">
        <img
          src={urlForImage(image && image[index])}
          className="product-detail-image"
        />
      </div>
      <div className="small-images-container">
        {image?.map((item, i) => (
          <img
            key={i}
            src={urlForImage(item)}
            className={
              i === index ? "small-image selected-image" : "small-image"
            }
            onMouseEnter={() => {
              setIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageMagnifier;
