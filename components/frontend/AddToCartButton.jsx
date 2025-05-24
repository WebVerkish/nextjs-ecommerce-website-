"use client"
import { addToCart } from "@/redux/slices/cartSlice";
import { BaggageClaim } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";

export default function AddToCartButton({product}) {
    const dispatch = useDispatch();
    function handleAddToCart(){
        //Dispatch the reducer
        dispatch(addToCart(product));
        toast.success("Item Added Successfully");
    }
  return (
    <div>
      <button onClick={()=>handleAddToCart()} className="flex items-center text-white space-x-2 bg-lime-600 px-2 py-2 rounded-md">
        <BaggageClaim />
        <span>Add to Cart</span>
      </button>
    </div>
  );
}
