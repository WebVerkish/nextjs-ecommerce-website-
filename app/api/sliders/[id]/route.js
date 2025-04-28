import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request, { params: { id } }) {
  //console.log(id);
  try {
    const existingBanner = await db.banner.findUnique({
      where: {
        id,
      },
    });
    //console.log(existingBanner);
    if (!existingBanner) {
      return NextResponse.json(
        {
          data: null,
          message: "Banner Not Found",
        },
        { status: 404 }
      );
    }
    const deletedBanner = await db.banner.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedBanner);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Delete Banner",
        error,
      },
      { status: 500 }
    );
  }
}
export async function GET(request, { params: { id } }) {
  try {
    const banner = await db.banner.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(banner);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch Sliders",
        error,
      },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params: { id } }) {
  try {
    const { title, link, imageUrl, isActive }  = await request.json();
    const newBanner = { title, link, imageUrl, isActive } ;
    const existingBanner = await db.banner.findUnique({
      where: {
        id,
      },
    });
    if (!existingBanner) {
      return NextResponse.json(
        {
          data: null,
          message: "Not Found Slider",
        },
        { status: 409 }
      );
    }
    const updateBanner = await db.banner.update({
      where:{id},
      data: newBanner,
    });
    return NextResponse.json(updateBanner);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Update Slider",
        error,
      },
      { status: 500 }
    );
  }
}