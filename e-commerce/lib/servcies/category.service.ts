import { ICategory } from './../interfaces/category';
import { IResponse } from '../interfaces/general';
import { getMyToken } from '@/utilities/getMyToken';
export async function getAllCategories(){

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');

  if(!response.ok){
    console.log('"error');
  }
  else{
   const data: IResponse<ICategory> = await response.json();
  return data;
  }
}

export async function getSpecificCategory(id: string){

 const token = await getMyToken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, {
    method: "GET",
    headers: { token ,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to fetch cart");

  return data;
}