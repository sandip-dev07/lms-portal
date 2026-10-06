import { db } from "@/lib/db";
import { getUserId } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const userId = getUserId();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { list } = await req.json();

    const courseOwner = await db.course.findFirst({
      where: {
        id: params.courseId,
        userId: userId,  
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    for (let item of list) {
      await db.chapter.update({
        where: {
          id: item.id,
        },
        data: {
          position: item.position,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
