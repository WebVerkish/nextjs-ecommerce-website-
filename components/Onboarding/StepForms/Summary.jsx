// "use client";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import NavButtons from "../NavButtons";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setCurrentStep,
//   updateOnboardingFormData,
// } from "@/redux/slices/onboardingSlice";
// import ToggleInput from "@/components/formInputs/ToggleInput";
// import { generateUniqueCode } from "@/lib/generateUniqueCode";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { makePostRequest } from "@/lib/apirequest";

// export default function Summary({farmerId}) {
//   const [loading, setLoading] = useState(false);
//   const currentStep = useSelector((store) => store.onboarding.currentStep);
//   const existingFormData = useSelector(
//     (store) => store.onboarding.onboardingFormData
//   );

//   const {
//     register,
//     reset,
//     watch,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       ...existingFormData,
//     },
//   });
//   const dispatch = useDispatch();
// function handlePrevious() {
//     dispatch(setCurrentStep(currentStep - 1));
//   }
//   function redirect() {
//     router.push("/");
//   }
//   async function submitData () {
//     const data = existingFormData;
//       console.log(data);
//       const fullName = `${data.firstName} ${data.lastName}` 
//       const code = generateUniqueCode("EW", fullName);
//       console.log(farmerId);
//       data.code = code;
//       data.userId = farmerId;
//     console.log(data)
//       // makePostRequest(
//       //   setLoading,
//       //   "api/farmers",
//       //   data,
//       //   "Farmer",
//       //   reset,
//       //   redirect
//       // );
//   }
//   return (
//     <form >
//       <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
//         Summary
//       </h2>
//       <div className="flex">
//         <h2>Here are Your Details</h2>
//       </div>
//       <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
      
//       </div>
//       <div className="mt-4 flex items-center justify-between ">
//         <button
//           onClick={handlePrevious}
//           type="button"
//           class="inline-flex items-center px-6 py-3 h-10 me-3 text-white text-base font-medium bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-600 dark:focus:ring-lime-800 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
//         >
//           <ChevronLeft className="w-5 h-5 mr-2" />
//           <span>Previous</span>
//         </button>
//         {loading ? (
//           <button disabled className="inline-flex items-center px-6 py-3 h-10 text-base font-medium text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-600 dark:focus:ring-lime-800 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700">Processing Please Wait...</button>
//         ) : (
//           <button
//             onClick={submitData}
//             class="inline-flex items-center px-6 py-3 h-10 text-base font-medium text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-600 dark:focus:ring-lime-800 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
//           >
//             <span>Submit Data</span>
//             <ChevronRight className="w-5 h-5 ml-2" />
//           </button>
//         )}
//       </div>
//     </form>
//   );
// }
'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  setCurrentStep,
  updateOnboardingFormData,
} from '@/redux/slices/onboardingSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { makePostRequest } from '@/lib/apirequest';
import { generateUniqueCode } from '@/lib/generateUniqueCode';

export default function Summary({ farmerId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const existingFormData = useSelector((store) => store.onboarding.onboardingFormData);

  // Handle previous step navigation
  const handlePrevious = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };

  // Redirect after submission
  const redirect = () => {
    router.push('/');
  };

  // Submit data
  const submitData = async () => {
    setLoading(true);
    try {
      // Create a new object to avoid modifying non-extensible data
      const data = {
        ...existingFormData,
        code: generateUniqueCode('EW', `${existingFormData.firstName} ${existingFormData.lastName}`),
        userId: farmerId,
      };

      console.log('Submitting data:', data);

      dispatch(updateOnboardingFormData(data));

      await makePostRequest(
        setLoading,
        'api/farmers',
        data,
        'Farmer',
        redirect
      );
    } catch (error) {
      console.error('Error submitting data:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">Summary</h2>
      <div className="flex">
        <h2>Here are Your Details</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {/* Display summary of form data */}
        <div>
          <p><strong>First Name:</strong> {existingFormData.firstName || 'N/A'}</p>
          <p><strong>Last Name:</strong> {existingFormData.lastName || 'N/A'}</p>
          <p><strong>User ID:</strong> {farmerId || 'N/A'}</p>
          {/* Add other fields as needed */}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handlePrevious}
          type="button"
          className="inline-flex items-center px-6 py-3 h-10 me-3 text-white text-base font-medium bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-600 dark:focus:ring-lime-800 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>Previous</span>
        </button>
        {loading ? (
          <button
            disabled
            className="inline-flex items-center px-6 py-3 h-10 text-base font-medium text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-600 dark:focus:ring-lime-800 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
          >
            Processing Please Wait...
          </button>
        ) : (
          <button
            onClick={submitData}
            className="inline-flex items-center px-6 py-3 h-10 text-base font-medium text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-600 dark:focus:ring-lime-800 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
          >
            <span>Submit Data</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}