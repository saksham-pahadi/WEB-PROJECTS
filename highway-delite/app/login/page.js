"use client"
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { set } from 'mongoose'

const Login = () => {
    const [form, setForm] = useState({ email: '', otp: '', remember: false, Dob: '', Name: '' });
    const [GivenOtp, setGivenOtp] = useState("")
    const [sendOtp, setsendOtp] = useState(false)
    const [show, setshow] = useState(false)
    const [remember, setremember] = useState(false)
    const [SignUp, setSignUp] = useState(false)
    const [loading, setloading] = useState(false)

    async function SendOtp() {


        if (form.Name === "") {
            toast.error("Please enter Name")
            return;
        }
        if (form.Dob === "") {
            toast.error("Please enter Date of Birth")
            return;
        }
        if (form.email === "") {
            toast.error("Please enter email")
            return;
        }


        if (!form.email.includes("@")) {
            toast.error("Please enter a valid email")
            return;
        }
        console.log("Sending OTP to ", form.email)

        setloading(true)



        



        const res = await fetch('/api/auth/requestOtp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: form.email })
        });

        const result = await res.json();

        console.log(result)
        setGivenOtp(result.otp)
        toast.success("OTP sent to your email")
        setsendOtp(true)
        setloading(false)
        return result;
    }

    const handleChange = (e) => {
        console.log(e.target)
        setForm({ ...form, [e.target.name]: e.target.value })

    }
    const handlelogin = () => {
        console.log("handle login")

    }
    const handleSignUp = () => {
        if(form.otp===""){
            toast.error("Please enter OTP")
            return;
        }
        if(form.otp!==GivenOtp){
            toast.error("Please enter valid OTP")
            return;
        }
        toast.success("Sign up successful")

    }

    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            <ToastContainer />
            <div className='right md:w-1/3'>


                <div className="logo mx-auto w-full flex md:justify-start md:mx-4  items-center justify-center mt-10">
                    <Link href="/" className="logo ">
                        <Image src="/logo.svg" alt="Logo" width={100} height={50}>

                        </Image>
                    </Link>
                </div>



                {!SignUp && <form className='w-9/10 mx-auto bg-grey-700 m-10 min-h-[75vh]' method="post">

                    <h1 className="text-3xl font-bold m-2 text-center">Sign in</h1>
                    <p className='text-center text-gray-400 mb-4'>Please login to continue your account.</p>
                    <label htmlFor="email" className="relative">
                        <input
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            type="email"
                            id="email"
                            placeholder=""
                            className="peer p-2 text-lg  mt-2 w-full rounded-lg border-2 border-blue-500   dark:border-gray-500 dark:bg-white dark:text-gray-900 focus:border-blue-500 focus:outline-none "
                        />

                        <span className="absolute rounded px-1 inset-y-2 start-3 -translate-y-9 bg-white text-blue-500  transition-transform h-6 peer-placeholder-shown:translate-y-[-12px] peer-focus:-translate-y-9 peer-focus:dark:text-blue-500 dark:bg-white dark:text-gray-500" >
                            Email
                        </span>
                    </label>
                    <label htmlFor="otp" className="relative">
                        <input
                            name='otp'
                            value={form.otp}
                            onKeyDown={(evt) => (evt.key === '.' || evt.key === '-' || evt.key === '+' || evt.key === 'e' || evt.key === 'E') && evt.preventDefault()}

                            onChange={handleChange}
                            type={`${show ? "number" : "password"}`}
                            id="otp"
                            placeholder="OTP"
                            className="peer p-2 text-lg  mt-5 w-full rounded-lg border-2 border-blue-500   dark:border-gray-500 dark:bg-white dark:text-gray-900 focus:border-blue-500 focus:outline-none remove-arrow "
                        />
                        <span>
                            <Image
                                src={`${show ? "/hidden.svg" : "/show.svg"}`}
                                onClick={() => { setshow(!show) }}
                                alt="show"
                                width={20}
                                height={20}
                                className='absolute top-1/2 end-3 -translate-y-1/2 cursor-pointer'
                            >

                            </Image>
                        </span>



                    </label>
                    <p className='mt-4 text-md text-blue-500 underline inline-block' onClick={() => { setsendOtp(true) }}>{sendOtp ? "Resend OTP" : "Send OTP"}</p>


                    <div className='flex justify-between items-center mt-4'>


                        <label htmlFor="remember">
                            <input type="checkbox" name=""
                                onChange={() => setremember(!remember)} value={"yes"} checked={remember} id="remember" />
                            <span className='text-gray-500 mx-2'>Keep me logged in</span>
                        </label>
                    </div>
                    <button type="submit" className='w-full bg-blue-500 text-white p-2 rounded-lg mt-5 hover:bg-blue-600'>Sign in</button>
                    <p className='text-center text-gray-400 mt-4'>Need an account? <button className='text-blue-500 underline' onClick={() => { setSignUp(true), setsendOtp(false) }}>Create one</button></p>
                </form>}



                {SignUp && <form className='w-9/10 mx-auto bg-grey-700 m-10 min-h-[75vh]' method="post">

                    <h1 className="text-3xl font-bold m-2 text-center">Sign Up</h1>
                    <p className='text-center text-gray-400 mb-4'>Sign up to enjoy the feature of HD</p>


                    <label htmlFor="Name" className="relative">
                        <input
                            name='Name'
                            value={form.Name}
                            onChange={handleChange}
                            type="text"
                            id="Name"
                            placeholder=""
                            className="peer p-2 text-lg  mt-4 w-full rounded-lg border-2 border-blue-500   dark:border-gray-500 dark:bg-white dark:text-gray-900 focus:border-blue-500 focus:outline-none "
                        />

                        <span className="absolute rounded px-1 inset-y-2 start-3 -translate-y-9 bg-white text-blue-500  transition-transform h-6 peer-placeholder-shown:translate-y-[-12px] peer-focus:-translate-y-9 peer-focus:dark:text-blue-500 dark:bg-white dark:text-gray-500" >
                            Name
                        </span>
                    </label>






                    <label htmlFor="Dob" className="relative">
                        <input
                            name='Dob'
                            value={form.Dob}
                            onChange={handleChange}
                            type="date"
                            id="Dob"
                            placeholder=""
                            className="peer p-2 text-lg  mt-4 w-full rounded-lg border-2 border-blue-500   dark:border-gray-500 dark:bg-white dark:text-gray-900 focus:border-blue-500 focus:outline-none "
                        />

                        <span className="absolute rounded px-1 inset-y-2 start-3 -translate-y-9 bg-white text-blue-500  transition-transform h-6 peer-placeholder-shown:translate-y-[-12px] peer-focus:-translate-y-9 peer-focus:dark:text-blue-500 dark:bg-white dark:text-gray-500" >
                            Date of Birth
                        </span>
                    </label>




                    <label htmlFor="email" className="relative">
                        <input
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            type="email"
                            id="email"
                            placeholder=""
                            className="peer p-2 text-lg  mt-4 w-full rounded-lg border-2 border-blue-500   dark:border-gray-500 dark:bg-white dark:text-gray-900 focus:border-blue-500 focus:outline-none "
                        />

                        <span className="absolute rounded px-1 inset-y-2 start-3 -translate-y-9 bg-white text-blue-500  transition-transform h-6 peer-placeholder-shown:translate-y-[-12px] peer-focus:-translate-y-9 peer-focus:dark:text-blue-500 dark:bg-white dark:text-gray-500" >
                            Email
                        </span>
                    </label>



                    {sendOtp && <label htmlFor="otp" className="relative">
                        <input
                            name='otp'
                            value={form.otp}
                            onKeyDown={(evt) => (evt.key === '.' || evt.key === '-' || evt.key === '+' || evt.key === 'e' || evt.key === 'E') && evt.preventDefault()}

                            onChange={handleChange}
                            type={`${show ? "number" : "password"}`}
                            id="otp"
                            placeholder="OTP"
                            className="peer p-2 text-lg  mt-5 w-full rounded-lg border-2 border-blue-500   dark:border-gray-500 dark:bg-white dark:text-gray-900 focus:border-blue-500 focus:outline-none remove-arrow "
                        />
                        <span>
                            <Image
                                src={`${show ? "/hidden.svg" : "/show.svg"}`}
                                onClick={() => { setshow(!show) }}
                                alt="show"
                                width={20}
                                height={20}
                                className='absolute top-1/2 end-3 -translate-y-1/2 cursor-pointer'
                            >

                            </Image>
                        </span>



                    </label>}




                    {!sendOtp ? <button type='button' disabled={loading} className={`w-full ${loading ? 'cursor-wait bg-gray-500' : "cursor-pointer bg-blue-500 hover:bg-blue-600 "}  text-white p-2 rounded-lg mt-5 text-center`} onClick={() => { SendOtp() }}>Get OTP</button>

                        : <button type="button" className='w-full bg-blue-500 text-white p-2 rounded-lg mt-5 hover:bg-blue-600 text-center' onClick={() => { handleSignUp(), setloading(true) }}>Sign up</button>}












                    <p className='text-center text-gray-400 mt-4'>Already have an account? <button className='text-blue-500 underline'
                        onClick={() => { setSignUp(false), setsendOtp(false) }}>Sign in</button></p>
                </form>}
            </div>
            <div className='left m-2 hidden  md:flex w-2/3 rounded-xl'>


                <Image src="/image.jpg" alt="login" width={1000} height={1000} className='w-full h-full object-cover rounded-xl' />
            </div>
        </div>
    )
}

export default Login
