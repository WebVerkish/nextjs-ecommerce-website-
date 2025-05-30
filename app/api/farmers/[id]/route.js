import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const farmer = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        FarmerProfile: true,
      },
    });
    return NextResponse.json(farmer);
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
export async function DELETE(request, { params: { id } }) {
  try {
    const existingFarmer = await db.user.findUnique({
      where: {
        id,
      },
    });
    //console.log(existingFarmer);
    if (!existingFarmer) {
      return NextResponse.json(
        {
          data: null,
          message: "Farmer Not Found",
        },
        { status: 404 }
      );
    }
    const deletedFarmer = await db.user.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedFarmer);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Delete Farmer",
        error,
      },
      { status: 500 }
    );
  }
}
//farmer status and emailVerified details update
// export async function PUT(request, { params: { id } }) {
//   try {
//     const
//         {
//           title,
//           code,
//           farmerEmail,
//           farmerPhone,
//           farmerAddress,
//           farmerContactPerson,
//           farmerContactPersonPhone,
//           farmerPaymentTerms,
//           farmerNotes,
//           isActive, // Default to true if missing
//           profileImageUrl,
//           products,
//           landSize, // Avoid NaN
//           mainCrop,
//           userId, // Assigned above
//         } = await request.json();
//     const Farmer = {
//       title,
//       code,
//       farmerEmail,
//       farmerPhone,
//       farmerAddress,
//       farmerContactPerson,
//       farmerContactPersonPhone,
//       farmerPaymentTerms,
//       farmerNotes,
//       isActive, // Default to true if missing
//       profileImageUrl,
//       products,
//       landSize, // Avoid NaN
//       mainCrop,
//       userId, // Assigned above
//     }
//     const existingFarmer = await db.farmerProfile.findUnique({
//       where: {
//         id,
//       },
//     });
//     if (!existingFarmer) {
//       return NextResponse.json(
//         {
//           data: null,
//           message: "Not Found Coupon",
//         },
//         { status: 409 }
//       );
//     }
//     const updateFarmer = await db.farmerProfile.update({
//       where: { id },
//       data: Farmer,
//     });
//     return NextResponse.json(updateFarmer);
//   } catch (error) {
//     //console.log(error);
//     return NextResponse.json(
//       {
//         message: "Failed to Update Coupon",
//         error,
//       },
//       { status: 500 }
//     );
//   }
// }
//farmer details update
export async function PUT(request, { params: { id } }) {
  try {
    const
        {
          status,emailVerified
        } = await request.json();
    const existingUser = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: "Not Found",
        },
        { status: 409 }
      );
    }
    const updateUser = await db.user.update({
      where: { id },
      data: {status,emailVerified},
    });
    return NextResponse.json(updateUser);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Update User",
        error,
      },
      { status: 500 }
    );
  }
}