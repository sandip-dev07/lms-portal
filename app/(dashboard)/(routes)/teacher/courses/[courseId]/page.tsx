import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { getUserId } from "@/lib/auth";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
  LucideIcon,
} from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/desc-form";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/category-form";
import PriceForm from "./_components/price-form";
import AttachmentForm from "./_components/attachment-form";
import ChaptersForm from "./_components/chapters-form";
import Banner from "@/components/banner";
import Actions from "./_components/actions";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const userId = getUserId();

  if (!userId) {
    return redirect("/login");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId: userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/search");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price !== null && course.price !== undefined,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished ? (
        <Banner
          label="Course is not published yet. It will not be visible to students"
          variant="warning"
        />
      ) : (
        <Banner
          label="Course is published. It will be visible to students"
          variant="success"
        />
      )}
      <div className="p-6">
        <div className="flex items-center w-full justify-between">
          <Header
            title="Course Setup"
            subtitle={`Complete all fields ${completionText}`}
          />

          {/* actions */}
          <Actions
            disabled={!isComplete}
            courseId={course.id}
            isPublished={course.isPublished}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <Section title="Customize your course" icon={LayoutDashboard}>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
            />
          </Section>

          <div className="space-y-6">
            <Section title="Course Chapters" icon={ListChecks}>
              <ChaptersForm initialData={course} courseId={course.id} />
            </Section>

            <Section title="Sell your course" icon={CircleDollarSign}>
              <PriceForm initialData={course} courseId={course.id} />
            </Section>

            <Section title="Resources & Attachments" icon={File}>
              <AttachmentForm initialData={course} courseId={course.id} />
            </Section>
          </div>
        </div>
      </div>
    </>
  );
};

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="flex items-center justify-between">
    <div className="flex flex-col gap-y-2">
      <h1 className="text-2xl font-medium">{title}</h1>
      <span className="text-sm text-slate-700 dark:text-slate-400">{subtitle}</span>
    </div>
  </div>
);

const Section = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) => (
  <>
    <div>
      <div className="flex items-center gap-2">
        <IconBadge icon={Icon} />
        <h2 className="text-xl">{title}</h2>
      </div>
      {children}
    </div>
  </>
);

export default CourseIdPage;
