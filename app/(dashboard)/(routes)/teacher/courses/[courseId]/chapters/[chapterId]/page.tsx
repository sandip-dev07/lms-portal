import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { getUserId } from "@/lib/auth";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/desc-form";
import AccessFrom from "./_components/access-form";
import VideoForm from "./_components/video-form";
import Banner from "@/components/banner";
import ChapterActions from "./_components/chapter-actions";
import BackButton from "./_components/back-button";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const userId = getUserId();

  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/search");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completeText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished ? (
        <Banner
          variant="warning"
          label="This chapter is not published & it will not be visible in the course."
        />
      ) : (
        <Banner
          variant="success"
          label="This chapter is published & it will be visible in the course."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between w-full">
          <div className="w-full">
            {/* <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link> */}
            <BackButton />
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
                <span className="text-sm text-slate-700 dark:text-slate-400">
                  Complete all fields {completeText}
                </span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2
       gap-6 mt-16"
        >
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize chapter</h2>
              </div>

              {/* Chapter Title Form */}
              <div>
                <TitleForm
                  initialData={chapter}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                />
              </div>
              <div>
                <DescriptionForm
                  initialData={chapter}
                  chapterId={params.chapterId}
                  courseId={params.courseId}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Access Settings</h2>
              </div>
              <div>
                <AccessFrom
                  initialData={chapter}
                  chapterId={params.chapterId}
                  courseId={params.courseId}
                />
              </div>
            </div>
          </div>

          {/*  -------- */}
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Add Video</h2>
            </div>

            <div>
              <VideoForm
                initialData={chapter}
                chapterId={params.chapterId}
                courseId={params.courseId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
