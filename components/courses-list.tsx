import { CourseWithProgressWithCategory } from "@/actions/get-courses";
import React from "react";
import CourseCard from "./course-card";

interface CoursesListProps {
  data: CourseWithProgressWithCategory[];
}

const CoursesList = ({ data }: CoursesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {data.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            imageUrl={course.imageUrl!}
            chapterLength={course.chapters.length}
            price={course.price ?? 0}
            category={course?.category?.name!}
            progress={course.progress!}
          />
        ))}
      </div>
      {data.length === 0 && (
        <div className="text-center text-sm font-medium text-muted-foreground mt-10">
          <p className="">No courses found</p>
        </div>
      )}
    </div>
  );
};

export default CoursesList;
