import React from 'react'
import { ICategory } from '@/lib/interfaces/category';
import { IResponse } from "@/lib/interfaces/general";
import { getAllCategories } from '@/lib/servcies/category.service';
import CategoryCard from '../_Components/CategoryCard/page';

export default async function Categories() {
   const res: IResponse<ICategory> = await getAllCategories();
    const data: ICategory[] = res.data;
  return (
    <section className='flex flex-wrap  '>
      {data.map((category)=>(
      
     <div className='lg:w-1/3 md:w-1/2 sm:w-1/2 p-3' key={category._id}>
      <CategoryCard category={category} key={category._id}/>
     </div>

      ))}
    </section>
  )
}
