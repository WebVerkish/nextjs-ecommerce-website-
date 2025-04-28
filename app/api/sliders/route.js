import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, link, imageUrl, isActive } = await request.json();
    const newSlider = await db.banner.create({
      data: {
        title,
        link,
        imageUrl,
        isActive,
      },
    });
    //console.log(newSlider);
    return NextResponse.json(newSlider);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed Create Banner",
        error,
      },
      { status: 500 }
    );
  }
}
export async function GET(request) {
  try {
    const banners = await db.banner.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(banners);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch Banner",
        error,
      },
      { status: 500 }
    );
  }
}

