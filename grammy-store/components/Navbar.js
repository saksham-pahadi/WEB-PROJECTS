"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"


const Navbar = () => {
  const { data: session } = useSession()
  console.log("Session",session)
  return (<>
    <nav className='h-20 flex items-center justify-between mx-5'>
      <Link href={"/"} className="logo cursor-pointer">
        <h1 className='text-2xl font-bold text-emerald-600'>Grammy Store</h1>
      </Link>


      <div className="search hidden w-1/4 sm:flex justify-between border p-2 rounded-lg">
        <input className=' w-9/10 outline-0' type="search" name="" id="" placeholder='Search' />
        <img className='cursor-pointer' src="search.svg" alt="" />
      </div>




      <div className='profile h-fit hidden sm:flex  items-center justify-center gap-3'>

        {!session && <Link href={"/profile"} className='hover:bg-emerald-400 p-1 rounded-full cursor-pointer'>
          <img title='Profile' className='h-6' src="profile.svg" alt="Profile" />
        </Link>}

        {session && <Link href={"/profile"} className='border border-emerald-500 rounded-full cursor-pointer'>
          <img title='Profile' className='h-10 m-1 rounded-full' src={`${session.user.image}`} alt="Profile" />
        </Link>}

        <Link href={"/profile"} className='hover:bg-emerald-400 p-1 rounded-full cursor-pointer'>
          <img title='wishlist' className='h-6' src="wishlist.svg" alt="Wishlist" />
        </Link>
        <Link href={"/profile"} className='hover:bg-emerald-400 p-1 rounded-full cursor-pointer'>
          <img title='Cart' className='h-6' src="cart.svg" alt="Cart" />
        </Link>

      </div>






      <div className="hamburger sm:hidden flex items-center justify-center rounded-md bg-emerald-700">
        <div className=' h-[25px] w-[25px] flex flex-col m-1 justify-around items-center  '>
          <div className='h-[3px] rounded-sm w-9/10 bg-white'></div>
          <div className='h-[3px] rounded-sm w-9/10 bg-white'></div>
          <div className='h-[3px] rounded-sm w-9/10 bg-white'></div>
        </div>
      </div>

    </nav>


    <aside className='h-10 bg-emerald-600 hidden md:flex  items-center gap-5 pl-20'>
      <div className='h-10 content-center px-3 bg-emerald-700'>
        Shopping By Category
      </div>
      <select className='p-0' name="" id="">
        <option className='bg-emerald-500 border-0 ' value="">Fashion</option>
        <option value="">Top</option>
        <option value="">Men&apos;s shirt</option>
        <option value="">Men&apos;s shoes</option>
        <option value="">Women&apos;s dresses</option>
        <option value="">Women&apos;s shoes</option>
      </select>
      <select className='p-0' name="" id="">
        <option className='bg-emerald-500 border-0 ' value="">Accessories</option>
        <option value="">Watches</option>
        <option value="">Sunglasses</option>
        <option value="">Kitchen Accessories</option>
        <option value="">Sports Accessories</option>
        <option value="">Mobile Accessories</option>
      </select>
      <select className='p-0' name="" id="">
        <option className='bg-emerald-500 border-0 ' value="">Electronics</option>
        <option value="">Laptops</option>
        <option value="">Smartphone</option>
        <option value="">Motorcycle</option>
        <option value="">Vehicle</option>
      </select>
      <select className='p-0' name="" id="">
        <option className='bg-emerald-500 border-0 ' value="">Life Style</option>
        <option value="">Beauty</option>
        <option value="">Fragrances</option>
        <option value="">Mens Watches</option>
        <option value="">Sunglasses</option>
        <option value="">Women Bags</option>
        <option value="">Women Jewellery</option>
        <option value="">Women Watches</option>
      </select>
      <select className='p-0' name="" id="">
        <option className='bg-emerald-500 border-0 ' value="">Home Assets</option>
        <option value="">Furniture</option>
        <option value="">Groceries</option>
        <option value="">Home Decoration</option>
      </select>
    </aside>







  </>)
}

export default Navbar
