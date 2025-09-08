"use client"
import React from 'react'
import { useState } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

const Profile = () => {
    const { data: session } = useSession()
    const [aside, setaside] = useState(false)
    const [showdropdown, setshowdropdown] = useState(false)
    const [accountSetting, setaccountSetting] = useState(false)
    const [payments, setpayments] = useState(false)
    const [mystuff, setmystuff] = useState(false)
    const [pannel, setpannel] = useState("Account Setting > Profile information")

    if (!session) {
        redirect("/login")
        return;
    }

    return (<>
        <div className='h-fit border flex flex-col md:flex-row w-full'>

            <div className='sidebar  h-auto w-auto text-white flex flex-col md:flex-row items-start  bg-emerald-700'>


                <button onClick={() => { setaside(!aside) }} className=" p-1 m-1 items-center bg-emerald-800 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-emerald-600 ">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>







                <aside id="sidebar-multi-level-sidebar" className={` ${aside ? "absolute  top-39  md:static" : "absolute -translate-x-full md:translate-x-0  md:static"}  z-4 w-full md:w-64 h-fit md:h-screen transition-transform `} aria-label="Sidebar">
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-emerald-700">

                        <ul className="flex flex-col  space-y-2 font-medium">





                            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white cursor-default">
                                <img src="user.svg" alt="" />
                                <span className="ms-3">{session.user.name}</span>
                            </div>



                            <div>
                                <button onClick={() => { setaccountSetting(!accountSetting), setpayments(false), setmystuff(false), setaside(true) }} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-emerald-600" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                   <img src="account.svg" alt="" />

                                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Account Setting</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                <ul id="dropdown-example" className={`${accountSetting ? " " : "hidden"} flex flex-col py-2 space-y-2`}>
                                    <button onClick={() => { setaccountSetting(false), setaside(false), setpannel("Account Setting > Profile information") }}>
                                        <Link href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-emerald-600">Profile information</Link>
                                    </button>
                                    <button onClick={() => { setaccountSetting(false), setaside(false), setpannel("Account Setting > Manage Addresses") }}>
                                        <Link href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-emerald-600">Manage Addresses</Link>
                                    </button>
                                    <button onClick={() => { setaccountSetting(false), setaside(false), setpannel("Account Setting > Pancard Information") }}>
                                        <Link href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-emerald-600">Pancard Information</Link>
                                    </button>
                                </ul>
                            </div>


                            <div>
                                <button onClick={() => { setpayments(!payments), setaccountSetting(false), setmystuff(false), setaside(true) }} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-emerald-600" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                   <img src="payment.svg" alt="" />

                                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Payments</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                <ul id="dropdown-example" className={`${payments ? " " : "hidden"} flex flex-col py-2 space-y-2`}>
                                    <button onClick={() => { setpayments(false), setaside(false), setpannel("Payments > Gift card") }}>
                                        <Link href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-emerald-600">Gift card</Link>
                                    </button>
                                    <button onClick={() => { setpayments(false), setaside(false), setpannel("Payments > Saved UPI") }}>
                                        <Link href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-emerald-600">Saved UPI</Link>
                                    </button>
                                    <button onClick={() => { setpayments(false), setaside(false), setpannel("Payments > Saved Cards") }}>
                                        <Link href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-emerald-600">Saved Cards</Link>
                                    </button>
                                </ul>
                            </div>

                            <div>
                                <button onClick={() => { setmystuff(!mystuff), setpayments(false), setaccountSetting(false), setaside(true) }} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-emerald-600" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                    <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                        <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                                    </svg>

                                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">My Stuff</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                <ul id="dropdown-example" className={`${mystuff ? " " : "hidden"} flex flex-col py-2 space-y-2`}>
                                    <button onClick={() => { setmystuff(false), setaside(false), setpannel("My Stuff > My Coupons") }}>
                                        <Link href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-emerald-600">My Coupons</Link>
                                    </button>
                                    <button onClick={() => { setmystuff(false), setaside(false), setpannel("My Stuff > My Reviews & Ratings") }}>
                                        <Link href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-emerald-600">My Reviews</Link>
                                    </button>
                                    <button onClick={() => { setmystuff(false), setaside(false), setpannel("My Stuff > All Notifications") }}>
                                        <Link href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-emerald-600">All Notifications</Link>
                                    </button>
                                    <button onClick={() => { setmystuff(false), setaside(false), setpannel("My Stuff > My Wishlist") }}>
                                        <Link href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-emerald-600">My Wishlist</Link>
                                    </button>
                                </ul>
                            </div>






                            <button onClick={() => { setaside(false), setmystuff(false), setpayments(false), setaccountSetting(false), setshowdropdown(false), setpannel("Kanban") }} >
                                <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-emerald-600 group">
                                    <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap text-left">Kanban</span>
                                    <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                                </Link>
                            </button>

                            <button onClick={() => { setaside(false), setshowdropdown(false), setpannel("logout") }}>
                                <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-emerald-600 group">
                                    <img src="backarrow.svg" alt="" />
                                    <span className="flex-1 ms-3 whitespace-nowrap text-left text-red-500">Logout</span>
                                </Link>
                            </button>


                        </ul>
                    </div>
                </aside>



            </div>

            <div className='w-full'>
                <h2 className='text-xl font-bold w-full pt-1 pl-2 flex items-center bg-green-300'>{pannel.toUpperCase()}</h2>


            

                {/* Account Setting  */}

                {pannel == "Account Setting > Profile information" && <div className="p-4  ">
                    Account Setting - Profile information

                </div>}

                {pannel == "Account Setting > Manage Addresses" && <div className="p-4  ">
                    Account Setting - Manage Addresses

                </div>}

                {pannel == "Account Setting > Pancard Information" && <div className="p-4  ">
                    Account Setting - Pancard Information

                </div>}

                {/* Payments  */}

                {pannel == "Payments > Gift card" && <div className="p-4  ">
                    Payments - Gift card

                </div>}

                {pannel == "Payments > Saved UPI" && <div className="p-4  ">
                    Payments - Saved UPI

                </div>}

                {pannel == "Payments > Saved Cards" && <div className="p-4  ">
                    Payments - Saved Cards

                </div>}

                {/* My Stuff  */}

                {pannel == "" && <div className="p-4  ">
                    Account Setting - Profile information

                </div>}

                {pannel == "" && <div className="p-4  ">
                    Account Setting - Profile information

                </div>}

                {pannel == "" && <div className="p-4  ">
                    Account Setting - Profile information

                </div>}

                {/* Kanban  */}

                {pannel == "" && <div className="p-4  ">
                    Account Setting - Profile information

                </div>}











                {pannel == "logout" && <div className="flex justify-center items-center h-[80vh] text-black ">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
                        <p className="mb-4">Do you really want to log out?</p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Yes, Logout
                            </button>
                            <button
                                onClick={() => setpannel("pannel")}
                                className="bg-gray-300 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
                }
            </div>

        </div>


    </>)
}

export default Profile
