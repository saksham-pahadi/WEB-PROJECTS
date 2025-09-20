"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PaymentResult() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState("Checking payment...");

  useEffect(() => {
    if (!orderId) return;

    async function checkStatus() {
      try {
        const res = await fetch(`http://localhost:3000/api/verify-order?order_id=${orderId}`);
        const data = await res.json();

        if (!res.ok) {
          setStatus("Error: " + JSON.stringify(data));
          return;
        }

        if (data.order_status === "PAID") {
          setStatus("✅ Payment successful!");
        } else {
          setStatus("❌ Payment failed or pending. Status: " + data.order_status);
        }
      } catch (err) {
        setStatus("Server error: " + String(err));
      }
    }

    checkStatus();
  }, [orderId]);

  return (<div className=" w-full h-[100vh]  overflow-hidden border flex flex-col justify-start items-center">
    <div className=" h-50 w-full flex items-center justify-center bg-purple-500 px-20">

      
      <div>

      <img className="h-20 drop-shadow-[2px 2px 4px white]  " src="/GMAC.png" alt="GMAC" />
      <div className="bg-black opacity-30 relative rotate-x-[75deg] blur-md left-[25%] h-10 w-15 rounded-[200px] -top-4 z-4"></div>
      </div>
      <p className="text-white font-bold text-4xl">Payment Successful</p>

    </div>

    <div className=" border mt-20 ">
      <h1 className="text-xl font-bold text-center">Payment Result</h1>
      <p>{status}</p>
      <Link href={"/home"}>Take me to Home</Link>
    </div>
  </div>
  );
}
