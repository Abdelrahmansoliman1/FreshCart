'use client';

import React, { createContext, useEffect, useState } from "react";
import { getLoggedCart } from "@/lib/servcies/cart.service";


/* ================= TYPES ================= */
type CartContextType = {
  numOfCartItems: number;
  cartItems: any[];
  totalPrice: number;
  cartId: string | null;
  refreshCart: () => Promise<void>;
  setNumOfCartItems: React.Dispatch<React.SetStateAction<number>>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
  setCartId: React.Dispatch<React.SetStateAction<string | null>>; 
};


/* ================= CONTEXT ================= */
export const CartContext = createContext<CartContextType>({
  numOfCartItems: 0,
  cartItems: [],
  totalPrice: 0,
  cartId: null ,
  refreshCart: async () => {},
  setNumOfCartItems: () => {},
  setTotalPrice: ()=>{},
  setCartItems: ()=>{},
  setCartId: ()=>{},
});


/* ================= PROVIDER ================= */
export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const[cartId, setCartId] = useState<string | null>(null);
const refreshCart = async () => {
  try {
    const cartData = await getLoggedCart()

    if (cartData.status === "success") {
      const products = cartData.data.products

      setCartItems(products)
      setTotalPrice(cartData.data.totalCartPrice)
      setCartId(cartData?.cartId)
      const totalItems = products.reduce(
        (sum: number, item: any) => sum + item.count,
        0
      )

      setNumOfCartItems(totalItems)
    }
  } catch (err) {
    console.log(err)
  }
}



  /* fetch on load */
  useEffect(() => {
    refreshCart();
  }, []);


  return (
    <CartContext.Provider
      value={{
        numOfCartItems,
        cartItems,
        totalPrice,
        cartId,
        refreshCart ,
        setNumOfCartItems,
        setCartItems,
        setTotalPrice,
        setCartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
