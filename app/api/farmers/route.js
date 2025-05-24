import db from "@/lib/db";
import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     // {
//     //   title,
//     //   farmerEmail,
//     //   farmerPhone,
//     //   farmerAddress,
//     //   farmerContactPerson,
//     //   farmerContactPersonPhone,
//     //   farmerPaymentTerms,
//     //   farmerNotes,
//     //   isActive,
//     //   profileImageUrl,
//     //   products,
//     //   landSize,
//     //   mainCrop,
//     //   userId
//     // }
//     const farmerData = await request.json();
//     //console.log(farmerData);
    
//     if (!farmerData || typeof farmerData !== "object") {
//       throw new Error("Invalid request body: Must be an object");
//     }

//     const existingUser = await db.user.findUnique({
//       where: { 
//         id:farmerData.userId,
//        },
//     });
//     if (!existingUser) {
//       return NextResponse.json(
//         { data: null, message: "No User Found" },
//         { status: 404 }
//       );
//     }
//     //update
//     const updateUser = await db.user.update({
//       where:{
//         id:farmerData.userId,
//       },
//       data:{
//         emailVerified:true,
//       }
//     })
//     let userId = farmerData.userId;
//     // Store data if user exists
//     const newFarmer = await db.farmerProfile.create({
//       data: {
//         title: farmerData.title || "Untitled",
//         code: farmerData.code || "N/A",
//         farmerEmail: farmerData.farmerEmail || "",
//         farmerPhone: farmerData.farmerPhone || "",
//         farmerAddress: farmerData.farmerAddress || "",
//         farmerContactPerson: farmerData.farmerContactPerson || "",
//         farmerContactPersonPhone: farmerData.farmerContactPersonPhone || "",
//         farmerPaymentTerms: farmerData.farmerPaymentTerms || "",
//         farmerNotes: farmerData.farmerNotes || "",
//         isActive: farmerData.isActive ?? true, // Default to true if missing
//         profileImageUrl: farmerData.imageUrl || "",
//         products: farmerData.products || [],
//         landSize: farmerData.landSize ? parseFloat(farmerData.landSize) : 0, // Avoid NaN
//         mainCrop: farmerData.mainCrop || "Unknown",
//         userId: userId, // Assigned above
//       },
//     });
//     return NextResponse.json(newFarmer);
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: "Failed Create Farmer",
//         error,
//       },
//       { status: 500 }
//     );
//   }
// }
const isValidObjectId = (id) => {
  return id && /^[0-9a-fA-F]{24}$/.test(id);
};

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      firstName,
      lastName,
      title,
      farmerEmail,
      farmerPhone,
      farmerAddress,
      farmerContactPerson,
      farmerContactPersonPhone,
      farmerPaymentTerms,
      farmerNotes,
      code,
      profileImageUrl,
      landSize,
      mainCrop,
      products,
      userId,
      isActive = true,
    } = data;

    // Validate required fields
    if (!firstName || !lastName || !farmerEmail || !farmerPhone || !farmerAddress || !code || !userId || !title || !landSize || !mainCrop || !products) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate userId as ObjectId
    if (!isValidObjectId(userId)) {
      return NextResponse.json(
        { message: 'Invalid userId. Must be a valid 24-character ObjectId.' },
        { status: 400 }
      );
    }

    // Validate landSize as Float
    const parsedLandSize = parseFloat(landSize);
    if (isNaN(parsedLandSize)) {
      return NextResponse.json(
        { message: 'Invalid landSize. Must be a valid number.' },
        { status: 400 }
      );
    }

    // Validate products as array
    if (!Array.isArray(products)) {
      return NextResponse.json(
        { message: 'Products must be an array.' },
        { status: 400 }
      );
    }

    // Check if code is unique
    const existingFarmer = await db.farmerProfile.findFirst({
      where: { code },
    });
    if (existingFarmer) {
      return NextResponse.json(
        { message: 'Farmer code already exists' },
        { status: 400 }
      );
    }

    // Create farmer profile
    const farmer = await db.farmerProfile.create({
      data: {
        firstName,
        lastName,
        title,
        farmerEmail,
        farmerPhone,
        farmerAddress,
        farmerContactPerson,
        farmerContactPersonPhone,
        farmerPaymentTerms,
        farmerNotes,
        code,
        profileImageUrl,
        landSize: parsedLandSize,
        mainCrop,
        products,
        userId,
        isActive,
      },
    });

    return NextResponse.json(
      { message: 'Farmer profile created successfully', farmer },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating farmer profile:', {
      error: error.message,
      stack: error.stack,
      code: error.code,
    });

    return NextResponse.json(
      {
        message: 'Failed to create farmer profile',
        error: {
          message: error.message,
          code: error.code,
        },
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
