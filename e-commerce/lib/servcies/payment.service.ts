import { getMyToken } from "@/utilities/getMyToken"

export async function cashPayment(cartId, form){

 const token =  await getMyToken()
 const data = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
    method: "POST",
    headers: {
        'content-type': "application/json",
        token,
    },
    body:JSON.stringify({shippingAddress: form})
});
const response = await data.json();
return response;
}

export async function onlinePayment(cartId , form){
    
  const token =  await getMyToken()
 const data = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
    method: "POST",
    headers: {
        'content-type': "application/json",
        token,
    },
    body:JSON.stringify({shippingAddress: form})
});
const response = await data.json();
return response;
}