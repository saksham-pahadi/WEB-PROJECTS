"use client"
import React, { useState } from "react"
import Image from "next/image"
import { ToastContainer, toast } from "react-toastify"
import { useSession, signIn } from "next-auth/react"
import { redirect } from 'next/navigation'
import "react-toastify/dist/ReactToastify.css"

const Login = () => {
    const { data: session } = useSession()
    if(session){
        redirect("/feed")

    }
    const [form, setForm] = useState({
        email: "",
        otp: "",
        password: "",
        fullname: "",
        dob: "",
        remember: false,
    })

    const [showOtp, setShowOtp] = useState(false)   // toggle OTP visibility
    const [otpSent, setOtpSent] = useState(false)   // track OTP sent
    const [loading, setLoading] = useState(false)
    const [signUpMode, setSignUpMode] = useState(false)
    const [createpassword, setcreatepassword] = useState({ newpassword: "", againpassword: "" })
    const [showpass, setshowpass] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setcreatepassword({ ...createpassword, [e.target.name]: e.target.value })
    }






    const sendOtp = async () => {
        if (!form.email || !form.email.includes("@")) {
            toast.error("Enter a valid email")
            return
        }

        if (signUpMode) {
            if (!form.fullname) return toast.error("Enter your name")
            if (!form.dob) return toast.error("Enter Date of Birth")
        }
        if (createpassword.newpassword === createpassword.againpassword) {
            setForm({ ...form, password: createpassword.newpassword })
        }
        else {
            return toast.error("Created password does not match.")
        }

        setLoading(true)

        try {
            const res = await fetch("/api/auth/requestOtp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: form.email, name: form.fullname, signup: signUpMode }),
            })

            const result = await res.json()
            if (!res.ok) throw new Error(result.error || "Failed to send OTP")

            toast.success("OTP sent to your email")
            setOtpSent(true)
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }








    //     if (form.otp === "") {
    //         toast.error("Please enter OTP")
    //         return;
    //     }
    //     if (form.otp != GivenOtp) {
    //         toast.error("Please enter valid OTP")
    //         return;
    //     }





    //     await signIn("credentials", {
    //         email: form.email.toLowerCase(),
    //         callbackUrl: "/"
    //     });
    // };
    const handleLogin = async () => {
        if (!form.password) return toast.error("Enter Password")

        setLoading(true)
        const res = await signIn("credentials", {
            email: form.email.toLowerCase(),
            password: form.password,
            callbackUrl: "/",
        })

        if (!res.ok) {
            toast.error(res.error)
            // console.log("Login failed:", res.error); // shows "Incorrect password"
        } else {
            // console.log("Login success");
        }
        setLoading(false)
    }









    const handleSignUp = async () => {
        if (!form.otp) return toast.error("Enter OTP")
        // console.log("form", form)

        try {
            setLoading(true)
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })

            const result = await res.json()
            if (!res.ok) throw new Error(result.error || "Signup failed")

            toast.success("Signup successful! Please login.")
            setForm({ email: "", otp: "", fullname: "", dob: "", remember: false })
            setSignUpMode(false)
            setOtpSent(false)
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }



    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <ToastContainer />

            {/* Right: Form */}
            <div className="right md:w-1/3 p-6">
                <form className="bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-center">
                        {signUpMode ? "Sign Up" : "Sign In"}
                    </h1>
                    <p className="text-center text-gray-400 mb-4">
                        {signUpMode
                            ? "Create a new account."
                            : "Login to continue your account."}
                    </p>

                    {signUpMode && (
                        <>
                            <input
                                name="fullname"
                                value={form.fullname}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="w-full p-2 border rounded-lg mt-3"
                            />
                            <input
                                name="dob"
                                value={form.dob}
                                onChange={handleChange}
                                type="date"
                                className="w-full p-2 border rounded-lg mt-3"
                            />
                        </>
                    )}

                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded-lg mt-3"
                    />
                    {!signUpMode && <div className="relative mt-3">
                        <input
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            type={showOtp ? "text" : "password"}
                            placeholder="Password"
                            className="w-full p-2 border rounded-lg"
                        />
                        <Image
                            src={showOtp ? "/hidden.svg" : "/show.svg"}
                            alt="toggle"
                            width={20}
                            height={20}
                            onClick={() => setShowOtp(!showOtp)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                        />
                    </div>}
                    {signUpMode && <>

                        <div className="relative mt-3">
                            <input
                                name="newpassword"
                                value={createpassword.newpassword}
                                onChange={handleChange}
                                type={showpass ? "text" : "password"}
                                placeholder="Create a new Password"
                                className="w-full p-2 border rounded-lg"
                            />
                            <Image
                                src={showpass ? "/hidden.svg" : "/show.svg"}
                                alt="toggle"
                                width={20}
                                height={20}
                                onClick={() => setshowpass(!showpass)}
                                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                            />
                        </div>
                        <div className="relative mt-3">
                            <input
                                name="againpassword"
                                value={createpassword.againpassword}
                                onChange={handleChange}
                                type={showpass ? "text" : "password"}
                                placeholder="Enter again your new password"
                                className="w-full p-2 border rounded-lg"
                            />
                            <Image
                                src={showpass ? "/hidden.svg" : "/show.svg"}
                                alt="toggle"
                                width={20}
                                height={20}
                                onClick={() => setshowpass(!showpass)}
                                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                            />
                        </div>
                    </>}

                    {signUpMode && <div>

                        {

                            otpSent && (
                                <div className="relative mt-3">
                                    <input
                                        name="otp"
                                        value={form.otp}
                                        onChange={handleChange}
                                        type={showOtp ? "text" : "password"}
                                        placeholder="OTP"
                                        className="w-full p-2 border rounded-lg"
                                    />
                                    <Image
                                        src={showOtp ? "/hidden.svg" : "/show.svg"}
                                        alt="toggle"
                                        width={20}
                                        height={20}
                                        onClick={() => setShowOtp(!showOtp)}
                                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                                    />
                                </div>
                            )}

                    </div>}

                    {!otpSent ? (
                        <button
                            type="button"
                            disabled={loading}
                            onClick={signUpMode ? sendOtp : handleLogin}
                            className={`w-full mt-4 p-2 rounded-lg text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                                }`}
                        >
                            {loading ?  `${signUpMode ? "Sending..." : "Logining..."}` : `${signUpMode ? "Get OTP" : "Sign in"}`}
                        </button>
                    ) : (
                        <button
                            type="button"
                            disabled={loading}
                            onClick={handleSignUp}
                            className={`w-full mt-4 p-2 rounded-lg text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                                }`}
                        >
                            {signUpMode ? "Sign Up" : "Sign In"}
                        </button>
                    )}

                    <p className="text-center mt-4 text-gray-400">
                        {signUpMode ? (
                            <>
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSignUpMode(false)
                                        setOtpSent(false)
                                    }}
                                    className="text-blue-500 underline"
                                >
                                    Sign In
                                </button>
                            </>
                        ) : (
                            <>
                                Need an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSignUpMode(true)
                                        setOtpSent(false)
                                    }}
                                    className="text-blue-500 underline"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </p>

                    {/* OAuth Providers */}
                    <div className="mt-6 flex flex-col gap-3">
                        <button
                            type="button"
                            onClick={() => signIn("github", { callbackUrl: "/" })}
                            className="flex items-center justify-center gap-2 border p-2 rounded-lg hover:bg-gray-100"
                        >
                            <img src="github.svg" className="h-6 w-6" alt="GitHub" />
                            Continue with GitHub
                        </button>

                        <button
                            type="button"
                            onClick={() => signIn("google", { callbackUrl: "/" })}
                            className="flex items-center justify-center gap-2 border p-2 rounded-lg hover:bg-gray-100"
                        >
                            <img src="google.svg" className="h-6 w-6" alt="Google" />
                            Continue with Google
                        </button>
                    </div>
                </form>
            </div>

            {/* Left: Image */}
            <div className="left hidden md:flex w-2/3 p-2">
                <Image
                    src="/GMAC.png"
                    alt="login"
                    width={600}
                    height={600}
                    className="w-full h-fit object-cover rounded-xl"
                />
            </div>
        </div>
    )
}



export default Login
