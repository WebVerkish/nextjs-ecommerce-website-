"use client";
import Breadcrumb from "@/components/frontend/Breadcrumb";
import CartItems from "@/components/frontend/CartItems";
import CartSubtotal from "@/components/frontend/CartSubtotal";
import EmptyCart from "@/components/frontend/EmptyCart";
import React from "react";
import { useSelector } from "react-redux";

export default function Cart() {
  const cartItems = useSelector((store) => store.cart);
  console.log(cartItems);
  const subTotal = cartItems.reduce((acc,currentItem)=>{
    return acc + (currentItem.salePrice * currentItem.qty);
  },0).toFixed(2);
  console.log(cartItems);
  return (
    <div>
      <Breadcrumb />
      {cartItems.length>0?(<div className="grid grid-cols-12 gap-8 px-6">
        <CartItems cartItems={cartItems}/>
        <CartSubtotal subTotal={subTotal} />
      </div>):(
        <EmptyCart/>
      )}
    </div>
  );
}
