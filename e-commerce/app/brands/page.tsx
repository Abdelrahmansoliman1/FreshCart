import React from 'react'
import { IResponse } from "@/lib/interfaces/general";
import BrandCard from '../_Components/BrandCard/page';
import { Brand } from '@/lib/interfaces/product';
import { getAllBrands } from '@/lib/servcies/brands.service';

export default async function Brands() {
   const res: IResponse<Brand> = await getAllBrands();
    const data: Brand[] = res.data;
  return (
    <section className='flex flex-wrap  '>
      {data.map((brand)=>(
     <div className='lg:w-1/3 md:w-1/2 sm:w-1/2 p-3' key={brand._id}>
           <BrandCard brand={brand} key={brand._id}/>
          </div>

      ))}
    </section>
  )
}
