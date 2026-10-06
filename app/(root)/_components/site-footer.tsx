import Link from "next/link";
import { Button } from "@/components/ui/button";

const SiteFooter = () => {
  return (
    <footer className="bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="rounded-lg border border-sky-200 bg-sky-50 px-6 py-8 text-center dark:border-sky-900 dark:bg-sky-950/40">
          <h2 className="mx-auto max-w-xl text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Start a course today, or publish your first one.
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-600 dark:text-slate-400">
            Students can browse by category and keep progress in one
            dashboard. Teachers can create, price, and publish with built-in
            analytics.
          </p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild className="bg-sky-600 hover:bg-sky-700">
              <Link href="/search">Browse courses</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-sky-200 text-sky-700 hover:bg-sky-50 hover:text-sky-700 dark:border-sky-900 dark:text-sky-300 dark:hover:bg-sky-950"
            >
              <Link href="/teacher/courses">Go to teacher mode</Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-8 text-sm sm:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <p className="text-base font-semibold text-sky-700 dark:text-sky-400">
              LearnGo.
            </p>
            <p className="mt-2 max-w-xs text-sm text-slate-600 dark:text-slate-400">
              A learning management system for structured video courses,
              chapter progress, and simple one-time payments.
            </p>
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">Learn</p>
            <ul className="mt-2 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/search" className="hover:text-sky-600 dark:hover:text-sky-400">
                  All courses
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-sky-600 dark:hover:text-sky-400">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-sky-600 dark:hover:text-sky-400">
                  How it works
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">Teach</p>
            <ul className="mt-2 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/teacher/courses" className="hover:text-sky-600 dark:hover:text-sky-400">
                  My courses
                </Link>
              </li>
              <li>
                <Link href="/teacher/analytics" className="hover:text-sky-600 dark:hover:text-sky-400">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="#teach" className="hover:text-sky-600 dark:hover:text-sky-400">
                  Why teach here
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">Account</p>
            <ul className="mt-2 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/sign-in" className="hover:text-sky-600 dark:hover:text-sky-400">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="hover:text-sky-600 dark:hover:text-sky-400">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:text-slate-500">
          <p>© {new Date().getFullYear()} LearnGo. All rights reserved.</p>
          <p>Built for focused, chapter-based learning.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
