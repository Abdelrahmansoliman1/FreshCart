import { IProduct } from "../interfaces/product";
import { IResponse } from "../interfaces/general";
export async function getAllProducts(){

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products');

  if(!response.ok){
    console.log('"error');
  }
  else{
   const data: IResponse<IProduct> = await response.json();
  return data;
  }
}

export async function getProductDetails(id: string){

 const data = fetch('https://ecommerce.routemisr.com/api/v1/products/'+id)
const response :{data: IProduct} = await (await data).json()
console.log(response);
return response;

}

export async function getProductsByCategory(
  categoryId: string
): Promise<IResponse<IProduct>> {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
  );

  const data: IResponse<IProduct> = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch products");
  }

  return data;
}

export async function getProductsByBrand(
  brandId: string
): Promise<IResponse<IProduct>> {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand[in]=${brandId}`
  );

  const data: IResponse<IProduct> = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch products");
  }

  return data;
}