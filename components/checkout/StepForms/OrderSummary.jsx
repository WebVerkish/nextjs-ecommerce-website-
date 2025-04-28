// "use client"
import { setCurrentStep } from "@/redux/slices/checkoutSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function OrderSummary() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const checkoutFormData = useSelector(
    (store) => store.checkout.checkoutFormData
  );
  const cartItems = useSelector((store) => store.cart);

  const subTotal = cartItems
    .reduce((acc, currentItem) => {
      return acc + currentItem.salePrice * currentItem.qty;
    }, 0)
    .toFixed(2);
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const dispatch = useDispatch();
  function handlePrevious() {
    dispatch(setCurrentStep(currentStep - 1));
  }
  async function submitData() {
    // checkoutFormData
    const data = {
      orderItems: cartItems,
      checkoutFormData,
    };
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      
      if (!baseUrl) {
        throw new Error("Base URL is not defined. Please check your environment variables.");
      }
  
      const response = await fetch(`${baseUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      setLoading(false);
      const responseData = await response.json();
      if (response.ok) {
        toast.success(`Order Created Successfully`);
        router.push(`/order-confirmation/${responseData.id}`)
      } else {
        // setLoading(false);
        // toast.error("Something Went Wrong");
        const errorData = await response.json(); // Parse error details if available
      throw new Error(errorData.message || "Something Went Wrong");
      }
    } catch (error) {
      setLoading(false);
      toast.error("An unexpected error occurred");
      console.error("POST Request Error:", error);
    }
  }
  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
        Order Summary
      </h2>
      {cartItems.map((cartItem, i) => {
        return (
          <div
            key={i}
            className="flex items-center justify-between border-b border-slate-400 dark:text-slate-200 text-slate-800 pb-3 font-semibold text-sm mb-2"
          >
            <div className="flex items-center gap-4">
              <Image
                src={cartItem.imageUrl}
                alt={cartItem.title}
                width={249}
                height={249}
                className="rounded-xl w-14 h-14 object-contain"
              />
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold">Product 1</h2>
                <small className="text-sm dark:text-slate-200 text-slate-800">
                  {cartItem.title}
                </small>
              </div>
            </div>
            <div className=" rounded-xl border border-gray-400 flex gap-3 items-center">
              <p className="flex-grow px-4 py-2">{cartItem.qty}</p>
            </div>
            <div className="flex items-center gap-2">
              <h2>${cartItem.salePrice}</h2>
            </div>
          </div>
        );
      })}
      <div className="mt-4 flex items-center justify-between ">
        <button
          onClick={handlePrevious}
          type="button"
          class="inline-flex items-center px-6 py-3 h-10 me-3 text-white text-base font-medium bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-600 dark:focus:ring-lime-800 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>Previous</span>
        </button>
        {loading ? (
          <button disabled className="inline-flex items-center px-6 py-3 h-10 text-base font-medium text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-600 dark:focus:ring-lime-800 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700">Processing Please Wait...</button>
        ) : (
          <button
            onClick={submitData}
            class="inline-flex items-center px-6 py-3 h-10 text-base font-medium text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-600 dark:focus:ring-lime-800 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
          >
            <span>Proceed to Payment</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
