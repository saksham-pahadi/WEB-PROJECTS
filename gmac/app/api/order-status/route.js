import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  try {
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
    const res = await fetch(
      `${BASE_URL}/orders/${orderId}`,
      {
        headers: {
          "x-client-id": APP_ID,
          "x-client-secret": SECRET_KEY,
          "x-api-version": "2022-09-01",
        },
      }
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
