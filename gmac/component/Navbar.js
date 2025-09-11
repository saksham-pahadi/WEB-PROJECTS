"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from "next/navigation";
import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
    const pathname = usePathname();
    const { data: session } = useSession()

    if(session){

        console.log("Session in nav", session.user.image)
    }

    const [navOptions, setnavOptions] = useState({ Home: true, About: false, Connect: false })
    console.log(pathname)
    return (
        <nav className='m-0 sm:mx-5 flex justify-between items-center  p-3 px-6 rounded-full'>
            <div className="logo h-15 mb-3">
                <img className='h-15 z-5' src="GMAC.png" alt="" />
                <div className="bg-black opacity-30 relative rotate-x-[75deg] blur-md left-6 h-10 w-15 rounded-[200px] -top-4 z-4">

                </div>
            </div>



            <div className='flex sm:gap-20 items-center justify-between'>
                <ul className='hidden sm:flex sm:gap-10 font-mono  items-center'>
                    <li onClick={() => { setnavOptions({ Home: true, About: false, Connect: false }) }} className={`hover:text-purple-500 ${navOptions.Home ? "font-semibold text-purple-500" : ""}`}><Link href={"/"}>Home</Link></li>
                    <li onClick={() => { setnavOptions({ Home: false, About: true, Connect: false }) }} className={`hover:text-purple-500 ${navOptions.About ? "font-semibold text-purple-500" : ""}`}><Link href={"/"}>About</Link></li>
                    <li onClick={() => { setnavOptions({ Home: false, About: false, Connect: true }) }} className={`hover:text-purple-500 ${navOptions.Connect ? "font-semibold text-purple-500" : ""}`}><Link href={"/"}>Connect</Link></li>
                </ul>
                {!session && <Link onClick={() => { setnavOptions({ Home: false, About: false, Connect: false }) }} href={"/login"} type="button" className="text-white bg-gradient-to-b from-purple-400  to-purple-600  shadow-lg  hover:dark:shadow-lg hover:dark:shadow-purple-600/60 font-semibold rounded-full text-sm px-5 py-2.5 text-center transition-all duration-100 ">Sign in</Link>}


                {session && <div className=''>
                    <img className='h-10 rounded-full' src={`${session.user.image}`} alt="profile" />
                </div>}

            </div>



        </nav>
    )
}

export default Navbar
