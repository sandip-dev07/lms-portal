import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import CourseSidebarItem from "./course-sidebar-item";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & { userProgress: UserProgress[] | null })[];
  };
  progressCount: number;
}

const CourseSidebar = async ({ course, progressCount }: CourseSidebarProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const purchase = await db.purchase.findFirst({
    where: {
      userId: userId,
      courseId: course.id,
    },
  });

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto  shadow-sm">
      <div className="p-6 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {/* Check purchase and add progress count here */}
      </div>

      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            courseId={course.id}
            title={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;