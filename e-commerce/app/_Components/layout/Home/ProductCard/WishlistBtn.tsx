'use client'

import { Heart } from 'lucide-react'
import { useContext } from 'react'
import { WishlistContext } from '@/context/WishlistContext'
import { IProduct } from '@/lib/interfaces/product'

export default function WishlistBtn({ product }: { product: IProduct }) {

  const { wishlistItems, toggleWishlist } = useContext(WishlistContext)

  const isWishlisted = wishlistItems.some(
    item => item._id === product._id
  )

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    toggleWishlist(product)
  }

  return (
    <button
      onClick={handleClick}
      className="absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow-md"
    >
      <Heart
        className={`w-5 h-5 ${
          isWishlisted
            ? "fill-red-500 text-red-500"
            : "text-gray-500"
        }`}
      />
    </button>
  )
}