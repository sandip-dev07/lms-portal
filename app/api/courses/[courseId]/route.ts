import { db } from "@/lib/db";
import { getUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// Videos are stored on Cloudinary (see chapters/[chapterId]/route.ts).
// Deleting here only cleans up the Cloudinary asset; missing Cloudinary
// keys must not break course PATCH/DELETE, so failures are logged.
const destroyCloudinaryVideo = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
  } catch (error) {
    console.warn("[COURSES_ID] Cloudinary asset deletion failed:", error);
  }
};

// Create course
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const userId = getUserId();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { courseId } = params;
    const values = await req.json();

    const course = await db.course.update({
      where: { id: courseId, userId: userId },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Delete course
export async function DELETE(
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
        userId: userId,
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
      return new NextResponse("Unauthorized", { status: 401 });
    }

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assestId) {
        await destroyCloudinaryVideo(chapter.muxData.assestId);
      }
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });
    
    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSES_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
