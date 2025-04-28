import Link from "next/link";
import React from "react";

export default function CartSubtotal({ subTotal }) {
  const shipping = 10.0;
  const tax = 0.0;
  const totalPrice = (
    Number(subTotal) +
    Number(shipping) +
    Number(tax)
  ).toFixed(2);
  return (
    <div className="sm:col-span-4 col-span-full bg-white p-5 dark:text-slate-100 border border-gray-300 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 text-slate-800 overflow-hidden">
      <h2 className="text-2xl pb-3 font-bold">Cart Total</h2>
      <div className="flex items-center justify-between border-b border-slate-500 pb-6 font-bold">
        <span>Subtotal</span>
        <span>${subTotal}</span>
      </div>
      <div className="flex items-center justify-between pb-4 pt-4 font-bold">
        <span>Tax</span>
        <span>${tax}</span>
      </div>
      <div className="flex items-center justify-between pb-4 font-bold">
        <span>Shipping</span>
        <span>${shipping}</span>
      </div>
      <p className="text-slate-400 border-b border-slate-500 pb-6">
        We only charge for shipping when you have over 2kg items.
      </p>
      <div className="flex items-center justify-between py-4 font-bold">
        <span>Total</span>
        <span>${totalPrice}</span>
      </div>
      <div className="mt-8">
        <Link
          href="/checkout"
          className="text-slate-50 rounded-lg py-3 px-6 bg-slate-900 dark:bg-lime-600"
        >
          Continue to Checkout
        </Link>
      </div>
    </div>
  );
}
