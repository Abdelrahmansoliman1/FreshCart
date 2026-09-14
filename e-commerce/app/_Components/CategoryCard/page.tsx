import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from 'next/image'
import { ICategory } from '@/lib/interfaces/category'
import Link from 'next/link'
export default function CategoryCard({category}:{category:ICategory}) {
  return (
     <Link href={`/categories/${category._id}`}>

        <Card key={category._id} className=" group relative overflow-hidden m-10 w-full max-w-sm pt-0 hover:shadow-md transition ">
       <div className="absolute inset-0 z-30 aspect-video " />
      <Image
        src={category.image}
        alt={category.name}
        width={100} height={100}
        className="relative z-20 aspect-video w-full object-cover transition duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-75 "
      />
      <CardHeader>
       
        <CardTitle>{category.name}</CardTitle>
      </CardHeader>
      
    </Card>
    </Link>
    
    
  )
}
