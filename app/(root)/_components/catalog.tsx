import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CoursesList from "@/components/courses-list";
import type { CourseWithProgressWithCategory } from "@/actions/get-courses";

const Catalog = ({ courses }: { courses: CourseWithProgressWithCategory[] }) => {
  return (
    <section className="bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Course catalog
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Popular courses
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Recently published. Prices and chapter counts shown up front.
            </p>
          </div>
          <Link
            href="/search"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-sky-700 hover:text-sky-600 dark:text-sky-400"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6">
          {courses.length > 0 ? (
            <CoursesList data={courses} />
          ) : (
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-6 py-10 text-center dark:border-slate-800 dark:bg-slate-900/40">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                The catalog is empty right now.
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                New courses appear here as soon as teachers publish them.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
