import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { FiCode } from "react-icons/fi";
import {
  FcEngineering,
  FcFilmReel,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import type { IconType } from "react-icons/lib";

export interface CategoryWithCount {
  id: string;
  name: string;
  courseCount: number;
}

const iconMap: Record<string, IconType> = {
  Development: FiCode,
  Engineering: FcEngineering,
  Marketing: FcSalesPerformance,
  Fitness: FcSportsMode,
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Videography: FcFilmReel,
};

const CategoriesStrip = ({ items }: { items: CategoryWithCount[] }) => {
  return (
    <section
      id="courses"
      className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Topics
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Browse by category
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Pick a topic to filter the catalog.
            </p>
          </div>
          <Link
            href="/search"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-sky-700 hover:text-sky-600 dark:text-sky-400"
          >
            View all courses <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {items.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((category) => {
              const Icon = iconMap[category.name] ?? BookOpen;
              return (
                <Link
                  key={category.id}
                  href={`/search?category=${encodeURIComponent(category.name)}`}
                  className="group rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-sky-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex rounded-md bg-sky-50 p-2 dark:bg-sky-950">
                      <Icon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-sky-600 dark:group-hover:text-sky-400" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
                    {category.name}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {category.courseCount}{" "}
                    {category.courseCount === 1 ? "course" : "courses"}
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
            Categories will appear here once courses are published.
          </p>
        )}
      </div>
    </section>
  );
};

export default CategoriesStrip;
