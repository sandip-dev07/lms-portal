import { db } from "@/lib/db";
import React from "react";
import Categories from "./_components/categories";
import SearchInput from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { getUserId } from "@/lib/auth";
import CoursesList from "@/components/courses-list";

interface SearchPageProps {
  searchParams: {
    title: string;
    category: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  // Public page: signed-out visitors can browse. Null userId means no
  // purchases/progress — getCourses then shows plain prices.
  const userId = getUserId();

  const category = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId: userId ?? "",
    ...searchParams,
  });

  return (
    <>
      <div className="px-4 pt-4 sm:px-6 sm:pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-4 sm:p-6 space-y-4">
        {!userId && (
          <div className="rounded-md border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-300">
            Browsing as a guest.{" "}
            <a href="/sign-in" className="font-medium underline underline-offset-2">
              Sign in
            </a>{" "}
            to enroll and track your progress.
          </div>
        )}
        <Categories items={category} />
        <>
          <CoursesList data={courses} />
        </>
      </div>
    </>
  );
};

export default SearchPage;
