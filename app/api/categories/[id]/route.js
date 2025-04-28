import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const category = await db.category.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch Categories",
        error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  //console.log(id);
  try {
    const existingCategory = await db.category.findUnique({
      where: {
        id,
      },
    });
    //console.log(existingCategory)
    if (!existingCategory) {
      return NextResponse.json(
        {
          data: null,
          message: "Category Not Found",
        },
        { status: 404 }
      );
    }
    const deletedCategory = await db.category.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedCategory);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Delete Category",
        error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params: { id } }) {
  try {
    const { title, slug, imageUrl, description, isActive } =
      await request.json();
    const newCategory = { title, slug, imageUrl, description, isActive };
    const existingCategory = await db.category.findUnique({
      where: {
        id,
      },
    });
    if (!existingCategory) {
      return NextResponse.json(
        {
          data: null,
          message: "Not Found Category",
        },
        { status: 409 }
      );
    }
    const updateCategory = await db.category.update({
      where:{id},
      data: newCategory,
    });
    return NextResponse.json(updateCategory);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Update Category",
        error,
      },
      { status: 500 }
    );
  }
}
