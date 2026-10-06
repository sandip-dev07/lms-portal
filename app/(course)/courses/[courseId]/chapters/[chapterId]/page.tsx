import { getChapter } from "@/actions/get-chapter";
import Banner from "@/components/banner";
import { redirect } from "next/navigation";
import { getUserId } from "@/lib/auth";
import React from "react";
import VideoPlayer from "./_components/video-player";
import CourseEnrollButton from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { File } from "lucide-react";
import CourseProgressButton from "./_components/course-progress-button";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const userId = getUserId();
  if (!userId) {
    redirect("/");
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({ userId, ...params });

  if (!chapter || !course) {
    redirect("/search");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner label="You have completed this chapter" variant="success" />
      )}
      {isLocked && (
        <Banner
          label="You need to purchase this course to watch this chapter"
          variant="warning"
        />
      )}

      <div className="flex flex-col max-w-5xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            videoPublicId={muxData?.assestId}
            videoUrl={muxData?.playbackId}
            nextChapter={nextChapter?.id}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>

        <div>
          <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton
                courseId={params.courseId}
                chapterId={params.chapterId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <div>
                <CourseEnrollButton
                  courseId={params.courseId}
                  price={course.price ?? 0}
                />
              </div>
            )}
          </div>

          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          <div className="mt-6">
            <Separator />
            <p className="text-lg font-semibold mb-2 p-3">Attachments</p>
            <div className="px-4">
              {attachments?.map((attachment) => (
                <a
                  key={attachment.id}
                  href={attachment.url}
                  target="_blank"
                  className="flex items-center p-3 w-full bg-sky-200/50 dark:bg-slate-700 text-sky-700 dark:text-sky-400 hover:bg-sky-300 dark:hover:bg-slate-600"
                >
                  <File className="h-5 w-5 mr-2 text-sky-700 dark:text-sky-400" />
                  <p className="line-clamp-1">{attachment.name}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
