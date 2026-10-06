import { db } from "@/lib/db";
import { getUserId } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const userId = getUserId();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    const hasPublishedChapters = course.chapters.some(
      (chapter) => chapter.isPublished
    );

    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      course.price === null ||
      course.price === undefined ||
      !hasPublishedChapters
    ) {
      return new NextResponse(
        "Course is not ready to be published (set a price — 0 for free)",
        {
          status: 400,
        }
      );
    }

    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.error("[COURSES_PUBLISH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
