import CartBanner from "@/components/checkout/CartBanner";
import StepForm from "@/components/checkout/StepForm";
import Steps from "@/components/checkout/Steps";
import React from "react";

export default function Checkout() {
  const steps = [
    {
      number:1,
      title:"Personal Information",
    },
    {
      number:2,
      title:"Shipping Address",
    },
    {
      number:3,
      title: "Payment Method",
    },
    {
      number:4,
      title: "Order Summary",
    },
    
  ];
  return (
    <div className="bg-slate-200 dark:bg-slate-950 min-h-screen">
      <div className="max-w-3xl my-6 mx-auto border border-slate-300 p-6 rounded-md">
        {/* {Steps} */}
        <Steps steps={steps} />
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          {/* {Banner} */}
          {/* <h2>Card</h2> */}
          <CartBanner/>
          {/* {form} */}
          <StepForm/>
        </div>
      </div>
    </div>
  );
}
