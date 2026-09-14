import { IResponse } from '../interfaces/general';
import { getMyToken } from '@/utilities/getMyToken';
import { Brand } from '../interfaces/product';
export async function getAllBrands(){

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands');

  if(!response.ok){
    console.log('"error');
  }
  else{
   const data: IResponse<Brand> = await response.json();
  return data;
  }
}

export async function getSpecificBrand(id: string){

 const token = await getMyToken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`, {
    method: "GET",
    headers: { token ,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to fetch cart");

  return data;
}