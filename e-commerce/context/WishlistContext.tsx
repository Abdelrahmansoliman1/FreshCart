'use client'

import { createContext, useEffect, useState } from "react"
import { IProduct } from "@/lib/interfaces/product"
import {
  addProductToWishlist,
  getLoggedWishlist,
  removeProductFromWishlist
} from "@/lib/servcies/wishlist.service"

type WishlistContextType = {
  wishlistItems: IProduct[]
  toggleWishlist: (product: IProduct) => Promise<void>
}

export const WishlistContext = createContext<WishlistContextType>({
  wishlistItems: [],
  toggleWishlist: async () => {}
})

export function WishlistProvider({ children }: { children: React.ReactNode }) {

  const [wishlistItems, setWishlistItems] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(false)
  // Load wishlist from API
  async function loadWishlist() {
    try {
      const data = await getLoggedWishlist()
      setWishlistItems(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadWishlist()
  }, [])

async function toggleWishlist(product: IProduct) {

  if (loading) return

  setLoading(true)

  const exists = wishlistItems.find(item => item._id === product._id)

  try {

    if (exists) {

      await removeProductFromWishlist(product._id)

      setWishlistItems(prev =>
        prev.filter(item => item._id !== product._id)
      )

    } else {

      await addProductToWishlist(product._id)

      setWishlistItems(prev => {
        const exists = prev.find(item => item._id === product._id)
        if (exists) return prev
        return [...prev, product]
      })

    }

  } catch (error) {
    console.error(error)
  }

  setLoading(false)
}

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}