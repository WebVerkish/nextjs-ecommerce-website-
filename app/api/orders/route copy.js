import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
      const { checkoutFormData, orderItems } = await request.json();
  
      // Validate inputs
      if (!checkoutFormData || !orderItems || !Array.isArray(orderItems)) {
        throw new Error("Invalid request data");
      }
      function generateOrderNumber(length) {
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let orderNumber = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          orderNumber += characters.charAt(randomIndex);
        }
      
        return orderNumber;
      }

      const orderNumber = generateOrderNumber(8);
      const {
        city,
        country,
        emailAddress,
        firstName,
        lastName,
        paymentMethod,
        phoneNumber,
        shippingCost,
        streetAddress,
        userId,
        zipCode
      } = checkoutFormData;
  
      // Create order without orderItems directly
      const newOrder = await db.order.create({
        data: {
          userId,
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
          streetAddress,
          city,
          country,
          zipCode,
          shippingCost: shippingCost ? parseFloat(shippingCost) : 0,
          paymentMethod,
          orderNumber
        },
      });
      
      // Create order items
      // const newOrderItems = await db.orderItem.createMany({
      //   data: orderItems.map((item) => ({
      //     productId: item.id,
      //     quantity: item.qty ? parseInt(item.qty) : 1,
      //     price: item.salePrice ? parseFloat(item.salePrice) : 0,
      //     orderId: newOrder.id,
      //   })),
      // });
      for (const item of orderItems) {
        const existingItem = await db.orderItem.findFirst({
          where: { productId: item.id },
        });
  
        if (existingItem) {
          await db.orderItem.update({
            where: { id: existingItem.id },
            data: {
              quantity: existingItem.quantity + (parseInt(item.qty) || 1),
              price: parseFloat(item.salePrice) || existingItem.price,
            },
          });
        } else {
          await db.orderItem.create({
            data: {
              productId: item.id,
              vendorId:item.id,
              quantity: parseInt(item.qty) || 1,
              price: parseFloat(item.salePrice) || 0,
              orderId: newOrder.id,
              imageUrl:item.imageUrl,
              title:item.title,
              
            },
          });
        }
      }
      console.log("Success:", { newOrder });
      return NextResponse.json(newOrder);
    } catch (error) {
      console.error("Error in POST /api/orders:", {
        message: error.message,
        stack: error.stack,
      });
      return NextResponse.json(
        {
          message: "Failed Create Order",
          error: error.message,
        },
        { status: 500 }
      );
    }
  }
export async function GET(request) {
  try {
    const orders = await db.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include:{
        orderItems:true,
      }
    });
    return NextResponse.json(orders);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch Orders",
        error,
      },
      { status: 500 }
    );
  }
}
