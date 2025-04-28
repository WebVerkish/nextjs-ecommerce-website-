import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      title,
      slug,
      imageUrl,
      description,
      isActive,
      content,
      categoryId
    } = await request.json();
    const existingTraining = await db.training.findUnique({
      where: {
        slug,
      },
    });
    if (existingTraining) {
      return NextResponse.json(
        {
          data: null,
          message: "Training Already Exist",
        },
        { status: 409 }
      );
    }
    const newTraining = await db.training.create({
      data: {
        title,
        slug,
        imageUrl,
        description,
        isActive,
        content,
        categoryId
      },
    });
    //console.log(newTraining);
    return NextResponse.json(newTraining);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed Create Training",
        error,
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const trainings = await db.training.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(trainings);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch Trainings",
        error,
      },
      { status: 500 }
    );
  }
}
