"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    if (!orderId) return;

    fetch(`/api/order-status?orderId=${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Order status:", data);
        setStatus(data.order_status || "Failed");
      })
      .catch(() => setStatus("Error"));
  }, [orderId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold">Payment Status</h1>
      <p className="mt-2">{status}</p>
    </div>
  );
}
