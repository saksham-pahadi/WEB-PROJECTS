// app/payment/result/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentResult() {
  const params = useSearchParams();
  const orderId = params.get("order_id");
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    if (!orderId) {
      setStatus("missing_order_id");
      return;
    }
    (async () => {
      try {
        const resp = await fetch("/api/verify-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });
        const j = await resp.json();
        setStatus(JSON.stringify(j));
      } catch (err) {
        setStatus("error: " + String(err));
      }
    })();
  }, [orderId]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Payment result</h2>
      <p>Order id: {orderId || "—"}</p>
      <pre>{status}</pre>
    </div>
  );
}
