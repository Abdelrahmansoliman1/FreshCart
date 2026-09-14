import { IProduct } from '@/lib/interfaces/product'
import Image from 'next/image'
import { Star } from 'lucide-react'
import Link from 'next/link'
import AddToCartBtn from './AddToCartBtn'
import WishlistBtn from './WishlistBtn'
export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <div className='border rounded-lg p-3 hover:shadow-md transition'>

      <Link href={`/${product._id}`}>

       <div className="relative w-full">

          <WishlistBtn product={product} />

            <Image
          src={product.imageCover}
          alt={product.title}
          width={250}
          height={200}
          className='w-full object-cover'
        />

        

        </div>

      
        <p className='text-green-500 text-sm mt-2'>
          {product.category.name}
        </p>

        <p className='font-bold pb-1 line-clamp-2'>
          {product.title}
        </p>

        <div className='flex justify-between pb-2'>
          <p>{product.price} EGP</p>

          <p className='flex items-center gap-1'>
            <Star className='text-amber-300 fill-amber-300 w-4 h-4' />
            {product.ratingsAverage}
          </p>
        </div>

      </Link>

      <AddToCartBtn productId={product._id} />

    </div>
  )
}
