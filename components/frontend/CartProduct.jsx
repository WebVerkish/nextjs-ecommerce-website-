"use client";
import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  decrementQty,
  incrementQty,
  removeFromCart,
} from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";

export default function CartProduct({ cartItem }) {
  const dispatch = useDispatch();
  function handleCartItemDelete(cartId) {
    // Invoke or Dispatch the Delete From Cart Reducer
    dispatch(removeFromCart(cartId));
    toast.success("Item Deleted Successfully");
  }
  function handleQuantityIncreament(cartId) {
    // Invoke or Dispatch the Delete From Cart Reducer
    dispatch(incrementQty(cartId));
  }
  function handleQuantityDecreament(cartId) {
    // Invoke or Dispatch the Delete From Cart Reducer
    dispatch(decrementQty(cartId));
  }
  return (
    <div className="flex items-center justify-between border-b border-slate-400 dark:text-slate-200 text-slate-800 pb-3 font-semibold text-sm mb-2">
      <div className="flex items-center gap-4">
        <Image
          src={cartItem.imageUrl}
          alt={cartItem.title}
          width={249}
          height={249}
          className="rounded-xl w-20 h-20 object-contain"
        />
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">Product 1</h2>
          <small className="text-sm dark:text-slate-200 text-slate-800">
            {cartItem.title}
          </small>
        </div>
      </div>
      <div className=" rounded-xl border border-gray-400 flex gap-3 items-center">
        <button
          onClick={() => handleQuantityDecreament(cartItem.id)}
          className="border-r border-gray-400 p-2"
        >
          <Minus />
        </button>
        <p className="flex-grow px-4 py-2">{cartItem.qty}</p>
        <button
          onClick={() => handleQuantityIncreament(cartItem.id)}
          className="border-l border-gray-400 p-2"
        >
          <Plus />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <h2>${cartItem.salePrice}</h2>
        <button onClick={() => handleCartItemDelete(cartItem.id)}>
          <Trash2 className="text-red-600 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
