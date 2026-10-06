import { auth } from "@clerk/nextjs/server";

/**
 * Clerk's auth() throws ("can't detect usage of clerkMiddleware()")
 * when the middleware was bypassed — which is exactly what happens
 * when NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY / CLERK_SECRET_KEY are missing
 * (fresh clone, no .env). Every server page/layout/API route calls
 * auth(), so one missing .env crashes the whole app.
 *
 * getUserId() makes that failure graceful: returns null so callers
 * fall into their existing `if (!userId) redirect(...)` / 401 paths.
 */
export function getUserId(): string | null {
  try {
    const { userId } = auth();
    return userId ?? null;
  } catch {
    return null;
  }
}

export function isClerkConfigured(): boolean {
  const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  const sk = process.env.CLERK_SECRET_KEY ?? "";
  const pkOk =
    (pk.startsWith("pk_test_") || pk.startsWith("pk_live_")) && pk.length > 30;
  const skOk =
    (sk.startsWith("sk_test_") || sk.startsWith("sk_live_")) && sk.length > 20;
  return pkOk && skOk;
}
