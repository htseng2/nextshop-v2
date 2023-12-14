"use client";

import { CartItem } from "@/types/cartItem";
import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const Context = createContext({});

export const StateContext = ({ children }: { children: React.ReactNode }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const [qty, setQty] = useState(1);

  let foundProduct: CartItem | undefined;
  let index: number;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCartItems = localStorage.getItem("cartItems");
      const storedTotalPrice = localStorage.getItem("totalPrice");
      const storedTotalQuantities = localStorage.getItem("totalQuantities");

      if (storedCartItems && storedCartItems !== "undefined") {
        setCartItems(JSON.parse(storedCartItems));
      }
      if (storedTotalPrice && storedTotalPrice !== "undefined") {
        setTotalPrice(JSON.parse(storedTotalPrice));
      }
      if (storedTotalQuantities && storedTotalQuantities !== "undefined") {
        setTotalQuantities(JSON.parse(storedTotalQuantities));
      }

      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    isHydrated && localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    isHydrated &&
      localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  }, [totalPrice]);

  useEffect(() => {
    isHydrated &&
      localStorage.setItem("totalQuantities", JSON.stringify(totalQuantities));
  }, [totalQuantities]);

  const onAdd = (product: CartItem, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice: number) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities(
      (prevTotalQuantities: number) => prevTotalQuantities + quantity
    );
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return { ...cartProduct, quantity: cartProduct.quantity + quantity };
        return cartProduct;
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart`);
  };

  const onRemove = (product: CartItem) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    index = cartItems.findIndex((item) => item._id === product._id);
    if (foundProduct) {
      setTotalPrice(
        (prevTotalPrice: number) =>
          prevTotalPrice - foundProduct!.price * foundProduct!.quantity
      );
      setTotalQuantities(
        (prevTotalQuantities: number) =>
          prevTotalQuantities - foundProduct!.quantity
      );
      setCartItems(
        cartItems.filter((cartProduct) => cartProduct._id !== product._id)
      );
    }
  };

  const toggleCartItemQuantity = (id: string, value: string) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((item) => item._id === id);

    if (value === "inc" && foundProduct) {
      setCartItems(
        cartItems.map((item) => {
          if (item._id === id) {
            item.quantity += 1;
          }
          return item;
        })
      );
      setTotalPrice(
        (prevTotalPrice: number) => prevTotalPrice + foundProduct!.price
      );
      setTotalQuantities(
        (prevTotalQuantities: number) => prevTotalQuantities + 1
      );
    } else if (value === "dec" && foundProduct) {
      if (foundProduct.quantity > 1) {
        setCartItems(
          cartItems.map((item) => {
            if (item._id === id) {
              item.quantity -= 1;
            }
            return item;
          })
        );
        setTotalPrice(
          (prevTotalPrice: number) => prevTotalPrice - foundProduct!.price
        );
        setTotalQuantities(
          (prevTotalQuantities: number) => prevTotalQuantities - 1
        );
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
