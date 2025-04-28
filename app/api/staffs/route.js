import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try{
        const {name,staffPass,staffEmail,staffPhone,staffAddress,nin,dob,staffNotes,code,isActive} = await request.json();
        const newStaff = await db.staff.create({
            data:{
                name,staffPass,staffEmail,staffPhone,staffAddress,nin,dob,staffNotes,code,isActive
            }
        })
        //console.log(newStaff);
        return NextResponse.json(newStaff);
    }
    catch(error){
        //console.log(error);
        return NextResponse.json({
            message:"Failed Create Staff",
            error
        },{status:500})
    }
}
export async function GET(request) {
    try {
      const staffs = await db.staff.findMany({
        orderBy:{
            createdAt:"desc",
        }
      });
      return NextResponse.json(staffs);
    }
    catch (error) {
      //console.log(error);
      return NextResponse.json(
        {
          message: "Failed to fetch staff",
          error,
        },
        { status: 500 }
      );
    }
  }