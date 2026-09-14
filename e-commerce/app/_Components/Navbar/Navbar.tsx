'use client';

import React, { useContext } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useSession, signOut } from 'next-auth/react';
import { CartContext } from '@/context/CartContext';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { WishlistContext } from '@/context/WishlistContext'

export default function Navbar() {

  const { wishlistItems } = useContext(WishlistContext)
 const {numOfCartItems} = useContext(CartContext)
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const linkStyle = (path: string) =>
    pathname === path
      ? "underline underline-offset-4 text-green-600"
      : "hover:text-green-600";

  return (
    <NavigationMenu className="bg-gray-100 max-w-full justify-around flex p-5">
      
      {/* Logo */}
      <NavigationMenuList className="gap-5 w-full flex">
        <NavigationMenuItem>
          <Link href="/">
          <Image alt='logo' src="/images/freshcart-logo.svg" width={150} height={150} className='mx-auto'/></Link>
        </NavigationMenuItem>
      </NavigationMenuList>

      {/* Links */}
      <NavigationMenuList className="font-bold gap-5 w-full flex justify-center">
        <NavigationMenuItem><Link href="/" className={linkStyle("/")}>Home</Link></NavigationMenuItem>
        <NavigationMenuItem><Link href="/brands" className={linkStyle("/brands")}>Brands</Link></NavigationMenuItem>
        <NavigationMenuItem><Link href="/products" className={linkStyle("/products")}>Products</Link></NavigationMenuItem>
        <NavigationMenuItem><Link href="/categories" className={linkStyle("/categories")}>Categories</Link></NavigationMenuItem>
      </NavigationMenuList>

      {/* Actions */}
      <NavigationMenuList className="gap-3 flex items-center">
      

        {status === "authenticated" ? (
          <>
          <NavigationMenuItem><Link href={'/cart'} className=' relative'><ShoppingCart className='inline' />
         {numOfCartItems!=0 && <small className='bg-amber-500 w-5 h-5 flex items-center justify-center rounded-full absolute -top-2 -right-2 text-xs'>{numOfCartItems}
            </small>}</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href={'/wishlist'} className='relative'><Heart />{wishlistItems.length > 0 && (
    <span className="bg-amber-500  w-5 h-5 flex items-center justify-center rounded-full absolute -top-2 -right-2 text-xs">
      {wishlistItems.length}
    </span>
  )}</Link></NavigationMenuItem>
            <NavigationMenuItem>
              <span className="font-semibold">
                {session.user?.name}
              </span>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button onClick={() => signOut({callbackUrl:'/login'})}>Logout</Button>
            </NavigationMenuItem>
          </>
        ) : (
          <>
            <NavigationMenuItem><Link href="/register">Register</Link></NavigationMenuItem>
            <NavigationMenuItem><Link href="/login">Login</Link></NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>

    </NavigationMenu>
  );
}
