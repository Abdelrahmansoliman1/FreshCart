import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from 'next/image'
import Link from 'next/link'
import { Brand } from '@/lib/interfaces/product'
export default function brandCard({brand}:{brand:Brand}) {
  return (
     <Link href={`/brands/${brand._id}`}>

        <Card key={brand._id} className=" group relative overflow-hidden m-10 w-full max-w-sm pt-0 hover:shadow-md transition ">
       <div className="absolute inset-0 z-30 aspect-video " />
      <Image
        src={brand.image}
        alt={brand.name}
        width={100} height={100}
        className="relative z-20 aspect-video w-full object-cover transition duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-75 "
      />
      <CardHeader>
       
        <CardTitle>{brand.name}</CardTitle>
      </CardHeader>
      
    </Card>
    </Link>
    
    
  )
}

