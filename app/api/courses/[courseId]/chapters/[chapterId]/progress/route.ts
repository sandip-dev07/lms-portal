import { getUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const userId = getUserId();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { chapterId } = params;

    const body = await req.json();
    const { isCompleted } = body;

    if (typeof isCompleted !== "boolean") {
      return new NextResponse("Invalid payload", { status: 400 });
    }

    const userProgress = await db.userProgress.upsert({
      where: {
        chapterId_userId: {
          chapterId,
          userId,
        },
      },
      create: {
        userId,
        chapterId,
        isCompleted,
      },
      update: {
        isCompleted,
      },
      include: {
        chapter: true,
      },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    console.error("[CHAPTER_ID_PROGRESS]: ", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
