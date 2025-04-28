import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request, { params: { id } }) {
  //console.log(id);
  try {
    const existingMarket = await db.market.findUnique({
      where: {
        id,
      },
    });
    //console.log(existingMarket);
    if (!existingMarket) {
      return NextResponse.json(
        {
          data: null,
          message: "Market Not Found",
        },
        { status: 404 }
      );
    }
    const deletedMarket = await db.market.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedMarket);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Delete Market",
        error,
      },
      { status: 500 }
    );
  }
}
export async function GET(request, { params: { id } }) {
  try {
    const market = await db.market.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(market);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch Market",
        error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params: { id } }) {
  try {
    const { title, slug, imageUrl, categoryIds, description, isActive } =
      await request.json();
    const Market = {
      title,
      slug,
      imageUrl,
      categoryIds,
      description,
      isActive,
    };
    const existingMarket = await db.market.findUnique({
      where: {
        id,
      },
    });
    if (!existingMarket) {
      return NextResponse.json(
        {
          data: null,
          message: "Not Found Market",
        },
        { status: 409 }
      );
    }
    const updateMarket = await db.market.update({
      where: { id },
      data: Market,
    });
    return NextResponse.json(updateMarket);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Update Market",
        error,
      },
      { status: 500 }
    );
  }
}
