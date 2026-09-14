import { getAllProducts } from '@/lib/servcies/product.service'
import { IProduct } from "@/lib/interfaces/product";
import { IResponse } from '@/lib/interfaces/general';
import React from 'react'
import ProductCard from '../ProductCard/ProductCard';
import Link from 'next/link';
export default async function TrendingProducts() {
 // const { data }:{data.IProduct[]}= await getAllProducts();
    const res: IResponse<IProduct> = await getAllProducts() ;
    const data: IProduct[] = res.data;
  return (

    <section className='flex flex-wrap'>
      
      {data.map((product)=>
      <div className='lg:w-1/4 md:w-1/3 sm:w-1/2 p-3' key={product._id}>
            <ProductCard product={product}/>
      </div>
    )}  
    </section>
   
  )
}
