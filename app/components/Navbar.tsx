"use client";

import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from ".";
import { useStateContext } from "../context/StateContext";

interface StateContext {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  totalQuantities: number;
}

const Navbar = () => {
  const { setShowCart, showCart, totalQuantities } =
    useStateContext() as StateContext;
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Nextshop</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
