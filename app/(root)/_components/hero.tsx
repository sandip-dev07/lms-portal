import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ListVideo, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formate";

export interface HeroCourse {
  id: string;
  title: string;
  imageUrl: string | null;
  price: number | null;
  categoryName: string | null;
  chapterCount: number;
}

interface HeroProps {
  courseCount: number;
  chapterCount: number;
  categoryCount: number;
  featured: HeroCourse | null;
}

const Hero = ({ courseCount, chapterCount, categoryCount, featured }: HeroProps) => {
  const stats = [
    { value: String(courseCount), label: courseCount === 1 ? "Published course" : "Published courses" },
    { value: String(chapterCount), label: chapterCount === 1 ? "Video chapter" : "Video chapters" },
    { value: String(categoryCount), label: categoryCount === 1 ? "Category" : "Categories" },
  ];

  return (
    <section className="overflow-hidden border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:gap-14">
        {/* Catalog intro */}
        <div>
          <p className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-300">
            LearnGo course catalog
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Learn job-ready skills,{" "}
            <span className="text-sky-600 dark:text-sky-400">
              one chapter at a time.
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Structured video courses with chapter checklists and progress
            tracking. Preview free chapters before you enroll — paid courses
            are a one-time payment.
          </p>

          <form
            action="/search"
            method="GET"
            className="mt-6 flex max-w-xl items-center gap-2 rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
          >
            <Search className="ml-2 h-4 w-4 shrink-0 text-slate-400" />
            <input
              name="title"
              placeholder="Search courses, e.g. Next.js"
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
            />
            <Button type="submit" className="shrink-0 bg-sky-600 hover:bg-sky-700">
              Search
            </Button>
          </form>

        </div>

        {/* Student visual with floating course cards */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm dark:border-slate-800">
            <Image
              src="/hero.webp"
              alt="Graduate holding a notebook"
              fill
              priority
              className="object-cover object-[30%_center]"
            />
          </div>

          {featured && (
            <Link
              href={`/courses/${featured.id}`}
              className="group absolute -left-2 top-6 w-56 rounded-lg border border-slate-200 bg-white/95 p-3 shadow-md backdrop-blur transition-shadow hover:shadow-lg sm:-left-6 sm:w-64 dark:border-slate-800 dark:bg-slate-950/95"
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-sky-600 dark:text-sky-400">
                Featured · {featured.categoryName ?? "General"}
              </p>
              <p className="mt-1 line-clamp-1 text-sm font-semibold text-slate-900 dark:text-white">
                {featured.title}
              </p>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                  {!featured.price ? "Free" : formatPrice(featured.price)}
                </span>
                <span className="inline-flex items-center gap-0.5 text-xs font-medium text-sky-700 dark:text-sky-400">
                  View <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          )}

          <div className="absolute -bottom-2 -right-2 flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white/95 px-3.5 py-2.5 shadow-md backdrop-blur sm:-right-6 dark:border-slate-800 dark:bg-slate-950/95">
            <span className="inline-flex rounded-full bg-sky-50 p-1.5 dark:bg-sky-950">
              <ListVideo className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-none text-slate-900 dark:text-white">
                {chapterCount} {chapterCount === 1 ? "chapter" : "chapters"}
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <Check className="h-3 w-3 text-sky-600 dark:text-sky-400" />
                Progress saved per chapter
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
