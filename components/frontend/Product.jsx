"use client"
import { addToCart } from "@/redux/slices/cartSlice";
import { BaggageClaim } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function Product({product}) {
    const dispatch = useDispatch();
    function handleAddToCart(){
        //Dispatch the reducer
        dispatch(addToCart(product));
        toast.success("Item Added Successfully");
    }
  return (
    <div
      className="rounded-lg mr-3 bg-white dark:bg-slate-900 border  overflow-hidden shadow-md"
    >
      <Link href={`/products/${product.slug}`}>
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={556}
          height={556}
          className="w-full rounded-lg h-48 object-cover"
        />
      </Link>
      <div className="px-4">
        <Link href={`/products/${product.slug}`}>
          <h2 className="font-semibold text-center text-slate-800 mt-2 dark:text-slate-50 py-2">
            {product.title}
          </h2>
        </Link>
        <div className="flex items-center justify-between gap-2 pb-3">
          <p className="text-slate-50">${product.salePrice}</p>
          <button onClick={()=>handleAddToCart()} className="flex items-center text-white space-x-2 bg-lime-600 px-2 py-2 rounded-md">
            <BaggageClaim />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
