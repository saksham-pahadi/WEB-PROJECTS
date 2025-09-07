import React from 'react'
import Link from 'next/link'


const Navbar = () => {
  return (<>
  <nav className='h-20 flex items-center justify-between mx-5'>
    <Link href={"/"} className="logo cursor-pointer">
        <h1 className='text-2xl font-bold text-emerald-600'>Grammy Store</h1>
    </Link>


    <div className="search hidden w-1/4 sm:flex justify-between border p-2 rounded-lg">
        <input className=' w-9/10 outline-0' type="search" name="" id="" placeholder='Search' />
        <img className='cursor-pointer' src="search.svg" alt="" />
    </div>



    
    <div className='profile hidden sm:flex gap-3'>
       <div className='hover:bg-emerald-400 p-1 rounded-full cursor-pointer'>
        <img title='Profile' className='h-6' src="profile.svg" alt="Profile" />
       </div>
       <div className='hover:bg-emerald-400 p-1 rounded-full cursor-pointer'>
        <img title='wishlist' className='h-6' src="wishlist.svg" alt="Wishlist" />
       </div>
       <div className='hover:bg-emerald-400 p-1 rounded-full cursor-pointer'>
        <img title='Cart' className='h-6' src="cart.svg" alt="Cart" />
       </div>

    </div>






    <div className="hamburger sm:hidden">
        Hamburger
    </div>

  </nav>


  <aside className='h-10 bg-emerald-600 flex items-center gap-5 pl-20'>
    <div className='h-10 content-center px-3 bg-emerald-700'>
      Shopping By Category
    </div>
    <select className='p-0' name="" id="">
      <option className='bg-emerald-200 border-0 ' value="">Clothes</option>
      <option value="">Shoes</option>
      <option value="">Perfume</option>
      <option value="">Jwellary</option>
      <option value="">Assets</option>
    </select>
  </aside>







  </>)
}

export default Navbar
