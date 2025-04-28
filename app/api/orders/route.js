import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { checkoutFormData, orderItems } = await request.json();
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

    // Create orderNumber function
    function generateOrderNumber(length) {
      const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let orderNumber = "";

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        orderNumber += characters.charAt(randomIndex);
      }

      return orderNumber;
    }

    // Use the Prisma transaction
    const result = await db.$transaction(async (prisma) => {
      // Create order and order items within the transaction
      const newOrder = await prisma.order.create({
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
          orderNumber:generateOrderNumber(8),
        },
      });

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

      // Calculate total amount for each product and create a sale for each
      const sales = await Promise.all(
        orderItems.map(async (item) => {
          const totalAmount = parseFloat(item.salePrice) * parseInt(item.qty);

          const newSale = await db.sale.create({
            data: {
              orderId: newOrder.id,
              productId: item.id,
              productTitle:item.title,
              productImage:item.imageUrl,
              productQty:parseInt(item.qty),
              productPrice: parseFloat(item.salePrice),
              vendorId: item.vendorId,
              total: totalAmount,
            },
          });

          return newSale;
        })
      );

      return { newOrder, sales };
    });

    console.log(result.newOrder, result.sales);

    // Return the response
    return NextResponse.json(result.newOrder);
  } catch (error) {
    console.error(error);
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
