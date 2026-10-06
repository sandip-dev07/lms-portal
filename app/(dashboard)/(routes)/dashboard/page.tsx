import { redirect } from "next/navigation";
import { getUserId } from "@/lib/auth";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import CoursesList from "@/components/courses-list";
import { CheckCircle, Clock } from "lucide-react";
import InfoCard from "./_components/info-card";

export default async function Dashboard() {
  const userId = getUserId();
  if (!userId) return redirect("/");

  const { completedCourse, courseInProgress } = await getDashboardCourses({
    userId,
  });

  return (
    <main className="h-full w-full space-y-4 p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="Courses in progress"
          value={courseInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Courses completed"
          value={completedCourse.length}
          variant="success"
        />
      </div>

      <CoursesList data={[...courseInProgress, ...completedCourse]} />
    </main>
  );
}
