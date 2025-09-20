// app/api/verify-order/route.js
import { NextResponse } from "next/server";
import { getCashfreeConfig } from "@/lib/cashfree";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("order_id");

    if (!orderId) {
      return NextResponse.json({ error: "order_id required" }, { status: 400 });
    }

    const { baseUrl, appId, secretKey, env } = getCashfreeConfig();
    console.log(`🔍 Verifying order in ${env} environment`, orderId);

    const res = await fetch(`${baseUrl}/orders/${encodeURIComponent(orderId)}`, {
      method: "GET",
      headers: {
        "x-client-id": appId,
        "x-client-secret": secretKey,
        "x-api-version": "2022-09-01",
        Accept: "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Cashfree verify error:", data);
      return NextResponse.json({ error: "failed to fetch order", details: data }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Server error:", err);
    return NextResponse.json({ error: "server error", details: String(err) }, { status: 500 });
  }
}
