import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    let user = null;
    try {
      user = await currentUser();
    } catch {
      user = null;
    }
    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findFirst({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    const purchase = await db.purchase.findUnique({
      where: {
        courseId_userId: {
          courseId: params.courseId,
          userId: user.id,
        },
      },
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    // Free course (price 0 or unset): enroll directly, no Stripe involved.
    if (!course.price) {
      await db.purchase.create({
        data: {
          courseId: params.courseId,
          userId: user.id,
        },
      });

      const firstChapter = await db.chapter.findFirst({
        where: { courseId: params.courseId, isPublished: true },
        orderBy: { position: "asc" },
        select: { id: true },
      });

      return NextResponse.json({
        url: firstChapter
          ? `/courses/${course.id}/chapters/${firstChapter.id}`
          : `/courses/${course.id}`,
      });
    }

    // Line items for the Stripe checkout
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(course.price! * 100), // Fix here: only multiply by 100 once to convert to cents
          product_data: {
            name: course.title,
            description: course.description!,
          },
        },
      },
    ];

    let stripeCustomer = await db.stripePayment.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses?.[0]?.emailAddress,
      });

      await db.stripePayment.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        },
      });

      stripeCustomer = { stripeCustomerId: customer.id };
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?cancel=1`,
      metadata: {
        courseId: course.id,
        userId: user.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[CHECKOUT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
