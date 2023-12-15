"use client";

import React from "react";
import { useStateContext } from "../context/StateContext";
import { Product } from "@/types/product";

interface ProductActionButtonsProps {
  product: Product;
}

interface StateContext {
  qty: number;
  onAdd: (product: Product, qty: number) => void;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductActionButtons = ({ product }: ProductActionButtonsProps) => {
  const { qty, onAdd, setShowCart } = useStateContext() as StateContext;

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
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
