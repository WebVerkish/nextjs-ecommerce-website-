import db from "@/lib/db";
import { NextResponse } from "next/server";

  export async function GET(request, { params: { id } }) {
    try {
      const order = await db.order.findMany({
        where: {
          userId:id,
        },
        orderBy: {
          createdAt: "desc",
        },
        include:{
          orderItems:true,
        }
      });
      return NextResponse.json(order);
    } catch (error) {
      //console.log(error);
      return NextResponse.json(
        {
          message: "Failed to fetch Order",
          error,
        },
        { status: 500 }
      );
    }
  }
  