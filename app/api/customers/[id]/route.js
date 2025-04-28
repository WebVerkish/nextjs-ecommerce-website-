import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const customer = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
        id: true,
        role: true,
        createdAt: true,
        profile: true,
      },
    });
    return NextResponse.json(customer);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch Customer",
        error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingCustomer = await db.user.findUnique({
      where: {
        id,
      },
    });
    //console.log(existingFarmer);
    if (!existingCustomer) {
      return NextResponse.json(
        {
          data: null,
          message: "Customer Not Found",
        },
        { status: 404 }
      );
    }
    const deletedCustomer = await db.user.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedCustomer);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Delete Customer",
        error,
      },
      { status: 500 }
    );
  }
}

// export async function PUT(request, { params }) {
//   const id = params.id;
//   let body;
//   try {
//     body = await request.json();
//     const {
//       city,
//       country,
//       dateOfBirth,
//       email,
//       firstName,
//       id: requestId,
//       lastName,
//       name,
//       phone,
//       profileImageUrl,
//       streetAddress,
//       userId,
//       username,
//       zipCode,
//     } = body;

//     const formattedDateOfBirth = dateOfBirth
//       ? new Date(dateOfBirth).toISOString()
//       : undefined;

//     const Customer = {
//       city,
//       country,
//       dateOfBirth: formattedDateOfBirth,
//       profileImageUrl,
//       address: streetAddress,
//       name,
//       firstName,
//       lastName,
//       email,
//       username,
//       phone,
//       streetAddress,
//       zipCode,
//       userId
//     };

//     const existingUser = await db.user.findUnique({
//       where: {
//         id,
//       },
//     });

//     if (!existingUser) {
//       return NextResponse.json(
//         {
//           data: null,
//           message: "User Not Found",
//         },
//         { status: 404 }
//       );
//     }

//     const updateUserProfile = await db.userProfile.upsert({
//       where: { userId: id },
//       update: Customer,
//       create: {
//         ...Customer,
//         userId: id, // Explicitly set userId
//       },
//     });

//     return NextResponse.json(updateUserProfile);
//   } catch (error) {
//     console.error('Error updating user:', {
//       id,
//       customerData: body || 'Failed to parse request body',
//       name: error.name,
//       message: error.message,
//       stack: error.stack,
//       code: error.code,
//     });

//     return NextResponse.json(
//       {
//         message: "Failed to Update User",
//         error: {
//           name: error.name,
//           message: error.message,
//           stack: error.stack,
//           code: error.code,
//         },
//       },
//       { status: 500 }
//     );
//   }
// }

export async function PUT(request, { params }) {
  const id = params.id; // User.id from route params
  let body;
  try {
    body = await request.json();
    const {
      city,
      country,
      dateOfBirth,
      email,
      firstName,
      id: requestId, // Renamed to avoid conflict with params.id
      lastName,
      name,
      phone,
      profileImageUrl,
      streetAddress,
      userId,
      username,
      zipCode,
      role, // Include role if you want to update User.role
    } = body;

    // Convert dateOfBirth to ISO-8601 format if it exists
    const formattedDateOfBirth = dateOfBirth
      ? new Date(dateOfBirth).toISOString()
      : undefined;

    // Data for UserProfile update
    const profileData = {
      city,
      country,
      dateOfBirth: formattedDateOfBirth,
      profileImageUrl,
      address: streetAddress,
      name,
      firstName,
      lastName,
      email,
      username,
      phone,
      streetAddress,
      zipCode,
      userId: userId,
    };

    // Data for User update (only fields that exist in User model)
    const userData = {
      name: name || undefined,
      email: email || undefined,
      role: role || undefined, // Only if you want to update role
    };

    // Check if the user exists
    const existingUser = await db.user.findUnique({
      where: {
        id, // params.id is the User.id
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }

    // Check if the userProfile exists based on userId
    const existingProfile = await db.userProfile.findUnique({
      where: {
        userId: id, // Use params.id as userId
      },
    });

    if (!existingProfile) {
      return NextResponse.json(
        {
          data: null,
          message: "User Profile Not Found",
        },
        { status: 404 }
      );
    }

    // Update both User and UserProfile in a transaction
    const [updatedUser, updatedProfile] = await db.$transaction([
      // Update User
      db.user.update({
        where: { id },
        data: userData,
      }),
      // Update UserProfile
      db.userProfile.update({
        where: { userId: id },
        data: profileData,
      }),
    ]);

    return NextResponse.json({
      user: updatedUser,
      profile: updatedProfile,
    });
  } catch (error) {
    console.error('Error updating user:', {
      id,
      customerData: body || 'Failed to parse request body',
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code,
    });

    return NextResponse.json(
      {
        message: "Failed to Update User",
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
      },
      { status: 500 }
    );
  }
}