"use client";

import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";

const QuantitySelector = () => {
  type StateContextType = {
    decQty: () => void;
    incQty: () => void;
    qty: number;
  };

  const { decQty, incQty, qty } = useStateContext() as StateContextType;
  return (
    <div className="quantity">
      <h3>Quantity:</h3>
      <p className="quantity-desc">
        <span className="minus" onClick={decQty}>
          <AiOutlineMinus />
        </span>
        <span className="num">{qty}</span>
        <span className="plus" onClick={incQty}>
          <AiOutlinePlus />
        </span>
      </p>
    </div>
  );
};

export default QuantitySelector;
