import { db } from "@/lib/db";
import type { CourseWithProgressWithCategory } from "@/actions/get-courses";
import HomeNavbar from "./_components/home-navbar";
import Hero, { type HeroCourse } from "./_components/hero";
import CategoriesStrip, {
  type CategoryWithCount,
} from "./_components/categories-strip";
import Catalog from "./_components/catalog";
import Features from "./_components/features";
import HowItWorks from "./_components/how-it-works";
import Teach from "./_components/teach";
import Faq from "./_components/faq";
import SiteFooter from "./_components/site-footer";

const toHeroCourse = (course: {
  id: string;
  title: string;
  imageUrl: string | null;
  price: number | null;
  category: { name: string } | null;
  chapters: { id: string }[];
}): HeroCourse => ({
  id: course.id,
  title: course.title,
  imageUrl: course.imageUrl,
  price: course.price,
  categoryName: course.category?.name ?? null,
  chapterCount: course.chapters.length,
});

const Home = async () => {
  let courses: CourseWithProgressWithCategory[] = [];
  let categoryItems: CategoryWithCount[] = [];
  let categoryCount = 0;
  let totalPublished = 0;
  let totalChapters = 0;

  try {
    const [published, categories, publishedCount, chapterCount] =
      await Promise.all([
        db.course.findMany({
          where: { isPublished: true },
          include: {
            category: true,
            chapters: {
              where: { isPublished: true },
              select: { id: true },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 8,
        }),
        db.category.findMany({
          orderBy: { name: "asc" },
          include: {
            _count: {
              select: { courses: { where: { isPublished: true } } },
            },
          },
        }),
        db.course.count({ where: { isPublished: true } }),
        db.chapter.count({
          where: { isPublished: true, course: { isPublished: true } },
        }),
      ]);
    courses = published.map((course) => ({ ...course, progress: null }));
    categoryItems = categories.map((category) => ({
      id: category.id,
      name: category.name,
      courseCount: category._count.courses,
    }));
    categoryCount = categories.length;
    totalPublished = publishedCount;
    totalChapters = chapterCount;
  } catch {
    // Landing page must never crash because the catalog query failed.
    courses = [];
    categoryItems = [];
    categoryCount = 0;
  }

  const featured = courses[0] ?? null;

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <div className="fixed inset-x-0 top-0 z-50 h-16">
        <HomeNavbar />
      </div>
      <div className="pt-16">
        <Hero
          courseCount={totalPublished}
          chapterCount={totalChapters}
          categoryCount={categoryCount}
          featured={featured ? toHeroCourse(featured) : null}
        />
        <CategoriesStrip items={categoryItems} />
        <Catalog courses={courses.slice(0, 4)} />
        <Features />
        <HowItWorks />
        <Teach />
        <Faq />
        <SiteFooter />
      </div>
    </main>
  );
};

export default Home;
