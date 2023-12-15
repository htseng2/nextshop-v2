"use client";

import React from "react";
import { useStateContext } from "../context/StateContext";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";

interface ProductActionButtonsProps {
  product: Product;
}

interface StateContext {
  qty: number;
  onAdd: (product: Product, qty: number) => void;
}

const ProductActionButtons = ({ product }: ProductActionButtonsProps) => {
  const { qty, onAdd } = useStateContext() as StateContext;
  const router = useRouter();

  const handleBuyNow = () => {
    onAdd(product, qty);
    router.push("/cart");
  };
  return (
    <div className="buttons">
      <button
        type="button"
        className="add-to-cart"
        onClick={() => onAdd(product, qty)}
      >
        Add to Cart
      </button>
      <button type="button" className="buy-now" onClick={handleBuyNow}>
        Buy Now
      </button>
    </div>
  );
};

export default ProductActionButtons;
