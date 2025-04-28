import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request, { params: { id } }) {
    //console.log(id);
    try {
      const existingTraining= await db.training.findUnique({
        where: {
          id,
        },
      });
      //console.log(existingTraining);
      if (!existingTraining) {
        return NextResponse.json(
          {
            data: null,
            message: "Training Not Found",
          },
          { status: 404 }
        );
      }
      const deletedTraining = await db.training.delete({
        where: {
          id,
        },
      });
      return NextResponse.json(deletedTraining);
    } catch (error) {
      //console.log(error);
      return NextResponse.json(
        {
          message: "Failed to Delete Training",
          error,
        },
        { status: 500 }
      );
    }
  }
  export async function GET(request, { params: { id } }) {
    try {
      const training = await db.training.findUnique({
        where: {
          id,
        },
      });
      return NextResponse.json(training);
    } catch (error) {
      //console.log(error);
      return NextResponse.json(
        {
          message: "Failed to fetch Training",
          error,
        },
        { status: 500 }
      );
    }
  }
  
  export async function PUT(request, { params: { id } }) {
    try {
      const {
        title,
        slug,
        imageUrl,
        description,
        isActive,
        content,
        categoryId
      } =
        await request.json();
      const Training =  {
        title,
        slug,
        imageUrl,
        description,
        isActive,
        content,
        categoryId
      }
      const existingTraining = await db.training.findUnique({
        where: {
          id,
        },
      });
      if (!existingTraining) {
        return NextResponse.json(
          {
            data: null,
            message: "Not Found Trainig",
          },
          { status: 409 }
        );
      }
      const updateTraining = await db.training.update({
        where: { id },
        data: Training,
      });
      return NextResponse.json(updateTraining);
    } catch (error) {
      //console.log(error);
      return NextResponse.json(
        {
          message: "Failed to Update Trainig",
          error,
        },
        { status: 500 }
      );
    }
  }
  