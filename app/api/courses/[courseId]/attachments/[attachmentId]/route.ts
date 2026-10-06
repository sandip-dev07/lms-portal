import { db } from "@/lib/db";
import { getUserId } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentId: string } }
) {
  try {
    const userId = getUserId();
    if (!userId) {
      console.error("Unauthorized: No user ID found");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log(`User ID: ${userId}`);
    console.log(`Course ID: ${params.courseId}`);
    console.log(`Attachment ID: ${params.attachmentId}`);

    const courseOwner = await db.course.findFirst({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });
    if (!courseOwner) {
      console.error("Unauthorized: User is not the owner of the course");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the attachment exists for the given course
    const attachment = await db.attachment.findFirst({
      where: {
        id: params.attachmentId,
        courseId: params.courseId,
      },
    });

    if (!attachment) {
      console.error("Attachment not found");
      return new NextResponse("Attachment not found", { status: 404 });
    }

    // Now delete the attachment by id
    await db.attachment.delete({
      where: {
        id: params.attachmentId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("[COURSES_ID_ATTACH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
