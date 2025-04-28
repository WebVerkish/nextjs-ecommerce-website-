import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const sales = await db.sale.findMany({
      orderBy: {
        createdAt: "desc",
      },
      // include:{
      //   orderItems:true,
      // }
    });
    return NextResponse.json(sales);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch Sales",
        error,
      },
      { status: 500 }
    );
  }
}
