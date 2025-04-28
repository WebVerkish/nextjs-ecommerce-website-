import React from "react";
import CartProduct from "./CartProduct";
import EmptyCart from "./EmptyCart";

export default function CartItmes({ cartItems }) {
  return (
    <div className="sm:col-span-8 col-span-full">
      {cartItems.length > 0 && (
        <>
          <h2 className="py-2 mb-6 text-2xl font-semibold">Your Cart</h2>
          <div className="flex items-center justify-between border-b border-slate-400 text-slate-400 pb-3 font-semibold text-sm mb-4">
            <h2 className="uppercase">Product</h2>
            <h2 className="uppercase">Quantity</h2>
            <h2 className="uppercase">Price</h2>
          </div>
        </>
      )}
      <div className="">
        {/* {cart 1} */}
        {cartItems.length > 0 ? (
          cartItems.map((item, i) => {
            return <CartProduct cartItem={item} key={i} />;
          })
        ) : (
          <EmptyCart />
        )}
        {/* {coupon code} */}
        <div className="flex items-center gap-4 py-4 mb-4">
          <input
            type="text"
            id="coupon"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
            placeholder="Enter Coupon Code"
          />
          <button className="dark:bg-lime-700 bg-lime-800 py-2.5 px-4 rounded-lg shrink-0 hover:bg-lime-900 dark:hover:bg-lime-800 text-slate-100 font-semibold">
            Apply Coupon
          </button>
        </div>
      </div>
    </div>
  );
}
