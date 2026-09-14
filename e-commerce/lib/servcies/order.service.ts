import { getMyToken } from "@/utilities/getMyToken";

export async function getUserOrders(id) {
  const token = await getMyToken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`, {
    method: "GET",
    headers: { token ,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to fetch cart");

  return data;
}

import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");

if (token) {
  const decoded: any = jwtDecode(token);
  console.log(decoded);
}
