import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, slug, imageUrl,categoryIds, description, isActive } =
      await request.json();
      const existingMarket = await db.market.findUnique({
        where:{
            slug,
        }
    })
    if(existingMarket){
        return NextResponse.json({
            data:null,
            message:"Market Already Exist"
        }
        ,{status:409})

    }
    const newMarket = await db.market.create({ 
      data: {
        title,
        slug,
        categoryIds,
        imageUrl,
        description,
        isActive,
      }
    });
    //console.log(newMarket);
    return NextResponse.json(newMarket);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed Create Staff",
        error,
      },
      { status: 500 }
    );
  }
}
export async function GET(request) {
  try {
    const markets = await db.market.findMany({
      orderBy:{
          createdAt:"desc",
      }
    } );
    return NextResponse.json(markets);
  }
  catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch Markets",
        error,
      },
      { status: 500 }
    );
  }
}

