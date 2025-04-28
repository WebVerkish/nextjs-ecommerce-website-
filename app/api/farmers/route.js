import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // {
    //   title,
    //   farmerEmail,
    //   farmerPhone,
    //   farmerAddress,
    //   farmerContactPerson,
    //   farmerContactPersonPhone,
    //   farmerPaymentTerms,
    //   farmerNotes,
    //   isActive,
    //   profileImageUrl,
    //   products,
    //   landSize,
    //   mainCrop,
    //   userId
    // }
    const farmerData = await request.json();
    //console.log(farmerData);
    
    if (!farmerData || typeof farmerData !== "object") {
      throw new Error("Invalid request body: Must be an object");
    }

    const existingUser = await db.user.findUnique({
      where: { 
        id:farmerData.userId,
       },
    });
    if (!existingUser) {
      return NextResponse.json(
        { data: null, message: "No User Found" },
        { status: 404 }
      );
    }
    //update
    const updateUser = await db.user.update({
      where:{
        id:farmerData.userId,
      },
      data:{
        emailVerified:true,
      }
    })
    let userId = farmerData.userId;
    // Store data if user exists
    const newFarmer = await db.farmerProfile.create({
      data: {
        title: farmerData.title || "Untitled",
        code: farmerData.code || "N/A",
        farmerEmail: farmerData.farmerEmail || "",
        farmerPhone: farmerData.farmerPhone || "",
        farmerAddress: farmerData.farmerAddress || "",
        farmerContactPerson: farmerData.farmerContactPerson || "",
        farmerContactPersonPhone: farmerData.farmerContactPersonPhone || "",
        farmerPaymentTerms: farmerData.farmerPaymentTerms || "",
        farmerNotes: farmerData.farmerNotes || "",
        isActive: farmerData.isActive ?? true, // Default to true if missing
        profileImageUrl: farmerData.imageUrl || "",
        products: farmerData.products || [],
        landSize: farmerData.landSize ? parseFloat(farmerData.landSize) : 0, // Avoid NaN
        mainCrop: farmerData.mainCrop || "Unknown",
        userId: userId, // Assigned above
      },
    });
    return NextResponse.json(newFarmer);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed Create Farmer",
        error,
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const farmers = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where:{
        role:"FARMER"
      },
      include:{
        FarmerProfile:true,
      }
    });
    return NextResponse.json(farmers);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch Farmers",
        error,
      },
      { status: 500 }
    );
  }
}
