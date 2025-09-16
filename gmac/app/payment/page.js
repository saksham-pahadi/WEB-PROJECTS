"use client";
import { useState } from "react";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // 1️⃣ Call server to create order
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: "order_" + Date.now(),
          amount: 1,
          customerId: "cust123",
          customerEmail: "test@example.com",
          customerPhone: "9999999999",
        }),
      });

      const data = await res.json();
      console.log("Cashfree order response:", data);

      if (!data.payments?.url) {
        alert("No payment URL returned. Check server logs.");
        setLoading(false);
        return;
      }

      // 2️⃣ Redirect user to Cashfree payment page
      window.location.href = data.payments.url;
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Cashfree Payment</h1>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay ₹1"}
      </button>
    </div>
  );
}
