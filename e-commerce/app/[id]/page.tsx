import { IProduct } from '@/lib/interfaces/product';
import { getProductDetails } from '@/lib/servcies/product.service';
import React from 'react'
import { Star } from 'lucide-react';
import DetailsSlider from './Details-Slider';
import AddToCartBtn from '../_Components/layout/Home/ProductCard/AddToCartBtn';

export default async function ProductDetails({params}: {params:Promise<{id: string}>}) {
    let {id}:{id : string} = await params;

  const {data}:{data: IProduct} = await  getProductDetails(id);
  return (
    <main className='flex flex-wrap p-10 items-center'>
     <div className="w-1/4 ">
     <DetailsSlider images={data.images}/>
    
     
     </div>
     <div className="w-2/4 ps-10 ">
      <h1 className='text-2xl font-bold'>{data.title}</h1>
      <p className="my-4">{data.description}</p>
      <p className="my-4 text-green-500">{data.category.name}</p>
       <div className='flex justify-between pb-3'>
            <p>{data.price} EGP</p>
            <p className='flex'><Star className='text-amber-300 fill-amber-300'/> {data.ratingsAverage}</p>
        </div>
        <div className=' pt-3 w-full '><AddToCartBtn/></div>
      </div>

  </main>
  )
}
