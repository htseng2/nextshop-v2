"use client";

import React, { use, useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/StateContext";
import { CartItem } from "@/types/cartItem";
import Link from "next/link";
import { runFireworks } from "@/sanity/lib/utils";

interface StateContext {
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setTotalQuantities: React.Dispatch<React.SetStateAction<number>>;
}

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } =
    useStateContext() as StateContext;

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email{" "}
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
          <Link href="/">
            <button type="button" className="btn">
              Continue Shopping
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Success;
