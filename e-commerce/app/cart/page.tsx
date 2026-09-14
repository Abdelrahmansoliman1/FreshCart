'use client'
import { CartContext } from '@/context/CartContext'
import React, { useContext } from 'react'
import Products from '../products/page'
import Image from 'next/image'
import { deleteSpecificItem, updateCartItem } from '@/lib/servcies/cart.service'
import { count } from 'console'
import Link from 'next/link'

export default function Cart() {

  const { cartItems , totalPrice , refreshCart } = useContext(CartContext)
 const deleteItem = async (productId: string) => {
  const cartData = await deleteSpecificItem(productId)
  if (cartData.status === "success") await refreshCart()
}

  async function updateCart(productId:string , count: number){
     const safeCount = Math.max(1, count)
   const cartData = await updateCartItem(productId, safeCount);
    if (cartData.status === "success") await refreshCart()
  }
  return (
     <main className=" pt-20">
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
      {cartItems.length&&cartItems.map((Product)=>(
         <div key={Product._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
           <div className='relative h-40 w-1/4'>
            <Image src={Product.product.imageCover} alt={Product.product.title} fill className='object-cover'/>
           </div>
         
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-lg font-bold text-gray-900">{Product.product.title}</h2>
              <p className="mt-1 text-xs text-gray-700">{Product.product.category.name}</p>
            </div>
            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center border-gray-100">
                <span onClick={() =>Product.count > 1 && updateCart(Product.product._id, Product.count - 1)}  className={`cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 ${Product.count === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-blue-500 hover:text-white"} `}> - </span>

                <p className='p-2'>{Product.count}</p>
                <span onClick={()=>{updateCart(Product.product._id, Product.count + 1)}} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm">{Product.price } EGP</p>
                <svg onClick={()=>{deleteItem(Product.product._id)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
       
       
      </div>

      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">{totalPrice} EGP</p>
            
          </div>
        </div>
        <Link href={'/payment'} className="mt-6 text-center block w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</Link>
      </div>
    </div>
  </main>
  )
}
