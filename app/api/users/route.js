import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import {v4 as uuidv4} from "uuid";
import base64url from "base64url";
import { Resend } from "resend";
import {EmailTemplate} from "@/components/email-template";

// export async function POST(request){

//   try {
//     const resend = new Resend(process.env.RESEND_API_KEY);
//     //extract the credentials
//     const {name,email,password,role } = await request.json();
//     // /check is the user Already exists in the db
//     const existingUser = await db.user.findUnique({
//       where:{
//         email
//       }
//     })
//     if(existingUser){
//       return NextResponse.json({
//         data:null,
//         message:"User Already exists"
//       },{status:409})
//     }
//     // Encrypt the Password => bcrypt the password
//     const salt = await bcrypt.genSalt(10);
//     // Hash the password with the salt
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const rawToken = uuidv4();
//     console.log(rawToken);
//     const token = base64url.encode(rawToken);
//     const newUser = await db.user.create({
//       data:{
//         name,email,password:hashedPassword,role,verificationToken:token
//       }
//     })
//     //Send the Email if User Role = Farmer
//     if(role === "FARMER"){
//       console.log("hello");
//       const userId = newUser.id;
//       const linkText = "Verify Account";
//       const redirectUrl = `onboarding/${userId}?token=${token}`;
//       const sendMail = await resend.emails.send({
//         from:"kishnerahul860@gmail.com",
//         to:email,
//         subject:"Account Verification - Ecom World",
//         react:EmailTemplate({name,redirectUrl,linkText}),
//       })
//       console.log(sendMail);
//     }
//     return NextResponse.json({
//       data:newUser,
//       message:"User Created Successfully"
//     },{status:201});
//   } catch (error) {
//     //console.log(error);
//     return NextResponse.json({
//       error,
//       message:"Server Error: Something Went Wrong",
//       error
//     },{status:500})
//   }
// }
export async function POST(request) {
  try {
    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY);
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not defined in environment variables");
    }

    // Extract and validate credentials
    const { name, email, password, role,plan } = await request.json();
    if (!name || !email || !password || !role || !plan) {
      return NextResponse.json(
        { data: null, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { data: null, message: "User already exists" },
        { status: 409 }
      );
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate verification token
    const rawToken = uuidv4();
    const token = base64url.encode(rawToken);

    // Create new user
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        plan,
        verificationToken: token,
      },
    });

    // Send email if role is FARMER
    if (role === "FARMER") {
      const userId = newUser.id;
      const linkText = "Verify Account";
      const redirectUrl = `onboarding/${userId}?token=${token}`;
      const description =
      "Thank you, for Creating an Account with Us. We request you to click on the link below in order to Complete your onboarding Process. Thankyou";
      const subject = "Account Verification - Ecom World";
      const sendMail = await resend.emails.send({
        from: "Ecom <ecom_world@kishnerahul.site>",
        to: email,
        subject: subject,
        react: EmailTemplate({ name, redirectUrl, linkText,description,subject }),
      });

      if (!sendMail?.id) {
        console.error("Email sending failed:", sendMail);
        // Optionally handle email failure without blocking user creation
      }
    }

    // Return filtered user data (exclude sensitive fields)
    const { password: _, verificationToken: __, ...safeUserData } = newUser;
    return NextResponse.json(
      {
        data: safeUserData,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/users:", error.message);
    return NextResponse.json(
      {
        message: "Server Error: Something went wrong",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
export async function GET(request) {
  try {
    const users = await db.user.findMany({
      orderBy:{
          createdAt:"desc",
      }
    } );
    return NextResponse.json(users);
  }
  catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch Users",
        error,
      },
      { status: 500 }
    );
  }
}