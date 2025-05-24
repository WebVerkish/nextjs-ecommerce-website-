
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, couponCode, expiryDate,isActive,vendorId } = await request.json();
    const newCoupon = await db.coupon.create({
      data: {
        title,
        couponCode,
        expiryDate,
        isActive,
        vendorId
      },
    });
    //console.log(newCoupon);
    return NextResponse.json(newCoupon);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed Create Coupon",
        error,
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const coupons = await db.coupon.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.log(coupons);
    return NextResponse.json(coupons, { status: 200 });
  } catch (error) {
    console.error('Error fetching coupons:', error || 'Unknown error');
    return NextResponse.json(
      {
        message: 'Failed to fetch coupons. Please try again later.',
      },
      { status: 500 }
    );
  }
}