import db from "@/lib/db";
import { NextResponse } from "next/server";

// export async function DELETE(request, { params: { slug } }) {
//   //console.log(id);
//   try {
//     const existingProduct = await db.product.findUnique({
//       where: {
//         slug,
//       },
//     });
//     //console.log(existingProduct);
//     if (!existingProduct) {
//       return NextResponse.json(
//         {
//           data: null,
//           message: "Product Not Found",
//         },
//         { status: 404 }
//       );
//     }
//     const deletedProduct = await db.product.delete({
//       where: {
//         id,
//       },
//     });
//     return NextResponse.json(deletedProduct);
//   } catch (error) {
//     //console.log(error);
//     return NextResponse.json(
//       {
//         message: "Failed to Delete Product",
//         error,
//       },
//       { status: 500 }
//     );
//   }
// }
export async function GET(request, { params: { slug } }) {
  try {
    const product = await db.product.findUnique({
      where: {
        slug,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch Product",
        error,
      },
      { status: 500 }
    );
  }
}
// export async function PUT(request, context) {
//   const { id } = context.params; // Correctly access params from context

//   try {
//     // Parse the request body
//     const {
//       barcode,
//       description,
//       imageUrl,
//       isActive,
//       isWholesale,
//       productCode,
//       productPrice,
//       salePrice,
//       sku,
//       slug,
//       tags,
//       title,
//       unit,
//       wholesalePrice,
//       wholesaleQty,
//       productStock,
//       qty,
//     } = await request.json();

//     // Basic validation (add more as needed)
//     if (!id || !title) {
//       return NextResponse.json(
//         { message: "Product ID and title are required" },
//         { status: 400 }
//       );
//     }

//     // Prepare the update data, excluding undefined values
//     const newProduct = {
//       barcode,
//       description,
//       imageUrl,
//       isActive,
//       isWholesale,
//       productCode,
//       productPrice: productPrice !== undefined ? Number(productPrice) : undefined,
//       salePrice: salePrice !== undefined ? Number(salePrice) : undefined,
//       sku,
//       slug,
//       tags,
//       title,
//       unit,
//       wholesalePrice: wholesalePrice !== undefined ? Number(wholesalePrice) : undefined,
//       wholesaleQty: wholesaleQty !== undefined ? Number(wholesaleQty) : undefined,
//       productStock: productStock !== undefined ? Number(productStock) : undefined,
//       qty: qty !== undefined ? Number(qty) : undefined,
//     };

//     // Check if product exists
//     const existingProduct = await db.product.findUnique({
//       where: { id },
//     });

//     if (!existingProduct) {
//       return NextResponse.json(
//         { message: "Product not found" },
//         { status: 404 } // Changed to 404 for "Not Found"
//       );
//     }

//     // Update the product
//     const updatedProduct = await db.product.update({
//       where: { id },
//       data: Object.fromEntries(
//         Object.entries(newProduct).filter(([_, value]) => value !== undefined)
//       ), // Only include defined fields
//     });

//     return NextResponse.json(updatedProduct, { status: 200 });
//   } catch (error) {
//     console.error("Update Product Error:", {
//       message: error.message,
//       stack: error.stack,
//       id,
//     });

//     return NextResponse.json(
//       {
//         message: "Failed to Update Product",
//         error: error.message || "Unknown error occurred",
//       },
//       { status: 500 }
//     );
//   }
// }