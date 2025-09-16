// app/checkout/page.jsx (client component)
"use client";
import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("100.00"); // sample
  const [msg, setMsg] = useState("");

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
  );
}
