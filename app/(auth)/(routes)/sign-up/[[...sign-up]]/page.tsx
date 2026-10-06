import { SignUp } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/auth";

export default function Page() {
  if (!isClerkConfigured()) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
        <h1 className="text-xl font-semibold text-slate-900">
          Auth is not configured
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Add your Clerk keys to{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
            .env.local
          </code>{" "}
          then restart the dev server. See{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
            .env.example
          </code>{" "}
          for the required values.
        </p>
      </main>
    );
  }
  return <SignUp />;
}
