export function getCashfreeConfig() {
  const isProd = process.env.CASHFREE_ENV === "prod";

  return {
    baseUrl: isProd
      ? "https://api.cashfree.com/pg"
      : "https://sandbox.cashfree.com/pg",
    appId: isProd
      ? process.env.CASHFREE_APP_ID_PROD
      : process.env.CASHFREE_APP_ID_TEST,
    secretKey: isProd
      ? process.env.CASHFREE_SECRET_KEY_PROD
      : process.env.CASHFREE_SECRET_KEY_TEST,
    env: isProd ? "PROD" : "TEST",
  };
}
