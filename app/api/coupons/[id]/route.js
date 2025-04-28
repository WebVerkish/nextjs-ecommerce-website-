import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request, { params: { id } }) {
  try {
    const existingCoupon = await db.coupon.findUnique({
      where: {
        id,
      },
    });
    //console.log(existingCoupon);
    if (!existingCoupon) {
      return NextResponse.json(
        {
          data: null,
          message: "Coupon Not Found",
        },
        { status: 404 }
      );
    }
    const deletedCoupon = await db.coupon.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedCoupon);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Delete Coupon",
        error,
      },
      { status: 500 }
    );
  }
}
export async function GET(request, { params: { id } }) {
  try {
    const coupon = await db.coupon.findUnique({
      where: {
        id,
      }
    });
    return NextResponse.json(coupon);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch Coupons",
        error,
      },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params: { id } }) {
  try {
    const { title, couponCode, expiryDate,isActive } =
      await request.json();
    const newCoupon = { title, couponCode, expiryDate,isActive };
    const existingCoupon = await db.coupon.findUnique({
      where: {
        id,
      },
    });
    if (!existingCoupon) {
      return NextResponse.json(
        {
          data: null,
          message: "Not Found Coupon",
        },
        { status: 409 }
      );
    }
    const updateCoupon = await db.coupon.update({
      where:{id},
      data: newCoupon,
    });
    return NextResponse.json(updateCoupon);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Update Coupon",
        error,
      },
      { status: 500 }
    );
  }
}