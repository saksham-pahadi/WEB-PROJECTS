// app/api/create-order/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    // expected from client: { amount, orderId, customer: {id,email,phone} }
    const { amount, orderId, customer } = body;

    if (!amount || !orderId) {
      return NextResponse.json({ error: "amount and orderId required" }, { status: 400 });
    }

    const payload = {
      order_id: orderId,
      order_amount: String(amount),
      order_currency: "INR",
      customer_details: {
        customer_id: customer?.id || orderId,
        customer_email: customer?.email || "",
        customer_phone: customer?.phone || "",
      },
      // return_url supports placeholder {order_id} which Cashfree will replace
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/result?order_id={order_id}`,
      },
    };

    const res = await fetch(`${process.env.CF_API_BASE}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": process.env.CF_CLIENT_ID,
        "x-client-secret": process.env.CF_CLIENT_SECRET,
        "x-api-version": "2022-09-01", 
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Cashfree create-order error:", data);
      return NextResponse.json({ error: "Failed to create order", details: data }, { status: 502 });
    }

    // extract payment session id robustly (field names can vary)
    const paymentSessionId =
      data?.payment_session?.id ||
      data?.payment_sessions?.[0]?.id ||
      data?.paymentSessionId ||
      data?.payment_session_id ||
      null;

    return NextResponse.json({ raw: data, paymentSessionId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "server error", details: String(err) }, { status: 500 });
  }
}
