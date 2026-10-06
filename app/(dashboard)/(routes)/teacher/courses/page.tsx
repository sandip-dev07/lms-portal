import React from "react";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

import { redirect } from "next/navigation";
import { getUserId } from "@/lib/auth";
import { db } from "@/lib/db";

const Courses = async () => {
  const userId = getUserId();
  if (!userId) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4 sm:p-6">
      <div className="w-full mx-auto py-6 sm:py-10">
        <DataTable columns={columns} data={courses} />
      </div>
    </div>
  );
};

export default Courses;
