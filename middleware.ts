import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(() => {
  // Intentionally no auth().protect() here.
  // Every page in this app already guards with `if (!userId) redirect(...)`
  // and every API route returns 401 via getUserId() (see lib/auth.ts).
  // Calling protect() in development triggers Clerk's dev-browser
  // handshake rewrite (x-middleware-rewrite: /clerk_<id>), which has no
  // matching page and surfaces as a 404 for signed-out visitors.
  // Keeping the middleware itself active is still required so auth()
  // works in server components (otherwise "can't detect clerkMiddleware").
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
