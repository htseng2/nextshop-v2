"use client";

import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from ".";
import { useStateContext } from "../context/StateContext";

interface StateContext {
  showCart: boolean;
  totalQuantities: number;
}

const Navbar = () => {
  const { showCart, totalQuantities } = useStateContext() as StateContext;

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Nextshop</Link>
      </p>
      <Link href="/cart">
        <button type="button" className="cart-icon">
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
      </Link>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
