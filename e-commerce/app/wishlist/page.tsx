'use client'

import { useContext } from "react"
import { WishlistContext } from "@/context/WishlistContext"
import ProductCard from "../_Components/layout/Home/ProductCard/ProductCard"

export default function WishlistPage() {

  const { wishlistItems } = useContext(WishlistContext)

  return (
    <main className="max-w-6xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        My Wishlist
      </h1>

      {!wishlistItems?.length ? (
        <p className="text-gray-500">
          Your wishlist is empty
        </p>
      ) : (

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {wishlistItems.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>

      )}

    </main>
  )
}