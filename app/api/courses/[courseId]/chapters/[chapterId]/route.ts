import { db } from "@/lib/db";
import { getUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const userId = getUserId();
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findFirst({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    // Check if new video URL is provided
    if (values.videoUrl) {
      const existingCloudinaryData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      if (existingCloudinaryData) {
        const assetUsage = await db.muxData.count({
          where: { assestId: existingCloudinaryData.assestId },
        });

        if (assetUsage === 1) {
          await cloudinary.uploader.destroy(existingCloudinaryData.assestId, {
            resource_type: "video",
          });
        }

        await db.muxData.delete({
          where: {
            id: existingCloudinaryData.id,
          },
        });
      }

      const uploadResponse = await cloudinary.uploader.upload(values.videoUrl, {
        resource_type: "video",
        folder: "lms_videos",
        // Pre-generate the adaptive-bitrate HLS variant used for the
        // in-player quality switch. Async so the request returns fast;
        // the player falls back to progressive mp4 until it is ready.
        eager: [{ streaming_profile: "full_hd", format: "m3u8" }],
        eager_async: true,
      });

      await db.muxData.create({
        data: {
          assestId: uploadResponse.public_id,
          chapterId: params.chapterId,
          playbackId: uploadResponse.secure_url,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.error("[COURSES_ID_CHAPTER_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const userId = getUserId();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findFirst({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find and delete the chapter
    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
      },
    });

    if (!chapter) {
      return new NextResponse("Chapter not found", { status: 404 });
    }

    // Delete associated video assets if they exist
    if (chapter.videoUrl) {
      const existingCloudinaryData = await db.muxData.findFirst({
        where: { chapterId: params.chapterId },
      });

      if (existingCloudinaryData) {
        // Check if this Cloudinary asset is only used by this chapter
        const assetUsage = await db.muxData.count({
          where: { assestId: existingCloudinaryData.assestId },
        });

        if (assetUsage === 1) {
          // Delete the Cloudinary asset if no other chapter is using it
          await cloudinary.uploader.destroy(existingCloudinaryData.assestId, {
            resource_type: "video",
          });
        }

        // Delete the Cloudinary data record from the database
        await db.muxData.delete({ where: { id: existingCloudinaryData.id } });
      }
    }

    // Delete the chapter from the database
    await db.chapter.delete({
      where: {
        id: params.chapterId,
      },
    });

    // Unpublish the course if no other chapters are published
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    });

    if (!publishedChapters.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return new NextResponse("Chapter deleted successfully", { status: 200 });
  } catch (error) {
    console.error("[COURSES_ID_CHAPTER_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
