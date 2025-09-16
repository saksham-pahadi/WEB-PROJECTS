// app/api/verify-order/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { orderId } = await req.json();
    if (!orderId) return NextResponse.json({ error: "orderId required" }, { status: 400 });

    const res = await fetch(`${process.env.CF_API_BASE}/orders/${encodeURIComponent(orderId)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": process.env.CF_CLIENT_ID,
        "x-client-secret": process.env.CF_CLIENT_SECRET,
        Accept: "application/json",
      },
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Cashfree get-order error", data);
      return NextResponse.json({ error: "failed to fetch order", details: data }, { status: 502 });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "server error", details: String(err) }, { status: 500 });
  }
}
