"use client"
import React, { useState } from 'react'
import Script from 'next/script'
import { useSession, signIn, signOut } from "next-auth/react"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import CheckoutPage from './Checkout';

const Paymentpage = ({ username }) => {

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const { data: session } = useSession()
    const [paymentform, setpaymentform] = useState({amount: '100', message: 'A little support from your fan!'})
    const [amount, setAmount] = useState("100"); // sample

    //   const [loading, setLoading] = useState(false);

    async function loadCashfreeSdk() {
        if (window.Cashfree) return window.Cashfree;
        return new Promise((resolve, reject) => {
            const s = document.createElement("script");
            s.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
            s.onload = () => resolve(window.Cashfree);
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    const handleChange = (e) => {
        console.log(e.target)
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
        console.log(paymentform)
        setAmount(paymentform.amount)

    }


    // const handlePayment = async (amount, receiver) => {
    //     setLoading(true);
    //     const res = await fetch("/api/razorpay", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ amount }), // 👈 send amount to server
    //     });
    //     const data = await res.json();
    //     console.log(amount)

    //     if (!data.orderId) {
    //         alert("Failed to create order");
    //         setLoading(false);
    //         return;
    //     }


    //     const options = {
    //         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    //         amount: amount * 100,
    //         currency: "INR",
    //         name: `Get Me A Chai - ${receiver}`,
    //         description: "Test Transaction",
    //         order_id: data.orderId,
    //         handler: function (response) {
    //             // alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
    //             toast.success("Payment successful! ");
    //         },
    //         theme: { color: "#1d293d" },
    //     };

    //     const rzp = new window.Razorpay(options);
    //     rzp.open();
    //     setLoading(false);
    // };


    async function handlePay(e) {
        e.preventDefault();
        setLoading(true);
        setMsg("");
        try {
            // prepare orderId; use your own order id generator (unique)
            const orderId = "order_" + Date.now();

            // call server to create order
            const createResp = await fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount,
                    orderId,
                    customer: {
                        id: "cust_" + Date.now(),
                        email: "buyer@example.com",
                        phone: "9999999999",
                    },
                }),
            });

            console.log(createResp);

            const createJson = await createResp.json();
            if (!createResp.ok || !createJson) {
                setMsg("Create order failed: " + JSON.stringify(createJson));
                setLoading(false);
                return;
            }

            const paymentSessionId =
                createJson.paymentSessionId ||
                createJson.raw?.payment_session?.id ||
                createJson.raw?.payment_sessions?.[0]?.id ||
                null;

            if (!paymentSessionId) {
                setMsg("No payment session id returned from server. Raw: " + JSON.stringify(createJson.raw));
                setLoading(false);
                return;
            }

            // load SDK
            const Cashfree = await loadCashfreeSdk();
            // initialize Cashfree client in production mode
            const cashfree = Cashfree({ mode: "production" });

            // configure return URL; server used NEXT_PUBLIC_BASE_URL with placeholder {order_id}
            const returnUrl = `${window.location.origin}/payment/result?order_id={order_id}`;

            // begin checkout
            const result = await cashfree.checkout({
                paymentSessionId,
                returnUrl,
            });

            if (result?.error) {
                setMsg("Checkout error: " + JSON.stringify(result.error));
            } else if (result?.redirect) {
                // Cashfree handles redirect automatically — just a confirmation that redirect happened
                setMsg("Redirecting to Cashfree...");
            } else {
                setMsg("Checkout flow returned: " + JSON.stringify(result));
            }
        } catch (err) {
            console.error(err);
            setMsg("Unexpected error: " + String(err));
        } finally {
            setLoading(false);
        }
    }







    return (
        <div className=' '>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <Script src="https://checkout.razorpay.com/v1/checkout.js">
            </Script>
            <div className="makepayment ">
                <h1 className='text-2xl font-bold mb-3'>Support {session.user.name}</h1>

                <input onChange={handleChange} value={paymentform?.amount || ""} name="amount" type='number' className='w-full p-3 rounded-lg bg-slate-800 remove-arrow' placeholder='Enter Amount' onKeyDown={(evt) => (evt.key === '.' || evt.key === '-' || evt.key === '+' || evt.key === 'e' || evt.key === 'E') && evt.preventDefault()} />


                {/* or choose from these Amount */}
                <div className="flex gap-2 mt-2 ">

                    <button className="bg-slate-800 p-3 rounded-lg" onClick={() => { setpaymentform({ amount: 100 }) }}>
                        pay ₹100
                    </button>
                    <button className="bg-slate-800 p-3 rounded-lg" onClick={() => { setpaymentform({ amount: 200 }) }}>
                        pay ₹200
                    </button>
                    <button className="bg-slate-800 p-3 rounded-lg" onClick={() => { setpaymentform({ amount: 500 }) }}>
                        pay ₹500
                    </button>

                </div>
                <textarea onChange={handleChange} value={paymentform.message} name='message' className='bg-slate-800 my-2 rounded-lg border-2 border-slate-800 w-full p-2' id="" placeholder='Enter Message'></textarea>
                <button onClick={()=>{handlePayment(paymentform.amount,session.user.name)}} disabled={loading} type="button" className="w-full mx-auto text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br hover:shadow-lg hover:shadow-blue-500/50 hover:dark:shadow-lg hover:dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-100 ease-out ">{loading ? "Processing..." : `Pay`}</button>



                <div style={{ maxWidth: 680, margin: "2rem auto", fontFamily: "system-ui, sans-serif" }}>
                    <h1>Pay with Cashfree (production)</h1>
                    <form onSubmit={handlePay}>
                        <label>
                            Amount (INR)
                            <input value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </label>
                        <div style={{ marginTop: 12 }}>
                            <button type="submit" disabled={loading}>
                                {loading ? "Please wait…" : "Proceed to Pay"}
                            </button>
                        </div>
                    </form>
                    <div style={{ marginTop: 16 }}>{msg}</div>
                </div>



            </div>
        </div>
    )
}

export default Paymentpage
