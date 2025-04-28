import { setCurrentStep } from "@/redux/slices/checkoutSlice";
import { Button } from "@react-email/components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NavButtons() {
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const dispatch = useDispatch();
  function handlePrevious(){
    dispatch(setCurrentStep(currentStep-1));
  }
  return (
    <div class="flex justify-between items-center mt-4">
      {currentStep > 1 && (
        <button
        onClick={handlePrevious}
            type="button"
        class="inline-flex items-center px-6 py-3 h-10 me-3 text-white text-base font-medium bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-600 dark:focus:ring-lime-800 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
      >
        <ChevronLeft className="w-5 h-5 mr-2"/>
        <span>Previous</span>
      </button>
      )}
      <button
        type="submit"
        class="inline-flex items-center px-6 py-3 h-10 text-base font-medium text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-600 dark:focus:ring-lime-800 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
      >
        <span>Next</span>
        <ChevronRight className="w-5 h-5 ml-2"/>
      </button>
    </div>
  );
}
