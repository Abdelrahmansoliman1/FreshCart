'use client'

import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button'
import { addProductToCart } from '@/lib/servcies/cart.service'
import { CartContext } from '@/context/CartContext'

export default function AddToCartBtn({ productId }: { productId: string }) {

  const { refreshCart } = useContext(CartContext)
  const [loading, setLoading] = useState(false)

  const addProduct = async () => {
    try {
      setLoading(true)

      await addProductToCart(productId)

      
      await refreshCart()

    } catch (err) {
      console.error(err)
      alert("Failed to add product ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={addProduct}
      disabled={loading}
      className="w-full cursor-pointer"
    >
      {loading ? "Adding..." : "Add To Cart"}
    </Button>
  )
}
