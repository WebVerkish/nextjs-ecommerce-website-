// "use client";
// import Loading from "@/app/loading";
// import SubmitButton from "@/components/formInputs/SubmitButton";
// import TextInput from "@/components/formInputs/TextInput";
// import ToggleInput from "@/components/formInputs/ToggleInput";
// import { makePostRequest, makePutRequest } from "@/lib/apirequest";
// import { generateCouponCode } from "@/lib/generateCouponCode";
// import { generateIsoFormattedDate } from "@/lib/generateIsoFormattedDate";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";

// export default function NewCouponForm({ updateData = {} }) {
//   const {data:session,status} = useSession();
//   // if(status === "loading"){
//   //   return <Loading/>
//   // }
//   const vendorId = session?.user?.id;

//   const expiryDateNormal = generateIsoFormattedDate(updateData.expiryDate);
//   const id = updateData?.id ?? "";
//   updateData.expiryDate = expiryDateNormal;
//   const [loading, setLoading] = useState(false);
//   const {
//     register,
//     reset,
//     watch,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       isActive: true,
//       ...updateData,
//     },
//   });
//   const isActive = watch("isActive");
//   const router = useRouter();
//   function redirect() {
//     router.push("/dashboard/coupons");
//   }
//   async function onSubmit(data) {
//     {
//       // -id =auto()
//       // -Coupon Title
//       // -code =auto()
//       // -Expiry Date
//     }
//     setLoading(true);
//     const couponCode = generateCouponCode(data.title, data.expiryDate);
//     const isoFormattedDate = generateIsoFormattedDate(data.expiryDate);
//     data.expiryDate = isoFormattedDate;
//     data.couponCode = couponCode;
//     data.vendorId = vendorId;
//     if (id) {
//       makePutRequest(setLoading, `api/coupons/${id}`, data, "Coupon", redirect);
//     } else {
//       makePostRequest(
//         setLoading,
//         "api/coupons",
//         data,
//         "Coupon",
//         reset,
//         redirect
//       );
//     }
//   }
//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="w-full max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
//     >
//       <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
//         <TextInput
//           label="Coupon Title"
//           name="title"
//           register={register}
//           errors={errors}
//           className="w-full"
//         />

//         {/* <TextInput label="Coupon Code"
//               name="coupon_code"
//               register={register}
//               errors={errors}
//               className='w-full'/> */}

//         <TextInput
//           label="Copun Expiry Date"
//           name="expiryDate"
//           type="date"
//           register={register}
//           errors={errors}
//           className="w-full"
//         />
//         <ToggleInput
//           label="Publish your Coupon"
//           name="isActive"
//           trueTitle="Active"
//           falseTitle="Draft"
//           register={register}
//         />
//       </div>
//       <SubmitButton
//         isLoading={loading}
//         buttonTitle={id ? "Update Coupon" : "Create Coupon"}
//         loadingButtonTitle={`${
//           id ? "Creating" : "Updating"
//         } Coupon please wait...`}
//       />
//     </form>
//   );
// }
"use client";
import Loading from "@/app/loading";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextInput from "@/components/formInputs/TextInput";
import ToggleInput from "@/components/formInputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apirequest";
import { generateCouponCode } from "@/lib/generateCouponCode";
import { generateIsoFormattedDate } from "@/lib/generateIsoFormattedDate";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function NewCouponForm({ updateData = {} }) {
    const { data: session, status } = useSession();
    if (status === "loading") {
        return <Loading />;
    }
    const vendorId = session?.user?.id;

    // Set default expiry date if updateData.expiryDate is undefined
    const defaultExpiryDate = updateData.expiryDate
        ? generateIsoFormattedDate(updateData.expiryDate)
        : new Date().toISOString();

    const [loading, setLoading] = useState(false);
    const {
        register,
        reset,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            isActive: true,
            title: updateData.title || "",
            expiryDate: defaultExpiryDate.slice(0, 10), // Format for input type="date"
        },
    });
    const isActive = watch("isActive");
    const router = useRouter();

    function redirect() {
        router.push("/dashboard/coupons");
    }

    async function onSubmit(data) {
        setLoading(true);
        const couponCode = generateCouponCode(data.title, data.expiryDate);
        const isoFormattedDate = generateIsoFormattedDate(data.expiryDate);
        data.expiryDate = isoFormattedDate;
        data.couponCode = couponCode;
        data.vendorId = vendorId;

        if (updateData.id) {
            makePutRequest(setLoading, `api/coupons/${updateData.id}`, data, "Coupon", redirect);
        } else {
            makePostRequest(setLoading, "api/coupons", data, "Coupon", reset, redirect);
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
        >
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <TextInput
                    label="Coupon Title"
                    name="title"
                    register={register}
                    errors={errors}
                    className="w-full"
                />
                <TextInput
                    label="Coupon Expiry Date"
                    name="expiryDate"
                    type="date"
                    register={register}
                    errors={errors}
                    className="w-full"
                />
                <ToggleInput
                    label="Publish your Coupon"
                    name="isActive"
                    trueTitle="Active"
                    falseTitle="Draft"
                    register={register}
                />
            </div>
            <SubmitButton
                isLoading={loading}
                buttonTitle={updateData.id ? "Update Coupon" : "Create Coupon"}
                loadingButtonTitle={`${updateData.id ? "Updating" : "Creating"} Coupon please wait...`}
            />
        </form>
    );
}