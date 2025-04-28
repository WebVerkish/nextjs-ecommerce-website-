"use client";
import ImageInput from "@/components/formInputs/ImageInput";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextInput from "@/components/formInputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apirequest";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewCustomerForm({ user, updateData = {} }) {
  const initialImageuRL = updateData?.profileImageUrl ?? "";
  const id = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageuRL);
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...updateData,
      ...user,
    },
  });
  const router = useRouter();
  function redirect() {
    router.push("/dashboard/customers");
  }
  async function onSubmit(data) {
    {
      // -id =auto()
      // -title
      // -slug =auto()
      // -description
      // -image
    }
    setLoading(true);
    data.profileImageUrl = imageUrl;
    data.userId = updateData?.id;
    console.log(data);
    if (id) {
      makePutRequest(setLoading, `api/customers/${updateData?.id}`, data, "Customer", redirect);
    } else {
      makePostRequest(
        setLoading,
        "api/farmers",
        data,
        "Farmer",
        reset,
        redirect
      );
      setImageUrl("");
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
        Personal Details
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 border-b border-gray-700 pb-10">
        <TextInput
          label="Full Name"
          name="name"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="UserName"
          name="username"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="First Name"
          name="firstName"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Last Name"
          name="lastName"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Email Address"
          name="email"
          type="email"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Phone Number"
          name="phone"
          register={register}
          errors={errors}
          className="w-full"
        />
        <ImageInput
          label="Customer Profile Image"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="customerProfileUploader"
        />
      </div>
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400 pt-10">
        Shipping Details
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Street Address"
          name="streetAddress"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="City"
          name="city"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Country"
          name="country"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Zip Code"
          name="zipCode"
          register={register}
          errors={errors}
          className="w-full"
        />
      </div>
      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Customer" : "Create Farmer"}
        loadingButtonTitle={`${
          id ? "Creating" : "Updating"
        } Customer please wait...`}
      />
    </form>
  );
}
