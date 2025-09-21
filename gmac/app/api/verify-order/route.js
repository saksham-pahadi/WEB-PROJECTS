import { NextResponse } from "next/server";
import { getCashfreeConfig } from "@/lib/cashfree";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("order_id");

    if (!orderId) {
      console.warn("No order_id provided, redirecting to Home");
      return NextResponse.redirect(new URL("/", req.url));
    }

    const { baseUrl, appId, secretKey, env } = getCashfreeConfig();
    console.log(`🔍 Verifying order in ${env} environment`, orderId);
    console.log(`${baseUrl}/orders/${encodeURIComponent(orderId)}`);


    const res = await fetch(`${baseUrl}/orders/${encodeURIComponent(orderId)}`, {
      method: "GET",
      headers: {
        "x-client-id": appId,
        "x-client-secret": secretKey,
        "x-api-version": "2022-09-01",
        Accept: "application/json",
      },
    });

    let data;
    try {
      data = await res.json();
    } catch {
      const text = await res.text();
      console.error("❌ Cashfree did not return JSON:", text);
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (!res.ok) {
      console.error("❌ Cashfree verify error:", data);
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Server error:", err);
    return NextResponse.redirect(new URL("/", req.url));
  }
}
