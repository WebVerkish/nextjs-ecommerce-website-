"use client";
import FormHeader from "@/components/backoffice/FormHeader";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextareaInput from "@/components/formInputs/TextAreaInput";
import TextInput from "@/components/formInputs/TextInput";
import { makePostRequest } from "@/lib/apirequest";
import { generateUserCode } from "@/lib/generateUserCode";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewStaff() {
  const [imageUrl, setImageUrl] = useState("");
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
    },
  });
  const isActive = watch("isActive");
  const router = useRouter();
    function redirect(){
      router.push("/dashboard/staff");
    }
  async function onSubmit(data) {
    {
      // -id =auto()
      // -title
      // -slug =auto()
      // -description
      // -image
    }
   const code = generateUserCode(data.name);
    data.code = code;
    makePostRequest(setLoading, "api/staffs", data, "Staff", reset,redirect);
  }
  return (
    <div>
      <FormHeader title="New Staff" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Staff Full Name"
            name="name"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Nin (Id Number)"
            name="nin"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Date Of Birth"
            name="dob"
            type="dob"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Password"
            name="staffPass"
            type="password"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Staff Email Address"
            name="staffEmail"
            type="email"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Staff  Phone"
            name="staffPhone"
            type="tel"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Staff Physical Address"
            name="staffAddress"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextareaInput
            label="Notes"
            name="staffNotes"
            register={register}
            errors={errors}
          />
          
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle="Create staff"
          loadingButtonTitle="Creating staff Please Wait..."
        />
      </form>
    </div>
  );
}
