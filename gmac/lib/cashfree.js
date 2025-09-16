const baseUrl =
  process.env.CASHFREE_ENV === "PROD"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";

export async function createCashfreeOrder({
  orderId,
  amount,
  customerId,
  customerEmail,
  customerPhone,
}) {
  const res = await fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-client-id": process.env.CASHFREE_APP_ID,
      "x-client-secret": process.env.CASHFREE_SECRET_KEY,
      "x-api-version": "2022-09-01",
    },
    body: JSON.stringify({
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: customerId,
        customer_email: customerEmail,
        customer_phone: customerPhone,
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-status?order_id={order_id}`,
      },

    }),
  });

  const data = await res.json();

  // ✅ Log full response to debug
  console.log("Cashfree API response:", data);

  if (!res.ok) {
    throw new Error(data.message || data.error || `Order creation failed: ${res.status}`);
  }

  return data;
}
