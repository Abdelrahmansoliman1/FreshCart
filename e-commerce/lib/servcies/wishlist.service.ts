import { getMyToken } from "@/utilities/getMyToken";
import toast from "react-hot-toast";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";



export async function addProductToWishlist(productId: string) {
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
    toast.success('product added to Wishlist');
    
  }

  return data;
}



export async function getLoggedWishlist() {
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



export async function  removeProductFromWishlist(productId: string) {
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
