import db from "@/lib/db";
import { CaseSensitive } from "lucide-react";
import { NextResponse } from "next/server";

export async function POST(request) {
  // barcode
  // categoryId
  // description
  // userId:farmersId
  // imageUrl
  // isActive
  // isWholesale
  // productCode
  // productPrice
  // salePrice
  // sku
  // slug
  // tags
  // title
  // unit
  // wholesalePrice
  // wholesaleQty
  //   productStock
  //   qty

  try {
    const {
      barcode,
      categoryId,
      description,
      farmersId,
      productImages,
      imageUrl,
      isActive,
      isWholesale,
      productCode,
      productPrice,
      salePrice,
      sku,
      slug,
      tags,
      title,
      unit,
      wholesalePrice,
      wholesaleQty,
      productStock,
      qty,
    } = await request.json();
    //check if this product already exist in the db
    const existingProduct = await db.product.findUnique({
      where: {
        slug,
      },
    });
    if (existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "Product Already Exist",
        },
        { status: 409 }
      );
    }
    const newProduct = await db.product.create({
      data: {
        barcode,
        categoryId,
        description,
        userId: farmersId,
        productImages,
        imageUrl: productImages[0],
        isActive,
        isWholesale,
        productCode,
        productPrice: parseFloat(productPrice),
        salePrice: parseFloat(salePrice),
        sku,
        slug,
        tags,
        title,
        unit,
        wholesalePrice: parseFloat(wholesalePrice),
        wholesaleQty: parseInt(wholesaleQty),
        productStock: parseInt(productStock),
        qty: parseInt(qty),
      },
    });
    //console.log(newProduct);
    return NextResponse.json(newProduct);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed Create Product",
        error,
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const categoryId = request.nextUrl.searchParams.get("catId");
  const sortBy = request.nextUrl.searchParams.get("sort");
  console.log(sortBy);
  const min = request.nextUrl.searchParams.get("min");
  const max = request.nextUrl.searchParams.get("max");
  const searchTerm = request.nextUrl.searchParams.get("search");
  const page = request.nextUrl.searchParams.get("page") || 1;
  const pageSize = 3;

  let where = {  
    categoryId,
  };
  let products;
  if (min && max) {
    where.salePrice = {
      gte: parseFloat(min),
      lte: parseFloat(max),
    };
  } else if (min) {
    where.salePrice = {
      gte: parseFloat(min),
    };
  } else if (max) {
    where.salePrice = {
      lte: parseFloat(max),
    };
  }
  try {
    if(searchTerm){
      products = await db.product.findMany({
        where:{
          OR:[
            {title:{contains : searchTerm,mode:"insensitive",}},
          ],
        }
      });
    }else if(categoryId && page){
      products = await db.product.findMany({
        where,
        skip:(parseInt(page) - 1)* parseInt(pageSize),
        take:parseInt(pageSize),
        orderBy: {
          createdAt :"desc"
        },
      });
    }else if (categoryId && sortBy) {
      products = await db.product.findMany({
        where,
        orderBy: {
          salePrice: sortBy ,
        },
      });
    } else if (categoryId) {
      products = await db.product.findMany({
        where,
        orderBy: {
          salePrice: "asc",
        },
      });
    } else {
      products = await db.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return NextResponse.json(products);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch Products",
        error,
      },
      { status: 500 }
    );
  }
}
