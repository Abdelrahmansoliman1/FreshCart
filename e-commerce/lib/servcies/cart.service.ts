import { getMyToken } from "@/utilities/getMyToken";
import toast from "react-hot-toast";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/cart";


/* ===============================
   ADD PRODUCT TO CART
================================*/
export async function addProductToCart(productId: string) {
  const token = await getMyToken();

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token, // keep this because Route API uses token header
    },
    body: JSON.stringify({ productId }),
  });

  const data = await res.json();

  if (!res.ok){
      throw new Error(data.message || "Failed to add");
  } else{
    toast.success('product added to cart');
    
  }

  return data;
}


/* ===============================
   GET LOGGED CART
================================*/
export async function getLoggedCart() {
  const token = await getMyToken();

  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: { token ,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to fetch cart");

  return data;
}


/* ===============================
   UPDATE ITEM COUNT
================================*/
export async function updateCartItem(productId: string, count: number) {
  const token = await getMyToken();

  const res = await fetch(`${BASE_URL}/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ count }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}


/* ===============================
   REMOVE ITEM
================================*/
export async function deleteSpecificItem(productId: string) {
  const token = await getMyToken();

  const res = await fetch(`${BASE_URL}/${productId}`, {
    method: "DELETE",
    headers: { token ,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}
