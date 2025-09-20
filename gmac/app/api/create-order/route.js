import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // Decide environment
    const isProd = process.env.CASHFREE_ENV === "prod";

    const BASE_URL = isProd
    ? process.env.CF_API_BASE_PROD
    : process.env.CF_API_BASE_TEST

    const APP_ID = isProd
      ? process.env.CASHFREE_APP_ID_PROD
      : process.env.CASHFREE_APP_ID_TEST;

    const SECRET_KEY = isProd
      ? process.env.CASHFREE_SECRET_KEY_PROD
      : process.env.CASHFREE_SECRET_KEY_TEST;

    // Build return URL safely (avoid double slashes)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "");
    const returnUrl = `${baseUrl}/payment/result?order_id={order_id}`;
    const order_Id=`order_${Date.now()}`

    const payload = {
      order_amount: body.amount,
      order_currency: "INR",
      order_id: order_Id,
      customer_details: {
        customer_id: body.customer.id,
        customer_email: body.customer.email,
        customer_phone: body.customer.phone,
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/result?order_id=${order_Id}`,
      },
    };

    console.log("🌀 Cashfree Env:", isProd ? "PROD" : "TEST");
    console.log("🌀 Return URL:", returnUrl);

    const res = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "x-client-id": APP_ID,
        "x-client-secret": SECRET_KEY,
        "x-api-version": "2022-09-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(data)

    if (!res.ok) {
      console.error("❌ Cashfree error:", data);
      return NextResponse.json({ error: "Failed to create order", details: data }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Server error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
